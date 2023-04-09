module Crosstab.Html exposing
    ( Config
    , Msg
    , State
    , view
    )

import Crosstab exposing (Crosstab, Query)
import Crosstab.Display as Display exposing (ColumnHeader(..), LabelledRow, Table, TableHeader)
import Html exposing (..)
import Html.Attributes exposing (colspan)
import Html.Bem exposing (..)
import Window exposing (Window)


type State a msg
    = State
        { query : Query a
        , crosstab : Crosstab a
        , valueColumns : List ( String, a -> Html msg )
        }


type Config msg
    = Config
        { msg : Msg -> msg
        , css : CssConfig
        , dimensionLabel : List String -> String
        , missingValue : Html msg
        , columnHeader : ColumnHeader -> List (Attribute msg)
        }


type alias CssConfig =
    { block : String
    , table : String
    , dimension : String
    , columnHeader : String
    , summary : String
    , summaryGrand : String
    }


type InternalError
    = CrosstabQueryFailed
    | TableEmpty


type Msg
    = DimSelectColumn
    | DimSelectRow


view : Config msg -> State a msg -> Html msg
view (Config c) (State s) =
    let
        minner =
            s.crosstab
                |> Crosstab.query s.query
                |> Maybe.map (viewTable (Config c) s.valueColumns)
    in
    case minner of
        Nothing ->
            blockMod div
                c.css.block
                ( "state", "error" )
                [ viewInternalError CrosstabQueryFailed ]

        Just inner ->
            blockMod div c.css.block ( "state", "ok" ) [ inner ]


viewInternalError : InternalError -> Html msg
viewInternalError e =
    let
        inner =
            case e of
                CrosstabQueryFailed ->
                    text "Sorry, internal error querying crosstab."

                TableEmpty ->
                    text "No data."
    in
    div [] [ inner ]


viewTable : Config msg -> List ( String, a -> Html msg ) -> Table a -> Html msg
viewTable (Config c) vcols tab =
    let
        thdr =
            tab |> Display.tableHeader

        minner =
            viewLabelledRows
                (Config c)
                thdr
                (tab |> Display.labelledRows |> Display.mapValues vcols)
    in
    case minner of
        Nothing ->
            div []
                [ h1 [] [ text <| Display.title thdr ]
                , blockElemMod
                    div
                    c.css.block
                    c.css.table
                    ( "state", "empty" )
                    [ viewInternalError TableEmpty ]
                ]

        Just inner ->
            div []
                [ h1 [] [ text <| Display.title thdr ]
                , blockElemMod
                    div
                    c.css.block
                    c.css.table
                    ( "state", "not-empty" )
                    [ inner ]
                ]


viewLabelledRows :
    Config msg
    -> TableHeader
    -> List (LabelledRow (Html msg))
    -> Maybe (Html msg)
viewLabelledRows c thdr lrows =
    case lrows of
        [] ->
            Nothing

        r :: rest ->
            Just <| viewNonEmptyLabelledRows c thdr r rest


viewNonEmptyLabelledRows :
    Config msg
    -> TableHeader
    -> LabelledRow (Html msg)
    -> List (LabelledRow (Html msg))
    -> Html msg
viewNonEmptyLabelledRows c thdr r rest =
    table []
        [ thead [] <| viewTableHeader c thdr r
        , tbody [] <| viewTableBody c thdr (r :: rest)
        ]


viewTableHeader :
    Config msg
    -> TableHeader
    -> LabelledRow (Html msg)
    -> List (Html msg)
viewTableHeader (Config c) thdr r =
    let
        maxcols =
            r |> Display.maxColumns

        colDimSelector =
            viewDimSelector (Config c) DimSelectColumn <| Display.columnDimLabels thdr

        rowDimSelector =
            viewDimSelector (Config c) DimSelectRow <| Display.rowDimLabels thdr
    in
    [ tr []
        [ th [] []
        , th [ colspan maxcols ] [ colDimSelector ]
        ]
    ]
        ++ viewTableHeaderColumnRows c.columnHeader c.css rowDimSelector r


viewDimSelector : Config msg -> Msg -> Window String -> Html msg
viewDimSelector (Config c) msg w =
    blockElem div
        c.css.block
        c.css.dimension
        [ text <| c.dimensionLabel <| Window.getOpen w ]


viewTableBody :
    Config msg
    -> TableHeader
    -> List (LabelledRow (Html msg))
    -> List (Html msg)
viewTableBody (Config c) thdr rs =
    []



-- TODO


viewTableHeaderColumnRows :
    (ColumnHeader -> List (Attribute msg))
    -> CssConfig
    -> Html msg
    -> LabelledRow (Html msg)
    -> List (Html msg)
viewTableHeaderColumnRows cattr css rdim r =
    r
        |> Display.columnHeaders
        |> (\( chdrs, vhdr ) ->
                (chdrs |> List.map (viewTableHeaderColumnRow cattr css))
                    ++ [ vhdr |> viewTableHeaderValueColumnRow cattr css rdim ]
           )


viewTableHeaderColumnRow :
    (ColumnHeader -> List (Attribute msg))
    -> CssConfig
    -> List ColumnHeader
    -> Html msg
viewTableHeaderColumnRow cattr css cs =
    let
        inner =
            cs |> List.map (viewTableHeaderColumnCell cattr css)
    in
    tr [] ([ th [] [] ] ++ inner)


viewTableHeaderValueColumnRow :
    (ColumnHeader -> List (Attribute msg))
    -> CssConfig
    -> Html msg
    -> List ColumnHeader
    -> Html msg
viewTableHeaderValueColumnRow cattr css rdim cs =
    let
        inner =
            cs |> List.map (viewTableHeaderColumnCell cattr css)
    in
    tr [] ([ th [] [ rdim ] ] ++ inner)


viewTableHeaderColumnCell : (ColumnHeader -> List (Attribute msg)) -> CssConfig -> ColumnHeader -> Html msg
viewTableHeaderColumnCell cattr css c =
    let
        label =
            case c of
                ColumnHeader m ->
                    m
                        |> Maybe.map (\s -> text s)
                        |> Maybe.withDefault (text "")

                SummaryColumnHeader _ m ->
                    m
                        |> Maybe.map (\s -> text s)
                        |> Maybe.withDefault (text "")

                ValueColumnHeader s ->
                    text s

                SummaryValueColumnHeader _ s ->
                    text s

        ( elem, mtype ) =
            case c of
                SummaryColumnHeader p _ ->
                    if p == 1.0 then
                        ( css.columnHeader, Just css.summaryGrand )

                    else
                        ( css.columnHeader, Just css.summary )

                SummaryValueColumnHeader p _ ->
                    if p == 1.0 then
                        ( css.columnHeader, Just css.summaryGrand )

                    else
                        ( css.columnHeader, Just css.summary )

                _ ->
                    ( css.columnHeader, Nothing )
    in
    case mtype of
        Nothing ->
            blockElemWithAttr th (cattr c) css.block elem [ label ]

        Just t ->
            blockElemModWithAttr th (cattr c) css.block elem ( "type", t ) [ label ]
