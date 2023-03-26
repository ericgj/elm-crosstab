module Tree exposing (Tree(..), combine, insertBranchFromList, single)

import Dict exposing (Dict)
import List.Extra as List


type Tree comparable a
    = Tree a (Dict comparable (Tree comparable a))


single : a -> Tree comparable a
single a =
    Tree a Dict.empty


insertBranchFromList : List ( comparable, a ) -> Tree comparable a -> Tree comparable a
insertBranchFromList pairs (Tree value children) =
    case pairs of
        [] ->
            Tree value children

        ( key, a ) :: rest ->
            Tree value <|
                Dict.update
                    key
                    (insertBranchChildFromList a rest)
                    children


insertBranchChildFromList : a -> List ( comparable, a ) -> Maybe (Tree comparable a) -> Maybe (Tree comparable a)
insertBranchChildFromList item pairs existing =
    case existing of
        Nothing ->
            single item |> insertBranchFromList pairs |> Just

        Just tree ->
            tree |> insertBranchFromList pairs |> Just



-- not sure this is technically a `combine`, it's a lift2 mapping both keys and values


combine :
    (comparable -> comparable2 -> comparable3)
    -> (a -> b -> c)
    -> Tree comparable a
    -> Tree comparable2 b
    -> Tree comparable3 c
combine kfn vfn (Tree va ca) (Tree vb cb) =
    let
        combos =
            List.lift2 (\( ak, av ) ( bk, bv ) -> ( kfn ak bk, combine kfn vfn av bv ))
                (ca |> Dict.toList)
                (cb |> Dict.toList)
    in
    Tree (vfn va vb) (combos |> Dict.fromList)
