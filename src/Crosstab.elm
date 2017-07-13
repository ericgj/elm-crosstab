module Crosstab exposing
    ( Crosstab
    , Spec
    , Levels
    , Comparator
    , Table
    , TableRow
    , TableSummaryRow
    , crosstab
    , crosstabWithLevels
    , levelsOf
    , map
    -- , innerJoin
    , mapCompare
    , first, last, maybe, list, count, unique, uniqueCounts, sum, customSpec
    , get, getMaybe, getRow, getCol, rowSummary, colSummary, tableSummary
    , toTable
    )

{-|

A library for calculating crosstab (AKA contingency) tables.

Built on top of [elm-flat-matrix][].

# Constructing

@docs crosstab, crosstabWithLevels, levelsOf, Levels

# Specs

A `Spec` is configuration used in constructing a crosstab. At the most basic
level, it allows you to specify 

  - **row**, how to get the row level from a source record
  - **col**, how to get the column level from a source record
  - **fold**, a calculation function based on source record and default value
  - **init**, the default value

However, these parameters are quite general and often specs can be constructed
in simpler ways.

@docs first, last, maybe, list, count, unique, uniqueCounts, sum, customSpec

# Mapping

@docs map, mapCompare, Comparator

# Extracting

@docs get, getMaybe, getRow, getCol, rowSummary, colSummary, tableSummary 

# Transforming

@docs toTable, Table, TableRow, TableSummaryRow 

# Internal types

@docs Crosstab, Spec


[elm-flat-matrix]: https://package.elm-lang.org/packages/eeue56/elm-flat-matrix/latest

-}


import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


{-|

Internal structure of a crosstab table.

-}
type Crosstab a comparable1 comparable2 =
    Crosstab
        { rows : Array comparable1
        , cols : Array comparable2
        , crossValues : Matrix a
        , rowValues : Array a
        , colValues : Array a
        , value : a
        }

