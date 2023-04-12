module Order exposing (order2, orderMany, reverseOrder)


reverseOrder : Order -> Order
reverseOrder o =
    case o of
        LT ->
            GT

        EQ ->
            EQ

        GT ->
            LT


order2 : Order -> Order -> Order
order2 o1 o2 =
    case ( o1, o2 ) of
        ( LT, LT ) ->
            LT

        ( LT, EQ ) ->
            LT

        ( LT, GT ) ->
            LT

        ( EQ, LT ) ->
            LT

        ( EQ, EQ ) ->
            EQ

        ( EQ, GT ) ->
            GT

        ( GT, LT ) ->
            GT

        ( GT, EQ ) ->
            GT

        ( GT, GT ) ->
            GT


orderMany : List Order -> Order
orderMany =
    List.foldr order2 EQ
