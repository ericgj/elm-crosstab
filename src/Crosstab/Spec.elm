module Crosstab.Spec exposing
    ( Spec
    , columnLabels
    , columnLevels
    , init
    , rowLabels
    , rowLevels
    , value
    , valueLabel
    )

import Crosstab.Accum as Accum exposing (Accum(..))
import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)


type Spec a b c
    = Spec (SpecData a b c)


type alias SpecData a b c =
    { rows : List ( String, Category a )
    , columns : List ( String, Category a )
    , value : ( String, Accum a b c )
    }


type alias Category a =
    a -> String



-- GETTERS


init : SpecData a b c -> Spec a b c
init s =
    Spec { rows = s.rows, columns = s.columns, value = s.value }


rowLabels : Spec a b c -> List String
rowLabels (Spec { rows }) =
    rows |> List.map Tuple.first


columnLabels : Spec a b c -> List String
columnLabels (Spec { columns }) =
    columns |> List.map Tuple.first


valueLabel : Spec a b c -> ValueLabel
valueLabel (Spec s) =
    let
        ( l, Accum a ) =
            s.value
    in
    ValueLabel.init l a.label


rowLevels : Spec a b c -> a -> List String
rowLevels (Spec { rows }) a =
    rows |> List.map (Tuple.second >> (\accessor -> accessor a))


columnLevels : Spec a b c -> a -> List String
columnLevels (Spec { columns }) a =
    columns |> List.map (Tuple.second >> (\accessor -> accessor a))


value : Spec a b c -> a -> ( c -> c, c )
value (Spec s) a =
    s.value |> Tuple.second |> (\accum -> Accum.value accum a)
