module Crosstab
    exposing
        ( Crosstab
        , Calc
        , LevelMap
        , Compare
        , CompareAccum
        , Levels
        , fromList
        , fromListWithLevels
        , levelsOf
        , levelMap
        , rowLevelList
        , colLevelList
        , rowList
        , rowSummaryList
        , colSummaryList
        , tableSummary
        , calc
        , compare
        , compareAndCalc
        , compareAccum
        , compareAccumAndCalc
        , customCalc
        , mapCalcOf
        , mapCalcOf2
        , mapCalc2
        )

{-| 
A library for calculating crosstab (AKA contingency) tables.

Built on top of [elm-flat-matrix][] for efficient processing.

# Constructing

@docs fromList, fromListWithLevels, levelsOf, levelMap, Levels


# Getting data out

@docs levels, rowLevelList, colLevelList, rowList, rowSummaryList, colSummaryList, tableSummary


# Calculating

@docs calc, compare, compareAndCalc, Compare


# Defining calculations

@docs customCalc, mapCalcOf, mapCalc, mapCalcOf2, mapCalc2


# Internal types

@docs Crosstab, LevelMap, Calc, Levels, Values, Summary


[elm-flat-matrix]: https://package.elm-lang.org/packages/eeue56/elm-flat-matrix/latest

-}

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


{-|

Internal structure of a crosstab table. See `fromList` and `fromListWithLevels`
for how to construct a Crosstab from source data.

-}
type Crosstab a b comparable1 comparable2
    = Crosstab
        { levels : Levels comparable1 comparable2
        , values : Values a
        , summary : Summary b
        }


