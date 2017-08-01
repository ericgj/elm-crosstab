module SortableTable
    exposing
        ( view
        , update
        , init
        , Model
        , Msg
        )

import Array exposing (Array)
import Tuple
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Round
import Table
import Csv.Decode exposing (Errors(..))
import Crosstab.Table as CT
import Crosstab.Calc
import Data exposing (parsed, Custody)


type alias Model =
    { table : Table.State
    , sortBy : SortBy
    }


type Msg
    = TableMsg Table.State
    | SetSortBy SortBy


type SortBy
    = SortByCount
    | SortByColPct


init : Model
init =
    { table = Table.initialSort "rowLabels"
    , sortBy = SortByCount
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        TableMsg state ->
            { model | table = state }

        SetSortBy sortBy ->
            { model | sortBy = sortBy }


view : Model -> Html Msg
view model =
    div []
        [ (case parsed of
            Ok data ->
                viewData data model

            Err errs ->
                viewErrs errs
          )
        ]


viewErrs : Csv.Decode.Errors -> Html msg
viewErrs errs =
    let
        parseErrors errs =
            div []
                [ h1 [] [ text "Errors occurred parsing CSV data" ]
                , ul []
                    (List.map (\e -> li [] [ text e ]) errs)
                ]

        decodeErrors errs =
            div []
                [ h1 [] [ text "Errors occurred decoding CSV data to records" ]
                , ul []
                    (List.map
                        (\( i, e ) -> li [] [ text (e ++ " (line " ++ (toString i) ++ ")") ])
                        errs
                    )
                ]
    in
        case errs of
            CsvErrors errs ->
                parseErrors errs

            DecodeErrors errs ->
                decodeErrors errs


viewData : List Custody -> Model -> Html Msg
viewData data { table, sortBy } =
    div []
        [ h1 [] [ text "Women of Color in US prisons by year, % change" ]
        , div []
            [ input
                [ type_ "radio"
                , id "count"
                , name "sortby"
                , value "count"
                , onClick (SetSortBy SortByCount)
                ]
                []
            , label [ for "count" ] [ text "sort by count" ]
            , input
                [ type_ "radio"
                , id "pct"
                , name "sortby"
                , value "pct"
                , onClick (SetSortBy SortByColPct)
                ]
                []
            , label [ for "pct" ] [ text "sort by % change" ]
            ]
        , data
            |> stateCustodyWOC "PA" "CA"
            |> colPctTable
            |> (\tab -> viewSortable (colPctTableConfig sortBy) table tab)
        ]


colPctTableConfig :
    SortBy
    -> SortableConfig ( Int, Maybe Float ) Int Float Int String String Msg
colPctTableConfig sortBy =
    { toMsg = TableMsg
    , rowLevel = identity
    , colLevel = identity
    , value = htmlColPctValue sortBy
    , summary = htmlColPctSummary
    , sortValue =
        case sortBy of
            SortByCount ->
                Tuple.first >> toFloat

            SortByColPct ->
                Tuple.second >> Maybe.withDefault 0.0
    , sortSummary = identity
    , rowColumnLabel = Nothing
    , rowSummaryLabel = Just "Total"
    , colSummaryLabel = Just "Total"
    }


htmlColPctValue : SortBy -> ( Int, Maybe Float ) -> Table.HtmlDetails msg
htmlColPctValue sortBy ( count, mpct ) =
    let
        formatPct float =
            float * 100 |> Round.round 1 |> (\s -> s ++ "%")

        lesserStyle =
            [ ( "opacity", "0.5" ), ( "font-size", "0.7em" ) ]

        greaterStyle =
            []
    in
        Table.HtmlDetails
            [ style [ ( "text-align", "right" ), ( "min-width", "100px" ) ] ]
            [ div []
                [ div
                    [ style
                        (if sortBy == SortByCount then
                            greaterStyle
                         else
                            lesserStyle
                        )
                    ]
                    [ count |> toString |> text ]
                , div
                    [ style
                        (if sortBy == SortByColPct then
                            greaterStyle
                         else
                            lesserStyle
                        )
                    ]
                    [ mpct
                        |> Maybe.map formatPct
                        |> Maybe.withDefault "-"
                        |> text
                    ]
                ]
            ]


htmlColPctSummary : Int -> Table.HtmlDetails msg
htmlColPctSummary count =
    Table.HtmlDetails
        [ style [ ( "text-align", "right" ), ( "min-width", "100px" ) ] ]
        [ div [] [ count |> toString |> text ]
        ]



-- DATA MODEL


colPctTable : 
    CT.Table Int Int String String 
    -> CT.Table ( Int, Maybe Float ) Int String String
colPctTable tab =
    tab
        |> CT.compare (carryValue prevColPct) ( 0, Nothing )


prevColPct : { x | prevCol : Maybe Int } -> Int -> Maybe Float
prevColPct { prevCol } val =
    prevCol
        |> Maybe.map (\prev -> (toFloat (val - prev)) / (toFloat val))


carryValue : (compare -> x -> new) -> compare -> x -> ( x, new )
carryValue func comp x =
    ( x, func comp x )


stateCustodySumsOf :
    (Custody -> Int)
    -> String
    -> String
    -> List Custody
    -> CT.Table Int Int String String
stateCustodySumsOf getter state1 state2 =
    CT.table
        (Crosstab.Calc.sum)
        (Crosstab.Calc.sumOf getter)
        { row =
            (\r ->
                if r.state == state1 || r.state == state2 then
                    r.state
                else
                    "All Other"
            )
        , col = .year >> toString
        }


stateCustodyWOC : String -> String -> List Custody -> CT.Table Int Int String String
stateCustodyWOC state1 state2 =
    let
        woc r =
            r.blackF + r.hispF + r.asianF + r.nativeHawaiianF + r.asianPacificF + r.twoRaceF
    in
        stateCustodySumsOf woc state1 state2



-- GENERIC BIT BELOW


type alias SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg =
    { toMsg : Table.State -> msg
    , rowLevel : comparableRow -> String
    , colLevel : comparableCol -> String
    , value : value -> Table.HtmlDetails msg
    , summary : summary -> Table.HtmlDetails msg
    , sortValue : value -> comparableValue
    , sortSummary : summary -> comparableSummary
    , rowColumnLabel : Maybe String
    , rowSummaryLabel : Maybe String
    , colSummaryLabel : Maybe String
    }


viewSortable :
    SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg
    -> Table.State
    -> CT.Table value summary comparableRow comparableCol
    -> Html msg
viewSortable config state ctab =
    sortableConfig config ctab
        |> (\c -> Table.view c state (tableRows ctab))


sortableConfig :
    SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg
    -> CT.Table value summary comparableRow comparableCol
    -> Table.Config (TableRow value summary comparableRow) msg
sortableConfig config ctab =
    let
        colLevels =
            CT.colLevelList ctab

        colSums =
            tableSummaryCols ctab
    in
        sortableConfigHelp config colLevels colSums


sortableConfigHelp :
    SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg
    -> List comparableCol
    -> TableSummary summary
    -> Table.Config (TableRow value summary comparableRow) msg
sortableConfigHelp c colLevels colSums =
    Table.customConfig
        { toId = .level >> c.rowLevel
        , toMsg = c.toMsg
        , columns = sortableColumns c colLevels
        , customizations = sortableCustomize c colSums
        }


sortableCustomize :
    SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg
    -> TableSummary summary
    -> Table.Customizations x msg
sortableCustomize c colSums =
    let
        textHeader s =
            Html.th [] [ Html.text s ]

        htmlHeader { attributes, children } =
            Html.th attributes children

        footer c { values, summary } =
            Table.HtmlDetails
                []
                ([ c.colSummaryLabel |> Maybe.withDefault "" |> textHeader ]
                    ++ (values |> List.map (c.summary >> htmlHeader))
                    ++ [ summary |> c.summary |> htmlHeader ]
                )
    in
        Table.defaultCustomizations
            |> (\custom -> { custom | tfoot = footer c colSums |> Just })


sortableColumns :
    SortableConfig value summary comparableValue comparableSummary comparableRow comparableCol msg
    -> List comparableCol
    -> List (Table.Column (TableRow value summary comparableRow) msg)
sortableColumns c cols =
    [ c.rowColumnLabel
        |> Maybe.withDefault ""
        |> (\name ->
                Table.stringColumn name (.level >> c.rowLevel)
           )
    ]
        ++ (cols
                |> List.indexedMap
                    (\i name ->
                        sortableColumn
                            { maybeValue = .values >> Array.get i
                            , toHtml = c.value
                            , sortValue = c.sortValue
                            , name = c.colLevel name
                            }
                    )
           )
        ++ [ c.rowSummaryLabel
                |> Maybe.withDefault ""
                |> (\name ->
                        sortableColumn
                            { maybeValue = .summary >> Just
                            , toHtml = c.summary
                            , sortValue = c.sortSummary
                            , name = name
                            }
                   )
           ]


sortableColumn :
    { maybeValue : a -> Maybe value
    , toHtml : value -> Table.HtmlDetails msg
    , sortValue : value -> comparable
    , name : String
    }
    -> Table.Column a msg
sortableColumn { maybeValue, toHtml, sortValue, name } =
    Table.veryCustomColumn
        { name = name
        , viewData =
            (maybeValue
                >> Maybe.map toHtml
                >> Maybe.withDefault (Table.HtmlDetails [] [])
            )
        , sorter =
            Table.increasingOrDecreasingBy
                (maybeValue
                    >> Maybe.map (sortValue >> List.singleton)
                    >> Maybe.withDefault []
                )
        }


type alias TableRow a b comparable =
    { level : comparable
    , values : Array a
    , summary : b
    }


type alias TableSummary b =
    { values : List b
    , summary : b
    }


tableRows :
    CT.Table a b comparable1 comparable2
    -> List (TableRow a b comparable1)
tableRows ctab =
    let
        rowLevels =
            CT.rowLevelList ctab

        values =
            CT.rowList ctab

        rowsums =
            CT.rowSummaryList ctab

        construct level cvals rsum =
            { level = level
            , values = Array.fromList cvals
            , summary = rsum
            }
    in
        List.map3 construct
            rowLevels
            values
            rowsums


tableSummaryCols :
    CT.Table a b comparable1 comparable2
    -> TableSummary b
tableSummaryCols ctab =
    { values = CT.colSummaryList ctab
    , summary = CT.tableSummary ctab
    }
