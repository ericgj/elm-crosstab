module Crosstab.Column exposing
    ( Column
    , Compare
    , CompareAccum
    , column
    , columnWithLevels
    , levelsOf
    , levelList
    , valueList
    , summary
    , summarize
    , compare
    , compareAccum
    )

import Array exposing (Array)
import Dict
import Tuple
import Set exposing (Set)

import Array.Util
import Crosstab.Internal exposing (Calc(..), Column(..))

type alias Column a b comparable =
    Crosstab.Internal.Column a b comparable

type alias Compare a b =
    { column : b
    , prev : Maybe a
    }

type alias CompareAccum a b c =
    { column : b
    , prev : Maybe a
    , cum : c
    }



column :
    Calc b d e
    -> Calc a b c
    -> (a -> comparable)
    -> List a
    -> Column c e comparable
column summary value map_ records =
    columnWithLevels
        (levelsOf map_ records)
        summary
        value
        map_
        records


columnWithLevels :
    Array comparable
    -> Calc b d e
    -> Calc a b c
    -> (a -> comparable)
    -> List a
    -> Column c e comparable
columnWithLevels cols summary (Calc value) toCol records =
    let
        colMap =
            Array.Util.indexDict cols

        mcol record =
            toCol record |> flip Dict.get colMap

        accum a values =
            Maybe.map (\i -> accumHelp i a values) (mcol a)
                |> Maybe.withDefault values

        accumHelp i a values =
            Array.Util.update i (value.accum a) values

        initData =
            Array.repeat (Array.length cols) value.init

        finalize values =
            Column
                { levels = cols
                , values = Array.map value.map values
                , summary = calcSummary summary values
                }
    in
        List.foldr accum initData records
             |> finalize


levelsOf :
    (a -> comparable)
    -> List a
    -> Array comparable
levelsOf map_ records =
    let
        accum record lvls =
            Set.insert (map_ record) lvls
    in
        List.foldr accum Set.empty records
            |> Array.Util.fromSet


-- ACCESSORS

{-| Get the list of levels from a column.
-}
levelList : Column a b comparable -> List comparable
levelList (Column { levels }) =
    Array.toList levels


{-| Get the list of values from a column.
-}
valueList : Column a b comparable -> List a
valueList (Column { values }) =
    Array.toList values


{-| Get the column summary.
-}
summary : Column a b comparable -> b
summary (Column { summary }) =
    summary

-- OPERATIONS


summarize :
    Calc a b c
    -> Column a b comparable
    -> Column a c comparable
summarize summary (Column { levels, values }) =
    Column
        { levels = levels
        , values = values
        , summary = calcSummary summary values
        }


compare :
    (Compare a b -> a -> c)
    -> Column a b comparable
    -> Column c b comparable
compare comp (Column { levels, summary, values }) =
    Column
        { levels = levels
        , values = compareValues comp summary values
        , summary = summary
        }


compareAccum :
    (CompareAccum a b c -> a -> c)
    -> c
    -> Column a b comparable
    -> Column c b comparable
compareAccum comp init (Column { levels, summary, values }) =
    Column
        { levels = levels
        , values = compareValuesAccum comp init summary values
        , summary = summary
        }



-- INTERNAL

calcSummary :
    Calc a b c
    -> Array a
    -> c
calcSummary (Calc summary) values =
    Array.foldr summary.accum summary.init values
        |> summary.map


compareValues :
    (Compare a b -> a -> c)
    -> b
    -> Array a
    -> Array c
compareValues func sum values =
    let
        compare_ f a c pr =
            f { column = c , prev = pr } a

        map_ i a =
            let
                prev =
                    Array.get (i - 1) values
            in
                compare_ func a sum prev
    in
        Array.indexedMap map_ values


compareValuesAccum :
    (CompareAccum a b c -> a -> c)
    -> c
    -> b
    -> Array a
    -> Array c
compareValuesAccum func init sum values =
    let
        compare_ f a c pr cum =
            f { column = c, prev = pr, cum = cum } a

        accum a (i, vs) =
            let
                prev =
                    Array.get (i - 1) values

                cum =
                    Array.get (i - 1) vs |> Maybe.withDefault init
            in
                ( i + 1
                , Array.set i ( compare_ func a sum prev cum ) vs
                )
    in
        Array.foldl accum
            (0, Array.repeat (Array.length values) init)
            values
            |> Tuple.second


