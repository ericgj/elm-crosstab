module TestCrosstab exposing (suite)

import Crosstab exposing (Crosstab(..))
import Crosstab.Accum as Accum exposing (Accum)
import Crosstab.Display as Display
import Crosstab.Query as Query exposing (Query)
import Crosstab.Spec as Spec exposing (Spec)
import Crosstab.ValueLabel as ValueLabel
import Dict exposing (Dict)
import Expect exposing (Expectation)
import Test exposing (..)


type alias Datum1x1 =
    { row : String
    , col : String
    , val : Int
    }


suite : Test
suite =
    describe "suite"
        [ describe "tabulate"
            [ describe "1x1"
                [ test "sum" <|
                    \_ ->
                        spec1x1 "value" (Accum.sum .val)
                            |> (\s -> Crosstab.tabulate s sample1x1)
                            |> Expect.all
                                [ expectTableContains expected1x1sums
                                , expectValueLabelString "Sum value"
                                ]
                , test "count" <|
                    \_ ->
                        spec1x1 "value" Accum.count
                            |> (\s -> Crosstab.tabulate s sample1x1)
                            |> Expect.all
                                [ expectTableContains expected1x1counts
                                , expectValueLabelString "Count value"
                                ]
                , test "mean" <|
                    \_ ->
                        spec1x1 "value" (Accum.parametric .val)
                            |> (\s -> Crosstab.tabulate s sample1x1)
                            |> Crosstab.map "Mean" Crosstab.mean
                            |> Expect.all
                                [ expectTableContainsMaybeFloat expected1x1means
                                , expectValueLabelString "Mean (value)"
                                ]
                ]
            ]
        , describe "query"
            [ describe "1x1"
                [ test "sort rows and columns levels desc" <|
                    \_ ->
                        let
                            rowSort =
                                Query.sortByLevels Query.Desc

                            colSort =
                                rowSort

                            ( expRowLabels, expColLabels, expValues ) =
                                expected1x1sortLevelsDesc expected1x1sums
                        in
                        expectQuery1x1
                            (Accum.sum .val)
                            (Query.sortingBy rowSort colSort)
                            expRowLabels
                            expColLabels
                            expValues
                , test "sort rows value desc, columns levels asc" <|
                    \_ ->
                        let
                            rowSort =
                                Query.sortByValue Query.Desc

                            colSort =
                                Query.sortByLevels Query.Asc

                            ( expRowLabels, expColLabels, expValues ) =
                                expected1x1sortRowValueDescColLevelsAscSums False
                        in
                        expectQuery1x1
                            (Accum.sum .val)
                            (Query.sortingBy rowSort colSort)
                            expRowLabels
                            expColLabels
                            expValues
                , test "sort rows value desc, columns levels asc, with summary at end" <|
                    \_ ->
                        let
                            rowSort =
                                Query.withSummaryAtEnd <| Query.sortByValue Query.Desc

                            colSort =
                                Query.withSummaryAtEnd <| Query.sortByLevels Query.Asc

                            ( expRowLabels, expColLabels, expValues ) =
                                expected1x1sortRowValueDescColLevelsAscSums True
                        in
                        expectQuery1x1
                            (Accum.sum .val)
                            (Query.sortingBy rowSort colSort)
                            expRowLabels
                            expColLabels
                            expValues
                ]
            ]
        ]


expectQuery1x1 :
    Accum Datum1x1 b comparable
    -> Query comparable
    -> List (List String)
    -> List (List String)
    -> List (List (Maybe comparable))
    -> Expectation
expectQuery1x1 accum q expRowLabels expColLabels expValues =
    let
        expects =
            Expect.all
                [ expectDisplayTableColLabels expColLabels
                , expectDisplayTableRowLabels expRowLabels
                , expectDisplayTableValues expValues
                ]
    in
    spec1x1 "value" accum
        |> (\s -> Crosstab.tabulate s sample1x1)
        |> Crosstab.query q
        |> Maybe.map expects
        |> Maybe.withDefault
            (Expect.fail "Failed to construct Display Table")



