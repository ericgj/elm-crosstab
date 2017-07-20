module Crosstab.Calc
    exposing
        ( maybe
        , maybeOf
        , list
        , listOf
        , unique
        , uniqueOf
        , count
        , sum
        , sumOf
        , mean
        , meanOf
        , firstNumber
        , firstNumberOf
        , lastNumber
        , lastNumberOf
        , first
        , firstOf
        , last
        , lastOf
        )

import Set exposing (Set)
import Crosstab exposing (Calc, customCalc, mapCalcOf)


-- BASE CALCS

maybe :
    (a -> a -> a)
    -> (Maybe a -> b)
    -> Calc (Maybe a) (Maybe a) b
maybe accum map =
    customCalc
        { map = map, accum = maybeAdd accum, init = Nothing }

maybeOf :
    (a -> Maybe b)
    -> (b -> b -> b)
    -> (Maybe b -> c)
    -> Calc a (Maybe b) c
maybeOf getter accum map =
    mapCalcOf getter (maybe accum map)


list :
    (List a -> b)
    -> Calc (List a) (List a) b
list map =
    customCalc
        { map = map, accum = (++), init = [] }

listOf :
    (a -> b)
    -> (List b -> c)
    -> Calc a (List b) c
listOf getter map =
    customCalc
        { map = map, accum = getter >> (::), init = [] }

unique :
    (Set comparable -> b)
    -> Calc (Set comparable) (Set comparable) b
unique map =
    customCalc
        { map = map, accum = Set.union, init = Set.empty }

uniqueOf :
    (a -> comparable)
    -> (Set comparable -> b)
    -> Calc a (Set comparable) b
uniqueOf getter map =
    customCalc
        { map = map, accum = getter >> Set.insert, init = Set.empty }


float :
    (Float -> Float -> Float)
    -> Calc Float Float Float
float accum =
    customCalc
        { map = identity, accum = accum, init = 0.0 }

floatOf :
    (a -> Float)
    -> (Float -> Float -> Float)
    -> Calc a Float Float
floatOf getter accum =
    mapCalcOf getter (float accum)


--  TYPICAL CALCS


count : Calc x Int Int
count =
    customCalc
        { accum = (\_ b -> b + 1)
        , init = 0
        , map = identity
        }


sum : Calc Float Float Float
sum =
    float (+) 

sumOf : (a -> Float) -> Calc a Float Float
sumOf getter =
    floatOf getter (+)


mean : Calc Float (Float, Int) Float
mean =
    customCalc
        { accum = (\v (s,c) -> (s + v, c + 1))
        , init = (0.0, 0)
        , map = (\(s,c) -> s / (toFloat c))
        }

meanOf : (a -> Float) -> Calc a (Float, Int) Float
meanOf getter =
    mapCalcOf getter mean


firstNumber : Calc number number number
firstNumber =
    customCalc
        { accum = (\n2 n1 -> n1)
        , init = 0
        , map = identity
        }

firstNumberOf : (a -> number) -> Calc a number number
firstNumberOf getter =
    mapCalcOf getter firstNumber

lastNumber : Calc number number number
lastNumber =
    customCalc
        { accum = (\n2 n1 -> n2)
        , init = 0
        , map = identity
        }

lastNumberOf : (a -> number) -> Calc a number number
lastNumberOf getter =
    mapCalcOf getter lastNumber


first : Calc (Maybe a) (Maybe a) (Maybe a)
first =
    maybe (\a2 a1 -> a1) identity

firstOf : (a -> Maybe a) -> Calc a (Maybe a) (Maybe a)
firstOf getter =
    mapCalcOf getter first

last : Calc (Maybe a) (Maybe a) (Maybe a)
last =
    maybe (\a2 a1 -> a2) identity

lastOf : (a -> Maybe a) -> Calc a (Maybe a) (Maybe a)
lastOf getter =
    mapCalcOf getter last



maybeAdd : 
    (a -> a -> a)
    -> Maybe a
    -> Maybe a
    -> Maybe a
maybeAdd accum new old =
    case ( new, old ) of
        ( Nothing, Nothing ) ->
            Nothing

        ( Just _, Nothing ) ->
            new

        ( Nothing, Just _ ) ->
            old

        ( Just a, Just b ) ->
            accum a b |> Just

