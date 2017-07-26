module Crosstab
    exposing
        ( Crosstab
        , Calc
        , LevelMap
        , Compare
        , CompareAccum
        , Levels
        , SortDirection(..)
        , fromList
        , fromListWithLevels
        , levelsOf
        , rowLevelList
        , colLevelList
        , rowList
        , rowSummaryList
        , colSummaryList
        , tableSummary
        , calc
        , compare
        , compareAccum
        , sortRowsBySummary
        , sortRowsByCol
        , sortRowsByColIndex
        , customCalc
        , mapCalcOf
        , mapCalcOf2
        , mapCalc2
        )

{-| A library for calculating crosstab (AKA contingency) tables.

Built on top of [elm-flat-matrix] for efficient processing.


# Constructing

@docs fromList, fromListWithLevels, levelsOf, Levels, LevelMap


# Getting data out

@docs levels, rowLevelList, colLevelList, rowList, rowSummaryList, colSummaryList, tableSummary


# Calculating

@docs calc, compare, Compare, compareAccum, CompareAccum


# Sorting

@docs sortRowsBySummary, sortRowsByCol, sortRowsByColIndex


# Defining calculations

@docs customCalc, mapCalcOf, mapCalc, mapCalcOf2, mapCalc2


# Internal types

@docs Crosstab, Calc, Levels

[elm-flat-matrix]: https://package.elm-lang.org/packages/eeue56/elm-flat-matrix/latest

-}

import Matrix exposing (Matrix)
import Matrix.Util
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


{-| Internal structure of a crosstab table. See `fromList` and `fromListWithLevels`
for how to construct a Crosstab from source data.
-}
type Crosstab a b comparable1 comparable2
    = Crosstab
        { levels : Levels comparable1 comparable2
        , values : Values a
        , summary : Summary b
        }


