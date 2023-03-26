module Crosstab.ValueLabel exposing (ValueLabel, addMap, addMerge, init, toString)


type ValueLabel
    = ValueLabel
        { value : String
        , accum : Maybe String
        , transforms : List TransformLabel
        }


type TransformLabel
    = Map String
    | Merge String ValueLabel


init : String -> Maybe String -> ValueLabel
init vl al =
    ValueLabel
        { value = vl
        , accum = al
        , transforms = []
        }


addMap : String -> ValueLabel -> ValueLabel
addMap =
    Map >> addTransform


addMerge : String -> ValueLabel -> ValueLabel -> ValueLabel
addMerge s vl =
    Merge s vl |> addTransform


addTransform : TransformLabel -> ValueLabel -> ValueLabel
addTransform t (ValueLabel v) =
    ValueLabel { v | transforms = t :: v.transforms }


toString : ValueLabel -> String
toString (ValueLabel v) =
    case ( v.accum, v.transforms ) of
        ( Nothing, [] ) ->
            v.value

        ( Just a, [] ) ->
            a ++ " " ++ v.value

        ( Nothing, _ ) ->
            v.transforms
                |> List.foldl
                    (\t s -> transformToString t ++ " " ++ "(" ++ s ++ ")")
                    v.value

        ( Just a, _ ) ->
            v.transforms
                |> List.foldl
                    (\t s -> transformToString t ++ " " ++ "(" ++ s ++ ")")
                    (a ++ " " ++ v.value)


transformToString : TransformLabel -> String
transformToString t =
    case t of
        Map s ->
            s

        Merge s v ->
            s ++ " " ++ "(" ++ toString v ++ ")"
