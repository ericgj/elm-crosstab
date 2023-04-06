module Crosstab exposing
    ( Crosstab(..)
    , Query(..)
    , SortDir(..)
    , andCalc
    , calc2
    , chiSq
    , chiSqMaybe
    , columnDimensionLabels
    , columnDimensionSize
    , columnPercent
    , columnPercentMaybe
    , compareToColumn
    , compareToColumnMaybe
    , compareToRow
    , compareToRowColumnTable
    , compareToRowColumnTableMaybe
    , compareToRowMaybe
    , compareToTable
    , compareToTableMaybe
    , currentColumn
    , currentColumnMaybe
    , currentRow
    , currentRowMaybe
    , currentTable
    , currentTableMaybe
    , currentValue
    , dimensionSize
    , init
    , map
    , mean
    , merge
    , query
    , rowDimensionLabels
    , rowDimensionSize
    , rowPercent
    , rowPercentMaybe
    , sort2
    , sortByLevels
    , sortByValue
    , sortByValueMaybe
    , sortingBy
    , stdDev
    , tablePercent
    , tablePercentMaybe
    , tabulate
    , valueLabel
    , withSummaryAtEnd
    )

import Crosstab.Accum as Accum exposing (Accum, ParametricData)
import Crosstab.Display as Display
import Crosstab.Spec as Spec exposing (Spec)
import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)
import Dict exposing (Dict)
import Dict.Extra as Dict
import List.Extra as List
import OrderedSet


type Crosstab a
    = Crosstab (CrosstabData a)


type alias CrosstabData a =
    { rowDimLabels : List String
    , columnDimLabels : List String
    , valueLabel : ValueLabel
    , table : Table a
    }


type alias Table a =
    Dict LevelsPair a


type alias LevelsPair =
    ( Levels, Levels )


type alias Levels =
    List String



-- GETTERS


rowDimensionLabels : Crosstab a -> List String
rowDimensionLabels =
    getData >> .rowDimLabels


columnDimensionLabels : Crosstab a -> List String
columnDimensionLabels =
    getData >> .columnDimLabels


valueLabel : Crosstab a -> ValueLabel
valueLabel =
    getData >> .valueLabel


rowDimensionSize : Crosstab a -> Int
rowDimensionSize =
    dimensionSize >> Tuple.first


columnDimensionSize : Crosstab a -> Int
columnDimensionSize =
    dimensionSize >> Tuple.second


dimensionSize : Crosstab a -> ( Int, Int )
dimensionSize xtab =
    let
        d =
            getData xtab
    in
    ( d.rowDimLabels |> List.length
    , d.columnDimLabels |> List.length
    )


getData : Crosstab a -> CrosstabData a
getData (Crosstab c) =
    c



-- CONSTRUCTING


init : Spec a b c -> Crosstab c
init spec =
    Crosstab
        { rowDimLabels = Spec.rowLabels spec
        , columnDimLabels = Spec.columnLabels spec
        , valueLabel = Spec.valueLabel spec
        , table = Dict.empty
        }


tabulate : Spec a b c -> List a -> Crosstab c
tabulate spec =
    List.foldr
        (\a cur -> updateCrosstabTable spec a cur)
        (init spec)


updateCrosstabTable : Spec a b c -> a -> Crosstab c -> Crosstab c
updateCrosstabTable spec a (Crosstab c) =
    let
        rows =
            Spec.rowLevels spec a

        cols =
            Spec.columnLevels spec a

        ( fn, initVal ) =
            Spec.value spec a

        combos =
            List.lift2
                Tuple.pair
                (rows |> List.combinationsFrom 0)
                (cols |> List.combinationsFrom 0)
    in
    Crosstab
        { c | table = updateTable combos fn initVal c.table }


updateTable : List LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateTable combos fn initVal tab =
    List.foldr
        (\levelsPair cur -> updateCell levelsPair fn initVal cur)
        tab
        combos


updateCell : LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateCell levelsPair fn initVal tab =
    case Dict.get levelsPair tab of
        Just c ->
            tab |> Dict.insert levelsPair (fn c)

        Nothing ->
            tab |> Dict.insert levelsPair (fn initVal)



-- MAPPING


type alias Mapping a b =
    LevelsPair -> a -> b


{-| Map Crosstab values, with a given label for the mapping.
-}
map : String -> Mapping a b -> Crosstab a -> Crosstab b
map label fn (Crosstab c) =
    Crosstab
        { rowDimLabels = c.rowDimLabels
        , columnDimLabels = c.columnDimLabels
        , valueLabel = c.valueLabel |> ValueLabel.addMap label
        , table = Dict.map fn c.table
        }


