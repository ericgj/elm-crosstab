module Crosstab.Calc
    exposing
        ( count
        , sum
        , mean
        , list
        , unique
        , firstNumber
        , lastNumber
        , first
        , last
        , maybe
        )

import Set exposing (Set)
import Crosstab exposing (Calc, defineCalc)


--  TYPICAL CALCS


count : Calc Int Int
count =
    defineCalc
        { add = (\_ b -> b + 1)
        , init = 0
        , map = identity
        }


sum : Calc Float Float
sum =
    defineCalc
        { add = (+)
        , init = 0.0
        , map = identity
        }


mean : Calc (List Float) Float
mean =
    list
        (List.foldr (\v ( s, i ) -> ( v + s, i + 1 )) ( 0, 0 )
            >> (\( s, n ) -> s / (toFloat n))
        )


list : (List a -> b) -> Calc (List a) b
list map =
    defineCalc
        { add = (++)
        , init = []
        , map = map
        }


unique : (Set comparable -> b) -> Calc (Set comparable) b
unique map =
    defineCalc
        { add = Set.union
        , init = Set.empty
        , map = map
        }


firstNumber : Calc number number
firstNumber =
    defineCalc
        { add = (\n2 n1 -> n1)
        , init = 0
        , map = identity
        }


lastNumber : Calc number number
lastNumber =
    defineCalc
        { add = (\n2 n1 -> n2)
        , init = 0
        , map = identity
        }


first : Calc (Maybe a) (Maybe a)
first =
    maybe (\a2 a1 -> a1)


last : Calc (Maybe a) (Maybe a)
last =
    maybe (\a2 a1 -> a2)


maybe : (a -> a -> a) -> Calc (Maybe a) (Maybe a)
maybe add =
    defineCalc
        { add =
            (\m_ m ->
                case ( m_, m ) of
                    ( Nothing, Nothing ) ->
                        Nothing

                    ( Just _, Nothing ) ->
                        m_

                    ( Nothing, Just _ ) ->
                        m

                    ( Just c_, Just c ) ->
                        Maybe.map2 add m_ m
            )
        , init = Nothing
        , map = identity
        }
