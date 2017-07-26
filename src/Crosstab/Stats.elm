module Crosstab.Stats
    exposing
        ( Summary
        , summaryOf
        , summary
        , summaryAndValuesOf
        , summaryAndValues
        , summaryAndUniquesOf
        , summaryAndUniques
        , sd
        , chisq
        )

import Set exposing (Set)
import Crosstab exposing (Calc, Compare, customCalc, mapCalcOf, mapCalc2, mapCalcOf2)
import Crosstab.Calc exposing (listOf, list, uniqueOf, unique)


type alias Summary =
    { min : Maybe Float
    , max : Maybe Float
    , count : Int
    , sum : Float
    , mean : Maybe Float
    , runMean : Float
    , ss : Float
    , var : Maybe Float
    , sd : Maybe Float
    }


emptySummary : Summary
emptySummary =
    { min = Nothing
    , max = Nothing
    , count = 0
    , sum = 0.0
    , mean = Nothing
    , runMean = 0.0
    , ss = 0.0
    , var = Nothing
    , sd = Nothing
    }


summaryOf : (a -> Float) -> (Summary -> b) -> Calc a Summary b
summaryOf getter map_ =
    customCalc
        { map = map_
        , accum = getter >> accumSummary
        , init = emptySummary
        }


summaryAndValuesOf :
    (a -> Float)
    -> (Summary -> List Float -> b)
    -> Calc a ( Summary, List Float ) b
summaryAndValuesOf getter map_ =
    mapCalcOf2 map_ (summaryOf getter identity) (listOf getter identity)


summaryAndUniquesOf :
    (a -> Float)
    -> (Summary -> Set Float -> b)
    -> Calc a ( Summary, Set Float ) b
summaryAndUniquesOf getter map_ =
    mapCalcOf2 map_ (summaryOf getter identity) (uniqueOf getter identity)


summary : (Summary -> b) -> Calc Summary Summary b
summary map_ =
    customCalc
        { map = map_
        , accum = addSummary
        , init = emptySummary
        }


summaryAndValues :
    (Summary -> List Float -> b)
    -> Calc ( Summary, List Float ) ( Summary, List Float ) b
summaryAndValues map_ =
    mapCalc2 map_ (summary identity) (list identity)


summaryAndUniques :
    (Summary -> Set Float -> b)
    -> Calc ( Summary, Set Float ) ( Summary, Set Float ) b
summaryAndUniques map_ =
    mapCalc2 map_ (summary identity) (unique identity)



{-

   Note: the variance calculations use Welford's single-pass algorithm described
   here:

   https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm

-}


accumSummary : Float -> Summary -> Summary
accumSummary x sums =
    let
        newcount =
            addCount sums.count

        newsum =
            addSum x sums.sum

        newmean =
            Just (newsum / (toFloat newcount))

        newrunMean =
            sums.runMean + ((x - sums.runMean) / (toFloat newcount))

        newss =
            let
                d1 =
                    x - sums.runMean

                d2 =
                    x - newrunMean
            in
                (d1 * d2)

        newvar =
            if newcount < 2 then
                Nothing
            else
                Just (newss / (toFloat (newcount - 1)))
    in
        { sums
            | min = addMin (Just x) sums.min
            , max = addMax (Just x) sums.max
            , count = newcount
            , sum = newsum
            , mean = newmean
            , runMean = newrunMean
            , ss = newss
            , var = newvar
            , sd = newvar |> Maybe.map sqrt
        }



{-

   Note: the summary variance calculations use a weighted version of Welford's
   algorithm with the counts as the weights, described here:

   https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Weighted_incremental_algorithm

-}


addSummary : Summary -> Summary -> Summary
addSummary new sums =
    let
        newcount =
            addSum new.count sums.count

        newsum =
            addSum new.sum sums.sum

        newmean =
            Just (newsum / (toFloat newcount))

        newrunMean =
            sums.runMean + (((toFloat new.count) / (toFloat newcount)) * (new.sum - sums.runMean))

        newss =
            sums.ss + ((toFloat new.count) * (new.sum - sums.runMean) * (new.sum - newrunMean))

        newvar =
            if newcount < 2 then
                Nothing
            else
                Just (newss / (toFloat (newcount - 1)))
    in
        { sums
            | min = addMin new.min sums.min
            , max = addMax new.max sums.max
            , count = newcount
            , sum = newsum
            , mean = newmean
            , runMean = newrunMean
            , ss = newss
            , var = newvar
            , sd = newvar |> Maybe.map sqrt
        }


addMin : Maybe Float -> Maybe Float -> Maybe Float
addMin mi mn =
    addMaybe
        (\i n ->
            if (i - n) < 0 then
                i
            else
                n
        )
        mi
        mn


addMax : Maybe Float -> Maybe Float -> Maybe Float
addMax mi mn =
    addMaybe
        (\i n ->
            if (i - n) > 0 then
                i
            else
                n
        )
        mi
        mn


addCount : Int -> Int
addCount n =
    n + 1


addSum : number -> number -> number
addSum i n =
    n + i


addMaybe : (a -> a -> a) -> Maybe a -> Maybe a -> Maybe a
addMaybe add_ m1 m2 =
    case ( m1, m2 ) of
        ( Nothing, Nothing ) ->
            Nothing

        ( Just a1, Nothing ) ->
            Just a1

        ( Nothing, Just a2 ) ->
            Just a2

        ( Just a1, Just a2 ) ->
            add_ a1 a2 |> Just



-- MAPS


{-| Calculate "second pass" standard deviation from summary stats and a list of raw
values. Usually this will not be needed as the single-pass standard deviation
is good enough in most cases.

    fromList (summaryAndValues sd) (summaryAndValuesOf .floatField sd) levels data

-}
sd : Summary -> List Float -> Maybe Float
sd { mean, count } values =
    mean |> Maybe.map (\m -> sdHelp m count values)


sdHelp : Float -> Int -> List Float -> Float
sdHelp m c vs =
    List.foldr (\v ss -> ss + ((v - m) ^ 2)) 0 vs
        |> (\ss -> sqrt (ss / (toFloat (c - 1))))



-- COMPARISONS


chisq : Compare Float Float -> Float -> Float
chisq { row, col, table } value =
    let
        exp =
            col * (row / table)
    in
        ((value - exp) ^ 2) / exp
