module Crosstab.View.Selectable exposing
    ( Config
    , CssConfig
    , Msg(..)
    , State
    , defaultColumnSummary
    , defaultCssConfig
    , defaultEmptyCell
    , defaultRowSummary
    , empty
    , floatValueConfig
    , intValueConfig
    , isEmpty
    , singleValueConfig
    , update
    , valueConfig
    , view
    , withColumnSummaryLabel
    , withCssBlock
    , withEmptyCell
    , withRowSummaryLabel
    )

import Crosstab.Display as Display exposing (Table)
import Crosstab.Query as Query exposing (CompareAxis)
import Html exposing (..)
import Html.Attributes exposing (colspan)
import Html.Bem as Bem exposing (block, blockList, element, elementList, elementOf)
import Html.Events.Extra.Mouse as Mouse
import Set exposing (Set)
import Window exposing (Window)



-- -----------------------------------------------------------------------------
-- STATE
-- -----------------------------------------------------------------------------


type alias Level =
    List String


type State
    = SelectedRows (Set Level)
    | SelectedColumns (Set Level)
    | SelectedCells (Set ( Level, Level ))


empty : State
empty =
    SelectedCells Set.empty



-- STATE GETTERS


{-| True if no rows, columns or cells are selected
-}
isEmpty : State -> Bool
isEmpty st =
    case st of
        SelectedRows s ->
            Set.isEmpty s

        SelectedColumns s ->
            Set.isEmpty s

        SelectedCells s ->
            Set.isEmpty s



-- -----------------------------------------------------------------------------
-- CONFIG
-- -----------------------------------------------------------------------------


type Config a comparable
    = Config
        { sortValues : CompareAxis a
        , valueColumns : List ( String, a -> Html Never )
        , emptyCell : Html Never
        , columnSummary : String
        , rowSummary : String
        , css : CssConfig
        }


type alias CssConfig =
    { block : String
    }


intValueConfig : String -> Query.SortDir -> Config Int Int
intValueConfig s dir =
    valueConfig (Query.sortByValue dir) [ ( s, String.fromInt >> text ) ]


floatValueConfig : String -> Query.SortDir -> Config Float Float
floatValueConfig s dir =
    valueConfig (Query.sortByValue dir) [ ( s, String.fromFloat >> text ) ]


singleValueConfig : CompareAxis a -> String -> (a -> Html Never) -> Config a comparable
singleValueConfig sortfn s valfn =
    valueConfig sortfn [ ( s, valfn ) ]


valueConfig : CompareAxis a -> List ( String, a -> Html Never ) -> Config a comparable
valueConfig sortfn valfns =
    Config
        { sortValues = sortfn
        , valueColumns = valfns
        , emptyCell = defaultEmptyCell
        , columnSummary = defaultColumnSummary
        , rowSummary = defaultRowSummary
        , css = defaultCssConfig
        }


defaultEmptyCell : Html Never
defaultEmptyCell =
    text ""


defaultColumnSummary : String
defaultColumnSummary =
    "Summary"


defaultRowSummary : String
defaultRowSummary =
    "Summary"


defaultCssConfig : CssConfig
defaultCssConfig =
    { block = "crosstab"
    }


withEmptyCell : Html Never -> Config a comparable -> Config a comparable
withEmptyCell h (Config c) =
    Config { c | emptyCell = h }


withRowSummaryLabel : String -> Config a comparable -> Config a comparable
withRowSummaryLabel s (Config c) =
    Config { c | rowSummary = s }


withColumnSummaryLabel : String -> Config a comparable -> Config a comparable
withColumnSummaryLabel s (Config c) =
    Config { c | columnSummary = s }


withCssBlock : String -> Config a comparable -> Config a comparable
withCssBlock s (Config c) =
    let
        css =
            c.css
    in
    Config c |> withCss { css | block = s }


withCss : CssConfig -> Config a comparable -> Config a comparable
withCss css (Config c) =
    Config { c | css = css }



-- CONFIG GETTERS


cssConfig : Config a comparable -> CssConfig
cssConfig (Config c) =
    c.css


valueColumns : Config a comparable -> List ( String, a -> Html Never )
valueColumns (Config c) =
    c.valueColumns


emptyCell : Config a comparable -> Html Never
emptyCell (Config c) =
    c.emptyCell


rowSummary : Config a comparable -> String
rowSummary (Config c) =
    c.rowSummary


columnSummary : Config a comparable -> String
columnSummary (Config c) =
    c.columnSummary



-- -----------------------------------------------------------------------------
-- UPDATE
-- -----------------------------------------------------------------------------


