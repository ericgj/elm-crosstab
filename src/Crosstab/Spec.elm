module Crosstab.Spec exposing 
    ( Spec
    , rowLabels
    , columnLabels
    , valueLabel
    , rowLevels
    , columnLevels
    , value
    )

import Crosstab.Accum as Accum exposing (Accum)

type Spec a b c
    = Spec (SpecData a b c)

type alias SpecData a b c =
    { rows: List (String, Category a) 
    , columns: List (String, Category a)
    , value: (String, Accum a b c)
    }

type alias Category a = a -> String


init : SpecData a b c -> Spec a b c
init s =
    Spec { rows = s.rows, columns = s.columns, value = s.value }

rowLabels : Spec a b c -> List String
rowLabels (Spec {rows}) =
    rows |> List.map (Tuple.first)

columnLabels : Spec a b c -> List String
columnLabels (Spec {columns}) =
    columns |> List.map (Tuple.first)

valueLabel : Spec a b c -> String
valueLabel (Spec s) =
    s.value |> Tuple.first

rowLevels : Spec a b c -> a -> List String
rowLevels (Spec {rows}) a =
    rows |> List.map (Tuple.second >> (\accessor -> accessor a))

columnLevels : Spec a b c -> a -> List String
columnLevels (Spec {columns}) a =
    columns |> List.map (Tuple.second >> (\accessor -> accessor a))

value : Spec a b c -> a -> ((c -> c), c)
value (Spec s) a =
    s.value |> Tuple.second |> (\accum -> Accum.value accum a)



