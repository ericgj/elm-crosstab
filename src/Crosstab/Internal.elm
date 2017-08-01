module Crosstab.Internal exposing 
    ( Table(..)
    , Column(..)
    , Levels
    , Values
    , Summary
    , Calc(..)
    , customCalc
    , mapCalcOf
    , mapCalcOf2
    , mapCalc2
    )

import Array exposing (Array)
import Matrix exposing (Matrix)

type Table a b comparable1 comparable2
    = Table
        { levels : Levels comparable1 comparable2
        , values : Values a
        , summary : Summary b
        }

type Column a b comparable
    = Column
        { levels : Array comparable
        , values : Array a
        , summary : b
        }


{-| Row and column levels. See `tableWithLevels` for usage example.
-}
type alias Levels comparable1 comparable2 =
    { rows : Array comparable1
    , cols : Array comparable2
    }


type alias Values a =
    Matrix a


type alias Summary a =
    { table : a
    , rows : Array a
    , cols : Array a
    }



type Calc a b c
    = Calc
        { map : b -> c
        , accum : a -> b -> b
        , init : b
        }



-- CALC CONSTRUCTORS


customCalc :
    { x | map : b -> c, accum : a -> b -> b, init : b }
    -> Calc a b c
customCalc { map, accum, init } =
    Calc
        { map = map, accum = accum, init = init }


mapCalcOf :
    (a -> b)
    -> Calc b c d
    -> Calc a c d
mapCalcOf getter (Calc calc) =
    Calc
        { calc | accum = getter >> calc.accum }


mapCalcOf2 :
    (c -> e -> f)
    -> Calc a b c
    -> Calc a d e
    -> Calc a ( b, d ) f
mapCalcOf2 func (Calc c1) (Calc c2) =
    Calc
        { map = (\( b, d ) -> func (c1.map b) (c2.map d))
        , accum = (\a ( b, d ) -> ( c1.accum a b, c2.accum a d ))
        , init = ( c1.init, c2.init )
        }


mapCalc2 :
    (c -> e -> f)
    -> Calc b b c
    -> Calc d d e
    -> Calc ( b, d ) ( b, d ) f
mapCalc2 func (Calc c1) (Calc c2) =
    Calc
        { map = (\( b, d ) -> func (c1.map b) (c2.map d))
        , accum = (\( b1, d1 ) ( b2, d2 ) -> ( c1.accum b1 b2, c2.accum d1 d2 ))
        , init = ( c1.init, c2.init )
        }


