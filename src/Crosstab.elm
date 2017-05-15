module Crosstab exposing
    ( Crosstab
    , CrossValue
    , OuterCrossValue
    , RowValue
    , OuterRowValue
    , ColValue
    , OuterColValue
    , crosstab
    , crosstabOptions
    , map
    , mapCompare
    , transpose
    , foldr
    , foldrRows
    , foldrCols
    , foldrOuter
    , foldrOuterRows
    , foldrOuterCols
    )

import Dict exposing (Dict)
import Set exposing (Set)

-- TYPES

type Crosstab record comparable1 comparable2 =
    Crosstab
        { rows : List comparable1
        , cols : List comparable2
        , rowValues : Dict comparable1 record
        , colValues : Dict comparable2 record
        , crossValues : Dict (comparable1, comparable2) record
        , value : record
        }

type CrosstabOptions input output comparable1 comparable2 =
    CrosstabOptions
        { row : (input -> comparable1)
        , col : (input -> comparable2)
        , value : (List input -> output)
        }

type alias CrossValue record comparable1 comparable2 =
    { row : comparable1
    , col : comparable2
    , value : record
    }
   
type alias OuterCrossValue record comparable1 comparable2 =
    { row : comparable1
    , col : comparable2
    , value : Maybe record
    }
   
type alias RowValue record comparable =
    { row : comparable
    , value : record
    }

type alias OuterRowValue record comparable =
    { row : comparable
    , value : Maybe record
    }

type alias ColValue record comparable =
    { col : comparable
    , value : record
    }

type alias OuterColValue record comparable =
    { col : comparable
    , value : Maybe record
    }


-- CONSTRUCTORS

crosstab : 
    CrosstabOptions input output comparable1 comparable2 -> 
    List input -> 
    Crosstab output comparable1 comparable2
crosstab (CrosstabOptions {row,col,value}) records =
    let 
        accum record data =
            let
                row_ = row record
                col_ = col record
                appendOrInit = Maybe.map ((::) record) >> Maybe.withDefault [record] >> Just
            in
                { data
                    | rows = Set.insert row_ data.rows
                    , cols = Set.insert col_ data.cols
                    , rowValues = Dict.update row_ appendOrInit data.rowValues
                    , colValues = Dict.update col_ appendOrInit data.colValues 
                    , crossValues = Dict.update (row_,col_) appendOrInit data.crossValues
                    , raw = (record :: data.raw)
                }

        empty =
            { rows = Set.empty
            , cols = Set.empty
            , rowValues = Dict.empty
            , colValues = Dict.empty
            , crossValues = Dict.empty
            , raw = []
            }

        finalize {rows,cols,rowValues,colValues,crossValues,raw} =
            let
              convert _ values = value values
            in
                Crosstab
                    { rows = Set.toList rows |> List.sort
                    , cols = Set.toList cols |> List.sort
                    , rowValues = Dict.map convert rowValues
                    , colValues = Dict.map convert colValues
                    , crossValues = Dict.map convert crossValues
                    , value = value raw
                    }
    in
        List.foldr accum empty records |> finalize




outerCrossValue : comparable1 -> comparable2 -> Maybe a -> OuterCrossValue a comparable1 comparable2
outerCrossValue row col mval =
    { row = row
    , col = col
    , value = mval
    }

outerRowValue : comparable -> Maybe a -> OuterRowValue a comparable
outerRowValue row mval =
    { row = row
    , value = mval
    }

outerColValue : comparable -> Maybe a -> OuterColValue a comparable
outerColValue col mval =
    { col = col
    , value = mval
    }


-- OPTIONS

crosstabOptions : 
    { row : (input -> comparable1)
    , col : (input -> comparable2)
    , value : (List input -> output)
    } ->
    CrosstabOptions input output comparable1 comparable2
crosstabOptions options =
    CrosstabOptions options



-- MAPS

map :
    (a -> b) ->
    Crosstab a comparable1 comparable2 ->
    Crosstab b comparable1 comparable2
map fn (Crosstab tab) =
    let
        map_ _ a = fn a
    in
        Crosstab
            { tab
                | rowValues = Dict.map map_ tab.rowValues
                , colValues = Dict.map map_ tab.colValues
                , crossValues = Dict.map map_ tab.crossValues
                , value = fn tab.value
            }


type alias Comparator a =
    { table: a
    , row : a
    , col : a
    }

comparator : a -> a -> a -> Comparator a
comparator tab row col =
    {table = tab, row = row, col = col}

tableComparator : a -> Comparator a
tableComparator tab =
    {table = tab, row = tab, col = tab}

rowComparator : a -> a -> Comparator a
rowComparator tab row =
    {table = tab, row = row, col = tab}

colComparator : a -> a -> Comparator a
colComparator tab col =
    {table = tab, row = tab, col = col}


mapCompare :
    (Comparator a -> a -> b) ->
    Crosstab a comparable1 comparable2 ->
    Crosstab b comparable1 comparable2
