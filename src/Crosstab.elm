module Crosstab exposing
    ( Crosstab
    , Spec
    , Calc
    , Levels
    , Value
    , crosstab
    , crosstabWithLevels
    , levelsOf
    , map
    , mapCalc
    )

{-|

-}

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple



type Crosstab a
    = Crosstab
        { matrix : Matrix a
        }


type Spec a b comparable1 comparable2
    = Spec
        { row : a -> comparable1
        , col : a -> comparable2
        , value : a -> b
        }


type Calc a
    = Calc
        { add : a -> a -> a
        , init : a
        }


type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


type alias Value a =
    { value : a
    , rows : Array a
    , cols : Array a
    , matrix : Matrix a
    }


crosstab :
    Spec a b comparable1 comparable2
    -> Calc b
    -> List a
    -> Crosstab b
crosstab (Spec spec) calc records =
    crosstabWithLevels
        (levelsOf { row = spec.row, col = spec.col } records)
        (Spec spec)
        calc
        records


crosstabWithLevels :
    Levels comparable1 comparable2
    -> Spec a b comparable1 comparable2
    -> Calc b
    -> List a
    -> Crosstab b
crosstabWithLevels { rows, cols } (Spec { row, col, value }) (Calc { add, init }) records =
    let
        rowMap =
            indexMapArray rows

        colMap =
            indexMapArray cols

        mrow record =
            row record |> flip Dict.get rowMap

        mcol record =
            col record |> flip Dict.get colMap

        accum a data =
            Maybe.map2 (\r c -> accumHelp r c a data) (mrow a) (mcol a)
                |> Maybe.withDefault data

        accumHelp r c a matrix =
            Matrix.update r c (add (value a)) matrix

        initData =
            Matrix.repeat (Array.length rows) (Array.length cols) init

        finalize matrix =
            Crosstab
                { matrix = matrix
                }
    in
        List.foldr accum initData records
            |> finalize


levelsOf :
    { x | row : a -> comparable1, col : a -> comparable2 }
    -> List a
    -> Levels comparable1 comparable2
levelsOf { row, col } records =
    let
        toArray set =
            Set.foldl Array.push Array.empty set

        accum record ( rows, cols ) =
            ( Set.insert (row record) rows, Set.insert (col record) cols )

        finalize ( rows, cols ) =
            { rows = toArray rows, cols = toArray cols }
    in
        List.foldr accum ( Set.empty, Set.empty ) records
            |> finalize


map :
    (a -> b)
    -> Crosstab a
    -> Crosstab b
map f (Crosstab crosstab) =
    Crosstab
        { crosstab
            | matrix = Matrix.map f crosstab.matrix
        }


calc :
    Calc a
    -> Crosstab a
    -> Value a
calc (Calc { init, add }) (Crosstab { matrix }) =
    let
        ( nrows, ncols ) =
            matrix.size

        accum i j a v =
            { v
                | value = add a v.value
                , rows = updateArray i (add a) v.rows
                , cols = updateArray j (add a) v.cols
                , matrix = Matrix.set i j a v.matrix
            }
    in
        foldlMatrix accum
            { value = init
            , rows = Array.repeat nrows init
            , cols = Array.repeat ncols init
            , matrix = Matrix.repeat nrows ncols init
            }
            matrix


mapCalc :
    (a -> b)
    -> Calc b
    -> Crosstab a
    -> Value b
mapCalc map (Calc { init, add }) (Crosstab { matrix }) =
    let
        ( nrows, ncols ) =
            matrix.size

        accum i j a v =
            let
                b =
                    map a
            in
                { v
                    | value = add b v.value
                    , rows = updateArray i (add b) v.rows
                    , cols = updateArray j (add b) v.cols
                    , matrix = Matrix.set i j b v.matrix
                }
    in
        foldlMatrix accum
            { value = init
            , rows = Array.repeat nrows init
            , cols = Array.repeat ncols init
            , matrix = Matrix.repeat nrows ncols init
            }
            matrix



-- UTILS


indexMapArray : Array comparable -> Dict comparable Int
indexMapArray array =
    array
        |> Array.foldl (\a ( i, d ) -> ( i + 1, Dict.insert a i d )) ( 0, Dict.empty )
        |> Tuple.second


updateArray : Int -> (a -> a) -> Array a -> Array a
updateArray index func array =
    array
        |> Array.get index
        |> Maybe.map (\a -> Array.set index (func a) array)
        |> Maybe.withDefault array


foldlMatrix :
    (Int -> Int -> a -> b -> b)
    -> b
    -> Matrix a
    -> b
foldlMatrix accum init matrix =
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
