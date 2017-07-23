module Matrix.Util
    exposing
        ( sortRowsByColumn
        , sortColumnsByRow
        , toList
        , foldl
        )

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Tuple


sortRowsByColumn : Int -> (a -> comparable) -> Matrix a -> Matrix a
sortRowsByColumn index accessor matrix =
    let
        ( ncols, nrows ) =
            matrix.size

        sortedIndexes : List Int
        sortedIndexes =
            Matrix.getColumn index matrix
                |> Maybe.withDefault (Array.empty)
                |> (Array.indexedMap (,) >> Array.toList)
                |> (List.sortBy (Tuple.second >> accessor))
                |> List.map Tuple.first

        accum_ origmatrix row ( newrow, newmatrix ) =
            ( newrow + 1
            , List.foldr
                (\col m_ ->
                    Matrix.get col row origmatrix
                        |> Maybe.map
                            (\a -> Matrix.set col newrow a m_)
                        |> Maybe.withDefault m_
                )
                newmatrix
                (List.range 0 ncols)
            )
    in
        List.foldl (accum_ matrix) ( 0, matrix ) sortedIndexes
            |> Tuple.second


sortColumnsByRow : Int -> (a -> comparable) -> Matrix a -> Matrix a
sortColumnsByRow index accessor matrix =
    let
        ( ncols, nrows ) =
            matrix.size

        sortedIndexes : List Int
        sortedIndexes =
            Matrix.getRow index matrix
                |> Maybe.withDefault (Array.empty)
                |> (Array.indexedMap (,) >> Array.toList)
                |> (List.sortBy (Tuple.second >> accessor))
                |> List.map Tuple.first

        accum_ origmatrix col ( newcol, newmatrix ) =
            ( newcol + 1
            , List.foldr
                (\row m_ ->
                    Matrix.get col row origmatrix
                        |> Maybe.map
                            (\a -> Matrix.set newcol row a m_)
                        |> Maybe.withDefault m_
                )
                newmatrix
                (List.range 0 nrows)
            )
    in
        List.foldl (accum_ matrix) ( 0, matrix ) sortedIndexes
            |> Tuple.second


toList : Matrix a -> List (List a)
toList matrix =
    let
        accum x y a ar =
            updateArray x ((::) a) ar
    in
        foldl accum
            (Array.repeat (Matrix.width matrix) [])
            matrix
            |> Array.map List.reverse
            |> Array.toList


foldl :
    (Int -> Int -> a -> b -> b)
    -> b
    -> Matrix a
    -> b
foldl accum init matrix =
    let
        accum_ a ( i, b ) =
            let
                x =
                    i % (Matrix.width matrix)

                y =
                    i // (Matrix.width matrix)
            in
                ( i + 1, accum x y a b )
    in
        matrix.data
            |> Array.foldl accum_ ( 0, init )
            |> Tuple.second



-- UTILS


updateArray : Int -> (a -> a) -> Array a -> Array a
updateArray index func array =
    array
        |> Array.get index
        |> Maybe.map (\a -> Array.set index (func a) array)
        |> Maybe.withDefault array



-- not sure about these yet


filterMatrixByIndexes :
    Array Int
    -> Array Int
    -> Matrix a
    -> Matrix a
filterMatrixByIndexes xs ys matrix =
    let
        levelIndexMap levels max =
            indexMapArray levels
                |> Dict.filter (\_ i -> i > -1 && i < max)

        xsMap =
            levelIndexMap xs (Matrix.width matrix)

        ysMap =
            levelIndexMap ys (Matrix.height matrix)

        accum x y v m =
            Maybe.map2
                (\newX newY ->
                    Matrix.set newX newY (Just v) m
                )
                (Dict.get x xsMap)
                (Dict.get y ysMap)
                |> Maybe.withDefault m

        -- only works if every matrix element is `Just a`, but
        -- that should be guaranteed by the xsMap, yxMap data constraints
        finalize m =
            { m
                | data = filterMapArray identity m.data
            }
    in
        foldl accum
            (Matrix.repeat (Dict.size xsMap) (Dict.size ysMap) Nothing)
            matrix
            |> finalize


filterMapArray : (a -> Maybe b) -> Array a -> Array b
filterMapArray f xs =
    let
        maybePush : (a -> Maybe b) -> a -> Array b -> Array b
        maybePush f mx xs =
            case f mx of
                Just x ->
                    Array.push x xs

                Nothing ->
                    xs
    in
        Array.foldl (maybePush f) Array.empty xs


indexMapArray : Array comparable -> Dict comparable Int
indexMapArray array =
    array
        |> Array.foldl (\a ( i, d ) -> ( i + 1, Dict.insert a i d )) ( 0, Dict.empty )
        |> Tuple.second
