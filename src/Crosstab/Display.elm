module Crosstab.Display exposing
    ( Header
    , LabelledRow
    , LabelledValue
    , Row
    , Rows
    , Table
    , TableHeader
    , columnDimLabel
    , columnDimLabels
    , columnLabel
    , columnLabels
    , fromValues
    , labelledRows
    , rowDimLabel
    , rowDimLabels
    , rowLabel
    , rowLabels
    , rows
    , tableHeader
    , value
    , valueLabel
    )

import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)
import List.Extra as List


type Table a
    = EmptyTable TableHeader
    | Table TableHeader Header (Rows a)


type TableHeader
    = TableHeader TableHeaderData


type Header
    = Header HeaderData


type alias TableHeaderData =
    { valueLabel : ValueLabel
    , rowDimLabels : List String
    , columnDimLabels : List String
    }


type alias HeaderData =
    { rowLabels : List (List String)
    , columnLabels : List (List String)
    }


type Rows a
    = Rows (Row a) (List (Row a))


type alias Row a =
    List (Maybe a)



-- CONSTRUCTING


fromValues : TableHeaderData -> HeaderData -> List (Maybe a) -> Maybe (Table a)
fromValues th h vals =
    let
        mrows =
            vals
                |> groupsOf2d (h.rowLabels |> List.length) (h.columnLabels |> List.length)
    in
    case mrows of
        Nothing ->
            Nothing

        Just [] ->
            Just <| EmptyTable (TableHeader th)

        Just (r :: rest) ->
            Just <| Table (TableHeader th) (Header h) <| Rows r rest


groupsOf2d : Int -> Int -> List a -> Maybe (List (List a))
groupsOf2d nrows ncols list =
    if List.length list == (nrows * ncols) then
        Just <| List.greedyGroupsOf ncols list

    else
        Nothing



-- GETTERS


tableHeader : Table a -> TableHeader
tableHeader tab =
    case tab of
        EmptyTable th ->
            th

        Table th _ _ ->
            th


valueLabel : Table a -> ValueLabel
valueLabel =
    getTableHeaderData >> .valueLabel


rowDimLabels : Table a -> List String
rowDimLabels =
    getTableHeaderData >> .rowDimLabels


columnDimLabels : Table a -> List String
columnDimLabels =
    getTableHeaderData >> .columnDimLabels


columnLabels : Table a -> List (List String)
columnLabels tab =
    case tab of
        EmptyTable _ ->
            []

        Table _ (Header h) _ ->
            h.columnLabels


rowLabels : Table a -> List (List String)
rowLabels tab =
    case tab of
        EmptyTable _ ->
            []

        Table _ (Header h) _ ->
            h.rowLabels


rows : Table a -> List (Row a)
rows tab =
    case tab of
        EmptyTable _ ->
            []

        Table _ _ (Rows first rest) ->
            first :: rest


getTableHeaderData : Table a -> TableHeaderData
getTableHeaderData tab =
    tab |> tableHeader |> (\(TableHeader d) -> d)



-- DISPLAY TYPES


type LabelledRow a
    = LabelledRow (LabelledRowData a)


type LabelledValue a
    = LabelledValue (LabelledValueData a)


type alias LabelledRowData a =
    { rowDimLabel : List String
    , rowLabel : List String
    , values : List (LabelledValue a)
    }


type alias LabelledValueData a =
    { columnDimLabel : List String
    , columnLabel : List String
    , value : Maybe a
    }


rowLabel : LabelledRow a -> List String
rowLabel (LabelledRow r) =
    r.rowLabel


rowDimLabel : LabelledRow a -> List String
rowDimLabel (LabelledRow r) =
    r.rowDimLabel


columnLabel : LabelledValue a -> List String
columnLabel (LabelledValue v) =
    v.columnLabel


columnDimLabel : LabelledValue a -> List String
columnDimLabel (LabelledValue v) =
    v.columnDimLabel


value : LabelledValue a -> Maybe a
value (LabelledValue v) =
    v.value


labelledRows : Table a -> List (LabelledRow a)
labelledRows tab =
    case tab of
        EmptyTable _ ->
            []

        Table (TableHeader th) (Header h) (Rows first rest) ->
            injectLabelsIntoRows th h (first :: rest)


injectLabelsIntoRows : TableHeaderData -> HeaderData -> List (Row a) -> List (LabelledRow a)
injectLabelsIntoRows th h rs =
    let
        takeFrom list n =
            List.take n list
    in
    rs
        |> List.map2
            (\rl r ->
                LabelledRow
                    { rowDimLabel = rl |> List.length |> takeFrom th.rowDimLabels
                    , rowLabel = rl
                    , values =
                        r
                            |> List.map2
                                (\cl mv ->
                                    LabelledValue
                                        { columnDimLabel = cl |> List.length |> takeFrom th.columnDimLabels
                                        , columnLabel = cl
                                        , value = mv
                                        }
                                )
                                h.columnLabels
                    }
            )
            h.rowLabels
