module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onWithOptions)
import Json.Decode

import Csv.Decode exposing (Errors(..))

import Data exposing (Custody)
import Static
import SortableTable


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = init
        , update = update
        , view = view
        }


type Model
    = Static
    | SortableTable SortableTable.Model
    

init : Model
init =
    Static

isActiveStatic model =
    case model of
        Static -> True
        _ -> False

isActiveSortableTable model =
    case model of
        SortableTable _ -> True
        _ -> False

type Msg
    = SortableTableMsg SortableTable.Msg
    | SetActiveStatic
    | SetActiveSortableTable
    | NoOp


update : Msg -> Model -> Model
update msg model =
    case ( msg, model ) of
        ( SortableTableMsg msg, SortableTable model ) ->
            SortableTable.update msg model
                |> SortableTable

        ( SetActiveStatic, _) ->
            Static

        ( SetActiveSortableTable, _) ->
            SortableTable.init |> SortableTable

        ( NoOp, _) ->
            model

        _ ->
            model


view : Model -> Html Msg
view model =
    div []
        ( case Data.parsed of
            Ok data ->
                [ Html.nav []
                    [ viewTOC model ]
                , Html.aside []
                    [ viewRef ]
                , Html.node "main" []
                    [ viewExample data model ]
                ]

            Err errs ->
                [ viewErrs errs
                ]
        )

viewErrs : Csv.Decode.Errors -> Html Msg
viewErrs errs =
    let
        parseErrors errs =
            div []
                [ h1 [] [ text "Errors occurred parsing CSV data" ]
                , ul []
                    (List.map (\e -> li [] [ text e ]) errs)
                ]

        decodeErrors errs =
            div []
                [ h1 [] [ text "Errors occurred decoding CSV data to records" ]
                , ul []
                    (List.map
                        (\( i, e ) -> li [] [ text (e ++ " (line " ++ (toString i) ++ ")") ])
                        errs
                    )
                ]
    in
        case errs of
            CsvErrors errs ->
                parseErrors errs

            DecodeErrors errs ->
                decodeErrors errs


viewTOC : Model -> Html Msg
viewTOC model =
    ul []
        [ li [ classList [("active", isActiveStatic model)] ]
            [ a [ onClickCustom SetActiveStatic ] [ text "Static" ]
            ]
        , li [ classList [("active", isActiveSortableTable model)] ]
            [ a [ onClickCustom SetActiveSortableTable ] [ text "Sortable Table" ]
            ]
        ]

viewRef : Html Msg
viewRef =
    p [ style [ ( "font-size", "0.7em" ) ] ]
      [ span [] [ text "Source (Public Domain): " ]
      , span []
          [ a
              [ href "http://doi.org/10.3886/ICPSR36657.v1" ]
              [ text "National Prisoner Statistics, 1978-2015 (ICPSR 36657)" ]
          ]
      ]

viewExample : List Custody -> Model -> Html Msg
viewExample data model =
    case model of
        Static ->
            Static.view data |> Html.map (always NoOp)

        SortableTable submodel ->
            SortableTable.view data submodel |> Html.map SortableTableMsg



onClickCustom : msg -> Html.Attribute msg
onClickCustom msg =
    onWithOptions "click" 
        { preventDefault = True 
        , stopPropagation = False
        } 
        (Json.Decode.succeed msg)

