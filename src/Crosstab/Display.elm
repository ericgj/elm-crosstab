module Crosstab.Display exposing
    ( ColumnLabel
    , Header
    , LabelledRow
    , LabelledTable
    , LabelledValue
    , Row
    , RowLabel
    , Rows
    , Table
    , TableHeader
    , columnLabels
    , fromValues
    , labelledRows
    , labelledTable
    , tableColumnDimensions
    , tableColumnLabels
    , tableRowDimensions
    , tableRowLabels
    , tableRows
    , tableValueLabel
    )

import Crosstab.ValueLabel exposing (ValueLabel)
import List.Extra as List
import Maybe.Extra as Maybe


type Table a
    = Table TableHeader Header (Rows a)


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


type Row a
    = Row (Maybe a) (List (Maybe a))



-- CONSTRUCTING


{-| Construct a Table with given header data and a single list of values.
Used by Crosstab.query. Note that the constraints are:

1.  The data size must match the rowLabels x columnLabels
2.  There must be at least one row (the data cannot be empty)
3.  Each row must have a least one column

The first is enforced by this function, the second and third are enforced by
the Table type itself.

Returns `Nothing` if any constraints not met.

-}
fromValues : TableHeaderData -> HeaderData -> List (Maybe a) -> Maybe (Table a)
fromValues th h vals =
    let
        mrow r =
            case r of
                [] ->
                    Nothing

                v :: vs ->
                    Just <| Row v vs

        mrows =
            vals
                |> groupsOf2d (h.rowLabels |> List.length) (h.columnLabels |> List.length)
                |> Maybe.map (List.map mrow)
                |> Maybe.andThen Maybe.combine
    in
    case mrows of
        Nothing ->
            Nothing

        Just [] ->
            Nothing

        Just (r :: rest) ->
            Just <| Table (TableHeader th) (Header h) <| Rows r rest


groupsOf2d : Int -> Int -> List a -> Maybe (List (List a))
groupsOf2d nrows ncols list =
    if List.length list == (nrows * ncols) then
        Just <| List.greedyGroupsOf ncols list

    else
        Nothing



-- GETTERS


tableValueLabel : Table a -> ValueLabel
tableValueLabel (Table (TableHeader th) _ _) =
    th.valueLabel


tableRowDimensions : Table a -> List String
tableRowDimensions (Table (TableHeader th) _ _) =
    th.rowDimLabels


tableColumnDimensions : Table a -> List String
tableColumnDimensions (Table (TableHeader th) _ _) =
    th.columnDimLabels


tableColumnLabels : Table a -> List (List String)
tableColumnLabels (Table _ (Header h) _) =
    h.columnLabels


tableRowLabels : Table a -> List (List String)
tableRowLabels (Table _ (Header h) _) =
    h.rowLabels


tableRows : Table a -> List (List (Maybe a))
tableRows (Table _ _ (Rows (Row v vs) rs)) =
    (v :: vs)
        :: (rs |> List.map (\(Row v_ vs_) -> v_ :: vs_))



-- DISPLAY DATA
-- Note: this is data for rendering. It has a lot of duplication, by design.


type alias LabelledTable a =
    { columns : List ColumnLabel
    , rows : List (LabelledRow a)
    }


type alias LabelledRow a =
    ( RowLabel, List (LabelledValue a) )


type alias ColumnLabel =
    { dimension : List String
    , level : List String
    , value : String
    }


type alias RowLabel =
    { dimension : List String
    , level : List String
    }


type alias LabelledValue a =
    { column : ColumnLabel
    , row : RowLabel
    , value : Maybe a
    }


{-| Get table data in a convenient format for rendering. Note that this has a
lot of duplication, by design. Don't use this type in your state!

Pass in a list of _value columns_ (columns to calculate based on the raw
table data). For HTML rendering this will be `List (String, a -> Html Never)`,
in other words, a list of column labels with how you are rendering the data
in the columns. In a very simple case such as counts or sums (Int), this
could be specified as

    [ ( "Count", String.fromInt >> Html.text ) ]

More about value columns specification in
[View.Crosstab.Selectable].

-}
labelledTable : List ( String, a -> b ) -> Table a -> LabelledTable b
labelledTable vcols t =
    { columns = columnLabels (vcols |> List.map Tuple.first) t
    , rows = labelledRows vcols t
    }


{-| Get column labels in a convenient format for rendering, passing in a
list of value column labels. Does not include data, just labels.
-}
columnLabels : List String -> Table a -> List ColumnLabel
columnLabels vls (Table (TableHeader th) (Header h) _) =
    let
        inner cl =
            vls
                |> List.map
                    (\vl ->
                        { dimension = getLevelDimension th.columnDimLabels cl
                        , level = cl
                        , value = vl
                        }
                    )
    in
    h.columnLabels
        |> List.concatMap inner


{-| Get rows (including data) in a convenient format for rendering, passing in
a list of value columns. See `labelledTable` for more info.
-}
labelledRows : List ( String, a -> b ) -> Table a -> List (LabelledRow b)
labelledRows vcols (Table th (Header h) (Rows r rs)) =
    let
        pairs =
            h.rowLabels
                |> List.map2 Tuple.pair (r :: rs)
    in
    pairs |> List.map (\( r_, rl ) -> r_ |> labelledRow vcols th (Header h) rl)


labelledRow : List ( String, a -> b ) -> TableHeader -> Header -> List String -> Row a -> LabelledRow b
labelledRow vcols (TableHeader th) (Header h) rl (Row v vs) =
    let
        rlabel =
            { dimension = getLevelDimension th.rowDimLabels rl
            , level = rl
            }

        inner ( v_, cl ) =
            vcols
                |> List.map
                    (\( vl, vfn ) ->
                        { column =
                            { dimension = getLevelDimension th.columnDimLabels cl
                            , level = cl
                            , value = vl
                            }
                        , row = rlabel
                        , value = v_ |> Maybe.map vfn
                        }
                    )
    in
    h.columnLabels
        |> List.map2 Tuple.pair (v :: vs)
        |> List.concatMap inner
        |> (\lvals -> ( rlabel, lvals ))


getLevelDimension : List a -> List a -> List a
getLevelDimension dims l =
    dims |> List.take (List.length l)
