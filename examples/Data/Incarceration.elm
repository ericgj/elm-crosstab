module Data.Incarceration exposing
    ( GenderStacked
    , Incarceration
    , Region(..)
    , csvDecode
    , regionToString
    , stackedByGender
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
    , whiteM : Int
    , whiteF : Int
    , blackM : Int
    , blackF : Int
    , hispM : Int
    , hispF : Int
    , asianM : Int
    , asianF : Int
    , nativeHawaiianM : Int
    , nativeHawaiianF : Int
    , asianPacificM : Int
    , asianPacificF : Int
    , twoRaceM : Int
    , twoRaceF : Int
    }


type alias GenderStacked =
    { year : Int
    , state : String
    , region : Region
    , regionCode : Int
    , gender : String
    , greaterThan1Year : Int
    , lessThan1Year : Int
    , unsentenced : Int
    , total : Int
    , white : Int
    , hisp : Int
    , nativeHawaiian : Int
    , twoRace : Int
    }


stackedByGender : List Incarceration -> List GenderStacked
stackedByGender data =
    (data |> List.map stackedRecordByGenderM)
        ++ (data |> List.map stackedRecordByGenderF)


stackedRecordByGenderM : Incarceration -> GenderStacked
stackedRecordByGenderM r =
    { year = r.year
    , state = r.state
    , region = r.region
    , regionCode = r.regionCode
    , gender = "M"
    , greaterThan1Year = r.greaterThan1YearM
    , lessThan1Year = r.lessThan1YearM
    , unsentenced = r.unsentencedM
    , total = r.totalM
    , white = r.whiteM
    , hisp = r.hispM
    , nativeHawaiian = r.nativeHawaiianM
    , twoRace = r.twoRaceM
    }


stackedRecordByGenderF : Incarceration -> GenderStacked
stackedRecordByGenderF r =
    { year = r.year
    , state = r.state
    , region = r.region
    , regionCode = r.regionCode
    , gender = "F"
    , greaterThan1Year = r.greaterThan1YearF
    , lessThan1Year = r.lessThan1YearF
    , unsentenced = r.unsentencedF
    , total = r.totalF
    , white = r.whiteF
    , hisp = r.hispF
    , nativeHawaiian = r.nativeHawaiianF
    , twoRace = r.twoRaceF
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
        |> pipeline (field "WHITEM" Csv.int)
        |> pipeline (field "WHITEF" Csv.int)
        |> pipeline (field "BLACKM" Csv.int)
        |> pipeline (field "BLACKF" Csv.int)
        |> pipeline (field "HISPM" Csv.int)
        |> pipeline (field "HISPF" Csv.int)
        |> pipeline (field "ASIANM" Csv.int)
        |> pipeline (field "ASIANF" Csv.int)
        |> pipeline (field "NHPIM" Csv.int)
        |> pipeline (field "NHPIF" Csv.int)
        |> pipeline (field "APIM" Csv.int)
        |> pipeline (field "APIF" Csv.int)
        |> pipeline (field "TWORACEM" Csv.int)
        |> pipeline (field "TWORACEF" Csv.int)
