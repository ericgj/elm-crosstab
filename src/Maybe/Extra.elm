module Maybe.Extra exposing (combine, unwrap)

import Maybe exposing (..)


combine : List (Maybe a) -> Maybe (List a)
combine =
    List.foldr (map2 (::)) (Just [])


unwrap : b -> (a -> b) -> Maybe a -> b
unwrap default f m =
    case m of
        Nothing ->
            default

        Just a ->
            f a
