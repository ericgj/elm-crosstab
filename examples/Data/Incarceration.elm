module Data.Incarceration exposing
    ( Incarceration
    , Region(..)
    , csvDecode
    , regionToString
    )

import Csv.Decode as Csv exposing (field, into, pipeline)


type Region
    = Northeast
    | Midwest
    | South
    | West
    | USTotal
    | Fed
    | StateTotal


type alias Incarceration =
    { year : Int
    , state : String
    , region : Region
    , regionCode : Int
    , greaterThan1YearM : Int
    , greaterThan1YearF : Int
    , lessThan1YearM : Int
    , lessThan1YearF : Int
    , unsentencedM : Int
    , unsentencedF : Int
    , totalM : Int
    , totalF : Int
    , whiteF : Int
    , blackF : Int
    , hispF : Int
    , asianF : Int
    , nativeHawaiianF : Int
    , asianPacificF : Int
    , twoRaceF : Int
    }


regionToString : Region -> String
regionToString r =
    case r of
        Northeast ->
            "Northeast"

        Midwest ->
            "Midwest"

        South ->
            "South"

        West ->
            "West"

        USTotal ->
            "US Total"

        Fed ->
            "Federal"

        StateTotal ->
            "State Total"


regionFromCode : String -> Result String Region
regionFromCode s =
    case s of
        "1" ->
            Ok Northeast

        "2" ->
            Ok Midwest

        "3" ->
            Ok South

        "4" ->
            Ok West

        "5" ->
            Ok USTotal

        "6" ->
            Ok Fed

        "7" ->
            Ok StateTotal

        _ ->
            Err ("Unknown region code: " ++ s)



-- DECODING


csvDecode : Csv.Decoder Incarceration
csvDecode =
    into Incarceration
        |> pipeline (field "YEAR" Csv.int)
        |> pipeline (field "STATE" Csv.string)
        |> pipeline
            (field
                "REGION"
                Csv.string
                |> Csv.andThen (regionFromCode >> Csv.fromResult)
            )
        |> pipeline (field "REGION" Csv.int)
        |> pipeline (field "CUSGT1M" Csv.int)
        |> pipeline (field "CUSGT1F" Csv.int)
        |> pipeline (field "CUSLT1M" Csv.int)
        |> pipeline (field "CUSLT1F" Csv.int)
        |> pipeline (field "CUSUNSM" Csv.int)
        |> pipeline (field "CUSUNSF" Csv.int)
        |> pipeline (field "CUSTOTM" Csv.int)
        |> pipeline (field "CUSTOTF" Csv.int)
        |> pipeline (field "WHITEF" Csv.int)
        |> pipeline (field "BLACKF" Csv.int)
        |> pipeline (field "HISPF" Csv.int)
        |> pipeline (field "ASIANF" Csv.int)
        |> pipeline (field "NHPIF" Csv.int)
        |> pipeline (field "APIF" Csv.int)
        |> pipeline (field "TWORACEF" Csv.int)
