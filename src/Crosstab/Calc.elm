module Crosstab.Calc
    exposing
        ( maybe
        , list
        , listOf
        , unique
        , count
        , sum
        , mean
        , firstNumber
        , lastNumber
        , first
        , last
        )

import Set exposing (Set)
import Crosstab exposing (Calc, customCalc)


-- BASE CALCS

maybe :
    (a -> a -> a)
    -> (Maybe a -> b)
    -> Calc (Maybe a) (Maybe a) b
maybe accum map =
    let
        accum_ new old =
            case ( new, old ) of
                ( Nothing, Nothing ) ->
                    Nothing

                ( Just _, Nothing ) ->
                    new

                ( Nothing, Just _ ) ->
                    old

                ( Just a, Just b ) ->
                    accum a b |> Just
    in
        customCalc
            { map = map, accum = accum_, init = Nothing }


list :
    (List a -> b)
    -> Calc a (List a) b
list map =
    customCalc
        { map = map, accum = (::), init = [] }

listOf :
    (a -> b)
    -> (List b -> c)
    -> Calc a (List b) c
listOf getter map =
    customCalc
        { map = map, accum = getter >> (::), init = [] }

unique :
    (Set comparable -> b)
    -> Calc comparable (Set comparable) b
unique map =
    customCalc
        { map = map, accum = Set.insert, init = Set.empty }

float :
    (Float -> Float -> Float)
    -> Calc Float Float Float
float accum =
    customCalc
        { map = identity, accum = accum, init = 0.0 }


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


mean : Calc Float (Float, Int) Float
mean =
    customCalc
        { accum = (\v (s,c) -> (s + v, c + 1))
        , init = (0.0, 0)
        , map = (\(s,c) -> s / (toFloat c))
        }

firstNumber : Calc number number number
firstNumber =
    customCalc
        { accum = (\n2 n1 -> n1)
        , init = 0
        , map = identity
        }


lastNumber : Calc number number number
lastNumber =
    customCalc
        { accum = (\n2 n1 -> n2)
        , init = 0
        , map = identity
        }


first : Calc (Maybe a) (Maybe a) (Maybe a)
first =
    maybe (\a2 a1 -> a1) identity


last : Calc (Maybe a) (Maybe a) (Maybe a)
last =
    maybe (\a2 a1 -> a2) identity


