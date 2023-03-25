module Crosstab.Accum exposing 
    ( Accum(..), ParametricData(..)
    , value, emptyParametricData
    , count, countMaybe, countIf, sum, sumMaybe
    , parametric, parametricMaybe, parametricFloat, parametricFloatMaybe 
    )

import Dict exposing (Dict)
import Set exposing (Set)

type Accum a b c 
    = Accum
        { init : c
        , map : a -> b
        , accum : b -> c -> c
        }

value : Accum a b c -> a -> ((c -> c), c)
value (Accum {init,map,accum}) a =
    (map a |> accum, init)

type ParametricData
    = ParametricData
        { count : Int
        , sum : Float
        , runMean: Float
        , runSS: Float
        }

emptyParametricData : ParametricData
emptyParametricData =
    ParametricData { count = 0, sum = 0.0, runMean = 0.0, runSS = 0.0 }

count : Accum a Bool Int
count =
    countIf (always True)

countMaybe : (a -> Maybe x) -> Accum a Bool Int
countMaybe accessor =
    countIf (accessor >> Maybe.map (always True) >> Maybe.withDefault False)

countIf : (a -> Bool) -> Accum a Bool Int 
countIf accessor =
    Accum
        { init = 0
        , map = accessor
        , accum = (\b c -> if b then (c + 1) else c)
        }

sum : (a -> Int) -> Accum a Int Int
sum accessor =
    Accum
        { init = 0
        , map = accessor
        , accum = (+)
        }

sumMaybe : (a -> Maybe Int) -> Accum a (Maybe Int) Int
sumMaybe accessor =
    Accum
        { init = 0
        , map = accessor
        , accum = (\b c -> b |> Maybe.map ((+) c) |> Maybe.withDefault c)
        }

-- TODO: add sumFloat, sumFloatMaybe; 
-- also countDistinct, countDistinctMaybe, freq, freqMaybe

parametric : (a -> Int) -> Accum a Float ParametricData
parametric accessor =
    parametricFloat (accessor >> toFloat)

parametricMaybe : (a -> Maybe Int) -> Accum a (Maybe Float) ParametricData
parametricMaybe accessor =
    parametricFloatMaybe (accessor >> (Maybe.map toFloat))


parametricFloat : (a -> Float) -> Accum a Float ParametricData
parametricFloat accessor =
    Accum
        { init = emptyParametricData
        , map = accessor
        , accum = calcParametric
        }

parametricFloatMaybe : (a -> Maybe Float) -> Accum a (Maybe Float) ParametricData
parametricFloatMaybe accessor =
    Accum
        { init = emptyParametricData
        , map = accessor
        , accum = 
            (\b c -> 
                b |> Maybe.map (\n -> calcParametric n c) |> Maybe.withDefault c
            )
        }


calcParametric : Float -> ParametricData -> ParametricData
calcParametric next (ParametricData prev) =
    let
        newsum = 
            prev.sum + next

        newcount =
            prev.count + 1

        newrunMean =
            prev.runMean + ((next - prev.runMean) / (toFloat newcount))

        newss =
            let
                d1 =
                    next - prev.runMean

                d2 =
                    next - newrunMean
            in
                (d1 * d2)
    in
    ParametricData
        { sum = newsum, count = newcount, runMean = newrunMean, runSS = newss } 