{-|

Internal structure of a 'spec' used to construct a crosstab table.

A `Spec` specifies the row and column levels of the crosstab, and how the
calculation is done in terms of a `fold` function and `init` value.

See the [Specs](#specs) section for details.

-}
type Spec a b comparable1 comparable2
    = Spec 
        { row : (a -> comparable1)
        , col : (a -> comparable2)
        , fold : (a -> b -> b)
        , init : b
        }
  
{-|

Manually-specified levels (unique, ordered row and column values) of the 
crosstab table. Use this with `crosstabWithLevels`.

-}
type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


{-|

Construct a crosstab table from the given `Spec` and list of source records.

The levels of the crosstab are automatically derived from the source
records.

See the [Specs](#specs) section for details of how to build a `Spec`. 

This example uses the `sum` builder:

    data : List { x : String, y : Int, z : Float }
    data = [ ... ]

    table = 
        crosstab 
            (sum {row = .x, col = .y, value = .z})
            data

-}
crosstab : 
    Spec a b comparable1 comparable2 -> 
    List a -> 
    Crosstab b comparable1 comparable2
crosstab (Spec spec) input =
    crosstabWithLevels 
        (levelsOf { row = spec.row, col = spec.col } input)
        (Spec spec) 
        input


{-|

Construct a crosstab table with the given `Levels`, `Spec`, and list of
source records.

Use this if you know your row and column levels in advance, and/or if you
want to specify a custom order for rows and columns.

-}
crosstabWithLevels : 
    Levels comparable1 comparable2 ->
    Spec a b comparable1 comparable2 -> 
    List a -> 
    Crosstab b comparable1 comparable2
crosstabWithLevels {rows,cols} (Spec {row, col, fold, init}) records =
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

        accumHelp r c a { crossValues, rowValues, colValues, value } =
            { crossValues = Matrix.update r c (fold a) crossValues
            , rowValues = updateArray r (fold a) rowValues
            , colValues = updateArray c (fold a) colValues
            , value = fold a value
            }

        initData =
          { crossValues = 
              Matrix.repeat (Array.length rows) (Array.length cols) init
          , rowValues =
              Array.repeat (Array.length rows) init
          , colValues =
              Array.repeat (Array.length cols) init
          , value = 
              init
          }

        finalize {crossValues, rowValues, colValues, value } =
            Crosstab
              { rows = rows
              , cols = cols
              , crossValues = crossValues
              , rowValues = rowValues
              , colValues = colValues
              , value = value
              }

    in
        List.foldr accum initData records 
            |> finalize

{-|

Get the levels (unique row and column values) of the given source data.

    data : List { x : String, y : Int, z : Float }
    data = [ ... ]

    dims = levelsOf { row = .x, col = .y } data
    -->  { rows = ["A", "B", "C"], cols = [1, 2, 3] }

-}
levelsOf : 
    { x | row: a -> comparable1, col: a -> comparable2 }
    -> List a 
    -> Levels comparable1 comparable2
levelsOf {row, col} records =
    let
        toArray set =
            Set.foldl Array.push Array.empty set
    
        accum record (rows,cols) =
            (Set.insert (row record) rows, Set.insert (col record) cols)
            
        finalize (rows, cols) =
            { rows = toArray rows, cols = toArray cols }
    in
        List.foldr accum (Set.empty, Set.empty) records
            |> finalize

{-|

Map a given function onto the crosstab table.

You can use this to do multi-pass calculations. For example, let's say you
want to calculate the median. There are methods to approximate this in one pass,
but the basic algorithm needs two passes: one to collect the individual values
and the second to get the median value from these.

    median : List number -> Maybe Float
    median values =  ...

    data : List { x : String, y : Int, z : Float }
    data = [ ... ]

    medianTable : Crosstab (Maybe Float) String Int
    medianTable =
        crosstab (list {row = .x, col = .y, value = .z}) data
            |> Crosstab.map median

-}
map :
    (a -> b)
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
map func (Crosstab tab) =
    Crosstab
        { tab
            | rowValues = Array.map func tab.rowValues
            , colValues = Array.map func tab.colValues
            , crossValues = Matrix.map func tab.crossValues
            , value = func tab.value
        }


-- TODO: innerJoin, which is map2 with the row/col intersections of 2 crosstabs


-- INTRA-TABLE COMPARISON

{-|

Structure for intra-table comparisons. Used in `mapCompare` folding.

  - **row** is the current row summary value
  - **col** is the current column summary value
  - **table** is the current table summary value

-}
type alias Comparator a =
    { row : a
    , col : a
    , table : a
    }

comparator : a -> a -> a -> Comparator a
comparator row col tab =
    { row = row
    , col = col
    , table = tab
    }

rowComparator : a -> a -> Comparator a
rowComparator col tab =
    { row = tab
    , col = col
    , table = tab
    }

colComparator : a -> a -> Comparator a
colComparator row tab =
    { row = row
    , col = tab
    , table = tab
    }

tableComparator : a -> Comparator a
tableComparator tab =
    { row = tab
    , col = tab
    , table = tab
    }

{-|

Map a function over a crosstab which has _intra-table comparisons_ in scope. 

This can be used for calculations involving row, column, and table summaries
in relation to each row-column value. For example, this could be used to
calculate values as a percentage of the row total.

    rowPct : Comparator Float -> Float -> Float
    rowPct {row} value = value / row

    table =
        crosstab (sum {row = .x, col = .y, .value = .z}) data
            |> mapCompare rowPct

Note that the type signature of `Crosstab` enforces that all results
(i.e, of row, column, row-column pairs, and overall table calculations) have the 
same type. So when using `mapCompare`, please note that row, column, and
table calculations will also be done, in addition to the row-column pair
calculations.

For row summaries, the row comparison is to is _itself_, and the column 
comparison is to the _table_ summary. For column summaries, the row comparison 
is to the _table_ summary, and the column comparison is to _itself_.

This means that in the example above, the resulting row summaries will all be
1 (the row total percent of the row total is 100%). The resulting column 
summaries will be expressed as percent of the _table_ total: in other words, 
the column total percent of the sum of the row totals. In this way, the 
summary calculations are in the same units as individual row-column pair 
calculations.

-}
mapCompare :
    b 
    -> ( Comparator a -> a -> b )
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
mapCompare default func (Crosstab tab) =
    let
        rowCompare f val =
            f (colComparator val tab.value) val

        colCompare f val =
            f (rowComparator val tab.value) val

        crossCompare f row col val =
            Maybe.map2 (\rval cval -> f (comparator rval cval tab.value) val)
                (Array.get row tab.rowValues)
                (Array.get col tab.colValues)
                |> Maybe.withDefault default
    in
        Crosstab
            { tab
                | rowValues = Array.map (rowCompare func) tab.rowValues
                , colValues = Array.map (colCompare func) tab.colValues
                , crossValues = Matrix.indexedMap (crossCompare func) tab.crossValues
                , value = func (tableComparator tab.value) tab.value
            }


-- EXTRACTING

{-|

Get the row summary, i.e. summary across all columns for each row, as an 
`Array`.

-}
rowSummary : Crosstab a comparable1 comparable2 -> Array a
rowSummary (Crosstab {colValues}) =
    colValues

{-|

Get the column summary, i.e. summary across all rows for each column, as an
`Array`.

-}
colSummary : Crosstab a comparable1 comparable2 -> Array a
colSummary (Crosstab {rowValues}) =
    rowValues

{-|

Get the table summary, i.e. summary across all row-column pairs.

-}
tableSummary : Crosstab a comparable1 comparable2 -> a
tableSummary (Crosstab {value}) =
    value

{-|

Get the result at the given named `row` and `col`, if such combination exists
in the crosstab. 

Note rows and columns can be any `comparable`, not only `String`.

-}
get : 
    { x | 
        row : comparable1
      , col : comparable2
    } 
    -> Crosstab a comparable1 comparable2
    -> Maybe a
get {row, col} (Crosstab {rows, cols, crossValues}) =
    let
      rowMap = 
          indexMapArray rows
      colMap = 
          indexMapArray cols
    in
        Dict.get row rowMap
            |> Maybe.andThen (\i -> 
                Dict.get col colMap
                    |> Maybe.andThen (\j ->
                        Matrix.get i j crossValues
                    )
            )

{-|

For an 'outer' crosstab table (with potentially missing values), get the result
at the given named `row` and `col`, if such combination exists in the crosstab.

Note this function flattens the distinction between _row-col combination
doesn't exist in the table_ and _row-col combination exists in table but is
missing (Nothing)_. A convenience for the most typical cases.

-}
getMaybe :
    { x | 
        row : comparable1
      , col : comparable2
    } 
    -> Crosstab (Maybe a) comparable1 comparable2
    -> Maybe a
getMaybe ids crosstab =
    get ids crosstab |> Maybe.withDefault Nothing 


{-|

Get the results for the given named row, if the row exists in the crosstab, as
an `Array`.

-}
getRow : comparable1 -> Crosstab a comparable1 comparable2 -> Maybe (Array a)
getRow id (Crosstab {rows, crossValues}) =
    rows
        |> indexMapArray
        |> Dict.get id
        |> Maybe.andThen (\i -> Matrix.getRow i crossValues)


{-|

Get the results for the given named column, if the column exists in the 
crosstab, as an `Array`.

-}
getCol : comparable2 -> Crosstab a comparable1 comparable2 -> Maybe (Array a)
getCol id (Crosstab {cols, crossValues}) =
    cols
        |> indexMapArray
        |> Dict.get id
        |> Maybe.andThen (\i -> Matrix.getColumn i crossValues)



-- TRANSFORMING

{-| 

A flat structure suitable for rendering crosstab data, for instance as an HTML 
table.

  - **cols** is a list of column headers
  - **rows** is a list of "detail" rows (see `TableRow` below)
  - **summaryRow** is the column summary row (see `TableSummaryRow` below)

-}
type alias Table a comparable1 comparable2 =
    { cols : List comparable2
    , rows : List (TableRow a comparable1)
    , summaryRow : TableSummaryRow a
    }


{-|

Detail row of the table.

  - **row** is the row header
  - **values** is a list of results, ordered in crosstab column order
  - **summary** is the row summary result

-}
type alias TableRow a comparable =
    { row : comparable
    , values : List a
    , summary : a
    }


{-|

Summary row of the table (i.e., column and table summaries).

  - **values** is a list of column summary results
  - **summary** is the table summary result

-}
type alias TableSummaryRow a =
    { values : List a
    , summary : a
    }


{-|

Transform a `Crosstab` into a flat `Table` structure for rendering.

-}
toTable : Crosstab a comparable1 comparable2 -> Table a comparable1 comparable2
toTable (Crosstab { rows, cols, rowValues, colValues, crossValues, value }) =
    let
        toTableRow i row =
            let
                mvals =
                    Matrix.getColumn i crossValues |> Maybe.map (Array.toList)

                msum =
                    Array.get i rowValues
            in
                Maybe.map2 (TableRow row) mvals msum
    in
        { cols = Array.toList cols
        , rows =
            rows
                |> Array.indexedMap toTableRow
                |> Array.toList
                |> List.filterMap identity
        , summaryRow =
            { values = colValues |> Array.toList
            , summary = value
            }
        }



-- TYPICAL SPECS
-- maybe move some of these to a Stats module

{-|

Use the first observation for a given row and column level. 

If you are sure your source data has zero or one observations for every row/col
pair, or you don't care about any except the first observation, you can use
this spec constructor.

-}
first :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> b 
    }
    -> Spec a (Maybe b) comparable1 comparable2
first {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a m -> if m == Nothing then Just (value a) else m)
        , init = Nothing
        }