mapCompare compare (Crosstab tab) =
    let
        -- TODO: change Crosstab to eliminate "triple lookup" and get rid of this
        unsafeGet key dict =
            Dict.get key dict
                |> Maybe.withDefault (Debug.crash "should never happen")

        mapCrossValue (row,col) val =
            comparator 
                tab.value 
                (unsafeGet row tab.rowValues) 
                (unsafeGet col tab.colValues)
                |> flip compare val

        mapColValue col val = 
            compare (rowComparator tab.value val) val
      
        mapRowValue row val =
            compare (colComparator tab.value val) val

        mapTabValue val =
            compare (tableComparator tab.value) val
    in
        Crosstab
            { tab
                | rowValues = Dict.map mapRowValue tab.rowValues
                , colValues = Dict.map mapColValue tab.colValues
                , crossValues = Dict.map mapCrossValue tab.crossValues
                , value = mapTabValue tab.value
            }



{-  can't quite get it to work, what is the summary (value) function?

mapCompare :
    (a -> RowValue a comparable1 -> ColValue a comparable2 -> a -> b) ->
    Crosstab a comparable1 comparable2 ->
    Crosstab b comparable1 comparable2
mapCompare compare (Crosstab {rowValues,colValues,crossValues,value}) =
    let
        options_ =
            crosstabOptions { row = .row, col = .col, value =  ????  }

        compare_ tv row col val rv cv =
            { row = row
            , col = col
            , value = 
                compare tv {row = row, value = rv} {col = col, value = cv} val
            }

        accum_ (row,col) val list =
            Maybe.map2 
                (compare_ value row col val)
                (Dict.get row rowValues)
                (Dict.get col colValues)
                |> (\b -> b :: list) 
    in
        Dict.foldr accum_ [] crossValues
            |> List.filterMap identity
            |> crosstab options_

-}


transpose :
    Crosstab a comparable1 comparable2 ->
    Crosstab a comparable2 comparable1
transpose (Crosstab tab) =
    let
        swapKeys : (comparable1,comparable2) -> a -> Dict (comparable2,comparable1) a -> Dict (comparable2,comparable1) a
        swapKeys (row,col) val newdict =
            Dict.insert (col,row) val newdict
    in
        Crosstab
            { tab
                | rows = tab.cols
                , cols = tab.rows
                , rowValues = tab.colValues
                , colValues = tab.rowValues
                , crossValues = Dict.foldr swapKeys Dict.empty tab.crossValues
                , value = tab.value
            }


-- FOLDS

foldr : 
    ((CrossValue a comparable1 comparable2) -> b -> b) ->
    b ->
    Crosstab a comparable1 comparable2 ->
    b
foldr accum init (Crosstab {crossValues}) =
    let
        accum_ (row,col) a b =
            accum {row = row, col = col, value = a} b
    in
        Dict.foldr accum_ init crossValues 


foldrRows :
  ((RowValue a comparable1) -> b -> b) ->
  b ->
  Crosstab a comparable1 comparable2 ->
  b
foldrRows accum init (Crosstab {rowValues}) =
    let
        accum_ row a b =
            accum {row = row, value = a} b
    in
        Dict.foldr accum_ init rowValues


foldrCols :
  ((ColValue a comparable2) -> b -> b) ->
  b ->
  Crosstab a comparable1 comparable2 ->
  b
foldrCols accum init (Crosstab {colValues}) =
    let
        accum_ col a b =
            accum {col = col, value = a} b
    in
        Dict.foldr accum_ init colValues


foldrOuter :
    ((OuterCrossValue a comparable1 comparable2) -> b -> b) ->
    b ->
    Crosstab a comparable1 comparable2 ->
    b
foldrOuter accum init (Crosstab {rows,cols,crossValues}) =
    let
        accum_ (row,col) b =
            Dict.get (row,col) crossValues
              |> (outerCrossValue row col)
              |> (flip accum b)
    in
        listCombine (,) rows cols
          |> List.foldr accum_ init


foldrOuterRows :
    ((OuterRowValue a comparable1) -> b -> b) ->
    b ->
    Crosstab a comparable1 comparable2 ->
    b
foldrOuterRows accum init (Crosstab {rows,rowValues}) =
    let
        accum_ row b =
            Dict.get row rowValues
              |> (outerRowValue row)
              |> (flip accum b)
    in
        List.foldr accum_ init rows


foldrOuterCols :
    ((OuterColValue a comparable2) -> b -> b) ->
    b ->
    Crosstab a comparable1 comparable2 ->
    b
foldrOuterCols accum init (Crosstab {cols,colValues}) =
    let
        accum_ col b =
            Dict.get col colValues
              |> (outerColValue col)
              |> (flip accum b)
    in
        List.foldr accum_ init cols



-- INTERNAL


listCombine : (a -> b -> c) -> List a -> List b -> List c
listCombine fn xs ys =
    List.concatMap (\x -> List.map (\y -> fn x y) ys) xs
