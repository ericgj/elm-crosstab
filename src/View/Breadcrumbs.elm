module View.Breadcrumbs exposing
    ( Config
    , ConfigData
    , config
    , defaultConfig
    , defaultCssConfig
    , view
    )

import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Attributes.Extra as Attributes
import Html.Bem as Bem exposing (element, elementList, elementOfList)
import Html.Events exposing (onClick)
import List.Extra as List
import Maybe.Extra as Maybe



-- VIEW


type Config msg
    = Config (ConfigData msg)


type alias ConfigData msg =
    { closedLabel : String
    , toMsg : Int -> msg
    , css : CssConfig
    }


type alias CssConfig =
    { block : String
    , iconSeparator : Maybe String
    }


config : ConfigData msg -> Config msg
config =
    Config


defaultConfig : String -> (Int -> msg) -> String -> Config msg
defaultConfig lbl toMsg b =
    Config
        { closedLabel = lbl
        , toMsg = toMsg
        , css = defaultCssConfig b
        }


defaultCssConfig : String -> CssConfig
defaultCssConfig s =
    { block = s
    , iconSeparator = Nothing
    }


getBemBlock : Config x -> Bem.Block
getBemBlock (Config { css }) =
    css.block |> Bem.init


view : Config msg -> Int -> List String -> Html msg
view c i lbls =
    let
        b =
            getBemBlock c

        el =
            b.element "breadcrumbs"

        ei =
            b.element "breadcrumb"

        es =
            b.element "breadcrumb-separator"
    in
    nav
        [ el
            |> elementList
                [ ( "end", i == List.length lbls ), ( "start", i == 0 ) ]
        ]
        [ ol [] (viewList ei es c i lbls) ]


viewList : Bem.Element -> Bem.Element -> Config msg -> Int -> List String -> List (Html msg)
viewList ei es (Config c) i lbls =
    (c.closedLabel :: lbls)
        |> List.indexedMap (viewLabel ei c.toMsg i)
        |> List.intersperse (viewSeparator es c.css.iconSeparator)


viewLabel : Bem.Element -> (Int -> msg) -> Int -> Int -> String -> Html msg
viewLabel e toMsg cur i lbl =
    let
        etype =
            if i > cur then
                "not-followed"

            else
                "followed"
    in
    li
        [ e
            |> elementOfList
                [ ( "type", etype )
                ]
        , e |> elementList [ ( "current", cur == i ) ]
        , if cur == i then
            Attributes.empty

          else
            onClick (toMsg i)
        ]
        [ text lbl ]


viewSeparator : Bem.Element -> Maybe String -> Html x
viewSeparator e sep =
    case sep of
        Nothing ->
            li [ e |> element ] [ text ">" ]

        Just s ->
            li [ e |> element, class s ] []