{-|

Similar to `first`, but takes the _last_ observation for a given row and column
level.

-}
last :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> b 
    }
    -> Spec a (Maybe b) comparable1 comparable2
last {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a m -> Just (value a))
        , init = Nothing
        }

{-|

Use this to construct a `Spec` for cases where a row or column level in the 
crosstab is not present in the source data, i.e. there may be missing values.

Note `value` is a default function applied to the first observation only. If
there are no observations for a given level, the value is `Nothing`.

-}
maybe :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , fold : a -> b -> b
      , value : a -> b 
    }
    -> Spec a (Maybe b) comparable1 comparable2
maybe { row, col, fold, value } =
    Spec
        { row = row
        , col = col
        , fold = 
            (\a mb -> 
                mb |> Maybe.withDefault (value a) |> Just |> Maybe.map (fold a) 
            )
        , init = Nothing
        }
        
{-|

Accumulate a list of observations for each level. Used if you are doing a
second-pass (map) over the crosstab. 

Note this can be quite memory intensive for large source data, so use with 
caution. Can you summarize that data before it gets to the Elm app?

-}
list :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> b 
    }
    -> Spec a (List b) comparable1 comparable2
list {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a list -> (value a) :: list)
        , init = []
        }

{-|

Accumulate unique values from source data, in a `Set`. This can also be quite 
memory intensive.

Note that the value type must be `comparable`.

-}
unique :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> comparable3 
    }
    -> Spec a (Set comparable3) comparable1 comparable2
