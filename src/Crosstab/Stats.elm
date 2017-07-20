module Crosstab.Stats exposing 
    ( Basic
    , basicOf
    , basic
    , basicAndValuesOf
    , basicAndValues
    , basicAndUniquesOf
    , basicAndUniques
    , sd
    , chisq
    )

import Set exposing (Set)
import Crosstab exposing (Calc, Compare, customCalc, mapCalcOf, mapCalc2, mapCalcOf2)
import Crosstab.Calc exposing (listOf,list,uniqueOf,unique)


type alias Basic =
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


emptyBasic : Basic
emptyBasic =
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


basicOf : (a -> Float) -> (Basic -> b) -> Calc a Basic b
basicOf getter map_ =
    customCalc
        { map = map_
        , accum = getter >> accumBasic
        , init = emptyBasic
        }


basicAndValuesOf : 
    (a -> Float) 
    -> (Basic -> List Float -> b) 
    -> Calc a ( Basic, List Float ) b
basicAndValuesOf getter map_ =
    mapCalcOf2 map_ (basicOf getter identity) (listOf getter identity)

basicAndUniquesOf : 
    (a -> Float) 
    -> (Basic -> Set Float -> b) 
    -> Calc a ( Basic, Set Float ) b
basicAndUniquesOf getter map_ =
    mapCalcOf2 map_ (basicOf getter identity) (uniqueOf getter identity)


basic : (Basic -> b) -> Calc Basic Basic b
basic map_ =
    customCalc
        { map = map_
        , accum = addBasic
        , init = emptyBasic
        }

basicAndValues : 
    (Basic -> List Float -> b) 
    -> Calc ( Basic, List Float ) ( Basic, List Float ) b
basicAndValues map_ =
    mapCalc2 map_ (basic identity) (list identity)


basicAndUniques : 
    (Basic -> Set Float -> b) 
    -> Calc ( Basic, Set Float ) ( Basic, Set Float ) b
basicAndUniques map_ =
    mapCalc2 map_ (basic identity) (unique identity)

{-

Note: the variance calculations use Welford's single-pass algorithm described 
here:

https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm

-}
accumBasic : Float -> Basic -> Basic
accumBasic x sums =
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
addBasic : Basic -> Basic -> Basic
addBasic new sums =
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

{-|

Calculate "second pass" standard deviation from basic stats and a list of raw 
values.  Usually this will not be needed as the single-pass standard deviation
is good enough in most cases.

    fromList (basicAndValues sd) (basicAndValuesOf .floatField sd) levels data

-}
sd : Basic -> List Float -> Maybe Float
sd { mean, count } values =
    mean |> Maybe.map (\m -> sdHelp m count values)


sdHelp : Float -> Int -> List Float -> Float
sdHelp m c vs =
    List.foldr (\v ss -> ss + ((v - m) ^ 2)) 0 vs
        |> (\ss -> sqrt (ss / (toFloat (c - 1))))


-- COMPARISONS

chisq : Compare Float Float -> Float -> Float
chisq {row, col, table} value =
    let
        exp = col * (row / table)
    in
        ((value - exp) ^ 2) / exp

