module Crosstab
    exposing
        ( Crosstab
        , Spec
        , Calc
        , Levels
        , Values
        , Summary
        , Comparator
        , crosstab
        , crosstabWithLevels
        , levelsOf
        , spec
        , specMap
        , map
        , compare
        , innerJoin
        , filterByLevels
        , filterByRowLevels
        , filterByColLevels
        , calc
        , calcSummary
        , defineCalc
        , calcMap
        )

{-| 
A library for calculating crosstab (AKA contingency) tables.

Built on top of [elm-flat-matrix][].

# Constructing

@docs crosstab, spec, crosstabWithLevels, levelsOf, Levels


# Accessors

@docs levels, values


# Mapping and Filtering

@docs map, compare, innerJoin, filterByLevels, filterByRowLevels, filterByColLevels


# Calculating

@docs calc, calcSummary, defineCalc, calcMap, calcAdd


# Internal types

@docs Crosstab, Spec, Calc


[elm-flat-matrix]: https://package.elm-lang.org/packages/eeue56/elm-flat-matrix/latest

-}

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


-- PRIVATE TYPES

{-|

Internal structure of a crosstab table.

-}
type Crosstab a comparable1 comparable2
    = Crosstab
        { matrix : Matrix a
        , rows : Array comparable1
        , cols : Array comparable2
        }

{-|

Internal structure of a 'spec' used to construct a crosstab table from an
arbitrary list of data.

A `Spec` specifies how to determine the _row_ and _column levels_ from a given
item, and what _value_ is to be used in calculations.

See the [Specs](#specs) section for details on usage.

-}
type Spec a b comparable1 comparable2
    = Spec
        { row : a -> comparable1
        , col : a -> comparable2
        , value : a -> b
        }

{-|

Internal structure of a calculation on a crosstab, used both in the initial
construction of the crosstab and in calculating row, column, and table 
summaries.

A `Calc` defines a default (empty) value, and two operations:

   - **add**, which defines how values are summarized; and
   - **map**, an arbitrary function on the summarized totals.

See the [Calculations](#calculations) section for details on usage.

-}
type Calc a b
    = Calc
        { map : a -> b
        , add : a -> a -> a
        , init : a
        }


-- PUBLIC TYPES

{-|

Row and column levels of a crosstab.

-}
type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


{-|

Public representation of the values of a crosstab, as a list of rows of a list
of columns.

-}
type alias Values a =
    List (List a)

{-|

Calculation results 
-}
type alias Summary a =
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


-- CONSTRUCTING

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

spec : 
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> b }
    -> Spec a b comparable1 comparable2
spec { row, col, value } =
    Spec { row = row, col = col, value = value }

specMap :
    (b -> c)
    -> Spec a b comparable1 comparable2
    -> Spec a c comparable1 comparable2
specMap value (Spec s) =
    Spec { s | value = s.value >> value }


-- ACCESSORS


levels : Crosstab a comparable1 comparable2 -> Levels comparable1 comparable2
levels (Crosstab { rows, cols }) =
    { rows = rows, cols = cols }


values : Crosstab a comparable1 comparable2 -> Values a
values (Crosstab { matrix }) =
    toListMatrix matrix



-- MAPPING AND TRANSFORMING


map :
    (a -> b)
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
map func (Crosstab crosstab) =
    Crosstab
        { crosstab
            | matrix = Matrix.map func crosstab.matrix
        }


compare :
    (Comparator a -> a -> b)
    -> b
    -> Summary a
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


innerJoin :
    (a -> b -> c)
    -> c
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
    -> Crosstab c comparable1 comparable2
innerJoin func init (Crosstab c1) (Crosstab c2) =
    if c1.rows == c2.rows && c1.cols == c2.cols then
        leftJoinHelp func init c1.rows c1.cols c1.matrix c2.matrix
    else
        let
            newLevels levels1 levels2 =
                Set.intersect (setFromArray levels1) (setFromArray levels2)
                    |> setToArray

            filter_ =
                filterByLevels
                    (newLevels c1.rows c2.rows)
                    (newLevels c1.cols c2.cols)

            (Crosstab newC1) =
                filter_ (Crosstab c1)

            (Crosstab newC2) =
                filter_ (Crosstab c2)
        in
            leftJoinHelp func init newC1.rows newC1.cols newC1.matrix newC2.matrix


leftJoinHelp :
    (a -> b -> c)
    -> c
    -> Array comparable1
    -> Array comparable2
    -> Matrix a
    -> Matrix b
    -> Crosstab c comparable1 comparable2
leftJoinHelp func init rows cols m1 m2 =
    let
        ( nrows, ncols ) =
            m1.size

        accum i j a m =
            m2
                |> Matrix.get i j
                |> Maybe.map (\b -> Matrix.set i j (func a b) m)
                |> Maybe.withDefault m

        finalize m =
            Crosstab
                { matrix = m
                , rows = rows
                , cols = cols
                }
    in
        foldlMatrix accum
            (Matrix.repeat nrows ncols init)
            m1
            |> finalize


filterByRowLevels :
    Array comparable1
    -> Crosstab a comparable1 comparable2
    -> Crosstab a comparable1 comparable2
filterByRowLevels rows (Crosstab c) =
    filterByLevels rows c.cols (Crosstab c)


filterByColLevels :
    Array comparable2
    -> Crosstab a comparable1 comparable2
    -> Crosstab a comparable1 comparable2
filterByColLevels cols (Crosstab c) =
    filterByLevels c.rows cols (Crosstab c)


filterByLevels :
    Array comparable1
    -> Array comparable2
    -> Crosstab a comparable1 comparable2
    -> Crosstab a comparable1 comparable2
filterByLevels rows cols (Crosstab c) =
    let
        levelIndexMap levels max =
            indexMapArray levels
                |> Dict.filter (\_ i -> i > -1 && i < max)

        mapToArray dict =
            Dict.toList dict
                |> List.sortBy Tuple.second
                |> Array.fromList

        newRows =
            levelIndexMap rows (Array.length c.rows)
                |> mapToArray

        newCols =
            levelIndexMap cols (Array.length c.cols)
                |> mapToArray
    in
        Crosstab
            { c
                | rows = Array.map Tuple.first newRows
                , cols = Array.map Tuple.first newCols
                , matrix =
                    (filterMatrixByIndexes
                        (Array.map Tuple.second newRows)
                        (Array.map Tuple.second newCols)
                        c.matrix
                    )
            }


-- CALCULATIONS


calc :
    (Levels comparable1 comparable2 -> Values a -> Summary b -> c)
    -> Calc a b
    -> Crosstab a comparable1 comparable2
    -> c
calc func ca ct =
    calcSummary ca ct |> (\sum -> func (levels ct) (values ct) sum)


calcSummary :
    Calc a b
    -> Crosstab a comparable1 comparable2
    -> Summary b
calcSummary (Calc { init, add, map }) (Crosstab { matrix }) =
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


setToArray : Set comparable -> Array comparable
setToArray s =
    Set.foldl Array.push Array.empty s


setFromArray : Array comparable -> Set comparable
setFromArray a =
    Array.foldl Set.insert Set.empty a


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
        foldlMatrix accum
            (Matrix.repeat (Dict.size xsMap) (Dict.size ysMap) Nothing)
            matrix
            |> finalize


toListMatrix : Matrix a -> List (List a)
toListMatrix matrix =
    let
        accum x y a ar =
            updateArray x ((::) a) ar
    in
        foldlMatrix accum
            (Array.repeat (Matrix.width matrix) [])
            matrix
            |> Array.toList


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
