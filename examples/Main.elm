module Main exposing (main)

import Browser
import Data.Incarceration as Incarceration exposing (Incarceration)
import Example.Selectable.Simple
import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Http
import Http.Extra


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        , view = view
        }



-- MODEL


type Model
    = Model HttpState ModelData


type alias ModelData =
    { simpleSelectable : Switch Example.Selectable.Simple.Model
    }



-- HTTP STATE


type HttpState
    = Loading
    | Loaded
    | Failed Http.Error



-- SWITCH


type Switch a
    = Switch ( a, Bool )


switchOn : a -> Switch a
switchOn a =
    Switch ( a, True )


switchOff : a -> Switch a
switchOff a =
    Switch ( a, False )


switchMap : (a -> b) -> Switch a -> Switch b
switchMap fn (Switch ( a, st )) =
    Switch ( fn a, st )


toggle : Switch a -> Switch a
toggle (Switch ( a, st )) =
    Switch ( a, not st )


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model
        Loading
        { simpleSelectable = switchOff Example.Selectable.Simple.default
        }
    , loadData
    )



-- UPDATE


type Msg
    = ToggleSimpleSelectable
    | UpdateSimpleSelectable Example.Selectable.Simple.Msg
    | Received (Result Http.Error (List Incarceration))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    updateNoCmd msg model |> noCmd


updateNoCmd : Msg -> Model -> Model
updateNoCmd msg model =
    case ( msg, model ) of
        ( Received (Err err), Model _ m ) ->
            Model (Failed err) m

        ( Received (Ok data), Model _ m ) ->
            Model Loaded (setLoadedData data m)

        ( ToggleSimpleSelectable, Model st m ) ->
            Model st { m | simpleSelectable = toggle m.simpleSelectable }

        ( UpdateSimpleSelectable submsg, Model st m ) ->
            Model st (updateSimpleSelectable submsg m)


updateSimpleSelectable : Example.Selectable.Simple.Msg -> ModelData -> ModelData
updateSimpleSelectable submsg m =
    { m
        | simpleSelectable =
            switchMap
                (Example.Selectable.Simple.update submsg)
                m.simpleSelectable
    }


setLoadedData : List Incarceration -> ModelData -> ModelData
setLoadedData data m =
    { m
        | simpleSelectable =
            switchMap
                (Example.Selectable.Simple.update
                    (Example.Selectable.Simple.SetData data)
                )
                m.simpleSelectable
    }


noCmd : a -> ( a, Cmd x )
noCmd a =
    ( a, Cmd.none )



-- CMD


loadData : Cmd Msg
loadData =
    Http.get
        { url = "sourcedata/incarceration.csv"
        , expect = Http.Extra.expectCsv Received Incarceration.csvDecode
        }



-- VIEW


view : Model -> Html Msg
view (Model st m) =
    div []
        [ h1 [] [ text "Crosstab Examples" ]
        , hr [] []
        , viewHttpState st
        , m.simpleSelectable
            |> viewSwitch
                "Simple Selectable table"
                Example.Selectable.Simple.view
                UpdateSimpleSelectable
        ]


viewHttpState : HttpState -> Html msg
viewHttpState st =
    case st of
        Loading ->
            div [] [ text "Loading..." ]

        Loaded ->
            text ""

        Failed (Http.BadUrl s) ->
            div [] [ text <| "Bad URL: " ++ s ]

        Failed Http.Timeout ->
            div [] [ text <| "HTTP timed out." ]

        Failed Http.NetworkError ->
            div [] [ text <| "HTTP network error." ]

        Failed (Http.BadStatus code) ->
            div [] [ text <| "HTTP request returned error " ++ (code |> String.fromInt) ]

        Failed (Http.BadBody s) ->
            div [] [ text <| "Decoding error: " ++ s ]


viewSwitch : String -> (a -> Html msg) -> (msg -> Msg) -> Switch a -> Html Msg
viewSwitch title subview toMsg (Switch ( a, isOn )) =
    let
        inner =
            if isOn then
                [ a |> subview |> Html.map toMsg ]

            else
                []

        caret =
            if isOn then
                "▼"

            else
                "►"
    in
    div []
        [ h2 []
            [ span [ cursor "pointer", onClick ToggleSimpleSelectable ] [ text caret ]
            , span [] [ text title ]
            ]
        , div [] inner
        ]


cursor : String -> Html.Attribute msg
cursor s =
    style "cursor" s
