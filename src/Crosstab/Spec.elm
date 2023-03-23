module Crosstab.Spec exposing (Spec(..), rowLevels, columnLevels, value)

import Crosstab.Accum as Accum exposing (Accum)

type Spec a b c
    = Spec
        { rows: List (String, Category a) 
        , columns: List (String, Category a)
        , value: (String, Accum a b c)
        }

type alias Category a = a -> String

rowLevels : Spec a b c -> a -> List String
rowLevels (Spec {rows}) a =
    rows |> List.map (Tuple.second >> (\accessor -> accessor a))

columnLevels : Spec a b c -> a -> List String
columnLevels (Spec {columns}) a =
    columns |> List.map (Tuple.second >> (\accessor -> accessor a))

value : Spec a b c -> a -> ((c -> c), c)
value (Spec s) a =
    s.value |> Tuple.second |> (\accum -> Accum.value accum a)

