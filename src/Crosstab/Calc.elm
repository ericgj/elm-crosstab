module Crosstab.Calc
    exposing
        ( Calc
        , custom
        , mapOf
        , mapOf2
        , map2
        , maybe
        , maybeOf
        , list
        , listOf
        , unique
        , uniqueOf
        , count
        , sum
        , sumOf
        , mean
        , meanAccum
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
import Crosstab.Internal exposing (Calc)

type alias Calc a b c =
    Crosstab.Internal.Calc a b c


-- CUSTOM 

custom :
    { x | map : b -> c, accum : a -> b -> b, init : b }
    -> Calc a b c
custom =
    Crosstab.Internal.customCalc

mapOf :
    (a -> b)
    -> Calc b c d
    -> Calc a c d
mapOf =
    Crosstab.Internal.mapCalcOf

mapOf2 :
    (c -> e -> f)
    -> Calc a b c
    -> Calc a d e
    -> Calc a ( b, d ) f
mapOf2 =
    Crosstab.Internal.mapCalcOf2


map2 :
    (c -> e -> f)
    -> Calc b b c
    -> Calc d d e
    -> Calc ( b, d ) ( b, d ) f
map2 =
    Crosstab.Internal.mapCalc2



-- BASE CALCS


maybe :
    (a -> a -> a)
    -> (Maybe a -> b)
    -> Calc (Maybe a) (Maybe a) b
maybe accum map =
    custom
        { map = map, accum = maybeAdd accum, init = Nothing }


maybeOf :
    (a -> Maybe b)
    -> (b -> b -> b)
    -> (Maybe b -> c)
    -> Calc a (Maybe b) c
maybeOf getter accum map =
    mapOf getter (maybe accum map)


list :
    (List a -> b)
    -> Calc (List a) (List a) b
list map =
    custom
        { map = map, accum = (++), init = [] }


listOf :
    (a -> b)
    -> (List b -> c)
    -> Calc a (List b) c
listOf getter map =
    custom
        { map = map, accum = getter >> (::), init = [] }


unique :
    (Set comparable -> b)
    -> Calc (Set comparable) (Set comparable) b
unique map =
    custom
        { map = map, accum = Set.union, init = Set.empty }


uniqueOf :
    (a -> comparable)
    -> (Set comparable -> b)
    -> Calc a (Set comparable) b
uniqueOf getter map =
    custom
        { map = map, accum = getter >> Set.insert, init = Set.empty }


float :
    (Float -> Float -> Float)
    -> Calc Float Float Float
float accum =
    custom
        { map = identity, accum = accum, init = 0.0 }


floatOf :
    (a -> Float)
    -> (Float -> Float -> Float)
    -> Calc a Float Float
floatOf getter accum =
    mapOf getter (float accum)


number :
    (number -> number -> number)
    -> Calc number number number
number accum =
    custom
        { map = identity, accum = accum, init = 0 }


numberOf :
    (a -> number)
    -> (number -> number -> number)
    -> Calc a number number
numberOf getter accum =
    mapOf getter (number accum)



--  TYPICAL CALCS


count : Calc x Int Int
count =
    custom
        { accum = (\_ b -> b + 1)
        , init = 0
        , map = identity
        }


sum : Calc number number number
sum =
    number (+)


sumOf : (a -> number) -> Calc a number number
sumOf getter =
    numberOf getter (+)


meanAccum : Calc ( Float, Int ) ( Float, Int ) Float
meanAccum =
    custom
        { accum = (\(s1,c1) (s2,c2) -> (s1 + s2, c1 + c2))
        , init = ( 0.0, 0 )
        , map = (\( s, c ) -> s / (toFloat c))
        }


mean : Calc Float ( Float, Int ) Float
mean =
    custom
        { accum = (\v ( s, c ) -> ( s + v, c + 1 ))
        , init = ( 0.0, 0 )
        , map = (\( s, c ) -> s / (toFloat c))
        }


meanOf : (a -> Float) -> Calc a ( Float, Int ) Float
meanOf getter =
    mapOf getter mean


firstNumber : Calc number number number
firstNumber =
    custom
        { accum = (\n2 n1 -> n1)
        , init = 0
        , map = identity
        }


firstNumberOf : (a -> number) -> Calc a number number
firstNumberOf getter =
    mapOf getter firstNumber


lastNumber : Calc number number number
lastNumber =
    custom
        { accum = (\n2 n1 -> n2)
        , init = 0
        , map = identity
        }


lastNumberOf : (a -> number) -> Calc a number number
lastNumberOf getter =
    mapOf getter lastNumber


first : Calc (Maybe a) (Maybe a) (Maybe a)
first =
    maybe (\a2 a1 -> a1) identity


firstOf : (a -> Maybe a) -> Calc a (Maybe a) (Maybe a)
firstOf getter =
    mapOf getter first


last : Calc (Maybe a) (Maybe a) (Maybe a)
last =
    maybe (\a2 a1 -> a2) identity


lastOf : (a -> Maybe a) -> Calc a (Maybe a) (Maybe a)
lastOf getter =
    mapOf getter last


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
