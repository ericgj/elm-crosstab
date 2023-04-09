module Crosstab.Display exposing
    ( ColumnHeader(..)
    , Header
    , LabelledRow
    , LabelledValue
    , Row
    , Rows
    , Table
    , TableHeader
    , columnDimLabel
    , columnDimLabels
    , columnHeaders
    , columnLabel
    , columnLabels
    , fromValues
    , labelledRows
    , mapValues
    , maxColumnDims
    , maxColumns
    , rowDimLabel
    , rowDimLabels
    , rowLabel
    , rowLabels
    , rows
    , tableHeader
    , title
    , value
    , valueLabel
    , values
    )

import Crosstab.ValueLabel as ValueLabel exposing (ValueLabel)
import List.Extra as List
import Window exposing (Window)


type Table a
    = EmptyTable TableHeader
    | Table TableHeader Header (Rows a)


type TableHeader
    = TableHeader TableHeaderData


type Header
    = Header HeaderData


type alias TableHeaderData =
    { valueLabel : ValueLabel
    , rowDimLabels : Window String
    , columnDimLabels : Window String
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


title : TableHeader -> String
title (TableHeader th) =
    (th.valueLabel |> ValueLabel.toString)
        ++ " by "
        ++ (th.rowDimLabels |> Window.getOpen |> String.join "-")
        ++ " and "
        ++ (th.columnDimLabels |> Window.getOpen |> String.join "-")


valueLabel : TableHeader -> ValueLabel
valueLabel (TableHeader th) =
    th.valueLabel


rowDimLabels : TableHeader -> Window String
rowDimLabels (TableHeader th) =
    th.rowDimLabels


columnDimLabels : TableHeader -> Window String
columnDimLabels (TableHeader th) =
    th.columnDimLabels


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
    , valueLabel : String
    , value : Maybe a
    }


rowLabel : LabelledRow a -> List String
rowLabel (LabelledRow r) =
    r.rowLabel


rowDimLabel : LabelledRow a -> List String
rowDimLabel (LabelledRow r) =
    r.rowDimLabel


values : LabelledRow a -> List (LabelledValue a)
values (LabelledRow r) =
    r.values


columnLabel : LabelledValue a -> List String
columnLabel (LabelledValue v) =
    v.columnLabel


columnDimLabel : LabelledValue a -> List String
columnDimLabel (LabelledValue v) =
    v.columnDimLabel


value : LabelledValue a -> Maybe a
value (LabelledValue v) =
    v.value


maxColumns : LabelledRow a -> Int
maxColumns (LabelledRow r) =
    r.values |> List.length


maxColumnDims : LabelledRow a -> Int
maxColumnDims (LabelledRow r) =
    r.values
        |> List.map (\(LabelledValue d) -> d.columnDimLabel |> List.length)
        |> List.maximum
        |> Maybe.withDefault 0


labelledRows : Table a -> List (LabelledRow a)
labelledRows tab =
    case tab of
        EmptyTable _ ->
            []

        Table (TableHeader th) (Header h) (Rows first rest) ->
            injectLabelsIntoRows th h (first :: rest)


mapValues : List ( String, a -> b ) -> List (LabelledRow a) -> List (LabelledRow b)
mapValues vcols rs =
    rs
        |> List.map (mapValuesRow vcols)


mapValuesRow : List ( String, a -> b ) -> LabelledRow a -> LabelledRow b
mapValuesRow vcols (LabelledRow d) =
    let
        construct_ vs =
            LabelledRow
                { rowDimLabel = d.rowDimLabel
                , rowLabel = d.rowLabel
                , values = vs
                }
    in
    d.values
        |> List.concatMap (mapValuesRowValue vcols)
        |> construct_