{- No longer used

   expectRowDimLabels : List String -> Crosstab a -> Expectation
   expectRowDimLabels expected (Crosstab c) =
       Expect.equal expected c.rowDimLabels
           |> Expect.onFail
               ("Expected rowDimLabels "
                   ++ Debug.toString expected
                   ++ " , was "
                   ++ Debug.toString c.rowDimLabels
               )


   expectColDimLabels : List String -> Crosstab a -> Expectation
   expectColDimLabels expected (Crosstab c) =
       Expect.equal expected c.columnDimLabels
           |> Expect.onFail
               ("Expected columnDimLabels "
                   ++ Debug.toString expected
                   ++ " , was "
                   ++ Debug.toString c.columnDimLabels
               )

-}


expectValueLabelString : String -> Crosstab a -> Expectation
expectValueLabelString expected (Crosstab c) =
    let
        actual =
            c.valueLabel |> ValueLabel.toString
    in
    actual
        |> Expect.equal expected
        |> Expect.onFail
            ("Expected string valueLabel '"
                ++ expected
                ++ "' , was '"
                ++ actual
                ++ "'"
            )


expectTableContains : List ( ( List String, List String ), comparable ) -> Crosstab comparable -> Expectation
expectTableContains pairs (Crosstab c) =
    c.table
        |> Expect.all
            (pairs |> List.map (\( ( rs, cs ), a ) -> dictValueEquals a ( rs, cs )))



{- Not used yet

   expectTableContainsMaybe :
       List ( ( List String, List String ), Maybe comparable )
       -> Crosstab (Maybe comparable)
       -> Expectation
   expectTableContainsMaybe pairs (Crosstab c) =
       c.table
           |> Expect.all
               (pairs
                   |> List.map
                       (\( ( rs, cs ), ma ) ->
                           dictValueEqualsMaybe ma ( rs, cs )
                       )
               )
-}


expectTableContainsMaybeFloat :
    List ( ( List String, List String ), Maybe Float )
    -> Crosstab (Maybe Float)
    -> Expectation
expectTableContainsMaybeFloat pairs (Crosstab c) =
    c.table
        |> Expect.all
            (pairs
                |> List.map
                    (\( ( rs, cs ), ma ) ->
                        dictValueEqualsMaybeFloat ma ( rs, cs )
                    )
            )


expectDisplayTableRowLabels : List (List String) -> Display.Table a -> Expectation
expectDisplayTableRowLabels expected tab =
    let
        actual =
            Display.tableRowLabels tab
    in
    Expect.equal expected actual
        |> Expect.onFail
            ("Expected row labels "
                ++ Debug.toString expected
                ++ " , were "
                ++ Debug.toString actual
            )


expectDisplayTableColLabels : List (List String) -> Display.Table a -> Expectation
expectDisplayTableColLabels expected tab =
    let
        actual =
            Display.tableColumnLabels tab
    in
    Expect.equal expected actual
        |> Expect.onFail
            ("Expected column labels "
                ++ Debug.toString expected
                ++ " , were "
                ++ Debug.toString actual
            )


expectDisplayTableValues : List (List (Maybe comparable)) -> Display.Table comparable -> Expectation
expectDisplayTableValues expected tab =
    tab
        |> Display.tableRows
        |> Expect.equalLists expected



-- TEST DATA AND EXPECTED RESULTS


spec1x1 : String -> Accum Datum1x1 b c -> Spec Datum1x1 b c
spec1x1 label accum =
    Spec.init
        { rows = [ ( "1", .row ) ]
        , columns = [ ( "1", .col ) ]
        , value = ( label, accum )
        }


