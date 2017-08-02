module Crosstab exposing
    ( freqTable
    , sumTable
    , meanTable
    , table
    , freqColumn
    , sumColumn
    , meanColumn
    , column
    )

import Crosstab.Internal
import Crosstab.Calc exposing (Calc)
import Crosstab.Table as Table exposing (Table, LevelMap)
import Crosstab.Column as Column exposing (Column)


freqTable :
    LevelMap a comparable1 comparable2
    -> List a
    -> Table Int Int comparable1 comparable2
freqTable levelMap records =
    Table.table
        Crosstab.Calc.sum
        Crosstab.Calc.count
        levelMap
        records

sumTable :
    (a -> number)
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Table number number comparable1 comparable2
sumTable toNum levelMap records =
    Table.table
        Crosstab.Calc.sum
        ( Crosstab.Calc.sumOf toNum )
        levelMap
        records

meanTable :
    (a -> Float)
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Table Float Float comparable1 comparable2
meanTable toFloat levelMap records =
    Table.table
        Crosstab.Calc.meanAccum
        ( Crosstab.Calc.meanOf toFloat )
        levelMap
        records

table :
    Calc b d e
    -> Calc a b c
    -> LevelMap a comparable1 comparable2
    -> List a
    -> Table c e comparable1 comparable2
table =
    Table.table



freqColumn :
    (a -> comparable)
    -> List a
    -> Column Int Int comparable
freqColumn levelMap records =
    Column.column
        Crosstab.Calc.sum
        Crosstab.Calc.count
        levelMap
        records

sumColumn :
    (a -> number)
    -> (a -> comparable)
    -> List a
    -> Column number number comparable
sumColumn toNum levelMap records =
    Column.column
        Crosstab.Calc.sum
        ( Crosstab.Calc.sumOf toNum )
        levelMap
        records

meanColumn :
    (a -> Float)
    -> (a -> comparable)
    -> List a
    -> Column Float Float comparable
meanColumn toFloat levelMap records =
    Column.column
        Crosstab.Calc.meanAccum
        ( Crosstab.Calc.meanOf toFloat )
        levelMap
        records

column :
    Calc b d e
    -> Calc a b c
    -> (a -> comparable)
    -> List a
    -> Column c e comparable
column =
    Column.column

