module Crosstab exposing (Crosstab, tabulate)

import Dict exposing (Dict)

import List.Extra as List
import DimTree exposing (DimTree)
import Matrix exposing (Matrix)

import Crosstab.Spec exposing 
    ( Spec
    , rowLevels
    , columnLevels
    , values
    , initAccums
    )
import Crosstab.Accum exposing
    ( Value
    , Accum
    , accumulate
    )


type Crosstab 
    = Crosstab 
        { table : Table
        , rowDims : DimTree String
        , colDims : DimTree String
        }

type alias Table = Dict Levels (List Accum)
type alias Levels = (List String, List String)

-- CONSTRUCTING

init : Crosstab
init =
    Crosstab { table = Dict.empty, rowDims = DimTree.empty, colDims = DimTree.empty }

tabulate : Spec a -> List a -> Crosstab
tabulate spec =
    List.foldr 
        (\a cur -> update spec a cur)
        init

update : Spec a -> a -> Crosstab -> Crosstab
update spec a (Crosstab {table,rowDims,colDims}) =
    let
        rows = rowLevels spec a
        cols = columnLevels spec a
        vals = values spec a
        inits = initAccums spec
        combos = 
            List.lift2 
                Tuple.pair 
                (rows |> List.combinationsFrom 0) 
                (cols |> List.combinationsFrom 0)
    in
    Crosstab
        { table = updateTable combos vals inits table
        , rowDims = DimTree.addBranches rows rowDims 
        , colDims = DimTree.addBranches cols colDims
        }

updateTable : List Levels -> List Value -> List Accum -> Table -> Table
updateTable levelPairs values inits tab =
    List.foldr 
        (\levels cur -> updateLevelPair levels values inits cur) 
        tab
        levelPairs 

updateLevelPair : Levels -> List Value -> List Accum -> Table -> Table
updateLevelPair levels values inits tab =
    case Dict.get levels tab of
        Just accums ->
            Dict.insert levels (accumulate values accums) tab
                
        Nothing ->
            Dict.insert levels (accumulate values inits) tab


-- QUERYING

getTable : Int -> Int -> Crosstab -> Matrix (Maybe (List Accum))
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

