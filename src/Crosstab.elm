module Crosstab
    exposing
        ( Crosstab
        , Calc
        , LevelMap
        , Comparator
        , Levels
        , Values
        , Summary
        , fromList
        , fromListWithLevels
        , levelsOf
        , calc
        , compare
        , calcCompare
        , customCalc
        , mapCalcOf
        , mapCalc2
        )

import Matrix exposing (Matrix)
import Array exposing (Array)
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple


type Crosstab a b comparable1 comparable2
    = Crosstab
        { levels : Levels comparable1 comparable2
        , values : Values a
        , summary : Summary b
        }


type Calc a b c
    = Calc
        { map : b -> c
        , accum : a -> b -> b
        , init : b
        }


type LevelMap a comparable1 comparable2
    = LevelMap
        { row : a -> comparable1
        , col : a -> comparable2
        }


type alias Comparator a b =
    { table : b
    , row : b
    , col : b
    , prevRow : Maybe a
    , prevCol : Maybe a
    }


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



-- CONSTRUCTING


fromList :
    Calc b b d
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Crosstab c d comparable1 comparable2
fromList summary value map records =
    fromListWithLevels
        (levelsOf map records)
        summary
        value
        map
        records


fromListWithLevels :
    Levels comparable1 comparable2
    -> Calc b b d
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Crosstab c d comparable1 comparable2
fromListWithLevels { rows, cols } summary (Calc value) (LevelMap { row, col }) records =
    let
        rowMap =
            indexMapArray rows

        colMap =
            indexMapArray cols

        mrow record =
            row record |> flip Dict.get rowMap

        mcol record =
            col record |> flip Dict.get colMap

        accum a data =
            Maybe.map2 (\r c -> accumHelp r c a data) (mrow a) (mcol a)
                |> Maybe.withDefault data

        accumHelp r c a matrix =
            Matrix.update r c (value.accum a) matrix

        initData =
            Matrix.repeat (Array.length rows) (Array.length cols) value.init

        finalize matrix =
            Crosstab
                { levels =
                    { rows = rows
                    , cols = cols
                    }
                , values = Matrix.map value.map matrix
                , summary = calcValuesSummary summary matrix
                }
    in
        List.foldr accum initData records
            |> finalize


levelsOf :
    LevelMap a comparable1 comparable2
    -> List a
    -> Levels comparable1 comparable2
levelsOf (LevelMap { row, col }) records =
    let
        toArray set =
            Set.foldl Array.push Array.empty set

        accum record ( rows, cols ) =
            ( Set.insert (row record) rows, Set.insert (col record) cols )

        finalize ( rows, cols ) =
            { rows = toArray rows, cols = toArray cols }
    in
        List.foldr accum ( Set.empty, Set.empty ) records
            |> finalize



-- ACCESSORS


levels : Crosstab a b comparable1 comparable2 -> Levels comparable1 comparable2
levels (Crosstab { levels }) =
    levels


rowLevelList : Crosstab a b comparable1 comparable2 -> List comparable1
rowLevelList (Crosstab { levels }) =
    Array.toList levels.rows


colLevelList : Crosstab a b comparable1 comparable2 -> List comparable2
colLevelList (Crosstab { levels }) =
    Array.toList levels.cols


rowList : Crosstab a b comparable1 comparable2 -> List (List a)
rowList (Crosstab { values }) =
    toListMatrix values


rowSummaryList : Crosstab a b comparable1 comparable2 -> List b
rowSummaryList (Crosstab { summary }) =
    Array.toList summary.rows


colSummaryList : Crosstab a b comparable1 comparable2 -> List b
colSummaryList (Crosstab { summary }) =
    Array.toList summary.cols


tableSummary : Crosstab a b comparable1 comparable2 -> b
tableSummary (Crosstab { summary }) =
    summary.table



-- OPERATIONS


calc :
    Calc b b d
    -> Calc a b c
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c d comparable1 comparable2
calc summary (Calc value) (Crosstab { levels, values }) =
    let
        ( nrows, ncols ) =
            values.size

        accum i j a m =
            Matrix.update i j (value.accum a) m

        finalize matrix =
            Crosstab
                { levels = levels
                , values = Matrix.map value.map matrix
                , summary = calcValuesSummary summary matrix
                }
    in
        foldlMatrix accum
            (Matrix.repeat nrows ncols value.init)
            values
            |> finalize


compare :
    (Comparator a b -> a -> c)
    -> c
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c b comparable1 comparable2
compare comp init (Crosstab { levels, summary, values }) =
    Crosstab
        { levels = levels
        , values = compareSummaryValues comp init summary values
        , summary = summary
        }


calcCompare :
    (Comparator a b -> a -> c)
    -> Calc c c d
    -> Crosstab a b comparable1 comparable2
    -> Crosstab c d comparable1 comparable2
