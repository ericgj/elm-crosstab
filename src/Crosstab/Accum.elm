module Crosstab.Accum exposing
    ( Accum(..)
    , ParametricData(..)
    , ParametricStats
    , count
    , countIf
    , countMaybe
    , emptyParametricData
    , mean
    , parametric
    , parametricFloat
    , parametricFloatMaybe
    , parametricMaybe
    , parametricStats
    , stdDev
    , sum
    , sumMaybe
    , value
    , variance
    )


type Accum a b c
    = Accum
        { init : c
        , map : a -> b
        , accum : b -> c -> c
        , label : Maybe String
        }


value : Accum a b c -> a -> ( c -> c, c )
value (Accum { init, map, accum }) a =
    ( map a |> accum, init )


type ParametricData
    = ParametricData
        { count : Int
        , sum : Float
        , runMean : Float
        , runSS : Float
        }


emptyParametricData : ParametricData
emptyParametricData =
    ParametricData { count = 0, sum = 0.0, runMean = 0.0, runSS = 0.0 }


count : Accum a Bool Int
count =
    countImp "Count" (always True)


countMaybe : (a -> Maybe x) -> Accum a Bool Int
countMaybe accessor =
    countImp "Count" (accessor >> Maybe.map (always True) >> Maybe.withDefault False)


countIf : (a -> Bool) -> Accum a Bool Int
countIf =
    countImp "CountIf"


countImp : String -> (a -> Bool) -> Accum a Bool Int
countImp label accessor =
    Accum
        { init = 0
        , map = accessor
        , accum =
            \b c ->
                if b then
                    c + 1

                else
                    c
        , label = Just label
        }


sum : (a -> Int) -> Accum a Int Int
sum accessor =
    Accum
        { init = 0
        , map = accessor
        , accum = (+)
        , label = Just "Sum"
        }


sumMaybe : (a -> Maybe Int) -> Accum a (Maybe Int) Int
sumMaybe accessor =
    Accum
        { init = 0
        , map = accessor
        , accum = \b c -> b |> Maybe.map ((+) c) |> Maybe.withDefault c
        , label = Just "Sum"
        }



-- TODO: add sumFloat, sumFloatMaybe;
-- also countDistinct, countDistinctMaybe, freq, freqMaybe


parametric : (a -> Int) -> Accum a Float ParametricData
parametric accessor =
    parametricFloat (accessor >> toFloat)


parametricMaybe : (a -> Maybe Int) -> Accum a (Maybe Float) ParametricData
parametricMaybe accessor =
    parametricFloatMaybe (accessor >> Maybe.map toFloat)


parametricFloat : (a -> Float) -> Accum a Float ParametricData
parametricFloat accessor =
    Accum
        { init = emptyParametricData
        , map = accessor
        , accum = calcParametric
        , label = Nothing
        }


parametricFloatMaybe : (a -> Maybe Float) -> Accum a (Maybe Float) ParametricData
parametricFloatMaybe accessor =
    Accum
        { init = emptyParametricData
        , map = accessor
        , accum =
            \b c ->
                b |> Maybe.map (\n -> calcParametric n c) |> Maybe.withDefault c
        , label = Nothing
        }


calcParametric : Float -> ParametricData -> ParametricData
calcParametric next (ParametricData prev) =
    let
        newsum =
            prev.sum + next

        newcount =
            prev.count + 1

        newrunMean =
            prev.runMean + ((next - prev.runMean) / toFloat newcount)

        newss =
            let
                d1 =
                    next - prev.runMean

                d2 =
                    next - newrunMean
            in
            d1 * d2
    in
    ParametricData
        { sum = newsum, count = newcount, runMean = newrunMean, runSS = newss }



-- PREBUILT MAPPING FUNCTIONS


type alias ParametricStats =
    { count : Int
    , sum : Float
    , mean : Maybe Float
    , variance : Maybe Float
    , stdDev : Maybe Float
    }


parametricStats : ParametricData -> ParametricStats
parametricStats (ParametricData d) =
    let
        var =
            variance (ParametricData d)
    in
    { count = d.count
    , sum = d.sum
    , mean = mean (ParametricData d)
    , variance = var
    , stdDev = var |> Maybe.map sqrt
    }


mean : ParametricData -> Maybe Float
mean (ParametricData d) =
    if d.count == 0 then
        Nothing

    else
        Just (d.sum / toFloat d.count)


variance : ParametricData -> Maybe Float
variance (ParametricData d) =
    if d.count < 2 then
        Nothing

    else
        Just (d.runSS / toFloat (d.count - 1))


stdDev : ParametricData -> Maybe Float
stdDev pd =
    variance pd |> Maybe.map sqrt
