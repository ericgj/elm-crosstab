module Main exposing (main)

import Html exposing (Html)
import SortableTable


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = init
        , update = update
        , view = view
        }


type Model
    = SortableTableModel SortableTable.Model


init : Model
init =
    SortableTableModel SortableTable.init


type Msg
    = SortableTableMsg SortableTable.Msg


update : Msg -> Model -> Model
update msg model =
    case ( msg, model ) of
        ( SortableTableMsg msg, SortableTableModel model ) ->
            SortableTable.update msg model
                |> SortableTableModel



-- _ ->
--    model


view : Model -> Html Msg
view model =
    case model of
        SortableTableModel model ->
            SortableTable.view model |> Html.map SortableTableMsg
