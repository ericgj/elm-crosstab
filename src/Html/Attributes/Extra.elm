module Html.Attributes.Extra exposing (empty)

import Html exposing (Attribute)
import Html.Attributes exposing (..)
import Json.Encode


empty : Attribute x
empty =
    property "" Json.Encode.null
