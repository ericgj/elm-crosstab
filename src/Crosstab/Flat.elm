module Crosstab.Flat exposing
    ( Table(..)
    , initTable
    , title
    )

import Array
import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)
import Matrix exposing (Matrix)


type Table a
    = Table (TableData a)


type alias TableData a =
    { valueLabel : ValueLabel
    , rowDimLabels : List String
    , columnDimLabels : List String
    , rowLabels : List (List String)
    , columnLabels : List (List String)
    , table : Matrix a
    }


type alias Row a =
    List (LabelledValue a)


type alias LabelledValue a =
    { valueLabel : ValueLabel
    , rowDimLabel : String
    , columnDimLabel : String
    , rowLabel : List String
    , columnLabel : List String
    , value : a
    }



-- GETTERS


title : Table a -> String
title (Table d) =
    String.join " "
        [ d.valueLabel |> ValueLabel.toString
        , "by"
        , d.rowDimLabels |> String.join "/"
        , "and"
        , d.columnDimLabels |> String.join "/"
        ]


isEmpty : Table a -> Bool
isEmpty (Table d) =
    Matrix.isEmpty d.table


rows : Table a -> List (Row a)
rows (Table d) =
    Table d
        |> tableRows
        |> List.map3
            (\rd rl r ->
                List.map3
                    (\cd cl v ->
                        { valueLabel = d.valueLabel
                        , rowDimLabel = rd
                        , columnDimLabel = cd
                        , rowLabel = rl
                        , columnLabel = cl
                        , value = v
                        }
                    )
                    d.columnDimLabels
                    d.columnLabels
                    r
            )
            d.rowDimLabels
            d.rowLabels


tableRows : Table a -> List (List a)
tableRows (Table d) =
    d.table
        |> Matrix.height
        |> (-) 1
        |> List.range 0
        |> List.filterMap (\i -> d.table |> Matrix.getRow i)
        |> List.map Array.toList


getData : Table a -> TableData a
getData (Table d) =
    d



-- CONSTRUCTION


initTable : TableData a -> Table a
initTable d =
    Table
        { valueLabel = d.valueLabel
        , rowDimLabels = d.rowDimLabels
        , columnDimLabels = d.columnDimLabels
        , rowLabels = d.rowLabels
        , columnLabels = d.columnLabels
        , table = d.table
        }
