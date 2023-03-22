module List.Extra exposing (andThen, lift2, combinationsFrom)

import List exposing (..)

andThen : (a -> List b) -> List a -> List b
andThen = 
    concatMap

lift2 : (a -> b -> c) -> List a -> List b -> List c
lift2 f la lb =
    la |> andThen (\a -> lb |> andThen (\b -> [ f a b ]))


combinationsFrom : Int -> List a -> List (List a)
combinationsFrom start list =
    List.length list
        |> List.range start
        |> List.map (\n -> List.take n list)

