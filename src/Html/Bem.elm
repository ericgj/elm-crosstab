module Html.Bem exposing
    ( block
    , blockElem
    , blockElemMod
    , blockElemModWithAttr
    , blockElemWithAttr
    , blockMod
    , blockModWithAttr
    , blockWithAttr
    )

import Html exposing (Attribute, Html)
import Html.Attributes exposing (class)


block t =
    blockWithAttr t []


blockMod t =
    blockModWithAttr t []


blockElem t =
    blockElemWithAttr t []


blockElemMod t =
    blockElemModWithAttr t []


blockWithAttr :
    (List (Attribute a) -> List (Html a) -> Html a)
    -> List (Attribute a)
    -> String
    -> List (Html a)
    -> Html a
blockWithAttr t a b =
    t (a ++ [ class b ])


blockModWithAttr :
    (List (Attribute a) -> List (Html a) -> Html a)
    -> List (Attribute a)
    -> String
    -> ( String, String )
    -> List (Html a)
    -> Html a
blockModWithAttr t a b ( mk, mv ) =
    t (a ++ [ class b, class (b ++ "--" ++ mk ++ "-" ++ mv) ])


blockElemWithAttr :
    (List (Attribute a) -> List (Html a) -> Html a)
    -> List (Attribute a)
    -> String
    -> String
    -> List (Html a)
    -> Html a
blockElemWithAttr t a b e =
    t (a ++ [ class (b ++ "__" ++ e) ])


blockElemModWithAttr :
    (List (Attribute a) -> List (Html a) -> Html a)
    -> List (Attribute a)
    -> String
    -> String
    -> ( String, String )
    -> List (Html a)
    -> Html a
blockElemModWithAttr t a b e ( mk, mv ) =
    t (a ++ [ class (b ++ "__" ++ e), class (b ++ "__" ++ e ++ "--" ++ mk ++ "-" ++ mv) ])