type Msg a
    = ToggleSelectOnlyRow Level
    | ToggleSelectOnlyColumn Level
    | ToggleSelectOnlyCell ( Level, Level )
    | ToggleSelectAddRow Level
    | ToggleSelectAddColumn Level
    | ToggleSelectAddCell ( Level, Level )
    | UpdateQuery (Query.Msg a)
    | NoOp


update : Msg a -> State -> State
update msg state =
    case ( msg, state ) of
        ( NoOp, _ ) ->
            state

        ( UpdateQuery _, _ ) ->
            state

        ( ToggleSelectOnlyRow new, SelectedRows cur ) ->
            SelectedRows <| toggleOnly cur new

        ( ToggleSelectOnlyRow new, _ ) ->
            SelectedRows <| Set.singleton new

        ( ToggleSelectOnlyColumn new, SelectedColumns cur ) ->
            SelectedColumns <| toggleOnly cur new

        ( ToggleSelectOnlyColumn new, _ ) ->
            SelectedColumns <| Set.singleton new

        ( ToggleSelectOnlyCell new, SelectedCells cur ) ->
            SelectedCells <| toggleOnly cur new

        ( ToggleSelectOnlyCell new, _ ) ->
            SelectedCells <| Set.singleton new

        ( ToggleSelectAddRow new, SelectedRows cur ) ->
            SelectedRows <| toggleAdd cur new

        ( ToggleSelectAddRow new, _ ) ->
            SelectedRows <| Set.singleton new

        ( ToggleSelectAddColumn new, SelectedColumns cur ) ->
            SelectedColumns <| toggleAdd cur new

        ( ToggleSelectAddColumn new, _ ) ->
            SelectedColumns <| Set.singleton new

        ( ToggleSelectAddCell new, SelectedCells cur ) ->
            SelectedCells <| toggleAdd cur new

        ( ToggleSelectAddCell new, _ ) ->
            SelectedCells <| Set.singleton new


toggleOnly : Set comparable -> comparable -> Set comparable
toggleOnly cur new =
    if cur |> Set.member new then
        Set.empty

    else
        Set.singleton new


toggleAdd : Set comparable -> comparable -> Set comparable
toggleAdd cur new =
    if cur |> Set.member new then
        cur |> Set.remove new

    else
        cur |> Set.insert new



-- -----------------------------------------------------------------------------
-- VIEW
-- -----------------------------------------------------------------------------


view : Config a comparable -> Table a -> State -> Html (Msg a)
view c tab st =
    let
        b =
            Bem.init <| .block <| cssConfig c

        ltab =
            Display.labelledTable (valueColumns c) tab

        rdims =
            Display.tableRowDimensions tab

        cdims =
            Display.tableColumnDimensions tab
    in
    table [ b |> blockList [ ( "selected", not <| isEmpty st ) ] ]
        [ viewHeader b c rdims cdims ltab.columns st
        , viewBody b c ltab.rows st
        ]



-- -----------------------------------------------------------------------------
-- VIEW HEADER
-- -----------------------------------------------------------------------------


viewHeader :
    Bem.Block
    -> Config a comparable
    -> Window String
    -> Window String
    -> List Display.ColumnLabel
    -> State
    -> Html (Msg a)
viewHeader b c rdims cdims cols st =
    let
        scols =
            case st of
                SelectedColumns s ->
                    s

                _ ->
                    Set.empty

        e =
            b.element "dimensions"

        cdimHdr =
            th [ colspan <| List.length cols ]
                [ viewDimHeader e "column" Query.SetColumnDimensions cdims
                ]

        rdimHdr =
            th []
                [ viewDimHeader e "row" Query.SetRowDimensions rdims
                ]

        colHdrs =
            viewHeaderRows b rdimHdr (rowSummary c) cols scols
    in
    thead []
        ([ tr []
            [ th [] []
            , cdimHdr
            ]
         ]
            ++ colHdrs
        )


viewDimHeader :
    Bem.Element
    -> String
    -> (Maybe Int -> Query.Msg a)
    -> Window String
    -> Html (Msg a)
viewDimHeader e etype qmsg dims =
    text ""



-- TODO


viewHeaderRows :
    Bem.Block
    -> Html (Msg a)
    -> String
    -> List Display.ColumnLabel
    -> Set Level
    -> List (Html (Msg a))
viewHeaderRows b rdimHdr rsum cols lvls =
    let
        maxdims =
            cols
                |> List.map (.level >> List.length)
                |> List.maximum
                |> Maybe.withDefault 1

        e =
            b.element "header-row"
    in
    cols
        |> List.foldl
            (updateHeaderValueAndColRows b maxdims rsum lvls)
            ( Nothing, [], List.repeat maxdims [] )
        |> (\( _, vh, chs ) ->
                (chs |> List.map (viewHeaderRow e "column" (th [] [])))
                    ++ [ vh |> viewHeaderRow e "value" (th [] [ rdimHdr ]) ]
           )


