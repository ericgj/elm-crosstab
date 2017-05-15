module Crosstab.Stats exposing 
    ( Basic
    , basic
    )


type alias Basic =
    { min : Float
    , max : Float
    , count : Int
    , sum : Float
    , mean : Float
    , sd : Float
    }

basic : List Float -> Maybe Basic
basic data =
    let
        accum d { min, max, count, sum, mean } =
            let
                newcount =
                    count + 1

                newsum =
                    sum + d
            in
                { min =
                    if d < min then
                        d
                    else
                        min
                , max =
                    if d > max then
                        d
                    else
                        max
                , count = newcount
                , sum = newsum
                , mean = newsum / newcount
                }
                
        init d =
            { min = d
            , max = d
            , count = 1
            , sum = d
            , mean = d
            }

        finalize { min, max, count, sum, mean } =
            let
                accum2 d dev =
                    dev + ((d - mean) ^ 2)

                finalize2 dev =
                    { min = min
                    , max = max
                    , count = count
                    , sum = sum
                    , mean = mean
                    , sd = sqrt (dev / (toFloat count))
                    }
            in
                List.foldr accum2 0 data
                    |> finalize2
                    |> Just

    in
        case data of
            [] ->
                Nothing

            first :: rest ->
                List.foldr accum (init first) rest |> finalize


