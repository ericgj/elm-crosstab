module Crosstab exposing
    ( Crosstab
    , Spec
    , Dimensions
    , Comparator
    , Table
    , TableRow
    , TableSummaryRow
    , crosstab
    , crosstabWithDimensions
    , dimensionsOf
    , map
    -- , innerJoin
    , mapCompare
    , toTable
    )

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple

type Crosstab a comparable1 comparable2 =
    Crosstab
        { rows : Array comparable1
        , cols : Array comparable2
        , crossValues : Matrix a
        , rowValues : Array a
        , colValues : Array a
        , value : a
        }

type Spec a b comparable1 comparable2
    = Spec 
        { row : (a -> comparable1)
        , col : (a -> comparable2)
        , fold : (a -> b -> b)
        , init : b
        }
      
type alias Dimensions comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }

crosstab : 
    Spec a b comparable1 comparable2 -> 
    List a -> 
    Crosstab b comparable1 comparable2
crosstab (Spec spec) input =
    crosstabWithDimensions 
        (dimensionsOf { row = spec.row, col = spec.col } input)
        (Spec spec) 
        input
        
crosstabWithDimensions : 
    Dimensions comparable1 comparable2 ->
    Spec a b comparable1 comparable2 -> 
    List a -> 
    Crosstab b comparable1 comparable2
crosstabWithDimensions {rows,cols} (Spec {row, col, fold, init}) records =
    let
        toIndexMap array =
            array
                |> Array.foldl (\a (i,d) -> (i + 1, Dict.insert a i d)) (0,Dict.empty)
                |> Tuple.second

        rowMap = 
          toIndexMap rows

        colMap =
          toIndexMap cols

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


dimensionsOf : 
    { x | row: a -> comparable1, col: a -> comparable2 }
    -> List a 
    -> Dimensions comparable1 comparable2
dimensionsOf {row, col} records =
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


{- ----- Not sure about this yet

innerJoin :
    (a -> b -> c)
    -> Crosstab a comparable1 comparable2
    -> Crosstab b comparable1 comparable2
    -> Crosstab c comparable1 comparable2
innerJoin func (Crosstab left) (Crosstab right) =
    let
        rowMap = 
            leftIntersectionMap left.rows right.rows
        colMap =
            leftIntersectionMap left.cols right.cols

        (rows, _) = 
            intersectionFilter rowMap left.rows right.rows

        (cols, _) =
            intersectionFilter colMap left.cols right.cols

        (leftRowV, rightRowV) =
            intersectionFilter rowMap left.rowValues right.rowValues

        (leftColV, rightColV) =
            intersectionFilter colMap left.colValues right.colValues

    in
        Crosstab
            { rows = rows
            , cols = cols
            , rowValues = Array.map2 func leftRowV rightRowV
            , colValues = Array.map2 func leftColV rightColV


intersectionFilter :
    Dict Int Int
    -> Array comparable 
    -> Array comparable
    -> (Array comparable, Array comparable)
intersectionFilter mapper left right =
    let
       filter i j (newL, newR) =
           ( left 
               |> Array.get i 
               |> Maybe.map (\l -> Array.push l newL) 
               |> Maybe.withDefault newL
           , right
               |> Array.get j
               |> Maybe.map (\r -> Array.push r newR)
               |> Maybe.withDefault newR
           )
    in
      mapper
          |> Dict.foldr filter (Array.empty, Array.empty)

leftIntersectionMap : 
    Array comparable 
    -> Array comparable
    -> Dict Int Int
leftIntersectionMap left right =
    let
       rightMap =
           right
               |> Array.foldr (\a (i,dict) -> (i + 1, Dict.insert a i dict)) (0,Dict.empty)
               |> Tuple.second

       maybeInsertDict i d mj =
           mj
             |> Maybe.map (\j -> Dict.insert i j d)
             |> Maybe.withDefault d
    in
      left
          |> Array.foldr 
                 (\a (i,dict) -> (i + 1, Dict.get a rightMap |> maybeInsertDict i dict) )
                 (0,Dict.empty)
          |> Tuple.second

----- -}



-- INTRA-TABLE COMPARISON

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

Transform a Crosstab into a flat Table structure for rendering.

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

first :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> b }
    -> Spec a (Maybe b) comparable1 comparable2
first {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a m -> if m == Nothing then Just (value a) else m)
        , init = Nothing
        }

last :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> b }
    -> Spec a (Maybe b) comparable1 comparable2
last {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a m -> Just (value a))
        , init = Nothing
        }

list :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> b }
    -> Spec a (List b) comparable1 comparable2
list {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a list -> (value a) :: list)
        , init = []
        }

unique :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> comparable3 }
    -> Spec a (Set comparable3) comparable1 comparable2
unique {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a set -> Set.insert (value a) set)
        , init = Set.empty
        }

uniqueCounts :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> comparable3 }
    -> Spec a (Dict comparable3 Int) comparable1 comparable2
uniqueCounts {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a dict -> updateOrInsertDict 0 (value a) (\n -> n + 1) dict)
        , init = Dict.empty
        }


sum : 
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> number }
    -> Spec a number comparable1 comparable2
sum {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a sum -> (value a) + sum)
        , init = 0
        }

count : 
    { x | row : a -> comparable1, col : a -> comparable2 }
    -> Spec a Int comparable1 comparable2
count { row, col } =
    Spec
        { row = row
        , col = col
        , fold = (\a n -> n + 1)
        , init = 0
        }

sumAndCount :
    { x | row : a -> comparable1, col : a -> comparable2, value : a -> number }
    -> Spec a (number,Int) comparable1 comparable2
sumAndCount {row, col, value} =
    Spec
        { row = row
        , col = col
        , fold = (\a (sum,count) -> ((value a) + sum, count + 1))
        , init = (0,0)
        }



-- UTILS

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
