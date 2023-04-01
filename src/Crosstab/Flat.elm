module Crosstab.Flat exposing (Table, initTable)

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
