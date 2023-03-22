module Crosstab.Spec exposing
    ( Spec, CategorySpec, ValueSpec
    , rowLevels, columnLevels, values, initAccums
    )

import Crosstab.Accum exposing
    ( Value(..)
    , Accum(..)
    , CategoricalAccum
    , NumericAccum
    , initCount, initDistinctCount, initFreq, initSum, initParametric
    )

type Spec a
    = Spec
        { rows: List (CategorySpec a) 
        , columns: List (CategorySpec a)
        , values: List (ValueSpec a)
        }

type CategorySpec a
    = CategorySpec
        { label: String 
        , accessor: Accessor a String
        }

type alias Accessor a comparable = (a -> comparable)

type alias NumericAccessor a number = (a -> number)


type ValueSpec a
    = CategoricalString
        { label : String
        , accessor : Accessor a String
        , init : CategoricalAccum String
        }
    | NumericInteger
        { label : String
        , accessor : NumericAccessor a Int
        , init : NumericAccum
        }
    | NumericFloat
        { label : String
        , accessor : NumericAccessor a Float
        , init : NumericAccum
        }

spec : List (CategorySpec a) -> List (CategorySpec a) -> List (ValueSpec a) -> Spec a
spec rs cs vs =
    Spec { rows = rs, columns = cs, values = vs }

category : String -> Accessor a String -> CategorySpec a
category label accessor =
    CategorySpec { label = label, accessor = accessor }

countValue : String -> Accessor a String -> ValueSpec a
countValue label accessor =
    CategoricalString { label = label, accessor = accessor, init = initCount }

distinctCountValue : String -> Accessor a String -> ValueSpec a
distinctCountValue label accessor =
    CategoricalString { label = label, accessor = accessor, init = initDistinctCount }

freqValue : String -> Accessor a String -> ValueSpec a
freqValue label accessor =
    CategoricalString { label = label, accessor = accessor, init = initFreq }

sumIntegerValue : String -> NumericAccessor a Int -> ValueSpec a
sumIntegerValue label accessor =
    NumericInteger { label = label, accessor = accessor, init = initSum }

sumFloatValue : String -> NumericAccessor a Float -> ValueSpec a
sumFloatValue label accessor =
    NumericFloat { label = label, accessor = accessor, init = initSum }

parametricIntegerValue : String -> NumericAccessor a Int -> ValueSpec a
parametricIntegerValue label accessor =
    NumericInteger { label = label, accessor = accessor, init = initParametric }

parametricFloatValue : String -> NumericAccessor a Float -> ValueSpec a
parametricFloatValue label accessor =
    NumericFloat { label = label, accessor = accessor, init = initParametric }



rowLevels : Spec a -> a -> List String
rowLevels (Spec {rows}) a =
    rows |> List.map (\(CategorySpec {accessor}) -> accessor a)

columnLevels : Spec a -> a -> List String
columnLevels (Spec {columns}) a =
    columns |> List.map (\(CategorySpec {accessor}) -> accessor a)

values : Spec a -> a -> List Value
values (Spec s) a =
    s.values |> List.map (\v -> value v a)

initAccums : Spec a -> List Accum
initAccums (Spec s) =
    s.values |> List.map initAccum


initAccum : ValueSpec a -> Accum
initAccum s =
    case s of
        CategoricalString {init} ->
            CategoricalStringA init
        NumericInteger {init} ->
            NumericA init
        NumericFloat {init} ->
            NumericA init


value : ValueSpec a -> a -> Value
value s a =
    case s of
        CategoricalString {accessor} ->
            CategoricalStringV <| accessor a
        NumericInteger {accessor} ->
            NumericV <| toFloat <| accessor a
        NumericFloat {accessor} ->
            NumericV <| accessor a
        
