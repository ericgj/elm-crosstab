module Crosstab exposing (Crosstab, tabulate)

import Dict exposing (Dict)

import List.Extra as List
import Matrix exposing (Matrix)

import Crosstab.Spec as Spec exposing (Spec)
import Crosstab.Accum as Accum exposing (Accum, ParametricData)
import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)

type Crosstab a
    = Crosstab 
        { rowDimLabels : List String
        , columnDimLabels : List String
        , valueLabel : ValueLabel
        , table : Table a
        }

type alias Table a = Dict LevelsPair a
type alias LevelsPair = (Levels, Levels)
type alias Levels = List String


-- CONSTRUCTING

init : Spec a b c -> Crosstab c
init spec =
    Crosstab 
        { rowDimLabels = Spec.rowLabels spec
        , columnDimLabels = Spec.columnLabels spec
        , valueLabel = Spec.valueLabel spec
        , table = Dict.empty
        }


tabulate : Spec a b c -> List a -> Crosstab c
tabulate spec =
    List.foldr 
        (\a cur -> updateCrosstabTable spec a cur)
        (init spec)

updateCrosstabTable : Spec a b c -> a -> Crosstab c -> Crosstab c
updateCrosstabTable spec a (Crosstab c) =
    let
        rows = Spec.rowLevels spec a
        cols = Spec.columnLevels spec a
        (fn, initVal) = Spec.value spec a
        combos = 
            List.lift2 
                Tuple.pair 
                (rows |> List.combinationsFrom 0) 
                (cols |> List.combinationsFrom 0)
    in
    Crosstab
        { c | table = updateTable combos fn initVal c.table }

updateTable : List LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateTable combos fn initVal tab =
    List.foldr 
        (\levelsPair cur -> updateCell levelsPair fn initVal cur) 
        tab
        combos 

updateCell : LevelsPair -> (c -> c) -> c -> Table c -> Table c
updateCell levelsPair fn initVal tab =
    case Dict.get levelsPair tab of
        Just c ->
            tab |> Dict.insert levelsPair (fn c)
                
        Nothing ->
            tab |> Dict.insert levelsPair initVal


-- MAPPING

type alias Mapping a b = (LevelsPair -> a -> b)

{-| Map Crosstab values, with a given label for the mapping.

-}
map : String -> Mapping a b -> Crosstab a -> Crosstab b
map label fn (Crosstab c) =
    Crosstab 
        { rowDimLabels = c.rowDimLabels
        , columnDimLabels = c.columnDimLabels
        , valueLabel = c.valueLabel |> ValueLabel.addMap label
        , table = Dict.map fn c.table
        }

{-| Merge values from a second Crosstab with a first Crosstab, with a given
    label for the merge function.

    Note that the dimensions of the first Crosstab will *always* be maintained.
    Any pair of levels found in the second but not the first will be ignored.
    Any pair of levels found in the first but not the second will be dealt with
    by the provided merge function (the Nothing case of Maybe b). 

    Typically, you would be merging two Crosstabs built from the same data
    (with different value variables), so the dimensions will be the same.
-}
merge : String -> (LevelsPair -> a -> Maybe b -> c) -> Crosstab a -> Crosstab b -> Crosstab c
merge label fn (Crosstab ca) (Crosstab cb) =
    Crosstab 
        { rowDimLabels = ca.rowDimLabels
        , columnDimLabels = ca.columnDimLabels
        , valueLabel = ca.valueLabel |> ValueLabel.addMerge label cb.valueLabel 
        , table = 
            Dict.merge
                (\k a t -> t |> Dict.insert k (fn k a Nothing))
                (\k a b t -> t |> Dict.insert k (fn k a (Just b)))
                (\k b t -> t)
                ca.table
                cb.table
                Dict.empty
        }


-- MAPPING COMPOSITION

{-| Combine two calculations on a single crosstab into one mapping function
    
    For example:
        
        calc2 Tuple.pair (rowPercent crosstab) (columnPercent crosstab)

-}
calc2 : (b -> c -> d) -> Mapping a b -> Mapping b c -> Mapping a d
calc2 fn map1 map2 =
    (\pair a -> map1 pair a |> (\b -> map2 pair b |> (\c -> fn b c)))


