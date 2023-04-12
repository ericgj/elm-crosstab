module Maybe.Extra exposing (combine)

import Maybe exposing (..)


combine : List (Maybe a) -> Maybe (List a)
combine =
    List.foldr (map2 (::)) (Just [])
