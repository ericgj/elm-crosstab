module Crosstab.Query exposing
    ( CompareAxis
    , Msg(..)
    , Query
    , SortDir(..)
    , columnDimensions
    , rowDimensions
    , sort2
    , sortByLevels
    , sortByValue
    , sortByValueMaybe
    , sortColumns
    , sortRows
    , sortingBy
    , withSummaryAtEnd
    )

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
    List String -> List a -> List String -> List a -> Order


sortingBy : CompareAxis a -> CompareAxis a -> Query a
sortingBy rs cs =
    Query
        { sortRows = rs
        , sortColumns = cs
        , rowDimensions = Nothing
        , columnDimensions = Nothing
        }



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


type Msg a comparable
    = SetRowDimensions (Maybe Int)
    | SetColumnDimensions (Maybe Int)
    | SortRowsByLevels SortDir Bool
    | SortColumnsByLevels SortDir Bool
    | SortRowsByValues (a -> comparable) SortDir Bool
    | SortColumnsByValues (a -> comparable) SortDir Bool


update : Msg a comparable -> Query a -> Query a
update msg (Query q) =
    case msg of
        SetRowDimensions n ->
            Query { q | rowDimensions = n }

        SetColumnDimensions n ->
            Query { q | columnDimensions = n }

        SortRowsByLevels dir sumEnd ->
            Query q |> updateSortRows sumEnd (sortByLevels dir)

        SortColumnsByLevels dir sumEnd ->
            Query q |> updateSortColumns sumEnd (sortByLevels dir)

        SortRowsByValues fn dir sumEnd ->
            Query q |> updateSortRows sumEnd (sortByValueAs fn dir)

        SortColumnsByValues fn dir sumEnd ->
            Query q |> updateSortColumns sumEnd (sortByValueAs fn dir)


updateSortRows : Bool -> CompareAxis a -> Query a -> Query a
updateSortRows sumEnd s (Query q) =
    Query
        { q
            | sortRows =
                if sumEnd then
                    withSummaryAtEnd s

                else
                    s
        }


updateSortColumns : Bool -> CompareAxis a -> Query a -> Query a
updateSortColumns sumEnd s (Query q) =
    Query
        { q
            | sortColumns =
                if sumEnd then
                    withSummaryAtEnd s

                else
                    s
        }



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


{-| Sort axis by derived values in the given direction (and by levels
ascending in the case of equal derived values). Use this when your values are
not themselves comparable.
-}
sortByValueAs : (a -> comparable) -> SortDir -> CompareAxis a
sortByValueAs fn dir ls1 vs1 ls2 vs2 =
    sortByValue dir ls1 (vs1 |> List.map fn) ls2 (vs2 |> List.map fn)


{-| Sort axis by derived values in the given direction, with `Nothing` cases
compared as either lower (LT) or higher (GT) any `Just` case.
-}
sortByValueMaybeAs : (a -> comparable) -> Order -> SortDir -> CompareAxis (Maybe a)
sortByValueMaybeAs fn default dir ls1 vs1 ls2 vs2 =
    sortByValueMaybe default dir ls1 (vs1 |> List.map (Maybe.map fn)) ls2 (vs2 |> List.map (Maybe.map fn))


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