{-| Internal structure of a calculation. See prebuilt calculations in
`Crosstab.Calc` and `Crosstab.Stats`, or construct your own with `customCalc`.

Essentially, a calculation defines an initial value, an accumulation function,
and a map over the accumulated value.

See [Defining calculations](#defining-calculations) for details.

-}
type Calc a b c
    = Calc
        { map : b -> c
        , accum : a -> b -> b
        , init : b
        }


{-| Mapping from source data to row and column levels.
-}
type alias LevelMap a comparable1 comparable2 =
    { row : a -> comparable1
    , col : a -> comparable2
    }


{-| Summary data for calculations. See `compare` for usage example.

  - **table** is the overall table summary
  - **row** is the row summary for the current value
  - **col** is the column summary for the current value
  - **prevRow** is the value at the previous row, or `Nothing` if the first row
  - **prevCol** is the value at the previous column, or `Nothing` if the first
    column

-}
type alias Compare a b =
    { table : b
    , row : b
    , col : b
    , prevRow : Maybe a
    , prevCol : Maybe a
    }


{-| Summary data for calculations involving accumulating row and column values.
See `compareAccum` for usage example. In addition to the fields available in
`Compare`, you have:

  - **cumRow**, the last cumulative value at the previous row, or the initial
    value if the first row.
  - **cumCol**, the last cumulative value at the previous column, or the initial
    value if the first column.

-}
type alias CompareAccum a b c =
    { table : b
    , row : b
    , col : b
    , prevRow : Maybe a
    , prevCol : Maybe a
    , cumRow : c
    , cumCol : c
    }


{-| Row and column levels. See `fromListWithLevels` for usage example.
-}
type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


type alias Values a =
    Matrix a


type alias Summary a =
    { table : a
    , rows : Array a
    , cols : Array a
    }


{-| Sort ascending or descending.
-}
type SortDirection
    = Asc
    | Desc



-- CONSTRUCTING


{-| Load and calculate a crosstab table from source data given:

  - a *summary* calculation,
  - a *value* calculation, and
  - a mapping of row and column levels from source data.

Assuming you have a list of records where `x1` is your row category, `x2` is
your column category, and `y` is your value, the following will calculate a
crosstab where the *values* in the table are the sums of y, and the *summary*
of the rows, columns, and overall table are the *means* of those sums.

    fromList
        (Crosstab.Stats.summary .mean)
        (Crosstab.Stats.summaryOf .y .sum)
        { row = .x1, col = .x2 }
        data

Please note there is some subtlety in the structure of the *value* vs.
*summary* calculations. The former *accumulates* source records while the
latter *adds* together previous accumulations. The type signatures help
tell the story.

If you are using prebuilt calculations from `Crosstab.Calc` or
`Crosstab.Stats`, the main thing to be aware of is the functions ending in
`Of` define *value* calculations, while those that don't end in `Of` define
*summary* calculations.

For more details, see [Defining calculations](#defining-calculations).

-}
fromList :
    Calc b b d
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Crosstab c d comparable1 comparable2
fromList summary value map records =
    fromListWithLevels
        (levelsOf map records)
        summary
        value
        map
        records


{-| Like `fromList`, but specifying row and column levels explicitly. This saves
one pass through the source data, if you know them up front.
-}
fromListWithLevels :
    Levels comparable1 comparable2
    -> Calc b b d
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Crosstab c d comparable1 comparable2
fromListWithLevels { rows, cols } summary (Calc value) { row, col } records =
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
            Maybe.map2 (\c r -> accumHelp c r a data) (mcol a) (mrow a)
                |> Maybe.withDefault data

        accumHelp c r a matrix =
            Matrix.update c r (value.accum a) matrix

        initData =
            Matrix.repeat (Array.length cols) (Array.length rows) value.init

        finalize matrix =
            Crosstab
                { levels =
                    { rows = rows
                    , cols = cols
                    }
                , values = Matrix.map value.map matrix
                , summary = calcValuesSummary summary matrix
                }
    in
        List.foldr accum initData records
            |> finalize


{-| Extract the unique row and column levels from source data, given a *level
mapping*. Used internally by `fromList`, but can be used generally.

    levelsOf { row = .group, col = .date } data

-}
levelsOf :
    LevelMap a comparable1 comparable2
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



-- ACCESSORS


{-| Get the list of row levels from a crosstab.
-}
rowLevelList : Crosstab a b comparable1 comparable2 -> List comparable1
rowLevelList (Crosstab { levels }) =
    Array.toList levels.rows


{-| Get the list of column levels from a crosstab.
-}
colLevelList : Crosstab a b comparable1 comparable2 -> List comparable2
colLevelList (Crosstab { levels }) =
    Array.toList levels.cols


{-| Get the list of values from a crosstab (rows of columns).
-}
rowList : Crosstab a b comparable1 comparable2 -> List (List a)
rowList (Crosstab { values }) =
    Matrix.Util.toListRows values


{-| Get the row summaries from a crosstab.
-}
rowSummaryList : Crosstab a b comparable1 comparable2 -> List b
rowSummaryList (Crosstab { summary }) =
    Array.toList summary.rows


{-| Get the column summaries from a crosstab.
-}
colSummaryList : Crosstab a b comparable1 comparable2 -> List b
colSummaryList (Crosstab { summary }) =
    Array.toList summary.cols


{-| Get the table summary ("grand total") from a crosstab.
-}
tableSummary : Crosstab a b comparable1 comparable2 -> b
tableSummary (Crosstab { summary }) =
    summary.table



-- OPERATIONS


{-| Calculate row, column, and table summaries from the given crosstab using
the given calculation, returning a new crosstab.

In many cases you don't need this additional pass over the data and can do
the necessary summary calculations as part of the initial load (`fromList`).
But in principle you could use it to do a different calculation over the
same crosstab.

For instance, with something like this you could use the same underlying
crosstab data (stored as `Set comparable`) to calculate *first* the unique
counts (`Set.size`), and *then* the quantiles, without having to load the data
in again:

    uniqueCounts =
        fromList
            (Crosstab.Calc.unique Set.size)
            (Crosstab.Calc.uniqueOf .y identity)
            { row = .x1, col = .x2 }
            data

    iqrs =
        uniqueCounts |> calc (quantiles [ 0.25, 0.5, 0.75 ])

-}
calc :
    Calc a b c
    -> Crosstab a b comparable1 comparable2
    -> Crosstab a c comparable1 comparable2
calc summary (Crosstab { levels, values }) =
    Crosstab
        { levels = levels
        , values = values
        , summary = calcValuesSummary summary values
        }


{-| Compare crosstab values with their corresponding row, column, and table
summaries using the given function, returning a new crosstab.

Note you also must pass in a default value for the new crosstab.

Note also the summary calculations are left untouched.

    let
        rowPct {row} val =
            val / row
    in
        compare RowPct 0.0 crosstab

-}
compare :
    (Compare a b -> a -> c)
    -> c
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c b comparable1 comparable2
compare comp init (Crosstab { levels, summary, values }) =
    Crosstab
        { levels = levels
        , values = compareSummaryValues comp init summary values
        , summary = summary
        }



{-| The same as `compare`, except the data passed in to your compare function
includes *cumulative row* and *cumulative column* values. In other words,
your comparisons can be made against the previously compared row or column value
(or against the specified initial value, if it's the first row/column).

This is useful for calculating "running totals" and other cumulative values
across rows or columns.

    let
        runningRowSum {cumRow} val =
            cumRow + val
    in
        compareAccum runningRowSum 0.0 crosstab

But the `cumRow` and `cumCol` values can be used more generally to
*compare comparisons*. For example, to calculate *change in row percent* across
columns, you can do something like this:

    let
        rowPctChange {cumRow, row} val =
            let
                newpct = (val / row)
            in
                cumRow
                    |> (\(pct, chg) -> ( newpct, newpct - pct ) )
    in
        compareAccum rowPctChange 0.0 crosstab

Internal note: `compareAccum` is defined separately from `compare` for
performance reasons: it allocates a new internal matrix, whereas `compare`
does not.

-}
compareAccum :
    (CompareAccum a b c -> a -> c)
    -> c
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c b comparable1 comparable2
compareAccum comp init (Crosstab { levels, summary, values }) =
    Crosstab
        { levels = levels
        , values = compareSummaryValuesAccum comp init summary values
        , summary = summary
        }


-- SORTING


{-| Sort the rows of a Crosstab by a function of the row summary.

For instance, to sort rows descending, when the summary is numeric:

    Crosstab.sortRowsBySummary identity Crosstab.Desc crosstab

If your summary is a record of values, you can pull out what you need to sort
by (anything `comparable`, including tuples of comparables):

    Crosstab.sortRowsBySummary
        (\{maxGrade, meanAge} -> (maxGrade, meanAge))
        Crosstab.Asc
        crosstab

-}
sortRowsBySummary :
    (b -> comparable3)
    -> SortDirection
    -> Crosstab a b comparable1 comparable2
    -> Crosstab a b comparable1 comparable2
sortRowsBySummary accessor dir (Crosstab c) =
    let
        indexes =
            sortedIndexesArray accessor c.summary.rows
    in
        case dir of
            Asc ->
                sortRowsByIndexes indexes (Crosstab c)

            Desc ->
                sortRowsByIndexes (List.reverse indexes) (Crosstab c)


{-| Sort the rows of a Crosstab by a function of the given column.

    let
        countsByMonthAndState =
            Crosstab.fromList
                Crosstab.Calc.count
                Crosstab.Calc.count
                { row = .state , col = .month }
                data
    in
        -- sort rows ascending by counts of the "2017-01" column
        countsByMonthAndState
            |> Crosstab.sortRowsByCol "2017-01" identity Crosstab.Asc

-}
sortRowsByCol :
    comparable2
    -> (a -> comparable3)
    -> SortDirection
    -> Crosstab a b comparable1 comparable2
    -> Crosstab a b comparable1 comparable2
sortRowsByCol col accessor dir (Crosstab c) =
    findInArray col c.levels.cols
        |> Maybe.map (\i -> sortRowsByColIndex i accessor dir (Crosstab c))
        |> Maybe.withDefault (Crosstab c)


{-| The same as `sortRowsByCol`, but specifying a column index instead of value.
-}
sortRowsByColIndex :
    Int
    -> (a -> comparable3)
    -> SortDirection
    -> Crosstab a b comparable1 comparable2
    -> Crosstab a b comparable1 comparable2
sortRowsByColIndex index accessor dir (Crosstab c) =
    let
        indexes =
            Matrix.Util.sortedRowIndexes index accessor c.values
    in
        case dir of
            Asc ->
                sortRowsByIndexes indexes (Crosstab c)

            Desc ->
                sortRowsByIndexes (List.reverse indexes) (Crosstab c)



-- CALC CONSTRUCTORS


{-| TODO
-}
customCalc :
    { x | map : b -> c, accum : a -> b -> b, init : b }
    -> Calc a b c
customCalc { map, accum, init } =
    Calc
        { map = map, accum = accum, init = init }


mapCalcOf :
    (a -> b)
    -> Calc b c d
    -> Calc a c d
mapCalcOf getter (Calc calc) =
    Calc
        { calc | accum = getter >> calc.accum }


mapCalcOf2 :
    (c -> e -> f)
    -> Calc a b c
    -> Calc a d e
    -> Calc a ( b, d ) f
mapCalcOf2 func (Calc c1) (Calc c2) =
    Calc
        { map = (\( b, d ) -> func (c1.map b) (c2.map d))
        , accum = (\a ( b, d ) -> ( c1.accum a b, c2.accum a d ))
        , init = ( c1.init, c2.init )
        }


mapCalc2 :
    (c -> e -> f)
    -> Calc b b c
    -> Calc d d e
    -> Calc ( b, d ) ( b, d ) f
mapCalc2 func (Calc c1) (Calc c2) =
    Calc
        { map = (\( b, d ) -> func (c1.map b) (c2.map d))
        , accum = (\( b1, d1 ) ( b2, d2 ) -> ( c1.accum b1 b2, c2.accum d1 d2 ))
        , init = ( c1.init, c2.init )
        }



-- INTERNAL


calcValuesSummary : Calc a b c -> Values a -> Summary c
calcValuesSummary (Calc { init, accum, map }) matrix =
    let
        ( ncols, nrows ) =
            matrix.size

        accum_ c r a v =
            { v
                | table = accum a v.table
                , rows = updateArray r (accum a) v.rows
                , cols = updateArray c (accum a) v.cols
            }

        finalize v =
            { v
                | table = map v.table
                , rows = Array.map map v.rows
                , cols = Array.map map v.cols
            }
    in
        Matrix.Util.foldl accum_
            { table = init
            , rows = Array.repeat nrows init
            , cols = Array.repeat ncols init
            }
            matrix
            |> finalize


compareSummaryValues :
    (Compare a b -> a -> c)
    -> c
    -> Summary b
    -> Values a
    -> Values c
compareSummaryValues func init { table, rows, cols } matrix =
    let
        comparator t c r pc pr =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            }

        compare_ f a t pc pr c r =
            f (comparator t c r pc pr) a

        map_ c r a =
            let
                pr =
                    Matrix.get c (r - 1) matrix

                pc =
                    Matrix.get (c - 1) r matrix
            in
                Maybe.map2 (compare_ func a table pc pr)
                    (Array.get c cols)
                    (Array.get r rows)
                    |> Maybe.withDefault init
    in
        Matrix.indexedMap map_ matrix


compareSummaryValuesAccum :
    (CompareAccum a b c -> a -> c)
    -> c
    -> Summary b
    -> Values a
    -> Values c
compareSummaryValuesAccum func init { table, rows, cols } matrix =
    let
        ( ncols, nrows ) =
            matrix.size

        comparator t c r pc pr cc cr =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            , cumRow = cr
            , cumCol = cc
            }

        compare_ f a t pc pr cc cr c r =
            f (comparator t c r pc pr cc cr) a

        accum c r a m =
            let
                pr =
                    Matrix.get c (r - 1) matrix

                pc =
                    Matrix.get (c - 1) r matrix

                cr =
                    Matrix.get c (r - 1) m |> Maybe.withDefault init

                cc =
                    Matrix.get (c - 1) r m |> Maybe.withDefault init
            in
                Matrix.set
                    c
                    r
                    (Maybe.map2 (compare_ func a table pc pr cc cr)
                        (Array.get c cols)
                        (Array.get r rows)
                        |> Maybe.withDefault init
                    )
                    m
    in
        Matrix.Util.foldl accum
            (Matrix.repeat ncols nrows init)
            matrix


sortRowsByIndexes :
    List Int
    -> Crosstab a b comparable1 comparable2
    -> Crosstab a b comparable1 comparable2
sortRowsByIndexes indexes (Crosstab c) =
    let
        updLevels levels =
            { levels | rows = sortByIndexesArray indexes levels.rows }

        updValues values =
            Matrix.Util.sortRowsByIndexes indexes values

        updSummary summary =
            { summary | rows = sortByIndexesArray indexes summary.rows }
    in
        Crosstab
            { c
                | levels = updLevels c.levels
                , values = updValues c.values
                , summary = updSummary c.summary
            }



-- UTILS


indexMapArray : Array comparable -> Dict comparable Int
indexMapArray array =
    array
        |> Array.foldl (\a ( i, d ) -> ( i + 1, Dict.insert a i d )) ( 0, Dict.empty )
        |> Tuple.second


findInArray : comparable -> Array comparable -> Maybe Int
findInArray a array =
    indexMapArray array
        |> Dict.get a


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


sortedIndexesArray : (a -> comparable) -> Array a -> List Int
sortedIndexesArray accessor array =
    Array.indexedMap (,) array
        |> Array.toList
        |> (List.sortBy (Tuple.second >> accessor))
        |> List.map Tuple.first


sortByIndexesArray : List Int -> Array a -> Array a
sortByIndexesArray indexes array =
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
