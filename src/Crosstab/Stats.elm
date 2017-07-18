module Crosstab.Stats exposing 
    ( Basic
    , basic
    , stats
    , basicStatsAnd
    , sd
    )

import Crosstab exposing (Calc, Spec, defineCalc, specMap)

type alias Basic =
    { min : Maybe Float
    , max : Maybe Float
    , count : Int
    , sum : Float
    , mean : Maybe Float
    , values : List Float
    }


basic : 
    Spec a Float comparable1 comparable2 
    -> Spec a Basic comparable1 comparable2 
basic s =
    let
        map_ n =
            { min = Just n
            , max = Just n
            , count = 1
            , sum = n
            , mean = Just (n / 1.0)
            , values = [n]
            }
    in
        specMap map_ s


stats : (Basic -> b) -> Calc Basic b
stats map_ =
    let
        init_ =
            { min = Nothing
            , max = Nothing
            , count = 0
            , sum = 0
            , mean = Nothing
            , values = []
            }

        add_ i n =
          let
              newcount = addCount i n
              newsum = addSum i n
              newmean = Just (newsum / (toFloat newcount))
          in
            { n
                | min = addMin i n
                , max = addMax i n
                , count = newcount
                , sum = newsum
                , mean = newmean
                , values = addValues i n
             }

    in
        defineCalc
            { add = add_
            , init = init_
            , map = map_
            }


basicStatsAnd : (Basic -> b) -> Calc Basic (Basic, b)
basicStatsAnd map_ =
    calc (\basic -> (basic, map_ basic))


addMin : Basic -> Basic -> Maybe Float
addMin i n =
    addMaybe (\i n -> if (i - n) < 0 then i else n) i.min n.min

addMax : Basic -> Basic -> Maybe Float
addMax i n =
    addMaybe (\i n -> if (i - n) > 0 then i else n) i.max n.max

addCount : Basic -> Basic -> Int
addCount i {count} =
    count + 1

addSum : Basic -> Basic -> Float
addSum i n =
    n.sum + i.sum


addValues : Basic -> Basic -> List Float
addValues i n =
    i.values ++ n.values

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

Calculate standard deviation as a map over basic stats.

    crosstab (basic mySpec) (basicStatsAnd sd) data

-}
sd : Basic -> Maybe Float
sd {mean, count, values} =
    mean |> Maybe.map (\m -> sdHelp m count values)


sdHelp : Float -> Int -> List Float -> Float
sdHelp m c vs =
    List.foldr (\v dev -> (v - m) ^ 2) 0 vs
        |> (\dev -> sqrt (dev / (toFloat c)))



