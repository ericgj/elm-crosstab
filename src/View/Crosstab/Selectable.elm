module View.Crosstab.Selectable exposing
    ( Config
    , CssConfig
    , Msg(..)
    , State
    , crossFilter
    , defaultColumnSummary
    , defaultCssConfig
    , defaultDimensionSummary
    , defaultEmptyCell
    , defaultRowSummary
    , emptySelected
    , floatValueConfig
    , init
    , intValueConfig
    , noneSelected
    , singleValueConfig
    , update
    , valueConfig
    , view
    , withColumnDimensionSummaryLabel
    , withColumnSummaryLabel
    , withCssBlock
    , withDimensionSeparatorIcon
    , withDimensionSummaryLabel
    , withEmptyCell
    , withRowDimensionSummaryLabel
    , withRowSummaryLabel
    , withSortColumnDimensionIcons
    , withSortRowDimensionIcons
    )

import Crosstab exposing (Crosstab)
import Crosstab.Display as Display exposing (Table)
import Crosstab.Levels exposing (Levels, LevelsPair)
import Crosstab.Query as Query exposing (CompareAxis, Query, SortDir)
import Crosstab.Spec as Spec exposing (Spec)
import Html exposing (..)
import Html.Attributes exposing (class, colspan, style)
import Html.Bem as Bem exposing (blockList, element, elementList, elementOf, elementOfList)
import Html.Events exposing (onClick)
import Html.Events.Extra.Mouse as Mouse
import Json.Encode
import List.Extra as List
import Maybe.Extra as Maybe
import Set exposing (Set)
import View.Crosstab.Query exposing (viewColumnDimensions, viewRowDimensions)



-- -----------------------------------------------------------------------------
-- STATE
-- -----------------------------------------------------------------------------


type State
    = State StateData


type alias StateData =
    { query : View.Crosstab.Query.State
    , selected : SelectedState
    }


type SelectedState
    = SelectedRows (Set Levels)
    | SelectedColumns (Set Levels)
    | SelectedCells (Set LevelsPair)


init : State
init =
    State
        { query = View.Crosstab.Query.init
        , selected = emptySelected
        }


emptySelected : SelectedState
emptySelected =
    SelectedCells Set.empty



---------------------------------------
-- STATE GETTERS
---------------------------------------


query : State -> View.Crosstab.Query.State
query (State st) =
    st.query


selected : State -> SelectedState
selected (State st) =
    st.selected


{-| True if no rows, columns or cells are selected
-}
noneSelected : State -> Bool
noneSelected (State st) =
    case st.selected of
        SelectedRows s ->
            Set.isEmpty s

        SelectedColumns s ->
            Set.isEmpty s

        SelectedCells s ->
            Set.isEmpty s



---------------------------------------
-- SELECTION QUERIES
---------------------------------------


isRowSelected :
    List String
    -> State
    -> Bool
isRowSelected rl (State st) =
    case st.selected of
        SelectedRows sel ->
            sel |> Set.member rl

        _ ->
            False


isAncestorRowSelected :
    List String
    -> State
    -> Bool
isAncestorRowSelected rl (State st) =
    case st.selected of
        SelectedRows sel ->
            sel |> anyInSet (ancestorInits rl)

        _ ->
            False


isColumnSelected :
    List String
    -> State
    -> Bool
isColumnSelected cl (State st) =
    case st.selected of
        SelectedColumns sel ->
            sel |> Set.member cl

        _ ->
            False


isAncestorColumnSelected :
    List String
    -> State
    -> Bool
isAncestorColumnSelected cl (State st) =
    case st.selected of
        SelectedColumns sel ->
            sel |> anyInSet (ancestorInits cl)

        _ ->
            False


isSelected :
    List String
    -> List String
    -> State
    -> Bool
