module Crosstab.Query exposing
    ( CompareAxis
    , Msg(..)
    , Query
    , SortDir(..)
    , columnDimensions
    , default
    , defaultSort
    , rowDimensions
    , sort2
    , sortByFirstLevelInGivenOrder
    , sortByLevels
    , sortByMaybeValue
    , sortByMaybeValueAs
    , sortByValue
    , sortByValueAs
    , sortByValueMaybeAs
    , sortColumns
    , sortRows
    , sortingBy
    , sortingColumnsBy
    , sortingRowsBy
    , update
    , withSummaryAtEnd
    )

import Crosstab.Levels exposing (Levels)
import Dict
import Order exposing (order2, orderMany, reverseOrder)


type Query a
    = Query (QueryData a)


type alias QueryData a =
    { sortRows : CompareAxis a
    , sortColumns : CompareAxis a
    , rowDimensions : Maybe Int
    , columnDimensions : Maybe Int
    }


type alias CompareAxis a =
    Levels -> List a -> Levels -> List a -> Order


default : Query a
default =
    Query
        { sortRows = defaultSort
        , sortColumns = defaultSort
        , rowDimensions = Nothing
        , columnDimensions = Nothing
        }


sortingBy : CompareAxis a -> CompareAxis a -> Query a
sortingBy rs cs =
    Query
        { sortRows = rs
        , sortColumns = cs
        , rowDimensions = Nothing
        , columnDimensions = Nothing
        }


sortingRowsBy : CompareAxis a -> Query a
sortingRowsBy rs =
    sortingBy rs defaultSort


sortingColumnsBy : CompareAxis a -> Query a
sortingColumnsBy cs =
    sortingBy defaultSort cs


defaultSort : CompareAxis a
defaultSort =
    withSummaryAtEnd (sortByLevels Asc)



-- GETTERS


sortRows : Query a -> CompareAxis a
sortRows =
    getQueryData >> .sortRows


sortColumns : Query a -> CompareAxis a
sortColumns =
    getQueryData >> .sortColumns


rowDimensions : Query a -> Maybe Int
rowDimensions =
    getQueryData >> .rowDimensions


columnDimensions : Query a -> Maybe Int
columnDimensions =
    getQueryData >> .columnDimensions


getQueryData : Query a -> QueryData a
getQueryData (Query q) =
    q



-- UPDATE


type Msg a
    = SetRowDimensions (Maybe Int)
    | SetColumnDimensions (Maybe Int)
    | SortRows (CompareAxis a)
    | SortColumns (CompareAxis a)


update : Msg a -> Query a -> Query a
update msg (Query q) =
    case msg of
        SetRowDimensions n ->
            Query { q | rowDimensions = n }

        SetColumnDimensions n ->
            Query { q | columnDimensions = n }

        SortRows fn ->
            Query { q | sortRows = fn }

        SortColumns fn ->
            Query { q | sortColumns = fn }



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
sortByMaybeValue : Order -> SortDir -> CompareAxis (Maybe comparable)
sortByMaybeValue def dir ls1 vs1 ls2 vs2 =
    order2
        (compareListMaybeWithSortDir def dir vs1 vs2)
        (compareWithSortDir dir ls1 ls2)


{-| Sort the first level of the axis by the given list of values in order,
followed by the rest of the levels in alphanumeric order. Values that are
not found in the list are compared as either lower (LT) or higher (GT) than
values that are in the list.
-}
sortByFirstLevelInGivenOrder : Order -> List String -> CompareAxis a
sortByFirstLevelInGivenOrder def lsort ls1 _ ls2 _ =
    case ( ls1, ls2 ) of
        ( [], [] ) ->
            EQ

        ( _ :: _, [] ) ->
            LT

        ( [], _ :: _ ) ->
            GT

        ( l1 :: lrest1, l2 :: lrest2 ) ->
            order2
                (compareUsingGivenOrder def lsort l1 l2)
                (compare lrest1 lrest2)


{-| Sort axis by derived values in the given direction. Use this when your
values are not themselves comparable.
-}
sortByValueAs : (a -> comparable) -> SortDir -> CompareAxis a
sortByValueAs fn dir ls1 vs1 ls2 vs2 =
    sortByValue dir ls1 (vs1 |> List.map fn) ls2 (vs2 |> List.map fn)


{-| Sort axis by derived values in the given direction, and when the derived
values are `Nothing`, compare them as either lower (LT) or higher (GT) than
any `Just` case.
-}
sortByValueMaybeAs : (a -> Maybe comparable) -> Order -> SortDir -> CompareAxis a
sortByValueMaybeAs fn def dir ls1 vs1 ls2 vs2 =
    sortByMaybeValue def dir ls1 (vs1 |> List.map fn) ls2 (vs2 |> List.map fn)


{-| Sort axis by derived values in the given direction, and when the
original values are `Nothing`, compare them as either lower (LT) or higher (GT)
than any `Just` case.
-}
sortByMaybeValueAs : (a -> comparable) -> Order -> SortDir -> CompareAxis (Maybe a)
sortByMaybeValueAs fn def dir ls1 vs1 ls2 vs2 =
    sortByMaybeValue def dir ls1 (vs1 |> List.map (Maybe.map fn)) ls2 (vs2 |> List.map (Maybe.map fn))


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
of summary rows/cols as an empty list, in a natural sort they will appear
instead at the top and left. So to reproduce the typical behavior, define your
sorting using this helper function:

        withSummaryAtEnd (sortByLevels Desc)

Note this is the default used for both row and column dimensions in
[Query.default](#default).

-}
withSummaryAtEnd : CompareAxis a -> CompareAxis a
withSummaryAtEnd =
    positionSummary GT


positionSummary : Order -> CompareAxis a -> CompareAxis a
positionSummary def s ls1 vs1 ls2 vs2 =
    case ( ls1, ls2 ) of
        ( [], [] ) ->
            EQ

        ( [], _ ) ->
            def

        ( _, [] ) ->
            reverseOrder def

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
compareListMaybeWithSortDir def dir ms1 ms2 =
    let
        ord =
            orderMany <| List.map2 (compareMaybeWithSortDir def dir) ms1 ms2

        ordlength =
            compare (ms1 |> List.length) (ms2 |> List.length)
    in
    order2 ord ordlength


compareMaybeWithSortDir : Order -> SortDir -> Maybe comparable -> Maybe comparable -> Order
compareMaybeWithSortDir def dir mv1 mv2 =
    case ( mv1, mv2, dir ) of
        ( Nothing, Nothing, _ ) ->
            EQ

        ( Just v1, Just v2, _ ) ->
            compareWithSortDir dir v1 v2

        ( Nothing, Just _, Asc ) ->
            def

        ( Nothing, Just _, Desc ) ->
            reverseOrder def

        ( Just _, Nothing, Asc ) ->
            reverseOrder def

        ( Just _, Nothing, Desc ) ->
            def


compareUsingGivenOrder : Order -> List comparable -> (comparable -> comparable -> Order)
compareUsingGivenOrder ord sortlist a b =
    let
        lookup =
            sortlist
                |> List.foldl (\c ( i, d ) -> ( i + 1, d |> Dict.insert c i )) ( 0, Dict.empty )
                |> Tuple.second
    in
    case ( lookup |> Dict.get a, lookup |> Dict.get b ) of
        ( Nothing, Nothing ) ->
            compare a b

        ( Just _, Nothing ) ->
            reverseOrder ord

        ( Nothing, Just _ ) ->
            ord

        ( Just na, Just nb ) ->
            compare na nb
