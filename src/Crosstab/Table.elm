module Crosstab.Table exposing
    ( Table
    , LevelMap
    , Compare
    , CompareAccum
    , table
    , tableWithLevels
    , levelsOf
    , rowLevelList
    , colLevelList
    , rowList
    , rowSummaryList
    , colSummaryList
    , tableSummary
    , rowSummaryColumn
    , colSummaryColumn
    , summarize
    , compare
    , compareAccum
    , sortRowsBySummary
    , sortRowsByCol
    , sortRowsByColIndex
    )

import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Matrix exposing (Matrix)

import Matrix.Util
import Array.Util
import Crosstab.Internal exposing 
    ( Calc(..), Table(..), Column(..)
    , Levels, Values, Summary
    )
import Crosstab.Sort as Sort exposing (Direction(..))


{-| Internal structure of a crosstab table. See `table` and `tableWithLevels`
for how to construct a Crosstab from source data.
-}
type alias Table a b comparable1 comparable2 =
    Crosstab.Internal.Table a b comparable1 comparable2


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



-- CONSTRUCTING


{-| Build and calculate a crosstab table from source data given:

  - a *summary* calculation,
  - a *value* calculation, and
  - a mapping of row and column levels from source data.

Assuming you have a list of records where `x1` is your row category, `x2` is
your column category, and `y` is your value, the following will calculate a
crosstab where the *values* in the table are the sums of y, and the *summary*
of the rows, columns, and overall table are the *means* of those sums.

    table
        (Crosstab.Stats.summary .mean)
        (Crosstab.Stats.summaryOf .y .sum)
        { row = .x1, col = .x2 }
        data

Please note there is some subtlety in the structure of the *value* vs.
*summary* calculations. The types tell part of the story. Value calculations
accumulate to a value, which are then accumulated in summary calculations (i.e.
for the row, column, and table totals). The calculations are independent, except
that the summary calculations start with the accumulated values.

In addition, both value and summary calculations have a final mapping over the 
accumulated values. In this way you can do "two-pass" calculations.

If you are using prebuilt calculations from `Crosstab.Calc` or
`Crosstab.Stats`, the main thing to be aware of is the functions ending in
`Of` typically are used for *value* calculations, while those that don't end in 
`Of` typically are used for *summary* calculations.

For more details, see [Defining calculations](#defining-calculations).

-}
table :
    Calc b d e
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Table c e comparable1 comparable2
table summary value map records =
    tableWithLevels
        (levelsOf map records)
        summary
        value
        map
        records


{-| Like `table`, but specifying row and column levels explicitly. This saves
one pass through the source data, if you know them up front.

Note that `Levels` is 

    type alias Levels comparable1 comparable2 =
        { rows : Array comparable1
        , cols : Array comparable2
        }

-}
tableWithLevels :
    Levels comparable1 comparable2
    -> Calc b d e
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Table c e comparable1 comparable2
tableWithLevels { rows, cols } summary (Calc value) { row, col } records =
    let
        rowMap =
            Array.Util.indexDict rows

        colMap =
            Array.Util.indexDict cols

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
            Table
                { levels =
                    { rows = rows
                    , cols = cols
                    }
                , values = Matrix.map value.map matrix
                , summary = calcSummary summary matrix
                }
    in
        List.foldr accum initData records
            |> finalize


{-| Extract the unique row and column levels from source data, given a *level
mapping*. Used internally by `table`, but can be used generally.

    levelsOf { row = .group, col = .date } data

-}
levelsOf :
    LevelMap a comparable1 comparable2
    -> List a
    -> Levels comparable1 comparable2
levelsOf { row, col } records =
    let
        accum record ( rows, cols ) =
            ( Set.insert (row record) rows, Set.insert (col record) cols )

        finalize ( rows, cols ) =
            { rows = Array.Util.fromSet rows, cols = Array.Util.fromSet cols }
    in
        List.foldr accum ( Set.empty, Set.empty ) records
            |> finalize



-- ACCESSORS

{-| Get the list of row levels from a crosstab.
-}
rowLevelList : Table a b comparable1 comparable2 -> List comparable1
rowLevelList (Table { levels }) =
    Array.toList levels.rows


{-| Get the list of column levels from a crosstab.
-}
colLevelList : Table a b comparable1 comparable2 -> List comparable2
colLevelList (Table { levels }) =
    Array.toList levels.cols


{-| Get the list of values from a crosstab (rows of columns).
-}
rowList : Table a b comparable1 comparable2 -> List (List a)
rowList (Table { values }) =
    Matrix.Util.toListRows values


{-| Get the row summaries from a crosstab.
-}
rowSummaryList : Table a b comparable1 comparable2 -> List b
rowSummaryList (Table { summary }) =
    Array.toList summary.rows


{-| Get the column summaries from a crosstab.
-}
colSummaryList : Table a b comparable1 comparable2 -> List b
colSummaryList (Table { summary }) =
    Array.toList summary.cols


{-| Get the table summary ("grand total") from a crosstab.
-}
tableSummary : Table a b comparable1 comparable2 -> b
tableSummary (Table { summary }) =
    summary.table

{-| Convert row summaries to a one-dimensional crosstab (Column).
-}
rowSummaryColumn : Table a b comparable1 comparable2 -> Column b b comparable2
rowSummaryColumn (Table { levels, summary }) =
    Column
        { levels = levels.cols
        , values = summary.rows
        , summary = summary.table
        }

{-| Convert col summaries to a one-dimensional crosstab (Column).
-}
colSummaryColumn : Table a b comparable1 comparable2 -> Column b b comparable1
colSummaryColumn (Table { levels, summary }) =
    Column
        { levels = levels.rows
        , values = summary.cols
        , summary = summary.table
        }



-- OPERATIONS


{-| Calculate row, column, and table summaries from the given crosstab using
the given calculation, returning a new crosstab.

In many cases you don't need this additional pass over the data and can do
the necessary summary calculations as part of the initial load (`table`).
But in principle you could use it to do a different calculation over the
same crosstab.

For instance, with something like this you could use the same underlying
crosstab data (stored as `Set comparable`) to calculate *first* the unique
counts (`Set.size`), and *then* the quantiles, without having to load the data
in again:

    uniqueCounts =
        table
            (Crosstab.Calc.unique Set.size)
            (Crosstab.Calc.uniqueOf .y identity)
            { row = .x1, col = .x2 }
            data

    iqrs =
        uniqueCounts |> summarize (quantiles [ 0.25, 0.5, 0.75 ])

-}
summarize :
    Calc a b c
    -> Table a b comparable1 comparable2
    -> Table a c comparable1 comparable2
summarize summary (Table { levels, values }) =
    Table
        { levels = levels
        , values = values
        , summary = calcSummary summary values
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
    -> Table a b comparable1 comparable2
    -> Table c b comparable1 comparable2
compare comp init (Table { levels, summary, values }) =
    Table
        { levels = levels
        , values = compareValues comp init summary values
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
    -> Table a b comparable1 comparable2
    -> Table c b comparable1 comparable2
compareAccum comp init (Table { levels, summary, values }) =
    Table
        { levels = levels
        , values = compareValuesAccum comp init summary values
        , summary = summary
        }



-- SORTING


{-| Sort the rows of a crosstab table by a function of the row summary.

For instance, to sort rows descending, when the summary is numeric:

    Crosstab.sortRowsBySummary identity Crosstab.Sort.Desc crosstab

If your summary is a record of values, you can pull out what you need to sort
by (anything `comparable`, including tuples of comparables):

    Crosstab.sortRowsBySummary
        (\{maxGrade, meanAge} -> (maxGrade, meanAge))
        Crosstab.Asc
        crosstab

-}
sortRowsBySummary :
    (b -> comparable3)
    -> Sort.Direction
    -> Table a b comparable1 comparable2
    -> Table a b comparable1 comparable2
sortRowsBySummary accessor dir (Table c) =
    let
        indexes =
            Array.Util.sortedIndexes accessor c.summary.rows
    in
        case dir of
            Sort.Asc ->
                sortRowsByIndexes indexes (Table c)

            Sort.Desc ->
                sortRowsByIndexes (List.reverse indexes) (Table c)


{-| Sort the rows of a crosstab table by a function of the given column.

    let
        countsByMonthAndState =
            Crosstab.table
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
    -> Sort.Direction
    -> Table a b comparable1 comparable2
    -> Table a b comparable1 comparable2
sortRowsByCol col accessor dir (Table c) =
    Array.Util.find col c.levels.cols
        |> Maybe.map (\i -> sortRowsByColIndex i accessor dir (Table c))
        |> Maybe.withDefault (Table c)


{-| The same as `sortRowsByCol`, but specifying a column index instead of value.
-}
sortRowsByColIndex :
    Int
    -> (a -> comparable3)
    -> Sort.Direction
    -> Table a b comparable1 comparable2
    -> Table a b comparable1 comparable2
sortRowsByColIndex index accessor dir (Table c) =
    let
        indexes =
            Matrix.Util.sortedRowIndexes index accessor c.values
    in
        case dir of
            Sort.Asc ->
                sortRowsByIndexes indexes (Table c)

            Sort.Desc ->
                sortRowsByIndexes (List.reverse indexes) (Table c)





-- INTERNAL


calcSummary : Calc a b c -> Values a -> Summary c
calcSummary (Calc { init, accum, map }) matrix =
    let
        ( ncols, nrows ) =
            matrix.size

        accum_ c r a v =
            { v
                | table = accum a v.table
                , rows = Array.Util.update r (accum a) v.rows
                , cols = Array.Util.update c (accum a) v.cols
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


compareValues :
    (Compare a b -> a -> c)
    -> c
    -> Summary b
    -> Values a
    -> Values c
compareValues func init { table, rows, cols } matrix =
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


compareValuesAccum :
    (CompareAccum a b c -> a -> c)
    -> c
    -> Summary b
    -> Values a
    -> Values c
compareValuesAccum func init { table, rows, cols } matrix =
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
    -> Table a b comparable1 comparable2
    -> Table a b comparable1 comparable2
sortRowsByIndexes indexes (Table c) =
    let
        updLevels levels =
            { levels | rows = Array.Util.sortByIndexes indexes levels.rows }

        updValues values =
            Matrix.Util.sortRowsByIndexes indexes values

        updSummary summary =
            { summary | rows = Array.Util.sortByIndexes indexes summary.rows }
    in
        Table
            { c
                | levels = updLevels c.levels
                , values = updValues c.values
                , summary = updSummary c.summary
            }


