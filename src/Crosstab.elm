module Crosstab exposing (Crosstab, tabulate)

import List.Extra as List
import Dict exposing (Dict)

import List.Extra exposing (combinationsFrom)

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
        { table : Dict Levels (List Accum) }

type alias Levels = (List String, List String)

init : Crosstab
init =
    Crosstab { table = Dict.empty }

tabulate : Spec a -> List a -> Crosstab
tabulate spec =
    List.foldr 
        (\a cur -> update spec a cur)
        init

update : Spec a -> a -> Crosstab -> Crosstab
update spec a xtab =
    let
        rows = rowLevels spec a |> combinationsFrom 0
        cols = columnLevels spec a |> combinationsFrom 0
        combos = List.lift2 Tuple.pair rows cols
        vals = values spec a
        inits = initAccums spec
    in
        updateLevelPairs combos vals inits xtab

updateLevelPairs : List Levels -> List Value -> List Accum -> Crosstab -> Crosstab
updateLevelPairs levelPairs values inits xtab =
    List.foldr 
        (\levels cur -> updateLevelPair levels values inits cur) 
        xtab
        levelPairs 

updateLevelPair : Levels -> List Value -> List Accum -> Crosstab -> Crosstab
updateLevelPair levels values inits (Crosstab {table}) =
    case Dict.get levels table of
        Just accums ->
            Crosstab 
                { table = Dict.insert levels (accumulate values accums) table }
                
        Nothing ->
            Crosstab 
                { table = Dict.insert levels (accumulate values inits) table }


