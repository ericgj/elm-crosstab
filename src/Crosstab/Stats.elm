module Crosstab.Stats
    exposing
        ( NumericDescription
        , Summary
        , numericDescriptionOf
        , numericDescription
        , numericDescriptionAndValuesOf
        , numericDescriptionAndValues
        , summaryOf
        , summary
        , summaryAndValuesOf
        , summaryAndValues
        , summaryAndUniquesOf
        , summaryAndUniques
        , std
        , chisq
        )

import Array exposing (Array)
import Set exposing (Set)
import Quantiles

import Crosstab.Calc exposing 
    ( Calc 
    , listOf, list, uniqueOf, unique
    )

type alias NumericDescription =
    { min : Float
    , max : Float
    , count : Int
    , sum : Float
    , mean : Float
    , std : Float
    , p02 : Float
    , p09 : Float
    , p10 : Float
    , p25 : Float
    , p50 : Float
    , p75 : Float
    , p90 : Float
    , p91 : Float
    , p98 : Float
    }


type alias Summary =
    { min : Maybe Float
    , max : Maybe Float
    , count : Int
    , sum : Float
    , mean : Maybe Float
    , runMean : Float
    , ss : Float
    , var : Maybe Float
    , std : Maybe Float
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
    , std = Nothing
    }


-- DESCRIBE

numericDescriptionOf : 
    (a -> Float) 
    -> Calc a (Summary, List Float) (Maybe NumericDescription)
numericDescriptionOf getter =
    summaryAndValuesOf getter describeNumeric

numericDescriptionAndValuesOf :
    (a -> Float) 
    -> Calc a (Summary, List Float) (Maybe NumericDescription, List Float)
numericDescriptionAndValuesOf getter =
    summaryAndValuesOf getter (\sum data -> (describeNumeric sum data, data))


numericDescription : 
    Calc (Summary, List Float) (Summary, List Float) (Maybe NumericDescription)
numericDescription =
    summaryAndValues describeNumeric

numericDescriptionAndValues : 
    Calc (Summary, List Float) (Summary, List Float) (Maybe NumericDescription, List Float)
numericDescriptionAndValues =
    summaryAndValues (\sum data -> (describeNumeric sum data, data))


describeNumeric : 
    Summary
    -> List Float
    -> Maybe NumericDescription
describeNumeric summary data =
    let
        quants data =
            data
                |> Quantiles.sort
                |> ( Quantiles.quantiles 
                       [ 0.02, 0.09, 0.1, 0.25, 0.5, 0.75, 0.9, 0.91, 0.98 ]
                   )
                |> Maybe.andThen toTuple

        toTuple qs =
            case qs of
                (p02 :: p09 :: p10 :: p25 :: p50 :: p75 :: p90 :: p91 :: p98 :: []) ->
                    Just (p02, p09, p10, p25, p50, p75, p90, p91, p98)
                _ ->
                    Nothing
            
        describe_ count sum min max mean std (p02, p09, p10, p25, p50, p75, p90, p91, p98) =
            { count = count
            , sum = sum
            , min = min
            , max = max
            , mean = mean
            , std = std
            , p02 = p02
            , p09 = p09
            , p10 = p10
            , p25 = p25
            , p50 = p50
            , p75 = p75
            , p90 = p90
            , p91 = p91
            , p98 = p98
            }
    in
        Maybe.map5 (describe_ summary.count summary.sum)
            summary.min
            summary.max
            summary.mean
            summary.std
            (quants data)


-- SUMMARY

summaryOf : (a -> Float) -> (Summary -> b) -> Calc a Summary b
summaryOf getter map_ =
    Crosstab.Calc.custom
        { map = map_
        , accum = getter >> accumSummary
        , init = emptySummary
        }


summaryAndValuesOf :
    (a -> Float)
    -> (Summary -> List Float -> b)
    -> Calc a ( Summary, List Float ) b
summaryAndValuesOf getter map_ =
    Crosstab.Calc.mapOf2 map_ (summaryOf getter identity) (listOf getter identity)


summaryAndUniquesOf :
    (a -> Float)
    -> (Summary -> Set Float -> b)
    -> Calc a ( Summary, Set Float ) b
summaryAndUniquesOf getter map_ =
    Crosstab.Calc.mapOf2 map_ (summaryOf getter identity) (uniqueOf getter identity)


summary : (Summary -> b) -> Calc Summary Summary b
summary map_ =
    Crosstab.Calc.custom
        { map = map_
        , accum = addSummary
        , init = emptySummary
        }


summaryAndValues :
    (Summary -> List Float -> b)
    -> Calc ( Summary, List Float ) ( Summary, List Float ) b
summaryAndValues map_ =
    Crosstab.Calc.map2 map_ (summary identity) (list identity)


summaryAndUniques :
    (Summary -> Set Float -> b)
    -> Calc ( Summary, Set Float ) ( Summary, Set Float ) b
summaryAndUniques map_ =
    Crosstab.Calc.map2 map_ (summary identity) (unique identity)



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
            , std = newvar |> Maybe.map sqrt
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
            , std = newvar |> Maybe.map sqrt
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

    fromList (summaryAndValues std) (summaryAndValuesOf .floatField std) levels data

-}
std : Summary -> List Float -> Maybe Float
std { mean, count } values =
    mean |> Maybe.map (\m -> stdHelp m count values)


stdHelp : Float -> Int -> List Float -> Float
stdHelp m c vs =
    List.foldr (\v ss -> ss + ((v - m) ^ 2)) 0 vs
        |> (\ss -> sqrt (ss / (toFloat (c - 1))))



-- COMPARISONS


chisq : { x | row : Float, col : Float, table : Float } -> Float -> Float
chisq { row, col, table } value =
    let
        exp =
            col * (row / table)
    in
        ((value - exp) ^ 2) / exp
