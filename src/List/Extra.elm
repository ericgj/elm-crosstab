module List.Extra exposing
    ( andThen
    , combinationsFrom
    , greedyGroupsOf
    , greedyGroupsOfWithStep
    , lift2
    )

import List exposing (..)


andThen : (a -> List b) -> List a -> List b
andThen =
    concatMap


lift2 : (a -> b -> c) -> List a -> List b -> List c
lift2 f la lb =
    la |> andThen (\a -> lb |> andThen (\b -> [ f a b ]))


combinationsFrom : Int -> List a -> List (List a)
combinationsFrom start list =
    List.length list
        |> List.range start
        |> List.map (\n -> List.take n list)


{-| Greedily split list into groups of length `size`. The last group of
elements will be included regardless of whether there are enough elements in
the list to completely fill it. This is equivalent to calling
`greedyGroupsOfWithStep` with the same `size` and `step`.

    greedyGroupsOf 3 (List.range 1 10)
    --> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]

-}
greedyGroupsOf : Int -> List a -> List (List a)
greedyGroupsOf size xs =
    greedyGroupsOfWithStep size size xs


{-| Greedily split list into groups of length `size` at offsets `step` apart.
The last group of elements will be included regardless of whether there are
enough elements in the list to completely fill it. (See `groupsOfWithStep`
for the non-greedy version of this function).

    greedyGroupsOfWithStep 4 4 (List.range 1 10)
    --> [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10 ] ]

    greedyGroupsOfWithStep 3 2 (List.range 1 6)
    --> [ [ 1, 2, 3 ], [ 3, 4, 5 ], [ 5, 6 ] ]

    greedyGroupsOfWithStep 3 6 (List.range 1 20)
    --> [ [ 1, 2, 3 ], [ 7, 8, 9 ], [ 13, 14, 15 ], [ 19, 20 ] ]

If `step == size`, every element will appear in exactly one group. If
`step < size`, there will be an overlap between groups. If `step > size`, some
elements will be skipped and not appear in any groups.

-}
greedyGroupsOfWithStep : Int -> Int -> List a -> List (List a)
greedyGroupsOfWithStep size step list =
    if size <= 0 || step <= 0 then
        []

    else
        let
            go : List a -> List (List a) -> List (List a)
            go xs acc =
                if List.isEmpty xs then
                    List.reverse acc

                else
                    go
                        (List.drop step xs)
                        (List.take size xs :: acc)
        in
        go list []
