module Array.Util exposing
    ( indexDict
    , find
    , update
    , fromSet
    , toSet
    , sortedIndexes
    , sortByIndexes
    )

import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)

indexDict : Array comparable -> Dict comparable Int
indexDict array =
    array
        |> Array.foldl (\a ( i, d ) -> ( i + 1, Dict.insert a i d )) ( 0, Dict.empty )
        |> Tuple.second


find : comparable -> Array comparable -> Maybe Int
find a array =
    indexDict array
        |> Dict.get a


update : Int -> (a -> a) -> Array a -> Array a
update index func array =
    array
        |> Array.get index
        |> Maybe.map (\a -> Array.set index (func a) array)
        |> Maybe.withDefault array


fromSet : Set comparable -> Array comparable
fromSet s =
    Set.foldl Array.push Array.empty s


toSet : Array comparable -> Set comparable
toSet a =
    Array.foldl Set.insert Set.empty a


sortedIndexes : (a -> comparable) -> Array a -> List Int
sortedIndexes accessor array =
    Array.indexedMap (,) array
        |> Array.toList
        |> (List.sortBy (Tuple.second >> accessor))
        |> List.map Tuple.first


sortByIndexes : List Int -> Array a -> Array a
sortByIndexes indexes array =
    let
        accum_ orig old ( new, array_ ) =
            ( new + 1
            , Array.get old orig
                |> Maybe.map (\a -> Array.set new a array_)
                |> Maybe.withDefault array_
            )
    in
        if Array.length array == List.length indexes then
            List.foldl (accum_ array) ( 0, array ) indexes
                |> Tuple.second
        else
            -- TODO
            array


