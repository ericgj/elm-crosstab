module View.Crosstab.Query exposing
    ( Config
    , CssConfig
    , State
    , config
    , init
    , toQuery
    , viewColumnDimensions
    , viewRowDimensions
    )

import Crosstab.Query as Query exposing (CompareAxis, Query, SortDir)
import Html exposing (..)
import Html.Attributes exposing (checked, class, name, type_)
import Html.Attributes.Extra as Attributes
import Html.Bem as Bem exposing (elementList, elementOf, elementOfList)
import Html.Events exposing (onClick, onInput)
import List.Extra as List
import Maybe.Extra as Maybe
import View.Breadcrumbs as Breadcrumbs



-- STATE


type State
    = State StateData


type alias StateData =
    { rowDimensions : Maybe Int
    , columnDimensions : Maybe Int
    , rowSort : SortState
    , columnSort : SortState
    , showRowSort : Bool
    , showColumnSort : Bool
    }


type SortState
    = ByLevels SortDir
    | ByValue Int SortDir


init : State
init =
    State
        { rowDimensions = Nothing
        , columnDimensions = Nothing
        , rowSort = ByLevels Query.Asc
        , columnSort = ByLevels Query.Asc
        , showRowSort = False
        , showColumnSort = False
        }


rowDimensions : State -> Maybe Int
rowDimensions (State st) =
    st.rowDimensions


columnDimensions : State -> Maybe Int
columnDimensions (State st) =
    st.columnDimensions


rowSort : State -> SortState
rowSort (State st) =
    st.rowSort


columnSort : State -> SortState
columnSort (State st) =
    st.columnSort


showRowSort : State -> Bool
showRowSort (State st) =
    st.showRowSort


showColumnSort : State -> Bool
showColumnSort (State st) =
    st.showColumnSort



--------------------------------------------------------------------------------
-- STATE -> QUERY
--------------------------------------------------------------------------------


toQuery : List (a -> comparable) -> State -> Query a
toQuery vsorts st =
    Query.init
        { rowDimensions = rowDimensions st
        , columnDimensions = columnDimensions st
        , sortRows = toRowCompareAxis vsorts st
        , sortColumns = toColumnCompareAxis vsorts st
        }


toRowCompareAxis : List (a -> comparable) -> State -> CompareAxis a
toRowCompareAxis vsorts st =
    toCompareAxisHelp .rowSort vsorts st |> Query.withSummaryAtEnd


toColumnCompareAxis : List (a -> comparable) -> State -> CompareAxis a
toColumnCompareAxis vsorts st =
    toCompareAxisHelp .columnSort vsorts st |> Query.withSummaryAtEnd


toCompareAxisHelp : (StateData -> SortState) -> List (a -> comparable) -> State -> CompareAxis a
toCompareAxisHelp sortst vsorts (State st) =
    case sortst st of
        ByLevels dir ->
            Query.sortByLevels dir

        ByValue i dir ->
            let
                mvsort =
                    if i > List.length vsorts then
                        List.head vsorts

                    else
                        List.getAt i vsorts
            in
            mvsort
                |> Maybe.unwrap
                    (Query.sortByLevels dir)
                    (\vsort -> Query.sortByValueAs vsort dir)



--------------------------------------------------------------------------------
-- CONFIG
--------------------------------------------------------------------------------


type Config a comparable msg
    = Config (ConfigData a comparable msg)


type alias ConfigData a comparable msg =
    { msg : State -> msg
    , summaryLabel : String
    , valueSorts : List ( String, a -> comparable )
    , css : CssConfig
    }


type alias CssConfig =
    { block : String
    , iconSeparator : Maybe String
    , iconSortAsc : Maybe String
    , iconSortDesc : Maybe String
    , iconShowSort : Maybe String
    , iconHideSort : Maybe String
    }


config : ConfigData a comparable msg -> Config a comparable msg
config =
    Config


newState : Config a comparable msg -> (State -> msg)
newState (Config c) =
    c.msg


summaryLabel : Config a comparable msg -> String
summaryLabel (Config c) =
    c.summaryLabel


valueSorts : Config a comparable msg -> List ( String, a -> comparable )
valueSorts (Config c) =
    c.valueSorts