isSelected rl cl (State st) =
    case st.selected of
        SelectedRows sel ->
            sel |> Set.member rl

        SelectedColumns sel ->
            sel |> Set.member cl

        SelectedCells sel ->
            sel |> Set.member ( rl, cl )


isAncestorSelected :
    List String
    -> List String
    -> State
    -> Bool
isAncestorSelected rl cl (State st) =
    case st.selected of
        SelectedRows sel ->
            sel |> anyInSet (ancestorInits rl)

        SelectedColumns sel ->
            sel |> anyInSet (ancestorInits cl)

        SelectedCells sel ->
            let
                s1 =
                    List.lift2 Tuple.pair (ancestorInits rl) (List.inits cl) |> Set.fromList

                s2 =
                    List.lift2 Tuple.pair (List.inits rl) (ancestorInits cl) |> Set.fromList
            in
            Set.union s1 s2
                |> Set.intersect sel
                |> Set.isEmpty
                |> not



--------------------------------------------------------------------------------
-- CROSSFILTERING
--------------------------------------------------------------------------------


crossFilter : Spec a b c -> State -> List a -> List a
crossFilter spec st list =
    let
        r =
            spec |> Spec.rowLevels

        c =
            spec |> Spec.columnLevels
    in
    list |> filterSelected r c st


filterSelected :
    (a -> List String)
    -> (a -> List String)
    -> State
    -> List a
    -> List a
filterSelected r c st list =
    list
        |> List.filter (filterSelectedHelp r c st)


filterSelectedHelp :
    (a -> List String)
    -> (a -> List String)
    -> State
    -> a
    -> Bool
filterSelectedHelp r c st a =
    let
        rl =
            r a

        cl =
            c a
    in
    isSelected rl cl st || isAncestorSelected rl cl st


anyInSet : List comparable -> Set comparable -> Bool
anyInSet list set =
    list
        |> Set.fromList
        |> Set.intersect set
        |> Set.isEmpty
        |> not


ancestorInits : List a -> List (List a)
ancestorInits list =
    case list of
        [] ->
            []

        _ ->
            list |> List.take (List.length list - 1) |> List.inits



-- -----------------------------------------------------------------------------
-- CONFIG
-- -----------------------------------------------------------------------------


type Config a comparable
    = Config
        { valueColumns : List (ValueColumn a comparable)
        , emptyCell : Html Never
        , columnSummary : String
        , rowSummary : String
        , columnDimensionSummary : String
        , rowDimensionSummary : String
        , css : CssConfig
        }


type alias ValueColumn a comparable =
    { label : String
    , render : a -> Html Never
    , sort : a -> comparable
    }


type alias CssConfig =
    { block : String
    , iconDimensionSeparator : Maybe String
    , iconSortRowDimensionsAsc : Maybe String
    , iconSortRowDimensionsDesc : Maybe String
    , iconSortColumnDimensionsAsc : Maybe String
    , iconSortColumnDimensionsDesc : Maybe String
    , iconShowSort : Maybe String
    , iconHideSort : Maybe String
    }


intValueConfig : String -> Config Int Int
intValueConfig s =
    valueConfig
        [ { label = s
          , render = String.fromInt >> text
          , sort = identity
          }
        ]


floatValueConfig : String -> Int -> Config Float Float
floatValueConfig s dec =
    valueConfig
        [ { label = s
          , render = roundToDecimal dec >> text
          , sort = identity
          }
        ]


singleValueConfig : ValueColumn a comparable -> Config a comparable
singleValueConfig vcol =
    valueConfig [ vcol ]


valueConfig : List (ValueColumn a comparable) -> Config a comparable
valueConfig vcols =
    Config
        { valueColumns = vcols
        , emptyCell = defaultEmptyCell
        , columnSummary = defaultColumnSummary
        , rowSummary = defaultRowSummary
        , columnDimensionSummary = defaultDimensionSummary
        , rowDimensionSummary = defaultDimensionSummary
        , css = defaultCssConfig
        }


