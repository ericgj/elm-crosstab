module Crosstab exposing (Crosstab, tabulate)

import Dict exposing (Dict)

import List.Extra as List
import DimTree exposing (DimTree)
import Matrix exposing (Matrix)

import Crosstab.Spec as Spec exposing (Spec)
import Crosstab.Accum exposing (Accum)

type Crosstab a
    = Crosstab 
        { table : Table a
        , rowDims : DimTree String
        , colDims : DimTree String
        }

type alias Table a = Dict Levels a
type alias Levels = (List String, List String)

-- CONSTRUCTING

init : Crosstab a
init =
    Crosstab { table = Dict.empty, rowDims = DimTree.empty, colDims = DimTree.empty }

tabulate : Spec a b c -> List a -> Crosstab c
tabulate spec =
    List.foldr 
        (\a cur -> update spec a cur)
        init

update : Spec a b c -> a -> Crosstab c -> Crosstab c
update spec a (Crosstab {table,rowDims,colDims}) =
    let
        rows = Spec.rowLevels spec a
        cols = Spec.columnLevels spec a
        (fn, initVal) = Spec.value spec a
        combos = 
            List.lift2 
                Tuple.pair 
                (rows |> List.combinationsFrom 0) 
                (cols |> List.combinationsFrom 0)
    in
    Crosstab
        { table = updateTable combos fn initVal table
        , rowDims = DimTree.addBranches rows rowDims 
        , colDims = DimTree.addBranches cols colDims
        }

updateTable : List Levels -> (c -> c) -> c -> Table c -> Table c
updateTable levelPairs fn initVal tab =
    List.foldr 
        (\levels cur -> updateCell levels fn initVal cur) 
        tab
        levelPairs 

updateCell : Levels -> (c -> c) -> c -> Table c -> Table c
updateCell levels fn initVal tab =
    case Dict.get levels tab of
        Just c ->
            tab |> Dict.insert levels (fn c)
                
        Nothing ->
            tab |> Dict.insert levels initVal


-- QUERYING

getTable : Int -> Int -> Crosstab a -> Matrix (Maybe a)
getTable rowDim colDim (Crosstab {table,rowDims,colDims}) =
    let
        rowLevels = rowDims |> getLevels rowDim |> List.indexedMap Tuple.pair
        colLevels = colDims |> getLevels colDim |> List.indexedMap Tuple.pair
        nrows = List.length rowLevels
        ncols = List.length colLevels
        levelCoords = 
            List.lift2 
                Tuple.pair 
                rowLevels 
                colLevels
        matrix = Matrix.repeat nrows ncols Nothing
    in
    List.foldr 
        (\((r,rkey),(c,ckey)) mx -> 
            table 
                |> Dict.get (rkey,ckey) 
                |> (\m -> Matrix.set r c m mx)
        )
        matrix
        levelCoords


getLevels : Int -> DimTree String -> List (List String)
getLevels dim =
    filterLevels (List.length >> ((==) dim))

filterLevels : (List String -> Bool) -> DimTree String -> List (List String)
filterLevels fn tree = 
    tree
        |> DimTree.walkBreadth (\parents self -> parents ++ [self])
        |> List.filter fn