sample1x1 : List Datum1x1
sample1x1 =
    [ { row = "A", col = "1", val = 1 }
    , { row = "A", col = "1", val = 2 }
    , { row = "A", col = "2", val = 3 }
    , { row = "A", col = "2", val = 4 }
    , { row = "A", col = "1", val = 5 }
    , { row = "B", col = "3", val = 6 }
    , { row = "B", col = "4", val = 7 }
    , { row = "B", col = "3", val = 8 }
    , { row = "B", col = "4", val = 9 }
    , { row = "C", col = "1", val = 10 }
    ]


expected1x1sums : List ( ( List String, List String ), Int )
expected1x1sums =
    [ ( ( [ "A" ], [] ), 1 + 2 + 3 + 4 + 5 )
    , ( ( [ "A" ], [ "1" ] ), 1 + 2 + 5 )
    , ( ( [ "A" ], [ "2" ] ), 3 + 4 )
    , ( ( [ "B" ], [] ), 6 + 7 + 8 + 9 )
    , ( ( [ "B" ], [ "3" ] ), 6 + 8 )
    , ( ( [ "B" ], [ "4" ] ), 7 + 9 )
    , ( ( [ "C" ], [] ), 10 )
    , ( ( [ "C" ], [ "1" ] ), 10 )
    , ( ( [], [ "1" ] ), 1 + 2 + 5 + 10 )
    , ( ( [], [ "2" ] ), 3 + 4 )
    , ( ( [], [ "3" ] ), 6 + 8 )
    , ( ( [], [ "4" ] ), 7 + 9 )
    , ( ( [], [] ), 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 )
    ]


expected1x1counts : List ( ( List String, List String ), Int )
expected1x1counts =
    [ ( ( [ "A" ], [] ), 1 + 1 + 1 + 1 + 1 )
    , ( ( [ "A" ], [ "1" ] ), 1 + 1 + 1 )
    , ( ( [ "A" ], [ "2" ] ), 1 + 1 )
    , ( ( [ "B" ], [] ), 1 + 1 + 1 + 1 )
    , ( ( [ "B" ], [ "3" ] ), 1 + 1 )
    , ( ( [ "B" ], [ "4" ] ), 1 + 1 )
    , ( ( [ "C" ], [] ), 1 )
    , ( ( [ "C" ], [ "1" ] ), 1 )
    , ( ( [], [ "1" ] ), 1 + 1 + 1 + 1 )
    , ( ( [], [ "2" ] ), 1 + 1 )
    , ( ( [], [ "3" ] ), 1 + 1 )
    , ( ( [], [ "4" ] ), 1 + 1 )
    , ( ( [], [] ), 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 )
    ]


expected1x1means : List ( ( List String, List String ), Maybe Float )
expected1x1means =
    List.map2
        (\( ( sumrs, sumcs ), suma ) ( _, cnta ) ->
            ( ( sumrs, sumcs )
            , if cnta == 0 then
                Nothing

              else
                Just <| toFloat suma / toFloat cnta
            )
        )
        expected1x1sums
        expected1x1counts


expected1x1sortLevelsDesc :
    List ( ( List String, List String ), a )
    -> ( List (List String), List (List String), List (List (Maybe a)) )
expected1x1sortLevelsDesc expected =
    let
        rdims =
            [ [ "C" ], [ "B" ], [ "A" ], [] ]

        cdims =
            [ [ "4" ], [ "3" ], [ "2" ], [ "1" ], [] ]
    in
    expected1x1sort rdims cdims expected


expected1x1sortRowValueDescColLevelsAscSums :
    Bool
    -> ( List (List String), List (List String), List (List (Maybe Int)) )
expected1x1sortRowValueDescColLevelsAscSums summaryAtEnd =
    let
        rdims =
            -- summary at end in any case when Desc
            [ [ "B" ], [ "A" ], [ "C" ], [] ]

        cdims =
            if summaryAtEnd then
                [ [ "1" ], [ "2" ], [ "3" ], [ "4" ], [] ]

            else
                [ [], [ "1" ], [ "2" ], [ "3" ], [ "4" ] ]
    in
    expected1x1sort rdims cdims expected1x1sums