mapValuesRowValue : List ( String, a -> b ) -> LabelledValue a -> List (LabelledValue b)
mapValuesRowValue vcols (LabelledValue d) =
    let
        map_ ( vlabel, fn ) =
            LabelledValue
                { columnDimLabel = d.columnDimLabel
                , columnLabel = d.columnLabel
                , valueLabel = vlabel
                , value = d.value |> Maybe.map fn
                }
    in
    vcols
        |> List.map map_


injectLabelsIntoRows : TableHeaderData -> HeaderData -> List (Row a) -> List (LabelledRow a)
injectLabelsIntoRows th h rs =
    let
        dimLabel l w =
            l |> List.length |> (\n -> w |> Window.getOpen |> List.take n)
    in
    rs
        |> List.map2
            (\rl r ->
                LabelledRow
                    { rowDimLabel = dimLabel rl th.rowDimLabels
                    , rowLabel = rl
                    , values =
                        r
                            |> List.map2
                                (\cl mv ->
                                    LabelledValue
                                        { columnDimLabel = dimLabel cl th.columnDimLabels
                                        , columnLabel = cl
                                        , valueLabel = ValueLabel.toString th.valueLabel
                                        , value = mv
                                        }
                                )
                                h.columnLabels
                    }
            )
            h.rowLabels



-- COLUMN HEADERS


type ColumnHeader
    = ColumnHeader (Maybe String)
    | SummaryColumnHeader Float (Maybe String)
    | ValueColumnHeader String
    | SummaryValueColumnHeader Float String


columnHeaders : LabelledRow a -> ( List (List ColumnHeader), List ColumnHeader )
columnHeaders r =
    let
        max =
            r |> maxColumnDims

        accum_ v ( mlast, vhdr, chdrs ) =
            ( Just <| v
            , vhdr ++ [ valueHeaderFromLabelledValue max v ]
            , chdrs
                |> List.map2
                    (\new chdr -> chdr ++ [ new ])
                    (columnHeadersFromLabelledValue max mlast v)
            )
    in
    r
        |> values
        |> List.foldl accum_ ( Nothing, [], [] |> List.repeat max )
        |> (\( _, vh, chdrs ) -> ( chdrs, vh ))


valueHeaderFromLabelledValue : Int -> LabelledValue a -> ColumnHeader
valueHeaderFromLabelledValue max (LabelledValue v) =
    let
        len =
            v.columnLabel |> List.length

        p =
            columnSummaryLevel max len
    in
    if p == 0.0 then
        ValueColumnHeader v.valueLabel

    else
        SummaryValueColumnHeader p v.valueLabel


columnHeadersFromLabelledValue : Int -> Maybe (LabelledValue a) -> LabelledValue a -> List ColumnHeader
columnHeadersFromLabelledValue max mlast (LabelledValue v) =
    case mlast of
        Nothing ->
            columnHeadersFromLabel max v.columnLabel

        Just (LabelledValue v_) ->
            if v.columnLabel == v_.columnLabel then
                columnHeadersFromLabel max []

            else
                columnHeadersFromLabel max v.columnLabel


columnSummaryLevel : Int -> Int -> Float
columnSummaryLevel max len =
    1.0 - ((len |> toFloat) / (max |> toFloat))


columnHeadersFromLabel : Int -> List String -> List ColumnHeader
columnHeadersFromLabel max label =
    let
        len =
            label |> List.length

        p =
            columnSummaryLevel max len
    in
    label
        |> listPadr max
        |> List.indexedMap
            (\i m ->
                if i == (len - 1) then
                    m

                else
                    Nothing
            )
        |> List.map
            (\m ->
                if p == 0.0 then
                    ColumnHeader m

                else
                    SummaryColumnHeader p m
            )


listPadr : Int -> List a -> List (Maybe a)
listPadr size list =
    let
        len =
            list |> List.length
    in
    case compare len size of
        EQ ->
            list |> List.map Just

        LT ->
            (list |> List.map Just)
                ++ List.repeat (size - len) Nothing

        GT ->
            List.range 1 size
                |> List.map2 (\a _ -> Just a) list
