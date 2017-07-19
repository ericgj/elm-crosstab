module Crosstab.Stats exposing 
    ( Basic
    , basicOf
    , basic
    , sd
    )

import Crosstab exposing (Calc, customCalc, mapCalc2)
import Crosstab.Calc exposing (listOf)

type alias Basic =
    { min : Maybe Float
    , max : Maybe Float
    , count : Int
    , sum : Float
    , mean : Maybe Float
    }

emptyBasic : Basic
emptyBasic =
            { min = Nothing
            , max = Nothing
            , count = 0
            , sum = 0.0
            , mean = Nothing
            }


basicOf : (a -> Float) -> (Basic -> b) -> Calc a Basic b
basicOf getter map_ =
    customCalc
        { map = map_
        , accum = getter >> accumBasic
        , init = emptyBasic
        }

basicAndValuesOf : (a -> Float) -> (Basic -> List Float -> b) -> Calc a (Basic, List Float) b
basicAndValuesOf getter map_ =
    mapCalc2 map_ (basicOf getter identity) (listOf getter identity) 


basic : (Basic -> b) -> Calc Basic Basic b
basic map_ =
    customCalc
        { map = map_
        , accum = addBasic
        , init = emptyBasic
        }

basicAndValues : (Basic -> List Float -> b) -> Calc (Basic, List Float) (Basic, List Float) b
basicAndValues map_ =
    customCalc
        { map = (\(b,vs) -> map_ b vs)
        , accum = (\(b1,vs1) (b2,vs2) -> (addBasic b1 b2, vs1 ++ vs2))
        , init = (emptyBasic, [])
        }


accumBasic : Float -> Basic -> Basic
accumBasic x sums =
    let
        newcount = addCount sums.count 
        newsum = addSum x sums.sum
        newmean = Just (newsum / (toFloat newcount))
    in
      { sums
          | min = addMin (Just x) sums.min
          , max = addMax (Just x) sums.max
          , count = newcount
          , sum = newsum
          , mean = newmean
       }

addBasic : Basic -> Basic -> Basic
addBasic new sums =
    let
        newcount = addSum new.count sums.count 
        newsum = addSum new.sum sums.sum
        newmean = Just (newsum / (toFloat newcount))
    in
      { sums
          | min = addMin new.min sums.min
          , max = addMax new.max sums.max
          , count = newcount
          , sum = newsum
          , mean = newmean
       }


addMin : Maybe Float -> Maybe Float -> Maybe Float
addMin mi mn =
    addMaybe (\i n -> if (i - n) < 0 then i else n) mi mn

addMax : Maybe Float -> Maybe Float -> Maybe Float
addMax mi mn =
    addMaybe (\i n -> if (i - n) > 0 then i else n) mi mn

addCount : Int -> Int
addCount n =
    n + 1

addSum : number -> number -> number
addSum i n =
    n + i


addMaybe : (a -> a -> a) -> Maybe a -> Maybe a -> Maybe a
addMaybe add_ m1 m2 =
    case (m1,m2) of
        (Nothing, Nothing) -> 
            Nothing
        (Just a1, Nothing) -> 
            Just a1
        (Nothing, Just a2) ->
            Just a2
        (Just a1, Just a2) ->
            add_ a1 a2 |> Just



-- MAPS


{-|

Calculate standard deviation from basic stats and a list of raw values.

    fromList (basicAndValues sd) (basicAndValuesOf .floatField sd) levels data

-}
sd : Basic -> List Float -> Maybe Float
sd {mean, count} values =
    mean |> Maybe.map (\m -> sdHelp m count values)


sdHelp : Float -> Int -> List Float -> Float
sdHelp m c vs =
    List.foldr (\v dev -> (v - m) ^ 2) 0 vs
        |> (\dev -> sqrt (dev / (toFloat c)))