{-| Combine any number of calculations ona single crosstab into one mapping
    function.

    For example:

        let
            calcs = 
                (\value row rowp colp tabp -> (value, row, rowp, colp, tabp))
                    |> andCalc currentValueMaybe
                    |> andCalc (currentRowMaybe crosstab)
                    |> andCalc (rowPercentMaybe crosstab)
                    |> andCalc (columnPercentMaybe crosstab)
                    |> andCalc (tablePercentMaybe crosstab)
        in
        crosstab 
            |> Crosstab.map "Mean" Crosstab.mean 
            |> Crosstab.map "%" calcs

-}
andCalc : Mapping a b -> Mapping b (b -> c) -> Mapping a c
andCalc =
    calc2 (|>)


-- BASIC PREBUILT MAPPINGS

currentValue : Mapping a a
currentValue _ =
    identity

mean : Mapping ParametricData (Maybe Float)
mean _ =
    Accum.mean

stdDev : Mapping ParametricData (Maybe Float)
stdDev _ =
    Accum.stdDev


-- COMPARISON MAPPINGS

compareToRow : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToRow fn (Crosstab {table}) =
    (\(r,c) a -> 
        case c of
            [] ->
                fn (Just a) a
            _ ->
                table
                    |> Dict.get (r,[])
                    |> (\mr -> fn mr a)
    )
    
compareToRowMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToRowMaybe fn (Crosstab {table}) =
    (\(r,c) ma -> 
        case c of
            [] ->
                fn ma ma
            _ ->
                table
                    |> Dict.get (r,[])
                    |> Maybe.andThen identity
                    |> (\mr -> fn mr ma)
    )

compareToColumn : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToColumn fn (Crosstab {table}) =
    (\(r,c) a -> 
        case r of
            [] ->
                fn (Just a) a
            _ ->
                table
                    |> Dict.get ([],c)
                    |> (\mc -> fn mc a)
    )

compareToColumnMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToColumnMaybe fn (Crosstab {table}) =
    (\(r,c) ma -> 
        case r of
            [] ->
                fn ma ma
            _ ->
                table
                    |> Dict.get ([],c)
                    |> Maybe.andThen identity
                    |> (\mc -> fn mc ma)
    )