{-| Merge values from a second Crosstab with a first Crosstab, with a given
label for the merge function.

    Note that the dimensions of the first Crosstab will *always* be maintained.
    Any pair of levels found in the second but not the first will be ignored.
    Any pair of levels found in the first but not the second will be dealt with
    by the provided merge function (the Nothing case of Maybe b).

    Typically, you would be merging two Crosstabs built from the same data
    (with different value variables), so the dimensions will be the same.

-}
merge : String -> (LevelsPair -> a -> Maybe b -> c) -> Crosstab a -> Crosstab b -> Crosstab c
merge label fn (Crosstab ca) (Crosstab cb) =
    Crosstab
        { rowDimLabels = ca.rowDimLabels
        , columnDimLabels = ca.columnDimLabels
        , valueLabel = ca.valueLabel |> ValueLabel.addMerge label cb.valueLabel
        , table =
            Dict.merge
                (\k a t -> t |> Dict.insert k (fn k a Nothing))
                (\k a b t -> t |> Dict.insert k (fn k a (Just b)))
                (\k b t -> t)
                ca.table
                cb.table
                Dict.empty
        }



-- MAPPING COMPOSITION


{-| Combine two calculations on a single crosstab into one mapping function

    For example:

        calc2 Tuple.pair (rowPercent crosstab) (columnPercent crosstab)

-}
calc2 : (b -> c -> d) -> Mapping a b -> Mapping b c -> Mapping a d
calc2 fn map1 map2 =
    \pair a -> map1 pair a |> (\b -> map2 pair b |> (\c -> fn b c))


{-| Combine any number of calculations on a single crosstab into one mapping
function.

    For example:

        type alias MeanPcts =
            { mean: Maybe Float
            , rowPct: Maybe Float
            , colPct: Maybe Float
            , tabPct: Maybe Float
            }

        let
            calcs =
                MeanPcts
                    |> andCalc currentValueMaybe
                    |> andCalc (rowPercentMaybe crosstab)
                    |> andCalc (columnPercentMaybe crosstab)
                    |> andCalc (tablePercentMaybe crosstab)
        in
        crosstab
            |> Crosstab.map "Mean" Crosstab.mean
            |> Crosstab.map "%" calcs

-}
andCalc : Mapping a b -> Mapping b (b -> c) -> Mapping a c
andCalc =
    calc2 (|>)



-- PREBUILT MAPPINGS


currentValue : Mapping a a
currentValue _ =
    identity


mean : Mapping ParametricData (Maybe Float)
mean _ =
    Accum.mean


stdDev : Mapping ParametricData (Maybe Float)
stdDev _ =
    Accum.stdDev



-- COMPARISON MAPPINGS


currentRow : Crosstab Float -> Mapping Float (Maybe Float)
currentRow crosstab =
    crosstab
        |> compareToRow (\mr _ -> mr)


currentRowMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentRowMaybe crosstab =
    crosstab
        |> compareToRowMaybe (\mr _ -> mr)


currentColumn : Crosstab Float -> Mapping Float (Maybe Float)
currentColumn crosstab =
    crosstab
        |> compareToColumn (\mc _ -> mc)


currentColumnMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentColumnMaybe crosstab =
    crosstab
        |> compareToColumnMaybe (\mc _ -> mc)


currentTable : Crosstab Float -> Mapping Float (Maybe Float)
currentTable crosstab =
    crosstab
        |> compareToTable (\mt _ -> mt)


currentTableMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentTableMaybe crosstab =
    crosstab
        |> compareToTableMaybe (\mt _ -> mt)


rowPercent : Crosstab Float -> Mapping Float (Maybe Float)
rowPercent crosstab =
    crosstab
        |> compareToRow
            (\mr v -> mr |> Maybe.andThen (\r -> percentImp r v))


rowPercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
rowPercentMaybe crosstab =
    crosstab
        |> compareToRowMaybe
            (\mr mv ->
                Maybe.map2 (\r v -> percentImp r v) mr mv
                    |> Maybe.andThen identity
            )


columnPercent : Crosstab Float -> Mapping Float (Maybe Float)
columnPercent crosstab =
    crosstab
        |> compareToColumn
            (\mc v -> mc |> Maybe.andThen (\c -> percentImp c v))


columnPercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
columnPercentMaybe crosstab =
    crosstab
        |> compareToColumnMaybe
            (\mc mv ->
                Maybe.map2 (\c v -> percentImp c v) mc mv
                    |> Maybe.andThen identity
            )


tablePercent : Crosstab Float -> Mapping Float (Maybe Float)
tablePercent crosstab =
    crosstab
        |> compareToTable
            (\mt v -> mt |> Maybe.andThen (\t -> percentImp t v))


tablePercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
tablePercentMaybe crosstab =
    crosstab
        |> compareToTableMaybe
            (\mt mv ->
                Maybe.map2 (\t v -> percentImp t v) mt mv
                    |> Maybe.andThen identity
            )


chiSq : Crosstab Float -> Mapping Float (Maybe Float)
chiSq crosstab =
    crosstab
        |> compareToRowColumnTable
            (\mr mc mt v ->
                Maybe.map3 (\r c t -> chiSqImp r c t v) mr mc mt
                    |> Maybe.andThen identity
            )


chiSqMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
chiSqMaybe crosstab =
    crosstab
        |> compareToRowColumnTableMaybe
            (\mr mc mt mv ->
                Maybe.map4 (\r c t v -> chiSqImp r c t v) mr mc mt mv
                    |> Maybe.andThen identity
            )


compareToRow : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToRow fn (Crosstab { table }) =
    \( r, c ) a ->
        case c of
            [] ->
                fn (Just a) a

            _ ->
                table
                    |> Dict.get ( r, [] )
                    |> (\mr -> fn mr a)


compareToRowMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToRowMaybe fn (Crosstab { table }) =
    \( r, c ) ma ->
        case c of
            [] ->
                fn ma ma

            _ ->
                table
                    |> Dict.get ( r, [] )
                    |> Maybe.andThen identity
                    |> (\mr -> fn mr ma)


compareToColumn : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToColumn fn (Crosstab { table }) =
    \( r, c ) a ->
        case r of
            [] ->
                fn (Just a) a

            _ ->
                table
                    |> Dict.get ( [], c )
                    |> (\mc -> fn mc a)


compareToColumnMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToColumnMaybe fn (Crosstab { table }) =
    \( r, c ) ma ->
        case r of
            [] ->
                fn ma ma

            _ ->
                table
                    |> Dict.get ( [], c )
                    |> Maybe.andThen identity
                    |> (\mc -> fn mc ma)


compareToTable : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToTable fn (Crosstab { table }) =
    \_ a ->
        table
            |> Dict.get ( [], [] )
            |> (\ma -> fn ma a)


compareToTableMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToTableMaybe fn (Crosstab { table }) =
    \_ ma ->
        table
            |> Dict.get ( [], [] )
            |> Maybe.andThen identity
            |> (\mt -> fn mt ma)