cssConfig : Config a comparable msg -> CssConfig
cssConfig (Config c) =
    c.css



-- GETTERS


sortIcon : CssConfig -> SortDir -> Maybe String
sortIcon css dir =
    case dir of
        Query.Asc ->
            css.iconSortAsc

        Query.Desc ->
            css.iconSortDesc



--------------------------------------------------------------------------------
-- UPDATE
--------------------------------------------------------------------------------


type Msg
    = SetRowDimensions (Maybe Int)
    | SetColumnDimensions (Maybe Int)
    | SetRowSortByLevels SortDir
    | SetRowSortByValue Int SortDir
    | SetColumnSortByLevels SortDir
    | SetColumnSortByValue Int SortDir
    | ToggleShowRowSort
    | ToggleShowColumnSort


update : Msg -> State -> State
update msg (State st) =
    case msg of
        SetRowDimensions mi ->
            State { st | rowDimensions = mi }

        SetColumnDimensions mi ->
            State { st | columnDimensions = mi }

        SetRowSortByLevels dir ->
            State { st | rowSort = ByLevels dir }

        SetRowSortByValue i dir ->
            State { st | rowSort = ByValue i dir }

        SetColumnSortByLevels dir ->
            State { st | columnSort = ByLevels dir }

        SetColumnSortByValue i dir ->
            State { st | columnSort = ByValue i dir }

        ToggleShowRowSort ->
            State { st | showRowSort = not st.showRowSort }

        ToggleShowColumnSort ->
            State { st | showColumnSort = not st.showColumnSort }



--------------------------------------------------------------------------------
-- VIEWS
--------------------------------------------------------------------------------


viewRowDimensions : Config a comparable msg -> List String -> State -> Html msg
viewRowDimensions c dims st =
    viewDimensions
        "row"
        rowDimensions
        SetRowDimensions
        showRowSort
        ToggleShowRowSort
        rowSort
        SetRowSortByLevels
        SetRowSortByValue
        c
        dims
        st


viewColumnDimensions : Config a comparable msg -> List String -> State -> Html msg
viewColumnDimensions c dims st =
    viewDimensions
        "column"
        columnDimensions
        SetColumnDimensions
        showColumnSort
        ToggleShowColumnSort
        columnSort
        SetColumnSortByLevels
        SetColumnSortByValue
        c
        dims
        st


viewDimensions :
    String
    -> (State -> Maybe Int)
    -> (Maybe Int -> Msg)
    -> (State -> Bool)
    -> Msg
    -> (State -> SortState)
    -> (SortDir -> Msg)
    -> (Int -> SortDir -> Msg)
    -> Config a comparable msg
    -> List String
    -> State
    -> Html msg
viewDimensions etype getDims setDims getShow toggleShow getSort sortLvls sortVals c dims st =
    viewDimensionsInner etype getDims setDims getShow toggleShow getSort sortLvls sortVals c dims st
        |> Html.map (\msg -> update msg st |> newState c)


viewDimensionsInner :
    String
    -> (State -> Maybe Int)
    -> (Maybe Int -> Msg)
    -> (State -> Bool)
    -> Msg
    -> (State -> SortState)
    -> (SortDir -> Msg)
    -> (Int -> SortDir -> Msg)
    -> Config a comparable msg
    -> List String
    -> State
    -> Html Msg
viewDimensionsInner etype getDims setDims getShow toggleShow getSort sortLvls sortVals c dims st =
    let
        b =
            Bem.init css.block

        e =
            b.element "dimensions"

        es =
            b.element "dimensions-select"

        sumlbl =
            summaryLabel c

        css =
            cssConfig c

        cur =
            st
                |> getDims
                |> Maybe.withDefault (List.length dims)

        bconfig =
            Breadcrumbs.config
                { closedLabel = sumlbl
                , toMsg = unlessMaxDimension dims >> setDims
                , css =
                    { block = b.name
                    , iconSeparator = css.iconSeparator
                    }
                }

        isshow =
            getShow st
    in
    div
        [ e |> elementOf "type" etype
        ]
        (div
            [ es |> elementOf "type" etype ]
            [ Breadcrumbs.view bconfig cur dims
            , viewShowSort b etype css toggleShow isshow
            ]
            :: (if isshow then
                    [ viewSort b etype css getSort sortLvls sortVals (valueSorts c) st ]

                else
                    []
               )
        )


