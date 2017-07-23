module Matrix.Util
    exposing
        ( sortRowsByColumn
        , sortColumnsByRow
        , sortRowsByIndexes
        , sortColumnsByIndexes
        , sortedRowIndexes
        , sortedColumnIndexes
        , toListColumns
        , toListRows
        , foldl
        )

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Tuple


sortRowsByColumn : Int -> (a -> comparable) -> Matrix a -> Matrix a
sortRowsByColumn index accessor matrix =
    sortedRowIndexes index accessor matrix
        |> (\idxs -> sortRowsByIndexes idxs matrix)

sortColumnsByRow : Int -> (a -> comparable) -> Matrix a -> Matrix a
sortColumnsByRow index accessor matrix =
    sortedColumnIndexes index accessor matrix
        |> (\idxs -> sortColumnsByIndexes idxs matrix)

sortedRowIndexes : Int -> (a -> comparable) -> Matrix a -> List Int
sortedRowIndexes index accessor matrix =
    Matrix.getColumn index matrix
        |> Maybe.withDefault (Array.empty)
        |> (Array.indexedMap (,) >> Array.toList)
        |> (List.sortBy (Tuple.second >> accessor))
        |> List.map Tuple.first
    
sortedColumnIndexes : Int -> (a -> comparable) -> Matrix a -> List Int
sortedColumnIndexes index accessor matrix =
    Matrix.getRow index matrix
        |> Maybe.withDefault (Array.empty)
        |> (Array.indexedMap (,) >> Array.toList)
        |> (List.sortBy (Tuple.second >> accessor))
        |> List.map Tuple.first
    

sortRowsByIndexes : List Int -> Matrix a -> Matrix a
sortRowsByIndexes indexes matrix =
    let
        (ncols, nrows) =
            matrix.size

        accum_ ncols origMatrix row ( newRow, newMatrix ) =
            ( newRow + 1
            , List.foldr
                (\col m_ ->
                    Matrix.get col row origMatrix
                        |> Maybe.map
                            (\a -> Matrix.set col newRow a m_)
                        |> Maybe.withDefault m_
                )
                newMatrix
                (List.range 0 ncols)
            )
    in
        if List.length indexes == nrows then 
            List.foldl (accum_ ncols matrix) ( 0, matrix ) indexes
                |> Tuple.second
        else
          -- TODO: if nrows > indexes then put any missing at the end
          matrix


sortColumnsByIndexes : List Int -> Matrix a -> Matrix a
sortColumnsByIndexes indexes matrix =
    let
        (ncols, nrows) =
            matrix.size

        accum_ nrows origMatrix col ( newCol, newMatrix ) =
            ( newCol + 1
            , List.foldr
                (\row m_ ->
                    Matrix.get col row origMatrix
                        |> Maybe.map
                            (\a -> Matrix.set newCol row a m_)
                        |> Maybe.withDefault m_
                )
                newMatrix
                (List.range 0 nrows)
            )
    in
        if List.length indexes == ncols then
            List.foldl (accum_ nrows matrix) ( 0, matrix ) indexes
                |> Tuple.second
        else
            -- TODO: if ncols > indexes then put any missing at the end
            matrix

    


toListColumns : Matrix a -> List (List a)
toListColumns matrix =
    let
        accum c r a ar =
            updateArray c ((::) a) ar
    in
        foldl accum
            (Array.repeat (Matrix.width matrix) [])
            matrix
            |> Array.map List.reverse
            |> Array.toList

toListRows : Matrix a -> List (List a)
toListRows matrix =
    let
        accum c r a ar =
            updateArray r ((::) a) ar
    in
        foldl accum
            (Array.repeat (Matrix.height matrix) [])
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