compareToRowColumnTable : (Maybe a -> Maybe a -> Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToRowColumnTable fn (Crosstab { table }) =
    \( r, c ) a ->
        case ( r, c ) of
            ( [], [] ) ->
                fn (Just a) (Just a) (Just a) a

            ( [], _ ) ->
                fn (Just a)
                    (table |> Dict.get ( r, [] ))
                    (table |> Dict.get ( [], [] ))
                    a

            ( _, [] ) ->
                fn (table |> Dict.get ( [], c ))
                    (Just a)
                    (table |> Dict.get ( [], [] ))
                    a

            _ ->
                fn (table |> Dict.get ( [], c ))
                    (table |> Dict.get ( r, [] ))
                    (table |> Dict.get ( [], [] ))
                    a


compareToRowColumnTableMaybe :
    (Maybe a -> Maybe a -> Maybe a -> Maybe a -> b)
    -> Crosstab (Maybe a)
    -> Mapping (Maybe a) b
compareToRowColumnTableMaybe fn (Crosstab { table }) =
    \( r, c ) ma ->
        case ( r, c ) of
            ( [], [] ) ->
                fn ma ma ma ma

            ( [], _ ) ->
                fn ma
                    (table |> Dict.get ( r, [] ) |> Maybe.andThen identity)
                    (table |> Dict.get ( [], [] ) |> Maybe.andThen identity)
                    ma

            ( _, [] ) ->
                fn (table |> Dict.get ( [], c ) |> Maybe.andThen identity)
                    ma
                    (table |> Dict.get ( [], [] ) |> Maybe.andThen identity)
                    ma

            _ ->
                fn (table |> Dict.get ( [], c ) |> Maybe.andThen identity)
                    (table |> Dict.get ( r, [] ) |> Maybe.andThen identity)
                    (table |> Dict.get ( [], [] ) |> Maybe.andThen identity)
                    ma


percentImp : Float -> Float -> Maybe Float
percentImp total value =
    if total == 0.0 then
        Nothing

    else
        Just <| (value / total)


chiSqImp : Float -> Float -> Float -> Float -> Maybe Float
chiSqImp row col table value =
    if col == 0.0 || row == 0.0 || table == 0.0 then
        Nothing

    else
        let
            exp =
                col * (row / table)
        in
        Just <| ((value - exp) ^ 2) / exp



-- QUERY


type Query a
    = Query
        { sortRows : CompareAxis a
        , sortColumns : CompareAxis a
        , rowDimensions : Maybe Int
        , columnDimensions : Maybe Int
        }


type alias CompareAxis a =
    Levels -> List a -> Levels -> List a -> Order


sortingBy : CompareAxis a -> CompareAxis a -> Query a
sortingBy sortRows sortColumns =
    Query
        { sortRows = sortRows
        , sortColumns = sortColumns
        , rowDimensions = Nothing
        , columnDimensions = Nothing
        }


query : Query a -> Crosstab a -> Maybe (Display.Table a)
query (Query q) (Crosstab c) =
    c.table
        |> Dict.toList
        |> List.filter
            (filterMaybeDimensions q.rowDimensions q.columnDimensions)
        |> sortLevelsPairValuesWith q.sortRows q.sortColumns
        |> cartesianToDisplayTable c.valueLabel c.rowDimLabels c.columnDimLabels


filterMaybeDimensions : Maybe Int -> Maybe Int -> ( LevelsPair, a ) -> Bool
filterMaybeDimensions mrdim mcdim ( ( rs, cs ), _ ) =
    case ( mrdim, mcdim ) of
        ( Nothing, Nothing ) ->
            True

        ( Nothing, Just cdim ) ->
            List.length cs <= cdim

        ( Just rdim, Nothing ) ->
            List.length rs <= rdim

        ( Just rdim, Just cdim ) ->
            (List.length cs <= cdim) && (List.length rs <= rdim)


sortLevelsPairValuesWith :
    CompareAxis a
    -> CompareAxis a
    -> List ( LevelsPair, a )
    -> List ( LevelsPair, Maybe a )
sortLevelsPairValuesWith rfn cfn list =
    let
        sorts =
            list
                |> dimensionTables
                |> (\( rtable, ctable ) ->
                        Dict.cartesianJoin Tuple.pair Tuple.pair rtable ctable
                   )

        outer =
            Dict.leftOuterJoin
                Tuple.pair
                sorts
                (list |> Dict.fromList)
    in
    outer
        |> Dict.toList
        |> List.sortWith
            (\( ( rs1, cs1 ), ( ( rsortv1, csortv1 ), _ ) ) ( ( rs2, cs2 ), ( ( rsortv2, csortv2 ), _ ) ) ->
                order2
                    (rfn rs1 rsortv1 rs2 rsortv2)
                    (cfn cs1 csortv1 cs2 csortv2)
            )
        |> List.map
            (\( ( rs, cs ), ( _, mv ) ) -> ( ( rs, cs ), mv ))


cartesianToDisplayTable :
    ValueLabel
    -> List String
    -> List String
    -> List ( LevelsPair, Maybe a )
    -> Maybe (Display.Table a)
cartesianToDisplayTable vlabel rdims cdims data =
    let
        ( rlabels, clabels, values ) =
            data
                |> List.foldl
                    (\( ( r, c ), mv ) ( rs, cs, mvs ) ->
                        ( OrderedSet.insert r rs
                        , OrderedSet.insert c cs
                        , mvs ++ [ mv ]
                        )
                    )
                    ( OrderedSet.empty, OrderedSet.empty, [] )
                |> (\( rs, cs, mvs ) ->
                        ( OrderedSet.toList rs
                        , OrderedSet.toList cs
                        , mvs
                        )
                   )
    in
    Display.fromValues
        { valueLabel = vlabel
        , rowDimLabels = rdims
        , columnDimLabels = cdims
        }
        { rowLabels = rlabels
        , columnLabels = clabels
        }
        values


dimensionTables :
    List ( LevelsPair, a )
    -> ( Dict Levels (List a), Dict Levels (List a) )
dimensionTables list =
    let
        rtable =
            list
                |> List.filterMap
                    (\( ( rs, cs ), a ) ->
                        if cs |> List.isEmpty then
                            Just ( rs, a )

                        else
                            Nothing
                    )
                |> dimensionTable

        ctable =
            list
                |> List.filterMap
                    (\( ( rs, cs ), a ) ->
                        if rs |> List.isEmpty then
                            Just ( cs, a )

                        else
                            Nothing
                    )
                |> dimensionTable
    in
    ( rtable, ctable )


dimensionTable : List ( Levels, a ) -> Dict Levels (List a)
dimensionTable pairs =
    pairs
        |> List.sortBy (\( keys, _ ) -> keys |> List.length)
        |> List.foldl
            dimensionTableInner
            Dict.empty


dimensionTableInner :
    ( Levels, a )
    -> Dict Levels (List a)
    -> Dict Levels (List a)
dimensionTableInner ( lvls, a ) dict =
    let
        plvls =
            lvls |> List.take ((lvls |> List.length) - 1)

        val =
            dict
                |> Dict.get plvls
                |> Maybe.withDefault []
                |> (\pval -> pval ++ [ a ])
    in
    dict
        |> Dict.insert lvls val



-- SORTING


type SortDir
    = Asc
    | Desc


{-| Sort axis by levels in the given direction
-}
sortByLevels : SortDir -> CompareAxis a
sortByLevels dir ls1 _ ls2 _ =
    compareWithSortDir dir ls1 ls2


{-| Sort axis by values in the given direction
(and by levels ascending in case of equal values)
-}
sortByValue : SortDir -> CompareAxis comparable
sortByValue dir ls1 vs1 ls2 vs2 =
    order2
        (compareWithSortDir dir vs1 vs2)
        (compareWithSortDir Asc ls1 ls2)


{-| Sort axis by values in the given direction, with `Nothing` cases
compared as either lower (LT) or higher (GT) than any `Just` case.
-}
sortByValueMaybe : Order -> SortDir -> CompareAxis (Maybe comparable)
sortByValueMaybe default dir ls1 vs1 ls2 vs2 =
    order2
        (compareListMaybeWithSortDir default dir vs1 vs2)
        (compareWithSortDir dir ls1 ls2)


{-| Combine sorts
-}
sort2 : CompareAxis a -> CompareAxis a -> CompareAxis a
sort2 s1 s2 ls1 vs1 ls2 vs2 =
    let
        o1 =
            s1 ls1 vs1 ls2 vs2

        o2 =
            s2 ls1 vs1 ls2 vs2
    in
    order2 o1 o2


{-| Note that a typical rendering of a crosstab table has the summary
row at the bottom and column on the right. Because of the representation
of summary rows/cols as an empty list, by default they will appear instead
at the top and left. So to reproduce the typical behavior, define your
sorting using this helper function:

        withSummaryAtEnd (sortByLevels Desc)

-}
withSummaryAtEnd : CompareAxis a -> CompareAxis a
withSummaryAtEnd =
    positionSummary GT


positionSummary : Order -> CompareAxis a -> CompareAxis a
positionSummary default s ls1 vs1 ls2 vs2 =
    case ( ls1, ls2 ) of
        ( [], [] ) ->
            EQ

        ( [], _ ) ->
            default

        ( _, [] ) ->
            reverseOrder default

        _ ->
            s ls1 vs1 ls2 vs2


compareWithSortDir : SortDir -> comparable -> comparable -> Order
compareWithSortDir dir a b =
    case dir of
        Asc ->
            compare a b

        Desc ->
            compare b a


compareListMaybeWithSortDir : Order -> SortDir -> List (Maybe comparable) -> List (Maybe comparable) -> Order
compareListMaybeWithSortDir default dir ms1 ms2 =
    let
        ord =
            orderMany <| List.map2 (compareMaybeWithSortDir default dir) ms1 ms2

        ordlength =
            compare (ms1 |> List.length) (ms2 |> List.length)
    in
    order2 ord ordlength


compareMaybeWithSortDir : Order -> SortDir -> Maybe comparable -> Maybe comparable -> Order
compareMaybeWithSortDir default dir mv1 mv2 =
    case ( mv1, mv2, dir ) of
        ( Nothing, Nothing, _ ) ->
            EQ

        ( Just v1, Just v2, _ ) ->
            compareWithSortDir dir v1 v2

        ( Nothing, Just _, Asc ) ->
            default

        ( Nothing, Just _, Desc ) ->
            reverseOrder default

        ( Just _, Nothing, Asc ) ->
            reverseOrder default

        ( Just _, Nothing, Desc ) ->
            default


reverseOrder : Order -> Order
reverseOrder o =
    case o of
        LT ->
            GT

        EQ ->
            EQ

        GT ->
            LT


order2 : Order -> Order -> Order
order2 o1 o2 =
    case ( o1, o2 ) of
        ( LT, LT ) ->
            LT

        ( LT, EQ ) ->
            LT

        ( LT, GT ) ->
            LT

        ( EQ, LT ) ->
            LT

        ( EQ, EQ ) ->
            EQ

        ( EQ, GT ) ->
            GT

        ( GT, LT ) ->
            GT

        ( GT, EQ ) ->
            GT

        ( GT, GT ) ->
            GT


orderMany : List Order -> Order
orderMany =
    List.foldr order2 EQ
