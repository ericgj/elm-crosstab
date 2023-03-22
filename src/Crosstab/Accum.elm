module Crosstab.Accum exposing 
    ( Value(..), Accum(..), CategoricalAccum(..), NumericAccum(..)
    , initCount, initDistinctCount, initFreq, initSum, initParametric
    , accumulate
    )

import Dict exposing (Dict)
import Set exposing (Set)

type Value 
    = CategoricalStringV String
    | NumericV Float

type Accum
    = CategoricalStringA (CategoricalAccum String)
    | NumericA NumericAccum

type CategoricalAccum comparable
    = Count Int
    | DistinctCount (Set comparable)
    | Freq (Dict comparable Int)

type NumericAccum
    = Sum Float
    | Parametric { count: Int, sum: Float, runMean: Float, runSS: Float }


initCount : CategoricalAccum comparable
initCount = 
    Count 0

initDistinctCount : CategoricalAccum comparable
initDistinctCount =
    DistinctCount Set.empty

initFreq : CategoricalAccum comparable
initFreq =
    Freq Dict.empty

initSum : NumericAccum
initSum = 
    Sum 0.0

initParametric : NumericAccum
initParametric = 
    Parametric { count = 0, sum = 0.0, runMean = 0.0, runSS = 0.0 }



accumulate : List Value -> List Accum -> List Accum
accumulate values accums =
    List.map2 accumulateValue values accums

accumulateValue : Value -> Accum -> Accum
accumulateValue value accum =
    case (value, accum) of
        (CategoricalStringV s, CategoricalStringA a) ->
            CategoricalStringA <| accumulateCategorical s a

        (NumericV n, NumericA a) ->
            NumericA <| accumulateNumeric n a

        _ ->
            accum

accumulateCategorical : comparable -> CategoricalAccum comparable -> CategoricalAccum comparable
accumulateCategorical value accum =
    case accum of 
        Count prev ->
            Count (prev + 1)
        
        DistinctCount prev ->
            DistinctCount <| Set.insert value prev

        Freq prev ->
            let
                incr = Maybe.map (\p -> p + 1)
            in
                Freq <| Dict.update value incr prev


accumulateNumeric : Float -> NumericAccum -> NumericAccum
accumulateNumeric value accum =
    case accum of
        Sum prev ->
            Sum (prev + value)

        Parametric prev ->
            let
                newsum = 
                    prev.sum + value

                newcount =
                    prev.count + 1

                newrunMean =
                    prev.runMean + ((value - prev.runMean) / (toFloat newcount))

                newss =
                    let
                        d1 =
                            value - prev.runMean

                        d2 =
                            value - newrunMean
                    in
                        (d1 * d2)
            in
                Parametric
                    { sum = newsum, count = newcount, runMean = newrunMean, runSS = newss } 
        