viewHeaderRow :
    Bem.Element
    -> String
    -> Html (Msg a)
    -> List (Html (Msg a))
    -> Html (Msg a)
viewHeaderRow e rtype prefix cols =
    tr
        [ e |> elementOf "type" rtype ]
        (prefix :: cols)


updateHeaderValueAndColRows :
    Bem.Block
    -> Int
    -> String
    -> Set Level
    -> Display.ColumnLabel
    -> ( Maybe Display.ColumnLabel, List (Html (Msg a)), List (List (Html (Msg a))) )
    -> ( Maybe Display.ColumnLabel, List (Html (Msg a)), List (List (Html (Msg a))) )
updateHeaderValueAndColRows b maxdims rsum lvls next ( mprev, vrow, crows ) =
    let
        e =
            b.element "header"

        mprevl =
            mprev |> Maybe.map .level
    in
    ( Just <| next
    , vrow ++ [ viewHeaderCell e "value" maxdims lvls next.level (Just next.value) ]
    , next.level
        |> headerLabelOrSummaryNonRepeat rsum maxdims mprevl
        |> List.map2
            (\crow mlabel -> updateHeaderColRow e maxdims lvls next.level mlabel crow)
            crows
    )


updateHeaderColRow :
    Bem.Element
    -> Int
    -> Set Level
    -> Level
    -> Maybe String
    -> List (Html (Msg a))
    -> List (Html (Msg a))
updateHeaderColRow e maxdims lvls lvl mlabel crow =
    crow ++ [ viewHeaderCell e "column" maxdims lvls lvl mlabel ]


viewHeaderCell :
    Bem.Element
    -> String
    -> Int
    -> Set Level
    -> Level
    -> Maybe String
    -> Html (Msg a)
viewHeaderCell e etype maxdims lvls lvl mlabel =
    th
        [ e
            |> elementList
                [ ( "selected", Set.member lvl lvls )
                , ( "summary", (lvl |> List.length) < maxdims )
                , ( "summary-grand", (lvl |> List.length) == 0 )
                ]
        , e |> elementOf "type" etype
        , Mouse.onClick (toggleSelectColumn lvl)
        ]
        [ text <| Maybe.withDefault "" <| mlabel ]


headerLabelOrSummaryNonRepeat :
    String
    -> Int
    -> Maybe Level
    -> Level
    -> List (Maybe String)
headerLabelOrSummaryNonRepeat rsum maxdims mprev next =
    let
        next_ =
            next |> labelOrSummary rsum
    in
    mprev
        |> Maybe.map (labelOrSummary rsum)
        |> Maybe.map (\prev -> padRightNonRepeat maxdims prev next_)
        |> Maybe.withDefault (padRight maxdims next_)


labelOrSummary : String -> Level -> Level
labelOrSummary rsum lvl =
    case lvl of
        [] ->
            [ rsum ]

        _ ->
            lvl



-- -----------------------------------------------------------------------------
-- VIEW BODY
-- -----------------------------------------------------------------------------


viewBody :
    Bem.Block
    -> Config a comparable
    -> List (Display.LabelledRow (Html Never))
    -> State
    -> Html (Msg a)
viewBody b c rows st =
    tbody [] <|
        viewBodyRows b c rows st


viewBodyRows :
    Bem.Block
    -> Config a comparable
    -> List (Display.LabelledRow (Html Never))
    -> State
    -> List (Html (Msg a))
viewBodyRows b c rows st =
    let
        rmaxdims =
            rows
                |> List.map (\( rl, _ ) -> rl.level |> List.length)
                |> List.maximum
                |> Maybe.withDefault 1
    in
    rows
        |> List.map
            (\( rlabel, rvals ) -> viewBodyRow b c rmaxdims rlabel.level rvals st)


viewBodyRow :
    Bem.Block
    -> Config a comparable
    -> Int
    -> Level
    -> List (Display.LabelledValue (Html Never))
    -> State
    -> Html (Msg a)
viewBodyRow b (Config c) rmaxdims lvl vals st =
    let
        er =
            b.element "row"

        eh =
            b.element "header-column"

        ( clvls, rlvls, dlvls ) =
            case st of
                SelectedRows lvls ->
                    ( Set.empty, lvls, Set.empty )

                SelectedColumns lvls ->
                    ( lvls, Set.empty, Set.empty )

                SelectedCells lvls ->
                    ( Set.empty, Set.empty, lvls )
    in
    tr
        [ er
            |> elementList
                [ ( "selected", Set.member lvl rlvls )
                , ( "summary", (lvl |> List.length) < rmaxdims )
                , ( "summary-grand", (lvl |> List.length) == 0 )
                ]
        ]
        (viewRowHeader eh c.columnSummary rmaxdims lvl
            :: viewBodyRowCells b c.emptyCell rmaxdims vals rlvls clvls dlvls
        )