unlessMaxDimension : List String -> Int -> Maybe Int
unlessMaxDimension dims i =
    if i >= List.length dims then
        Nothing

    else
        Just i


viewShowSort :
    Bem.Block
    -> String
    -> CssConfig
    -> Msg
    -> Bool
    -> Html Msg
viewShowSort b etype css msg cur =
    let
        e =
            b.element "sort-toggle"

        micon =
            if cur then
                css.iconShowSort

            else
                css.iconHideSort
    in
    span
        [ e |> elementOf "type" etype
        , e |> elementList [ ( "show", cur ), ( "hide", not cur ) ]
        , micon |> Maybe.unwrap Attributes.empty class
        , onClick msg
        ]
        []


viewSort :
    Bem.Block
    -> String
    -> CssConfig
    -> (State -> SortState)
    -> (SortDir -> Msg)
    -> (Int -> SortDir -> Msg)
    -> List ( String, a -> comparable )
    -> State
    -> Html Msg
viewSort b etype css getSort sortLvls sortVals vsorts st =
    let
        e =
            b.element "sort"
    in
    div
        [ e |> elementOf "type" etype ]
        (viewSortByLevels b etype css getSort sortLvls st
            :: (vsorts
                    |> List.indexedMap
                        (\i ( v, _ ) -> viewSortByValue b etype css getSort sortVals i v st)
               )
        )


viewSortByLevels :
    Bem.Block
    -> String
    -> CssConfig
    -> (State -> SortState)
    -> (SortDir -> Msg)
    -> State
    -> Html Msg
viewSortByLevels b etype css getSort sortLvls st =
    let
        e =
            b.element "sort-choice"

        ( iscur, dir ) =
            case getSort st of
                ByLevels d ->
                    ( True, d )

                _ ->
                    ( False, Query.Asc )
    in
    div
        [ e |> elementOfList [ ( "type", etype ), ( "by", "levels" ) ]
        , e |> elementList [ ( "selected", iscur ) ]
        ]
        [ label
            []
            [ input
                [ type_ "radio"
                , name (Bem.elementNameOf e "type" etype)
                , checked iscur
                , onInput (always (sortLvls dir))
                ]
                []
            , text "By Levels"
            ]
        , viewSortDir b etype "levels" css sortLvls dir
        ]


viewSortByValue :
    Bem.Block
    -> String
    -> CssConfig
    -> (State -> SortState)
    -> (Int -> SortDir -> Msg)
    -> Int
    -> String
    -> State
    -> Html Msg
viewSortByValue b etype css getSort sortVals i vlbl st =
    let
        e =
            b.element "sort-choice"

        ( mcur, dir ) =
            case getSort st of
                ByValue i_ d ->
                    ( Just i_, d )

                _ ->
                    ( Nothing, Query.Asc )

        iscur =
            mcur |> Maybe.unwrap False ((==) i)
    in
    div
        [ e |> elementOfList [ ( "type", etype ), ( "by", "value" ) ]
        , e |> elementList [ ( "selected", iscur ) ]
        ]
        [ label
            []
            [ input
                [ type_ "radio"
                , name (Bem.elementNameOf e "type" etype)
                , checked iscur
                , onInput (always (sortVals i dir))
                ]
                []
            , text ("By " ++ vlbl)
            ]
        , viewSortDir b etype "value" css (sortVals i) dir
        ]


viewSortDir :
    Bem.Block
    -> String
    -> String
    -> CssConfig
    -> (SortDir -> Msg)
    -> SortDir
    -> Html Msg
viewSortDir b etype bytype css sortLvls dir =
    let
        e =
            b.element "sort-choice-dir"

        newdir =
            Query.reverseSortDir dir

        micon =
            sortIcon css dir
    in
    div
        [ e |> elementOfList [ ( "type", etype ), ( "by", bytype ) ]
        , micon |> Maybe.unwrap Attributes.empty class
        , onClick (sortLvls newdir)
        ]
        []