{-|

Internal structure of a calculation. See prebuilt calculations in 
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


{-|

Internal mapping from source data to row and column levels. Use `levelMap` to
construct.

-}
type LevelMap a comparable1 comparable2
    = LevelMap
        { row : a -> comparable1
        , col : a -> comparable2
        }

{-|

Summary data for calculations. See `compare` for usage example.

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

type alias CompareAccum a b c =
   { table : b
   , row : b
   , col : b
   , prevRow : Maybe a
   , prevCol : Maybe a
   , cumRow : c
   , cumCol : c
   }

{-|

Row and column levels. See `fromListWithLevels` for usage example.

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



-- CONSTRUCTING

{-|

Load and calculate a crosstab table from source data given: 

  - a _summary_ calculation, 
  - a _value_ calculation, and
  - a mapping of row and column levels from source data.

Assuming you have a list of records where `x1` is your row category, `x2` is
your column category, and `y` is your value, the following will calculate a
crosstab where the _values_ in the table are the sums of y, and the _summary_
of the rows, columns, and overall table are the _means_ of those sums.

    fromList 
        (Crosstab.Stats.summary .mean) 
        (Crosstab.Stats.summaryOf .y .sum)
        (levelMap { row = .x1, col = .x2 })
        data

Please note there is some subtlety in the structure of the _value_ vs.
_summary_ calculations. The former _accumulates_ source records while the
latter _adds_ together previous accumulations.  The type signatures help
tell the story.

If you are using prebuilt calculations from `Crosstab.Calc` or
`Crosstab.Stats`, the main thing to be aware of is the functions ending in
`Of` define _value_ calculations, while those that don't end in `Of` define
_summary_ calculations.

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

{-|

Like `fromList`, but specifying row and column levels explicitly. This saves
one pass through the source data, if you know them up front.

-}
fromListWithLevels :
    Levels comparable1 comparable2
    -> Calc b b d
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Crosstab c d comparable1 comparable2
fromListWithLevels { rows, cols } summary (Calc value) (LevelMap { row, col }) records =
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
            Matrix.update r c (value.accum a) matrix

        initData =
            Matrix.repeat (Array.length rows) (Array.length cols) value.init

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


{-|

Extract the unique row and column levels from source data, given a _level 
mapping_. Used internally by `fromList`, but can be used generally.

    levelsOf (levelMap { row = .group, col = .date }) data

-}
levelsOf :
    LevelMap a comparable1 comparable2
    -> List a
    -> Levels comparable1 comparable2
levelsOf (LevelMap { row, col }) records =
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

{-|

Specify a _level mapping_: a pair of functions for extracting the row and
column levels from a source record.

Note that row and column levels can be any `comparable`, so this includes
tuples of comparables. In this way you can build hierarchical row or column
categories:

    levelMap 
        { row = (\car -> (car.make, car.purchaseCountry))
        , col = (\car -> (car.year, if car.type == 'hybrid' then 1 else 0))
        }

-}
levelMap : 
    { x | row : a -> comparable1, col : a -> comparable2 }
    -> LevelMap a comparable1 comparable2
levelMap {row, col} =
    LevelMap { row = row, col = col }



-- ACCESSORS

{-|

Get the list of row levels from a crosstab.

-}
rowLevelList : Crosstab a b comparable1 comparable2 -> List comparable1
rowLevelList (Crosstab { levels }) =
    Array.toList levels.rows


{-|

Get the list of column levels from a crosstab.

-}
colLevelList : Crosstab a b comparable1 comparable2 -> List comparable2
colLevelList (Crosstab { levels }) =
    Array.toList levels.cols


{-|

Get the list of values from a crosstab (rows of columns).

-}
rowList : Crosstab a b comparable1 comparable2 -> List (List a)
rowList (Crosstab { values }) =
    toListMatrix values

{-|

Get the row summaries from a crosstab.

-}
rowSummaryList : Crosstab a b comparable1 comparable2 -> List b
rowSummaryList (Crosstab { summary }) =
    Array.toList summary.rows


{-|

Get the column summaries from a crosstab.

-}
colSummaryList : Crosstab a b comparable1 comparable2 -> List b
colSummaryList (Crosstab { summary }) =
    Array.toList summary.cols


{-|

Get the table summary ("grand total") from a crosstab.

-}
tableSummary : Crosstab a b comparable1 comparable2 -> b
tableSummary (Crosstab { summary }) =
    summary.table



-- OPERATIONS

{-|

Calculate row, column, and table summaries from the given crosstab using
the given calculation, returning a new crosstab.

In many cases you don't need this additional pass over the data and can do
the necessary summary calculations as part of the initial load (`fromList`).
But in principle you could use it to do a different calculation over the
same crosstab.

For instance, with something like this you could use the same underlying
crosstab data (stored as `Set comparable`)  to calculate _first_ the unique
counts (`Set.size`), and _then_ the quantiles, without having to load the data
in again:

    uniqueCounts =
        fromList 
            (Crosstab.Calc.unique Set.size) 
            (Crosstab.Calc.uniqueOf .y identity)
            (levelMap { row = .x1, col = .x2 })
            data
        
    iqrs =
        uniqueCounts |> calc ( quantiles [0.25,0.5,0.75] )

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

{-|

Compare crosstab values with their corresponding row, column, and table
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

{-|

Compare, and then calculate summaries with the results of the compare operation.

-}
compareAndCalc :
    (Compare a b -> a -> c)
    -> Calc c c d
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c d comparable1 comparable2
compareAndCalc comp (Calc calc) (Crosstab { levels, summary, values }) =
    let
        newValues =
            compareSummaryValues comp calc.init summary values

        newSummary =
            calcValuesSummary (Calc calc) newValues
    in
        Crosstab
            { levels = levels
            , values = newValues
            , summary = newSummary
            }


{-|

The same as `compare`, except the data passed in to your compare function 
includes _cumulative row_ and _cumulative column_ values. In other words, 
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
_compare comparisons_. For example, to calculate _change in row percent_ across
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

{-|

The same as `compareAndCalc`, but using `compareAccum`.

-}
compareAccumAndCalc :
    (CompareAccum a b c -> a -> c)
    -> Calc c c d
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c d comparable1 comparable2
compareAccumAndCalc comp (Calc calc) (Crosstab { levels, summary, values }) =
    let
        newValues =
            compareSummaryValuesAccum comp calc.init summary values

        newSummary =
            calcValuesSummary (Calc calc) newValues
    in
        Crosstab
            { levels = levels
            , values = newValues
            , summary = newSummary
            }



-- CALC CONSTRUCTORS

{-|

TODO

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
    -> Calc a (b,d) f
mapCalcOf2 func (Calc c1) (Calc c2) =
   Calc
      { map = (\(b,d) -> func (c1.map b) (c2.map d))
      , accum = (\a (b,d) -> (c1.accum a b, c2.accum a d))   
      , init = (c1.init, c2.init)
      }

mapCalc2 :
    (c -> e -> f)
    -> Calc b b c
    -> Calc d d e
    -> Calc (b,d) (b,d) f
mapCalc2 func (Calc c1) (Calc c2) =
   Calc
      { map = (\(b,d) -> func (c1.map b) (c2.map d))
      , accum = (\(b1,d1) (b2,d2) -> (c1.accum b1 b2, c2.accum d1 d2))   
      , init = (c1.init, c2.init)
      }


-- INTERNAL


calcValuesSummary : Calc a b c -> Values a -> Summary c
calcValuesSummary (Calc { init, accum, map }) matrix =
    let
        ( nrows, ncols ) =
            matrix.size

        accum_ i j a v =
            { v
                | table = accum a v.table
                , rows = updateArray i (accum a) v.rows
                , cols = updateArray j (accum a) v.cols
            }

        finalize v =
            { v
                | table = map v.table
                , rows = Array.map map v.rows
                , cols = Array.map map v.cols
            }
    in
        foldlMatrix accum_
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
        comparator t r c pr pc =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            }

        compare_ f a t pr pc r c =
            f (comparator t r c pr pc) a

        map_ x y a =
            let
                pr =
                    Matrix.get (x - 1) y matrix

                pc =
                    Matrix.get x (y - 1) matrix

            in
                Maybe.map2 (compare_ func a table pr pc)
                    (Array.get x rows)
                    (Array.get y cols)
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
        ( nrows, ncols ) =
            matrix.size

        comparator t r c pr pc cr cc =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            , cumRow = cr
            , cumCol = cc
            }

        compare_ f a t pr pc cr cc r c =
            f (comparator t r c pr pc cr cc) a

        accum x y a m =
            let
                pr =
                    Matrix.get (x - 1) y matrix

                pc =
                    Matrix.get x (y - 1) matrix

                cr =
                    Matrix.get (x - 1) y m  |> Maybe.withDefault init

                cc =
                    Matrix.get x (y - 1) m  |> Maybe.withDefault init

            in
                Matrix.set
                    x
                    y
                    (Maybe.map2 (compare_ func a table pr pc cr cc)
                        (Array.get x rows)
                        (Array.get y cols)
                        |> Maybe.withDefault init
                    )
                    m
    in
        foldlMatrix accum
            (Matrix.repeat nrows ncols init)
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
            |> Array.map List.reverse
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