compareToTable : (Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToTable fn (Crosstab {table}) =
    (\_ a ->
        table
            |> Dict.get ([],[])
            |> (\ma -> fn ma a)
    )

compareToTableMaybe : (Maybe a -> Maybe a -> b) -> Crosstab (Maybe a) -> Mapping (Maybe a) b
compareToTableMaybe fn (Crosstab {table}) =
    (\_ ma ->
        table
            |> Dict.get ([],[])
            |> Maybe.andThen identity
            |> (\mt -> fn mt ma)
    )

compareToRowColumnTable : (Maybe a -> Maybe a -> Maybe a -> a -> b) -> Crosstab a -> Mapping a b
compareToRowColumnTable fn (Crosstab {table}) =
    (\(r,c) a -> 
        case (r,c) of
            ([],[]) ->
                fn (Just a) (Just a) (Just a) a
            ([],_) ->
                fn (Just a)
                   (table |> Dict.get (r,[]))
                   (table |> Dict.get ([],[]))
                   a
            (_,[]) ->
                fn (table |> Dict.get ([],c))
                   (Just a)
                   (table |> Dict.get ([],[]))
                   a
            _ ->
                fn (table |> Dict.get ([],c))
                   (table |> Dict.get (r,[]))
                   (table |> Dict.get ([],[]))
                   a
    )

compareToRowColumnTableMaybe : 
    (Maybe a -> Maybe a -> Maybe a -> Maybe a -> b) -> 
    Crosstab (Maybe a) -> 
    Mapping (Maybe a) b
compareToRowColumnTableMaybe fn (Crosstab {table}) =
    (\(r,c) ma -> 
        case (r,c) of
            ([],[]) ->
                fn ma ma ma ma
            ([],_) ->
                fn ma
                   (table |> Dict.get (r,[]) |> Maybe.andThen identity)
                   (table |> Dict.get ([],[]) |> Maybe.andThen identity)
                   ma
            (_,[]) ->
                fn (table |> Dict.get ([],c) |> Maybe.andThen identity)
                   ma
                   (table |> Dict.get ([],[]) |> Maybe.andThen identity)
                   ma
            _ ->
                fn (table |> Dict.get ([],c) |> Maybe.andThen identity)
                   (table |> Dict.get (r,[]) |> Maybe.andThen identity)
                   (table |> Dict.get ([],[]) |> Maybe.andThen identity)
                   ma
    )


currentRow : Crosstab Float -> Mapping Float (Maybe Float)
currentRow crosstab =
    crosstab
        |> compareToRow (\mr _ -> mr)

currentRowMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentRowMaybe crosstab =
    crosstab
        |> compareToRowMaybe (\mr _ -> mr)

currentColumn : Crosstab Float -> Mapping Float (Maybe Float)
currentColumn crosstab =
    crosstab
        |> compareToColumn (\mc _ -> mc)

currentColumnMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentColumnMaybe crosstab =
    crosstab
        |> compareToColumnMaybe (\mc _ -> mc)

currentTable : Crosstab Float -> Mapping Float (Maybe Float)
currentTable crosstab =
    crosstab
        |> compareToTable (\mt _ -> mt)

currentTableMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
currentTableMaybe crosstab =
    crosstab
        |> compareToTableMaybe (\mt _ -> mt)

rowPercent : Crosstab Float -> Mapping Float (Maybe Float)
rowPercent crosstab =
    crosstab
        |> compareToRow
            (\mr v -> mr |> Maybe.andThen (\r -> percentImp r v))

rowPercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
rowPercentMaybe crosstab =
    crosstab
        |> compareToRowMaybe
            (\mr mv -> Maybe.map2 (\r v -> percentImp r v) mr mv 
                |> Maybe.andThen identity
            )

columnPercent : Crosstab Float -> Mapping Float (Maybe Float)
columnPercent crosstab =
    crosstab
        |> compareToColumn
            (\mc v -> mc |> Maybe.andThen (\c -> percentImp c v))

columnPercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
columnPercentMaybe crosstab =
    crosstab
        |> compareToColumnMaybe
            (\mc mv -> Maybe.map2 (\c v -> percentImp c v) mc mv 
                |> Maybe.andThen identity
            )

tablePercent : Crosstab Float -> Mapping Float (Maybe Float)
tablePercent crosstab =
    crosstab
        |> compareToTable
            (\mt v -> mt |> Maybe.andThen (\t -> percentImp t v))

tablePercentMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
tablePercentMaybe crosstab =
    crosstab
        |> compareToTableMaybe
            (\mt mv -> Maybe.map2 (\t v -> percentImp t v) mt mv 
                |> Maybe.andThen identity
            )

chiSq : Crosstab Float -> Mapping Float (Maybe Float)
chiSq crosstab =
    crosstab
        |> compareToRowColumnTable
            (\mr mc mt v ->
                Maybe.map3 (\r c t -> chiSqImp r c t v) mr mc mt
                    |> Maybe.andThen identity
            )

chiSqMaybe : Crosstab (Maybe Float) -> Mapping (Maybe Float) (Maybe Float)
chiSqMaybe crosstab =
    crosstab
        |> compareToRowColumnTableMaybe 
            (\mr mc mt mv ->
                Maybe.map4 (\r c t v -> chiSqImp r c t v) mr mc mt mv
                    |> Maybe.andThen identity
            )


percentImp : Float -> Float -> Maybe Float
percentImp total value =
    if total == 0.0 then
        Nothing
    else
        Just <| (value / total)

chiSqImp : Float -> Float -> Float -> Float -> Maybe Float
chiSqImp row col table value =
    if col == 0.0 || row == 0.0 || table == 0.0 then 
        Nothing
    else
        let
            exp =
                col * (row / table)
        in
        Just <| ((value - exp) ^ 2) / exp 

