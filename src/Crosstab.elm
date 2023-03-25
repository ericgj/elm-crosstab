module Crosstab exposing (Crosstab, tabulate)

import Dict exposing (Dict)

import List.Extra as List
import Matrix exposing (Matrix)

import Crosstab.Spec as Spec exposing (Spec)
import Crosstab.Accum exposing (Accum)

type Crosstab a
    = Crosstab 
        { rowDimLabels : List String
        , columnDimLabels : List String
        , valueLabel : String
        , table : Table a
        }

type alias Table a = Dict LevelsPair a
type alias LevelsPair = (Levels, Levels)
type alias Levels = List String

-- CONSTRUCTING

init : Spec a b c -> Crosstab c
init spec =
    Crosstab 
        { rowDimLabels = Spec.rowLabels spec
        , columnDimLabels = Spec.columnLabels spec
        , valueLabel = Spec.valueLabel spec
        , table = Dict.empty
        }

map : (a -> b) -> Crosstab a -> Crosstab b
map fn (Crosstab c) =
    Crosstab 
        { rowDimLabels = c.rowDimLabels
        , columnDimLabels = c.columnDimLabels
        , valueLabel = c.valueLabel
        , table = Dict.map (\k a -> fn a) c.table
        }


tabulate : Spec a b c -> List a -> Crosstab c
tabulate spec =
    List.foldr 
        (\a cur -> updateCrosstabTable spec a cur)
        (init spec)

updateCrosstabTable : Spec a b c -> a -> Crosstab c -> Crosstab c
updateCrosstabTable spec a (Crosstab c) =
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
        { c | table = updateTable combos fn initVal c.table }

updateTable : List LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateTable combos fn initVal tab =
    List.foldr 
        (\levelsPair cur -> updateCell levelsPair fn initVal cur) 
        tab
        combos 

updateCell : LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateCell levelsPair fn initVal tab =
    case Dict.get levelsPair tab of
        Just c ->
            tab |> Dict.insert levelsPair (fn c)
                
        Nothing ->
            tab |> Dict.insert levelsPair initVal





-- DISPLAY

-- a somewhat loose type that could model both single-dim and multi-dim tables
-- should be a target type used for display, not further calculation
-- because it has flattened all dimensions

type FlatTable a
    = FlatTable
        { rows : List (List (String, String))   
        , columns : List (List (String, String))
        , valueLabel : String
        , table : Matrix a 
        }

toFlatTable : Crosstab a -> FlatTable (Maybe a)
toFlatTable (Crosstab {rowDimLabels, columnDimLabels, valueLabel, table}) =
    let
        (rowCoords, colCoords) = 
            table
                |> Dict.keys
                |> List.foldr (\(r,c) (rs,cs) -> ((r::rs),(c::cs))) ([],[])
                |> Tuple.mapBoth 
                    (List.sortBy identity)
                    (List.sortBy identity)
        indexedCoords =
            List.lift2 
                Tuple.pair
                (rowCoords |> List.indexedMap Tuple.pair)
                (colCoords |> List.indexedMap Tuple.pair)
        matrix =
            Matrix.repeat (List.length rowCoords) (List.length colCoords) Nothing
        flatTable =
            List.foldr 
                (\((ri,rkey),(ci,ckey)) mx -> 
                    table 
                        |> Dict.get (rkey,ckey) 
                        |> (\m -> Matrix.set ri ci m mx)
                )
                matrix
                indexedCoords
    in
    FlatTable
        { rows = rowCoords |> injectDimLabels rowDimLabels
        , columns = colCoords |> injectDimLabels columnDimLabels
        , valueLabel = valueLabel
        , table = flatTable
        }

injectDimLabels : List String -> List Levels -> List (List (String, String))
injectDimLabels labels combos =
    combos
        |> List.map (List.map2 Tuple.pair labels)