unique {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a set -> Set.insert (value a) set)
        , init = Set.empty
        }

{-|

Accumulate counts of unique values from source data, in a `Dict`. This can also 
be quite memory intensive.

Note that the value type must be `comparable`.

-}
uniqueCounts :
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> comparable3 
    }
    -> Spec a (Dict comparable3 Int) comparable1 comparable2
uniqueCounts {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a dict -> updateOrInsertDict 0 (value a) (\n -> n + 1) dict)
        , init = Dict.empty
        }

{-|

Sum numeric values per level from source data.

-}
sum : 
    { x | 
        row : a -> comparable1
      , col : a -> comparable2
      , value : a -> number 
    }
    -> Spec a number comparable1 comparable2
sum {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a sum -> (value a) + sum)
        , init = 0
        }

{-|

Count observations per level from source data.

-}
count : 
    { x | 
        row : a -> comparable1
      , col : a -> comparable2 
    }
    -> Spec a Int comparable1 comparable2
count { row, col } =
    Spec
        { row = row
        , col = col
        , fold = (\a n -> n + 1)
        , init = 0
        }

{-|

Construct a completely custom `Spec`.

-}
customSpec :
    { x |
        row : a -> comparable1
      , col : a -> comparable2
      , fold : a -> b -> b
      , init : b 
    }
    -> Spec a b comparable1 comparable2
customSpec { row, col, fold, init } =
    Spec
        { row = row
        , col = col
        , fold = fold
        , init = init
        }


-- UTILS

indexMapArray : Array comparable -> Dict comparable Int
indexMapArray array =
    array
        |> Array.foldl (\a (i,d) -> (i + 1, Dict.insert a i d)) (0,Dict.empty)
        |> Tuple.second

updateArray : Int -> (a -> a) -> Array a -> Array a
updateArray index func array =
   array
       |> Array.get index
       |> Maybe.map (\a -> Array.set index (func a) array)
       |> Maybe.withDefault array


updateOrInsertDict : a -> comparable -> (a -> a) -> Dict comparable a -> Dict comparable a
updateOrInsertDict default key func dict =
    if Dict.member key dict then
        Dict.update key (\mval -> mval |> Maybe.map func) dict
    else
        Dict.insert key default dict

