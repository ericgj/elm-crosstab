module Maybe.Extra exposing (combine, isNothing, unwrap)

import Maybe exposing (..)


isNothing : Maybe a -> Bool
isNothing m =
    case m of
        Nothing ->
            True

        Just _ ->
            False


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
