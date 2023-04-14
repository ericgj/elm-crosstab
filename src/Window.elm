module Window exposing
    ( Window
    , closeBy
    , decrease
    , empty
    , getClosed
    , getOpen
    , increase
    , init
    , initClosed
    , initMaybeOpen
    , initOpen
    , isClosed
    , isEmpty
    , isOpen
    , openBy
    , openTo
    , toList
    , toPair
    )


type Window a
    = Window (List a) (List a)


empty : Window a
empty =
    Window [] []


init : Int -> List a -> Window a
init n list =
    Window (list |> List.take n) (list |> List.drop n)


initOpen : List a -> Window a
initOpen list =
    Window list []


initClosed : List a -> Window a
initClosed list =
    Window [] list


initMaybeOpen : Maybe Int -> List a -> Window a
initMaybeOpen m list =
    m |> Maybe.map (\n -> init n list) |> Maybe.withDefault (initOpen list)


isEmpty : Window a -> Bool
isEmpty (Window l r) =
    case ( l, r ) of
        ( [], [] ) ->
            True

        _ ->
            False


isOpen : Window a -> Bool
isOpen (Window _ r) =
    case r of
        [] ->
            True

        _ ->
            False


isClosed : Window a -> Bool
isClosed (Window l _) =
    case l of
        [] ->
            True

        _ ->
            False


toPair : Window a -> ( List a, List a )
toPair (Window l r) =
    ( l, r )


toList : Window a -> List a
toList (Window l r) =
    l ++ r


getOpen : Window a -> List a
getOpen =
    toPair >> Tuple.first


getClosed : Window a -> List a
getClosed =
    toPair >> Tuple.second


openBy : Int -> Window a -> Window a
openBy n (Window l r) =
    Window
        (l ++ List.take n r)
        (List.drop n r)


closeBy : Int -> Window a -> Window a
closeBy n (Window l r) =
    let
        rn =
            List.length l - n
    in
    Window
        (List.take rn l)
        (List.drop rn l ++ r)


openTo : Int -> Window a -> Window a
openTo n (Window l r) =
    (l ++ r)
        |> init n


increase : Window a -> Window a
increase =
    openBy 1


decrease : Window a -> Window a
decrease =
    closeBy 1
