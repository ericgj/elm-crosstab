module Ecg exposing
    ( Ecg
    , Interpretation(..)
    , parser, nameParser
    )

import CsvParser exposing (next, field, maybe, (</>))

type alias Ecg =
    { id : String
    , subjectId : String
    , timepoint : Int
    , lead : String
    , interpret : Interpretation
    , hr : Float
    , qtcb : Float
    , qtcf : Float
    }

type Interpretation
   = Normal
   | Abnormal



parser : CsvParser.Parser (Ecg -> a) a
parser =
    CsvParser.map Ecg
        ( next Ok </>
          next Ok </>
          next String.toInt </>
          next Ok </>
          next toInterp </>
          next String.toFloat </>
          next String.toFloat </>
          next String.toFloat
        )

nameParser : CsvParser.Parser (Ecg -> a) a
nameParser =
    CsvParser.map Ecg
        ( field "ID" Ok  </>
          field "SUBJECT_ID" Ok  </>
          field "TIMEPOINT" String.toInt  </>
          field "LEAD" Ok </>
          field "OVER_INTERPRET" toInterp  </>
          field "HR" String.toFloat  </>
          field "QTCB" String.toFloat </>
          field "QTCF" String.toFloat
        )

toInterp : String -> Result String Interpretation
toInterp s =
  case String.toLower s of
      "normal" -> 
          Ok Normal
      "abnormal" -> 
          Ok Abnormal
      _ -> 
          Err ("Unknown interpretation: '" ++ s ++ "'")









{- -------------------

type alias Parser a = List (String,String) -> Result String a

parseCsv : Parser a -> Csv -> Result String (List a)
parseCsv parser {headers,records} =
    let
        parse_ rec =
          List.map2 (,) headers rec |> parser
    in
        List.map parse_ records
            |> sequenceResult


(|.) : Int -> (String -> Result String a) -> List (String,String) -> Result String (List ((String, String), a))
(|.) index fn list =
    list
        |> listGet index
        |> Maybe.map (\(_,v) -> (list, fn v))
        |> Maybe.withDefault (Err ("No such value at field " ++ (toString index)))




ecgParser : Parser Ecg
ecgParser =
    Ok Ecg
      0 |. string
      1 |. string
      2 |. int
      3 |. string
      4 |. interp
      5 |. float
      6 |. float
      7 |. float





type EcgField 
   = Id String
   | SubjectId String
   | Timepoint Int
   | Lead String
   | Interpret Interpretation
   | Hr Float
   | Qtcb Float
   | Qtcf Float


parseCsv : Csv -> Result (List Ecg)
parseCsv {headers,records} =
    let    
        addResultField (hdr,val) rdict =
            Result.map2
                (\(key,ecgfield) dict -> Dict.insert key ecgfield dict)
                (parseField hdr val)
                rdict

        toResult record =
            List.map2 (,) headers record
                |> List.foldr addResultField (Ok Dict.empty)
                |> Result.andThen fromDict
    in
        List.map toResult records
            |> sequenceResult


fromDict : Dict String EcgField -> Result String Ecg
fromDict dict =
    Ok Ecg
       |> andMapMaybe (Dict.get "id" dict)
       |> andMapMaybe (Dict.get "subjectid" dict)
       |> andMapMaybe (Dict.get "timepoint" dict)
       |> andMapMaybe (Dict.get "lead" dict)
       |> andMapMaybe (Dict.get "interpret" dict)
       |> andMapMaybe (Dict.get "hr" dict)
       |> andMapMaybe (Dict.get "qtcb" dict)
       |> andMapMaybe (Dict.get "qtcf" dict)
       |> Maybe.map Ok
       |> Maybe.withDefault (Err "Missing field")


parseField : String -> String -> Result String (String, EcgField)
parseField hdr val =
    case String.toLower hdr of
        "id" ->
            Ok ("id", Id val)
        "subjectid" ->
            Ok ("subjectid", SubjectId val)
        "timepoint" ->
            String.toInt val |> Result.map (\t -> ("timepoint", Timepoint t))
        "interpret" ->
            parseInterpret val |> Result.map (\i -> ("interpret", Interpret i))
        "hr" ->
            String.toFloat val |> Result.map (\h -> ("hr", Hr h))
        "qtcb" ->
            String.toFloat val |> Result.map (\q -> ("qtcb", Qtcb q)) 
        "qtcf" ->
            String.toFloat val |> Result.map (\q -> ("qtcf", Qtcf q))
        _ -> 
            Err ("Unknown field: " ++ hdr)

parseInterpret : String -> Result String Interpretation
parseInterpret s =
    case String.toLower s of
        "normal" -> 
            Ok Normal
        "abnomal" -> 
            Ok Abnormal
        _ -> 
            Err ("Unknown interpretation: " ++ s)

------- -}