-- Note: don't call directly unless you know what you're doing


expected1x1sort :
    List (List String)
    -> List (List String)
    -> List ( ( List String, List String ), a )
    -> ( List (List String), List (List String), List (List (Maybe a)) )
expected1x1sort rdims cdims expected =
    let
        lookup =
            Dict.fromList expected
    in
    ( rdims
    , cdims
    , rdims
        |> List.map
            (\rs ->
                cdims
                    |> List.map
                        (\cs -> lookup |> Dict.get ( rs, cs ))
            )
    )



-- GENERIC EXPECTATIONS


dictValueEquals : comparable2 -> comparable -> Dict comparable comparable2 -> Expectation
dictValueEquals expected k dict =
    let
        actual =
            dict |> Dict.get k
    in
    case actual of
        Nothing ->
            Expect.fail ("No key " ++ Debug.toString k ++ " found")

        Just a ->
            a
                |> Expect.equal expected
                |> Expect.onFail
                    ("Expected "
                        ++ Debug.toString expected
                        ++ " at key "
                        ++ Debug.toString k
                        ++ " , was "
                        ++ Debug.toString a
                        ++ "\n"
                        ++ "Dict: "
                        ++ Debug.toString dict
                    )



{- Not used yet

   dictValueEqualsMaybe :
       Maybe comparable2
       -> comparable
       -> Dict comparable (Maybe comparable2)
       -> Expectation
   dictValueEqualsMaybe expected k dict =
       let
           actual =
               dict |> Dict.get k |> Maybe.andThen identity
       in
       case ( expected, actual ) of
           ( Nothing, Nothing ) ->
               Expect.pass

           ( Nothing, Just a ) ->
               Expect.fail <|
                   "Expected no value at "
                       ++ Debug.toString k
                       ++ " , was "
                       ++ Debug.toString a
                       ++ "\n"
                       ++ "Dict: "
                       ++ Debug.toString dict

           ( Just e, Nothing ) ->
               Expect.fail <|
                   "Expected "
                       ++ Debug.toString e
                       ++ " at "
                       ++ Debug.toString k
                       ++ " , but was no value"
                       ++ "\n"
                       ++ "Dict: "
                       ++ Debug.toString dict

           ( Just e, Just a ) ->
               a
                   |> Expect.equal e
                   |> Expect.onFail
                       ("Expected "
                           ++ Debug.toString e
                           ++ " at key "
                           ++ Debug.toString k
                           ++ " , was "
                           ++ Debug.toString a
                           ++ "\n"
                           ++ "Dict: "
                           ++ Debug.toString dict
                       )
-}


dictValueEqualsMaybeFloat :
    Maybe Float
    -> comparable
    -> Dict comparable (Maybe Float)
    -> Expectation
dictValueEqualsMaybeFloat expected k dict =
    let
        actual =
            dict |> Dict.get k |> Maybe.andThen identity
    in
    case ( expected, actual ) of
        ( Nothing, Nothing ) ->
            Expect.pass

        ( Nothing, Just a ) ->
            Expect.fail <|
                "Expected no value at "
                    ++ Debug.toString k
                    ++ " , was "
                    ++ Debug.toString a
                    ++ "\n"
                    ++ "Dict: "
                    ++ Debug.toString dict

        ( Just e, Nothing ) ->
            Expect.fail <|
                "Expected "
                    ++ Debug.toString e
                    ++ " at "
                    ++ Debug.toString k
                    ++ " , but was no value"
                    ++ "\n"
                    ++ "Dict: "
                    ++ Debug.toString dict

        ( Just e, Just a ) ->
            a
                |> Expect.within (Expect.Relative 0.001) e
                |> Expect.onFail
                    ("Expected "
                        ++ Debug.toString e
                        ++ " at key "
                        ++ Debug.toString k
                        ++ " , was "
                        ++ Debug.toString a
                        ++ "\n"
                        ++ "Dict: "
                        ++ Debug.toString dict
                    )