roundToDecimal : Int -> Float -> String
roundToDecimal i f =
    if i == 0 then
        round f |> String.fromInt

    else
        let
            fac =
                toFloat (10 ^ i)

            x =
                floor f

            y =
                (f - toFloat x) * fac |> round
        in
        String.fromInt x ++ "." ++ String.fromInt y


defaultEmptyCell : Html Never
defaultEmptyCell =
    text ""


defaultColumnSummary : String
defaultColumnSummary =
    "Summary"


defaultRowSummary : String
defaultRowSummary =
    "Summary"


defaultDimensionSummary : String
defaultDimensionSummary =
    "*"


defaultCssConfig : CssConfig
defaultCssConfig =
    { block = "crosstab"
    , iconDimensionSeparator = Just "fa-solid fa-chevron-right"
    , iconSortRowDimensionsAsc = Just "fa-solid fa-arrow-down"
    , iconSortRowDimensionsDesc = Just "fa-solid fa-arrow-up"
    , iconSortColumnDimensionsAsc = Just "fa-solid fa-arrow-right"
    , iconSortColumnDimensionsDesc = Just "fa-solid fa-arrow-left"
    , iconShowSort = Just "fa-solid fa-arrow-down-short-wide"
    , iconHideSort = Just "fa-solid fa-arrow-down-short-wide"
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


withRowDimensionSummaryLabel : String -> Config a comparable -> Config a comparable
withRowDimensionSummaryLabel s (Config c) =
    Config { c | rowDimensionSummary = s }


withColumnDimensionSummaryLabel : String -> Config a comparable -> Config a comparable
withColumnDimensionSummaryLabel s (Config c) =
    Config { c | columnDimensionSummary = s }


withDimensionSummaryLabel : String -> Config a comparable -> Config a comparable
withDimensionSummaryLabel s (Config c) =
    Config { c | rowDimensionSummary = s, columnDimensionSummary = s }


withCssBlock : String -> Config a comparable -> Config a comparable
withCssBlock s (Config c) =
    let
        css =
            c.css
    in
    Config c |> withCss { css | block = s }


withDimensionSeparatorIcon : String -> Config a comparable -> Config a comparable
withDimensionSeparatorIcon s (Config c) =
    let
        css =
            c.css
    in
    Config c
        |> withCss
            { css
                | iconDimensionSeparator = Just s
            }


withSortRowDimensionIcons : String -> String -> Config a comparable -> Config a comparable
withSortRowDimensionIcons asc desc (Config c) =
    let
        css =
            c.css
    in
    Config c
        |> withCss
            { css
                | iconSortRowDimensionsAsc = Just asc
                , iconSortRowDimensionsDesc = Just desc
            }


withSortColumnDimensionIcons : String -> String -> Config a comparable -> Config a comparable
withSortColumnDimensionIcons asc desc (Config c) =
    let
        css =
            c.css
    in
    Config c
        |> withCss
            { css
                | iconSortColumnDimensionsAsc = Just asc
                , iconSortColumnDimensionsDesc = Just desc
            }


withCss : CssConfig -> Config a comparable -> Config a comparable
withCss css (Config c) =
    Config { c | css = css }



-- CONFIG GETTERS
-- Note these are not exposed, only for convenience within view functions


cssConfig : Config a comparable -> CssConfig
cssConfig (Config c) =
    c.css


valueColumns : Config a comparable -> List (ValueColumn a comparable)
valueColumns (Config c) =
    c.valueColumns


valueColumnLabelsAndRenders : Config a comparable -> List ( String, a -> Html Never )
valueColumnLabelsAndRenders =
    valueColumns >> List.map (\v -> ( v.label, v.render ))


valueColumnLabelsAndSorts : Config a comparable -> List ( String, a -> comparable )
valueColumnLabelsAndSorts =
    valueColumns >> List.map (\v -> ( v.label, v.sort ))


valueColumnSorts : Config a comparable -> List (a -> comparable)
valueColumnSorts =
    valueColumns >> List.map .sort


rowSummary : Config a comparable -> String
rowSummary (Config c) =
    c.rowSummary


rowDimensionSummary : Config a comparable -> String
rowDimensionSummary (Config c) =
    c.rowDimensionSummary


columnDimensionSummary : Config a comparable -> String
columnDimensionSummary (Config c) =
    c.columnDimensionSummary



-- -----------------------------------------------------------------------------
-- UPDATE
-- -----------------------------------------------------------------------------


type Msg a
    = ToggleSelectOnlyRow Levels
    | ToggleSelectOnlyColumn Levels
    | ToggleSelectOnlyCell LevelsPair
    | ToggleSelectAddRow Levels
    | ToggleSelectAddColumn Levels
    | ToggleSelectAddCell LevelsPair
    | NewQuery View.Crosstab.Query.State
    | NoOp


update : Msg a -> State -> State
update msg state =
    case ( msg, state ) of
        ( NoOp, _ ) ->
            state

        ( NewQuery q, State st ) ->
            State { st | query = q }

        ( _, State st ) ->
            State { st | selected = updateSelectedState msg st.selected }


updateSelectedState : Msg a -> SelectedState -> SelectedState
updateSelectedState msg state =
    case ( msg, state ) of
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

        _ ->
            state


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


view : Config a comparable -> Crosstab a -> State -> Html (Msg a)
view c tab st =
    let
        vcols =
            c |> valueColumnSorts

        q =
            query st |> View.Crosstab.Query.toQuery vcols
    in
    tab
        |> Crosstab.query q
        |> Maybe.unwrap (text "TODO") (\dtab -> viewTable c dtab st)


viewTable : Config a comparable -> Table a -> State -> Html (Msg a)
viewTable c tab st =
    let
        b =
            Bem.init <| .block <| cssConfig c

        ltab =
            tab |> Display.labelledTable (valueColumnLabelsAndRenders c)

        rdims =
            Display.tableRowDimensions tab

        cdims =
            Display.tableColumnDimensions tab
    in
    table [ b |> blockList [ ( "selected", not <| noneSelected st ) ] ]
        [ viewHeader b c rdims cdims ltab.columns st
        , viewBody b c ltab.rows st
        ]



-- -----------------------------------------------------------------------------
-- VIEW HEADER
-- -----------------------------------------------------------------------------


viewHeader :
    Bem.Block
    -> Config a comparable
    -> List String
    -> List String
    -> List Display.ColumnLabel
    -> State
    -> Html (Msg a)
viewHeader b c rdims cdims cols st =
    let
        css =
            cssConfig c

        q =
            query st

        rdimcfg =
            View.Crosstab.Query.config
                { msg = NewQuery
                , summaryLabel = rowDimensionSummary c
                , valueSorts = valueColumnLabelsAndSorts c
                , css =
                    { block = b.name
                    , iconSeparator = css.iconDimensionSeparator
                    , iconSortAsc = css.iconSortRowDimensionsAsc
                    , iconSortDesc = css.iconSortRowDimensionsDesc
                    , iconShowSort = css.iconShowSort
                    , iconHideSort = css.iconHideSort
                    }
                }

        cdimcfg =
            View.Crosstab.Query.config
                { msg = NewQuery
                , summaryLabel = columnDimensionSummary c
                , valueSorts = valueColumnLabelsAndSorts c
                , css =
                    { block = b.name
                    , iconSeparator = css.iconDimensionSeparator
                    , iconSortAsc = css.iconSortColumnDimensionsAsc
                    , iconSortDesc = css.iconSortColumnDimensionsDesc
                    , iconShowSort = css.iconShowSort
                    , iconHideSort = css.iconHideSort
                    }
                }

        cdimhdr =
            th [ colspan <| List.length cols ]
                [ viewColumnDimensions cdimcfg cdims q ]

        rdimhdr =
            th [ style "white-space" "nowrap" ]
                [ viewRowDimensions rdimcfg rdims q ]

        colhdrs =
            viewHeaderRows b rdimhdr (rowSummary c) cols st
    in
    thead []
        (tr []
            [ th [] []
            , cdimhdr
            ]
            :: colhdrs
        )


viewHeaderRows :
    Bem.Block
    -> Html (Msg a)
    -> String
    -> List Display.ColumnLabel
    -> State
    -> List (Html (Msg a))
viewHeaderRows b rdimHdr rsum cols st =
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
            (updateHeaderValueAndColRows b maxdims rsum st)
            ( Nothing, [], List.repeat maxdims [] )
        |> (\( _, vh, chs ) ->
                (chs |> List.map (viewHeaderRow e "column" (th [] [])))
                    ++ [ vh |> viewHeaderRow e "value" rdimHdr ]
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
    -> State
    -> Display.ColumnLabel
    -> ( Maybe Display.ColumnLabel, List (Html (Msg a)), List (List (Html (Msg a))) )
    -> ( Maybe Display.ColumnLabel, List (Html (Msg a)), List (List (Html (Msg a))) )
updateHeaderValueAndColRows b maxdims rsum st next ( mprev, vrow, crows ) =
    let
        e =
            b.element "header"

        mprevl =
            mprev |> Maybe.map .level

        nextl =
            next.level

        issel =
            isColumnSelected nextl st

        isselind =
            isAncestorColumnSelected nextl st
    in
    ( Just <| next
    , vrow
        ++ [ viewHeaderCell
                e
                "value"
                maxdims
                issel
                isselind
                nextl
                (Just next.value)
           ]
    , nextl
        |> headerLabelOrSummaryNonRepeat rsum maxdims mprevl
        |> List.map2
            (\crow mlabel ->
                updateHeaderColRow e maxdims issel isselind next.level mlabel crow
            )
            crows
    )


updateHeaderColRow :
    Bem.Element
    -> Int
    -> Bool
    -> Bool
    -> Levels
    -> Maybe String
    -> List (Html (Msg a))
    -> List (Html (Msg a))
updateHeaderColRow e maxdims issel isselind lvl mlabel crow =
    crow ++ [ viewHeaderCell e "column" maxdims issel isselind lvl mlabel ]


viewHeaderCell :
    Bem.Element
    -> String
    -> Int
    -> Bool
    -> Bool
    -> Levels
    -> Maybe String
    -> Html (Msg a)
viewHeaderCell e etype maxdims issel isselind lvl mlabel =
    let
        n =
            lvl |> List.length
    in
    th
        [ e
            |> elementList
                [ ( "selected", issel )
                , ( "selected-indirect", isselind && not issel )
                , ( "summary", n < maxdims )
                , ( "summary-grand", n == 0 )
                , ( "summary-column-grand", n == 0 )
                ]
        , e
            |> elementOfList
                [ ( "type", etype )
                , ( "dimension", n |> String.fromInt )
                ]
        , Mouse.onClick (toggleSelectColumn lvl)
        ]
        [ text <| Maybe.withDefault "" <| mlabel ]


headerLabelOrSummaryNonRepeat :
    String
    -> Int
    -> Maybe Levels
    -> Levels
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


labelOrSummary : String -> Levels -> Levels
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
    -> Levels
    -> List (Display.LabelledValue (Html Never))
    -> State
    -> Html (Msg a)
viewBodyRow b (Config c) rmaxdims lvl vals st =
    let
        er =
            b.element "row"

        eh =
            b.element "header"

        issel =
            isRowSelected lvl st

        isselind =
            isAncestorRowSelected lvl st

        n =
            lvl |> List.length
    in
    tr
        [ er
            |> elementList
                [ ( "selected", issel )
                , ( "selected-indirect", isselind && not issel )
                , ( "summary", n < rmaxdims )
                , ( "summary-grand", n == 0 )
                , ( "summary-row-grand", n == 0 )
                ]
        ]
        (viewRowHeader eh c.columnSummary rmaxdims lvl
            :: viewBodyRowCells b c.emptyCell rmaxdims issel isselind vals st
        )


viewRowHeader : Bem.Element -> String -> Int -> Levels -> Html (Msg a)
viewRowHeader e csum rmaxdims lvl =
    let
        ndim =
            rmaxdims - (rmaxdims - (lvl |> List.length))
    in
    td
        [ e
            |> elementOfList
                [ ( "type", "row" )
                , ( "dimension", ndim |> String.fromInt )
                ]
        , Mouse.onClick (toggleSelectRow lvl)
        ]
        [ text <| Maybe.withDefault csum <| List.last <| lvl ]


viewBodyRowCells :
    Bem.Block
    -> Html Never
    -> Int
    -> Bool
    -> Bool
    -> List (Display.LabelledValue (Html Never))
    -> State
    -> List (Html (Msg a))
viewBodyRowCells b defcell rmaxdims rsel rselind vals st =
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
            (\v -> viewBodyRowCell e defcell ( rmaxdims, cmaxdims ) rsel rselind v st)


viewBodyRowCell :
    Bem.Element
    -> Html Never
    -> ( Int, Int )
    -> Bool
    -> Bool
    -> Display.LabelledValue (Html Never)
    -> State
    -> Html (Msg a)
viewBodyRowCell e defcell ( rmaxdims, cmaxdims ) rsel rselind val st =
    let
        rlvl =
            val.row.level

        clvl =
            val.column.level

        rn =
            rlvl |> List.length

        cn =
            clvl |> List.length

        isselect =
            rsel
                || isColumnSelected clvl st
                || isSelected rlvl clvl st

        isselectind =
            rselind
                || isAncestorColumnSelected clvl st
                || isSelected [] clvl st
                || isAncestorSelected rlvl clvl st

        issum =
            (rn < rmaxdims) || (cn < cmaxdims)
    in
    td
        [ e
            |> elementList
                [ ( "selected", isselect )
                , ( "selected-indirect", isselectind && not isselect )
                , ( "summary", issum )
                , ( "summary-grand", rn == 0 || cn == 0 )
                , ( "summary-row-grand", rn == 0 )
                , ( "summary-column-grand", cn == 0 )
                , ( "missing", Maybe.isNothing val.value )
                ]
        , Mouse.onClick (toggleSelectCell ( rlvl, clvl ))
        ]
        [ val.value |> Maybe.withDefault defcell |> Html.map (always NoOp) ]



-- -----------------------------------------------------------------------------
-- MOUSE HANDLERS
-- -----------------------------------------------------------------------------


toggleSelectColumn : Levels -> Mouse.Event -> Msg a
toggleSelectColumn lvl { keys } =
    if keys.ctrl then
        ToggleSelectAddColumn lvl

    else
        ToggleSelectOnlyColumn lvl


toggleSelectRow : Levels -> Mouse.Event -> Msg a
toggleSelectRow lvl { keys } =
    if keys.ctrl then
        ToggleSelectAddRow lvl

    else
        ToggleSelectOnlyRow lvl


toggleSelectCell : LevelsPair -> Mouse.Event -> Msg a
toggleSelectCell rcpair { keys } =
    if keys.ctrl then
        ToggleSelectAddCell rcpair

    else
        ToggleSelectOnlyCell rcpair



-- -----------------------------------------------------------------------------
-- UTILS
-- -----------------------------------------------------------------------------


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

                    ( Just _, Nothing ) ->
                        Nothing

                    ( Just x1, Just x2 ) ->
                        if x1 == x2 then
                            Nothing

                        else
                            Just x2
            )
            plist1