viewRowHeader : Bem.Element -> String -> Int -> Level -> Html (Msg a)
viewRowHeader e csum rmaxdims lvl =
    let
        ndim =
            rmaxdims - (rmaxdims - (lvl |> List.length))
    in
    td
        [ e |> elementOf "dimension" (ndim |> String.fromInt)
        , Mouse.onClick (toggleSelectRow lvl)
        ]
        [ text <| Maybe.withDefault csum <| listLast <| lvl ]


viewBodyRowCells :
    Bem.Block
    -> Html Never
    -> Int
    -> List (Display.LabelledValue (Html Never))
    -> Set Level
    -> Set Level
    -> Set ( Level, Level )
    -> List (Html (Msg a))
viewBodyRowCells b defcell rmaxdims vals rlvls clvls dlvls =
    let
        e =
            b.element "cell"

        cmaxdims =
            vals
                |> List.map (.column >> .level >> List.length)
                |> List.maximum
                |> Maybe.withDefault 1
    in
    vals
        |> List.map
            (\v -> viewBodyRowCell e defcell ( rmaxdims, cmaxdims ) v rlvls clvls dlvls)


viewBodyRowCell :
    Bem.Element
    -> Html Never
    -> ( Int, Int )
    -> Display.LabelledValue (Html Never)
    -> Set Level
    -> Set Level
    -> Set ( Level, Level )
    -> Html (Msg a)
viewBodyRowCell e defcell ( rmaxdims, cmaxdims ) val rlvls clvls dlvls =
    let
        rlvl =
            val.row.level

        clvl =
            val.column.level

        isselect =
            (rlvls |> Set.member rlvl)
                || (clvls |> Set.member clvl)
                || (dlvls |> Set.member ( rlvl, clvl ))

        issum =
            ((rlvl |> List.length) < rmaxdims)
                || ((clvl |> List.length) < cmaxdims)

        isgrandsum =
            ((rlvl |> List.length) == 0)
                || ((clvl |> List.length) == 0)
    in
    td
        [ e
            |> elementList
                [ ( "selected", isselect )
                , ( "summary", issum )
                , ( "summary-grand", isgrandsum )
                , ( "missing", maybeIsNothing val.value )
                ]
        , Mouse.onClick (toggleSelectCell ( rlvl, clvl ))
        ]
        [ val.value |> Maybe.withDefault defcell |> Html.map (always NoOp) ]



-- -----------------------------------------------------------------------------
-- MOUSE HANDLERS
-- -----------------------------------------------------------------------------


toggleSelectColumn : Level -> Mouse.Event -> Msg a
toggleSelectColumn lvl { keys } =
    if keys.ctrl then
        ToggleSelectAddColumn lvl

    else
        ToggleSelectOnlyColumn lvl


toggleSelectRow : Level -> Mouse.Event -> Msg a
toggleSelectRow lvl { keys } =
    if keys.ctrl then
        ToggleSelectAddRow lvl

    else
        ToggleSelectOnlyRow lvl


toggleSelectCell : ( Level, Level ) -> Mouse.Event -> Msg a
toggleSelectCell rcpair { keys } =
    if keys.ctrl then
        ToggleSelectAddCell rcpair

    else
        ToggleSelectOnlyCell rcpair



-- -----------------------------------------------------------------------------
-- UTILS
-- -----------------------------------------------------------------------------


listLast : List a -> Maybe a
listLast =
    List.reverse >> List.head


maybeIsNothing : Maybe a -> Bool
maybeIsNothing =
    Maybe.map (always False) >> Maybe.withDefault True


padRight : Int -> List a -> List (Maybe a)
padRight i list =
    let
        n =
            list |> List.length
    in
    if i <= n then
        (list |> List.map Just) ++ List.repeat (n - 1) Nothing

    else
        list |> List.take i |> List.map Just


padRightNonRepeat : Int -> List comparable -> List comparable -> List (Maybe comparable)
padRightNonRepeat i list1 list2 =
    let
        plist1 =
            list1 |> padRight i

        plist2 =
            list2 |> padRight i
    in
    plist2
        |> List.map2
            (\m1 m2 ->
                case ( m1, m2 ) of
                    ( Nothing, Nothing ) ->
                        Nothing

                    ( Nothing, Just x2 ) ->
                        Just x2

                    ( Just x1, Nothing ) ->
                        Nothing

                    ( Just x1, Just x2 ) ->
                        if x1 == x2 then
                            Nothing

                        else
                            Just x2
            )
            plist1
