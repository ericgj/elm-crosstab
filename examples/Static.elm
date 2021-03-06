module Static exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Csv.Decode exposing (Errors(..))
import Round
import Crosstab.Table exposing (Table)
import Crosstab.Column exposing (Column)
import Crosstab.Calc
import Crosstab.Sort
import Data exposing (parsed, Custody)


view : Html msg
view =
    div []
        [ (case parsed of
            Ok data ->
                viewData data

            Err errs ->
                viewErrs errs
          )
        ]


viewData : List Custody -> Html msg
viewData data =
    div []
        [ h1 [] [ text "Women of Color in US prisons by year, % change, sorted descending by total" ]
        , viewColPctTable (stateCustodyWOC "PA" "CA" data)
        , hr [] []
        , h2 [] [ text "Example cumulative percent column" ]
        , viewCumPctColumn (yearCustodyOfAll data)
        , p [ style [ ( "font-size", "0.7em" ) ] ]
            [ span [] [ text "Source (Public Domain): " ]
            , span []
                [ a
                    [ href "http://doi.org/10.3886/ICPSR36657.v1" ]
                    [ text "National Prisoner Statistics, 1978-2015 (ICPSR 36657)" ]
                ]
            ]
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


viewColPctTable : Table Int Int String String -> Html msg
viewColPctTable tab =
    displayTable
        tableConfig
        (tab
            |> Crosstab.Table.compare (carryValue prevColPct) ( 0, Nothing )
            |> Crosstab.Table.sortRowsBySummary identity Crosstab.Sort.Desc
        )


viewCumPctColumn : Column Int Int String -> Html msg
viewCumPctColumn col =
    displayColumn
        columnConfig
        (col |> Crosstab.Column.compareAccum cumPct ( 0, Just 0 ))


tableConfig =
    let
        cell ( value, colpct ) =
            let
                html pct =
                    div []
                        [ div [] [ text pct ]
                        , div [ style [ ( "opacity", "0.5" ), ( "font-size", "0.7em" ) ] ]
                            [ text (toString value) ]
                        ]
            in
                colpct
                    |> Maybe.map (((*) 100) >> Round.round 1 >> (flip (++) "%") >> html)
                    |> Maybe.withDefault (html "-")
    in
        { rowLabel = text
        , colLabel = text
        , rowTotalLabel = text "Total"
        , colTotalLabel = text "Total"
        , cell = cell
        , summary = toString >> text
        }

columnConfig =
    let
        cell ( value, colpct ) =
            let
                html pct =
                    div []
                        [ div [] [ text pct ]
                        , div [ style [ ( "opacity", "0.5" ), ( "font-size", "0.7em" ) ] ]
                            [ text (toString value) ]
                        ]
            in
                colpct
                    |> Maybe.map (((*) 100) >> Round.round 1 >> (flip (++) "%") >> html)
                    |> Maybe.withDefault (html "-")
    in
        { label = text
        , summaryLabel = text "Total"
        , unitsLabel = text "Cumulative %"
        , cell = cell
        , summary = toString >> text
        }


colPct : { x | col : Int } -> Int -> Float
colPct { col } val =
    (toFloat val) / (toFloat col)


prevColPct : { x | prevCol : Maybe Int } -> Int -> Maybe Float
prevColPct { prevCol } val =
    prevCol
        |> Maybe.map (\prev -> (toFloat (val - prev)) / (toFloat val))


cumPct : { x | cum : ( Int, Maybe Float ), column : Int } -> Int -> ( Int, Maybe Float )
cumPct { cum, column } val =
    cum
        |> (\( sum, pct ) ->
                ( sum + val
                , pct
                    |> Maybe.map (\last -> last + ((toFloat val) / (toFloat column)))
                )
           )


carryValue : (compare -> x -> new) -> compare -> x -> ( x, new )
carryValue func comp x =
    ( x, func comp x )


stateCustodySumsOf :
    (Custody -> Int)
    -> String
    -> String
    -> List Custody
    -> Table Int Int String String
stateCustodySumsOf getter state1 state2 =
    Crosstab.Table.table
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


stateCustodyW : String -> String -> List Custody -> Table Int Int String String
stateCustodyW state1 state2 =
    stateCustodySumsOf .totalF state1 state2


stateCustodyWOC : String -> String -> List Custody -> Table Int Int String String
stateCustodyWOC state1 state2 =
    let
        woc r =
            r.blackF + r.hispF + r.asianF + r.nativeHawaiianF + r.asianPacificF + r.twoRaceF
    in
        stateCustodySumsOf woc state1 state2


yearCustodyOf : (Custody -> Int) -> List Custody -> Column Int Int String
yearCustodyOf getter =
    Crosstab.Column.column
        (Crosstab.Calc.sum)
        (Crosstab.Calc.sumOf getter)
        (.year >> toString)


yearCustodyOfAll : List Custody -> Column Int Int String
yearCustodyOfAll =
    yearCustodyOf (\r -> r.totalM + r.totalF)


displayColumn :
    { x
        | label : comparable -> Html msg
        , summaryLabel : Html msg
        , unitsLabel : Html msg
        , cell : a -> Html msg
        , summary : b -> Html msg
    }
    -> Column a b comparable
    -> Html msg
displayColumn { label, summaryLabel, unitsLabel, cell, summary } column =
    let

        levels =
            Crosstab.Column.levelList column

        values =
            Crosstab.Column.valueList column

        summaryValue =
            Crosstab.Column.summary column

        alignCols =
            ( "text-align", "right" )

        widthCols =
            ( "min-width", "100px" )

        vertAlign =
            ( "vertical-align", "bottom" )

        styleCells =
            style [ widthCols, vertAlign, alignCols ]

        styleHeads =
            style [ widthCols, vertAlign ]

        styleSums =
            style [ widthCols, vertAlign, alignCols ]

        head =
            [ tr []
                [ th [ styleHeads ] [] 
                , th [ styleSums ] [ unitsLabel ] 
                ]
            ]

        foot =
            [ tr []
                [ td [ styleHeads ] [ summaryLabel ]
                , td [ styleSums ] [ summary summaryValue ] 
                ]
            ]

        body =
            List.map2
                bodyRow
                levels
                values

        bodyRow clabel cvalue =
            tr []
                [ td [ styleHeads ] [ label clabel ] 
                , td [ styleCells ] [ cell cvalue ]
                ]

    in
        table []
            [ thead [] head
            , tbody [] body
            , tfoot [] foot
            ]





displayTable :
    { x
        | rowLabel : comparable1 -> Html msg
        , colLabel : comparable2 -> Html msg
        , rowTotalLabel : Html msg
        , colTotalLabel : Html msg
        , cell : a -> Html msg
        , summary : b -> Html msg
    }
    -> Table a b comparable1 comparable2
    -> Html msg
displayTable { rowLabel, colLabel, rowTotalLabel, colTotalLabel, cell, summary } crosstab =
    let
        rowLevels =
            Crosstab.Table.rowLevelList crosstab

        colLevels =
            Crosstab.Table.colLevelList crosstab

        values =
            Crosstab.Table.rowList crosstab

        rowSummary =
            Crosstab.Table.rowSummaryList crosstab

        colSummary =
            Crosstab.Table.colSummaryList crosstab

        tableSummary =
            Crosstab.Table.tableSummary crosstab

        alignCols =
            ( "text-align", "right" )

        widthCols =
            ( "min-width", "100px" )

        vertAlign =
            ( "vertical-align", "bottom" )

        styleCols =
            style [ widthCols, vertAlign, alignCols ]

        styleRowHeads =
            style [ widthCols, vertAlign ]

        styleRowSums =
            style [ widthCols, vertAlign, alignCols ]

        head =
            [ tr []
                ([ th [ styleRowHeads ] [] ]
                    ++ (List.map (\col -> th [ styleCols ] [ colLabel col ]) colLevels)
                    ++ [ th [ styleRowSums ] [ rowTotalLabel ] ]
                )
            ]

        foot =
            [ tr []
                ([ td [ styleRowHeads ] [ colTotalLabel ] ]
                    ++ (List.map (\c -> td [ styleCols ] [ summary c ]) colSummary)
                    ++ [ td [ styleRowSums ] [ summary tableSummary ] ]
                )
            ]

        body =
            List.map3
                bodyRow
                rowLevels
                values
                rowSummary

        bodyRow r cvalues csum =
            tr []
                ([ td [ styleRowHeads ] [ rowLabel r ] ]
                    ++ (List.map (\v -> td [ styleCols ] [ cell v ]) cvalues)
                    ++ ([ td [ styleRowSums ] [ summary csum ] ])
                )
    in
        table []
            [ thead [] head
            , tbody [] body
            , tfoot [] foot
            ]

