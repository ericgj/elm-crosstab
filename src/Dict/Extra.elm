module Dict.Extra exposing
    ( cartesianJoin
    , leftInnerJoin
    , leftInnerJoinOn
    , leftJoin
    , leftJoinOn
    , leftOuterJoin
    , leftOuterJoinOn
    , repeat
    )

import Dict exposing (Dict)
import List.Extra as List


repeat : List comparable -> a -> Dict comparable a
repeat keys v =
    keys |> List.foldr (\k -> Dict.insert k v) Dict.empty


leftInnerJoin :
    (a -> b -> c)
    -> Dict comparable a
    -> Dict comparable b
    -> Dict comparable c
leftInnerJoin fn =
    leftJoin (leftInnerFunc fn)


leftInnerJoinOn :
    (comparable -> comparable2 -> comparable3)
    -> (comparable -> comparable2)
    -> (a -> b -> c)
    -> Dict comparable a
    -> Dict comparable2 b
    -> Dict comparable3 c
leftInnerJoinOn kmap kfn fn =
    leftJoinOn kmap kfn (leftInnerFunc fn)


leftOuterJoin :
    (a -> Maybe b -> c)
    -> Dict comparable a
    -> Dict comparable b
    -> Dict comparable c
leftOuterJoin fn =
    leftJoin (leftOuterFunc fn)


leftOuterJoinOn :
    (comparable -> comparable2 -> comparable3)
    -> (comparable -> comparable2)
    -> (a -> Maybe b -> c)
    -> Dict comparable a
    -> Dict comparable2 b
    -> Dict comparable3 c
leftOuterJoinOn kmap kfn fn =
    leftJoinOn kmap kfn (leftOuterFunc fn)


leftJoin :
    (a -> Maybe b -> Maybe c)
    -> Dict comparable a
    -> Dict comparable b
    -> Dict comparable c
leftJoin =
    leftJoinOn (\k _ -> k) identity


leftJoinOn :
    (comparable -> comparable2 -> comparable3)
    -> (comparable -> comparable2)
    -> (a -> Maybe b -> Maybe c)
    -> Dict comparable a
    -> Dict comparable2 b
    -> Dict comparable3 c
leftJoinOn kmap kfn vfn d1 d2 =
    let
        d1pairs =
            d1 |> Dict.toList
    in
    List.foldr
        (\( k1, v1 ) d ->
            d2
                |> Dict.get (kfn k1)
                |> (\mv2 ->
                        vfn v1 mv2
                            |> Maybe.map
                                (\c ->
                                    d |> Dict.insert (kmap k1 <| kfn k1) c
                                )
                            |> Maybe.withDefault d
                   )
        )
        Dict.empty
        d1pairs


cartesianJoin :
    (comparable -> comparable2 -> comparable3)
    -> (a -> b -> c)
    -> Dict comparable a
    -> Dict comparable2 b
    -> Dict comparable3 c
cartesianJoin kfn vfn d1 d2 =
    List.lift2
        (\( k1, v1 ) ( k2, v2 ) -> ( kfn k1 k2, vfn v1 v2 ))
        (d1 |> Dict.toList)
        (d2 |> Dict.toList)
        |> Dict.fromList


leftInnerFunc : (a -> b -> c) -> a -> Maybe b -> Maybe c
leftInnerFunc fn a mb =
    mb |> Maybe.map (\b -> fn a b)


leftOuterFunc : (a -> Maybe b -> c) -> a -> Maybe b -> Maybe c
leftOuterFunc fn a mb =
    Just <| fn a mb
