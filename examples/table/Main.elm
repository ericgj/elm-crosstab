module Main exposing (..)

import Char
import Html exposing (Html, text)

import Csv
import CsvParser
import Ecg 

cr =
    [ Char.fromCode 13 ]
        |> List.foldr String.cons ""

data =
    ("ID,SUBJECT_ID,TIMEPOINT,LEAD,OVER_INTERPRET,HR,QTCB,QTCF" ++ cr) ++
    ("10314200,1000001,10,V5,NORMAL,75,411,396" ++ cr) ++
    ("10314202,1000001,20,V5,NORMAL,77,427,410" ++ cr) ++
    ("10314204,1000001,30,V5,NORMAL,78,419,401" ++ cr) ++
    ("10456521,2120001,10,V5,NORMAL,70,454,443" ++ cr) ++
    ("10456522,2120001,20,II,NORMAL,68,420,412" ++ cr)


main : Html a
main =
    text  <| toString  <|
        ( Csv.parse data
            |> CsvParser.parse Ecg.nameParser
        )
