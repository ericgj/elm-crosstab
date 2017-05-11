module Crosstab exposing
  ( Crosstab
  , Stats
  , Point
  , crosstab
  , crosstabOptions
  )

import Dict exposing (Dict)
import Set exposing (Set)

-- TYPES

type Crosstab comparable1 comparable2 =
    Crosstab
        { rows : List comparable1
        , cols : List comparable2
        , rowStats : Dict comparable1 Stats
        , colStats : Dict comparable2 Stats
        , rowcolStats : Dict (comparable1, comparable2) Stats
        , stats : Maybe Stats
        }

type CrosstabOptions record comparable1 comparable2 =
    CrosstabOptions
        { row : (record -> comparable1)
        , col : (record -> comparable2)
        , value : (record -> Float)
        }

type alias Value comparable1 comparable2 =
    { row : comparable1
    , col : comparable2
    , value : Float
    }
   
type alias StatsValue comparable1 comparable2 =
    { row : comparable1
    , col : comparable2
    , stats : Maybe Stats
    }

type alias RowStatsValue comparable =
    { row : comparable
    , stats : Maybe Stats
    }

type alias ColStatsValue comparable =
    { col : comparable
    , stats : Maybe Stats
    }


type alias Stats =
    { min : Float
    , max : Float
    , count : Int
    , sum : Float
    , mean : Float
    , sd : Float
    }

type alias Point comparable =
    { x : comparable
    , y : Maybe Float
    }


-- CONSTRUCTORS

crosstab : 
  CrosstabOptions record comparable1 comparable2 -> 
  List record -> 
  Crosstab comparable1 comparable2
crosstab (CrosstabOptions {row,col,value}) records =
    let 
        accum record data =
            let
                row_ = row record
                col_ = col record
                val_ = value record
                appendOrInit = Maybe.map ((::) val_) >> Maybe.withDefault [val_] >> Just
            in
                { data
                    | rows = Set.insert row_ data.rows
                    , cols = Set.insert col_ data.cols
                    , rowValues = Dict.update row_ appendOrInit data.rowValues
                    , colValues = Dict.update col_ appendOrInit data.colValues 
                    , rowcolValues = Dict.update (row_,col_) appendOrInit data.rowcolValues
                    , raw = (val_ :: data.raw)
                }

        empty =
            { rows = Set.empty
            , cols = Set.empty
            , rowValues = Dict.empty
            , colValues = Dict.empty
            , rowcolValues = Dict.empty
            , raw = []
            }

        finalize {rows,cols,rowValues,colValues,rowcolValues,raw} =
            let
                statsOrIgnore key vals dict =
                  stats vals
                    |> Maybe.map (\s -> Dict.insert key s dict)
                    |> Maybe.withDefault dict
            in
                Crosstab
                    { rows = Set.toList rows |> List.sort
                    , cols = Set.toList cols |> List.sort
                    , rowStats = Dict.foldr statsOrIgnore Dict.empty rowValues
                    , colStats = Dict.foldr statsOrIgnore Dict.empty colValues
                    , rowcolStats = Dict.foldr statsOrIgnore Dict.empty rowcolValues
                    , stats =  stats raw
                    }
    in
        List.foldr accum empty records |> finalize

statsValue : comparable1 -> comparable2 -> Maybe Stats -> StatsValue comparable1 comparable2
statsValue row col mstats =
    { row = row, col = col, stats = mstats }

rowStatsValue : comparable -> Maybe Stats -> RowStatsValue comparable
rowStatsValue row mstats =
    { row = row, stats = mstats }


-- MAPS

map : 
    (StatsValue comparable1 comparable2 -> Value comparable1 comparable2) ->
    Crosstab comparable1 comparable2 ->
    Crosstab comparable1 comparable2
map toValue crosstab =
    let
        options =
             crosstabOptions { row = .row, col = .col, value = .value }
    in
      mapStatsValue options toValue crosstab

mapStatsValue : 
    (CrosstabOptions record comparable3 comparable4) ->   
    (StatsValue comparable1 comparable2 -> record) ->
    Crosstab comparable1 comparable2 ->
    Crosstab comparable3 comparable4
mapStatsValue newOptions toNewRecord (Crosstab {rows,cols,rowcolStats}) =
    let
        newRecord row col =
            toNewRecord <| statsValue row col (Dict.get (row,col) rowcolStats)

        newData =
            listCombine newRecord rows cols
    in
        crosstab newOptions newData

mapStatsValueWithRowStats :
    (CrosstabOptions record comparable3 comparable4) ->   
    (RowStatsValue comparable1 -> StatsValue comparable1 comparable2 -> record) ->
    Crosstab comparable1 comparable2 ->
    Crosstab comparable3 comparable4
mapStatsValueWithRowStats newOptions toNewRecord (Crosstab {rows,cols,rowStats,rowcolStats}) =
    let
        newRecord row col =
            toNewRecord 
                (rowStatsValue row (Dict.get row rowStats))
                (statsValue row col (Dict.get (row,col) rowcolStats))

        newData =
            listCombine newRecord rows cols
    in
        crosstab newOptions newData

   

-- FOLDS

foldrStatsValue :
    (StatsValue comparable1 comparable2 -> a -> a) ->
    a ->
    Crosstab comparable1 comparable2 ->
    a
foldrStatsValue fold init (Crosstab {rows,cols,rowcolStats}) =
    let
        accum (row,col) a =
            statsValue row col (Dict.get (row,col) rowcolStats)
              |> flip fold a
    in
        listCombine (,) rows cols
            |> List.foldr accum init 

foldrStatsValueWithRowStats :
    (RowStatsValue comparable1 -> StatsValue comparable1 comparable2 -> a -> a) ->
    a ->
    Crosstab comparable1 comparable2 ->
    a
foldrStatsValueWithRowStats fold init (Crosstab {rows,cols,rowStats,rowcolStats}) =
    let
        accum (row,col) a =
            fold
                (rowStatsValue row (Dict.get row rowStats))
                (statsValue row col (Dict.get (row,col) rowcolStats))
                a
    in
        listCombine (,) rows cols
            |> List.foldr accum init 



-- OPTIONS

crosstabOptions : 
    { row : (record -> comparable1)
    , col : (record -> comparable2)
    , value : (record -> Float)
    } ->
    CrosstabOptions record comparable1 comparable2
crosstabOptions options =
    CrosstabOptions options



-- INTERNAL

stats : List Float -> Maybe Stats
stats data =
    let
        accum d { min, max, count, sum, mean } =
            let
                newcount =
                    count + 1

                newsum =
                    sum + d
            in
                { min =
                    if d < min then
                        d
                    else
                        min
                , max =
                    if d > max then
                        d
                    else
                        max
                , count = newcount
                , sum = newsum
                , mean = newsum / newcount
                }
                
        init d =
            { min = d
            , max = d
            , count = 1
            , sum = d
            , mean = d
            }

        finalize { min, max, count, sum, mean } =
            let
                accum2 d dev =
                    dev + ((d - mean) ^ 2)

                finalize2 dev =
                    { min = min
                    , max = max
                    , count = count
                    , sum = sum
                    , mean = mean
                    , sd = sqrt (dev / (toFloat count))
                    }
            in
                List.foldr accum2 0 data
                    |> finalize2
                    |> Just

    in
        case data of
            [] ->
                Nothing

            first :: rest ->
                List.foldr accum (init first) rest |> finalize


listCombine : (a -> b -> c) -> List a -> List b -> List c
listCombine fn xs ys =
    List.concatMap (\x -> List.map (\y -> fn x y) ys) xs
