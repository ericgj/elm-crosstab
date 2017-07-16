module Crosstab
    exposing
        ( Crosstab
        , Spec
        , Calc
        , Levels
        , Value
        , Comparator
        , crosstab
        , crosstabWithLevels
        , levelsOf
        , map
        , compare
        , calc
        , defineCalc
        , calcMap
        , calcAdd
        )

{-| -}

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


type Crosstab a comparable1 comparable2
    = Crosstab
        { matrix : Matrix a
        , rows : Array comparable1
        , cols : Array comparable2
        }


type Spec a b comparable1 comparable2
    = Spec
        { row : a -> comparable1
        , col : a -> comparable2
        , value : a -> b
        }


type Calc a b
    = Calc
        { map : a -> b
        , add : a -> a -> a
        , init : a
        }


type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


type alias Value a =
    { table : a
    , rows : Array a
    , cols : Array a
    }


type alias Comparator a =
    { table : a
    , row : a
    , col : a
    , prevRow : Maybe a
    , prevCol : Maybe a
    }


crosstab :
    Spec a b comparable1 comparable2
    -> Calc b c
    -> List a
    -> Crosstab c comparable1 comparable2
crosstab (Spec spec) calc records =
    crosstabWithLevels
        (levelsOf { row = spec.row, col = spec.col } records)
        (Spec spec)
        calc
        records


crosstabWithLevels :
    Levels comparable1 comparable2
    -> Spec a b comparable1 comparable2
    -> Calc b c
    -> List a
    -> Crosstab c comparable1 comparable2
crosstabWithLevels { rows, cols } (Spec { row, col, value }) (Calc { map, add, init }) records =
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
                { matrix = Matrix.map map matrix
                , rows = rows
                , cols = cols
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
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
map func (Crosstab crosstab) =
    Crosstab
        { crosstab
            | matrix = Matrix.map func crosstab.matrix
        }


calc :
    Calc a b
    -> Crosstab a comparable1 comparable2
    -> Value b
calc (Calc { init, add, map }) (Crosstab { matrix }) =
    let
        ( nrows, ncols ) =
            matrix.size

        accum i j a v =
            { v
                | table = add a v.table
                , rows = updateArray i (add a) v.rows
                , cols = updateArray j (add a) v.cols
            }

        finalize v =
            { v
                | table = map v.table
                , rows = Array.map map v.rows
                , cols = Array.map map v.cols
            }
    in
        foldlMatrix accum
            { table = init
            , rows = Array.repeat nrows init
            , cols = Array.repeat ncols init
            }
            matrix
            |> finalize


compare :
    (Comparator a -> a -> b)
    -> b
    -> Value a
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
compare func init { table, rows, cols } (Crosstab crosstab) =
    let
        ( nrows, ncols ) =
            crosstab.matrix.size

        comparator t r c pr pc =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            }

        compare_ f a t pr pc r c =
            f (comparator t r c pr pc) a

        accum i j a m =
            let
                pr =
                    Matrix.get (i - 1) j crosstab.matrix

                pc =
                    Matrix.get i (j - 1) crosstab.matrix
            in
                Matrix.set
                    i
                    j
                    (Maybe.map2 (compare_ func a table pr pc)
                        (Array.get i rows)
                        (Array.get j cols)
                        |> Maybe.withDefault init
                    )
                    m

        finalize m =
            Crosstab
                { matrix = m
                , rows = crosstab.rows
                , cols = crosstab.cols
                }
    in
        foldlMatrix accum
            (Matrix.repeat nrows ncols init)
            crosstab.matrix
            |> finalize



-- CALCS


defineCalc :
    { x
        | add : a -> a -> a
        , init : a
        , map : a -> b
    }
    -> Calc a b
defineCalc { add, init, map } =
    Calc
        { add = add
        , init = init
        , map = map
        }


calcMap : (b -> c) -> Calc a b -> Calc a c
calcMap newmap (Calc { add, init, map }) =
    Calc
        { add = add
        , init = init
        , map = map >> newmap
        }


calcAdd : (a -> a -> a) -> Calc a b -> Calc a b
calcAdd newadd (Calc c) =
    Calc
        { c | add = newadd }



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