calcCompare comp (Calc calc) (Crosstab { levels, summary, values }) =
    let
        newValues =
            compareSummaryValues comp calc.init summary values

        newSummary =
            calcValuesSummary (Calc calc) newValues
    in
        Crosstab
            { levels = levels
            , values = newValues
            , summary = newSummary
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

mapCalc2 :
    (c -> e -> f)
    -> Calc a b c
    -> Calc a d e
    -> Calc a (b,d) f
mapCalc2 func (Calc c1) (Calc c2) =
   Calc
      { map = (\(b,d) -> func (c1.map b) (c2.map d))
      , accum = (\a (b,d) -> (c1.accum a b, c2.accum a d))   
      , init = (c1.init, c2.init)
      }


-- INTERNAL


calcValuesSummary : Calc a b c -> Values a -> Summary c
calcValuesSummary (Calc { init, accum, map }) matrix =
    let
        ( nrows, ncols ) =
            matrix.size

        accum_ i j a v =
            { v
                | table = accum a v.table
                , rows = updateArray i (accum a) v.rows
                , cols = updateArray j (accum a) v.cols
            }

        finalize v =
            { v
                | table = map v.table
                , rows = Array.map map v.rows
                , cols = Array.map map v.cols
            }
    in
        foldlMatrix accum_
            { table = init
            , rows = Array.repeat nrows init
            , cols = Array.repeat ncols init
            }
            matrix
            |> finalize


compareSummaryValues :
    (Comparator a b -> a -> c)
    -> c
    -> Summary b
    -> Values a
    -> Values c
compareSummaryValues func init { table, rows, cols } matrix =
    let
        ( nrows, ncols ) =
            matrix.size

        comparator t r c pr pc =
            { table = t
            , row = r
            , col = c
            , prevRow = pr
            , prevCol = pc
            }

        compare_ f a t pr pc r c =
            f (comparator t r c pr pc) a

        accum i j a m =
            let
                pr =
                    Matrix.get (i - 1) j matrix

                pc =
                    Matrix.get i (j - 1) matrix
            in
                Matrix.set
                    i
                    j
                    (Maybe.map2 (compare_ func a table pr pc)
                        (Array.get i rows)
                        (Array.get j cols)
                        |> Maybe.withDefault init
                    )
                    m
    in
        foldlMatrix accum
            (Matrix.repeat nrows ncols init)
            matrix



-- UTILS


indexMapArray : Array comparable -> Dict comparable Int
indexMapArray array =
    array
        |> Array.foldl (\a ( i, d ) -> ( i + 1, Dict.insert a i d )) ( 0, Dict.empty )
        |> Tuple.second


updateArray : Int -> (a -> a) -> Array a -> Array a
updateArray index func array =
    array
        |> Array.get index
        |> Maybe.map (\a -> Array.set index (func a) array)
        |> Maybe.withDefault array


setToArray : Set comparable -> Array comparable
setToArray s =
    Set.foldl Array.push Array.empty s


setFromArray : Array comparable -> Set comparable
setFromArray a =
    Array.foldl Set.insert Set.empty a


filterMapArray : (a -> Maybe b) -> Array a -> Array b
filterMapArray f xs =
    let
        maybePush : (a -> Maybe b) -> a -> Array b -> Array b
        maybePush f mx xs =
            case f mx of
                Just x ->
                    Array.push x xs

                Nothing ->
                    xs
    in
        Array.foldl (maybePush f) Array.empty xs


filterMatrixByIndexes :
    Array Int
    -> Array Int
    -> Matrix a
    -> Matrix a
filterMatrixByIndexes xs ys matrix =
    let
        levelIndexMap levels max =
            indexMapArray levels
                |> Dict.filter (\_ i -> i > -1 && i < max)

        xsMap =
            levelIndexMap xs (Matrix.width matrix)

        ysMap =
            levelIndexMap ys (Matrix.height matrix)

        accum x y v m =
            Maybe.map2
                (\newX newY ->
                    Matrix.set newX newY (Just v) m
                )
                (Dict.get x xsMap)
                (Dict.get y ysMap)
                |> Maybe.withDefault m

        -- only works if every matrix element is `Just a`, but
        -- that should be guaranteed by the xsMap, yxMap data constraints
        finalize m =
            { m
                | data = filterMapArray identity m.data
            }
    in
        foldlMatrix accum
            (Matrix.repeat (Dict.size xsMap) (Dict.size ysMap) Nothing)
            matrix
            |> finalize


toListMatrix : Matrix a -> List (List a)
toListMatrix matrix =
    let
        accum x y a ar =
            updateArray x ((::) a) ar
    in
        foldlMatrix accum
            (Array.repeat (Matrix.width matrix) [])
            matrix
            |> Array.toList


foldlMatrix :
    (Int -> Int -> a -> b -> b)
    -> b
    -> Matrix a
    -> b
foldlMatrix accum init matrix =
    let
        accum_ a ( i, b ) =
            let
                x =
                    i % (Matrix.width matrix)

                y =
                    i // (Matrix.width matrix)
            in
                ( i + 1, accum x y a b )
    in
        matrix.data
            |> Array.foldl accum_ ( 0, init )
            |> Tuple.second
