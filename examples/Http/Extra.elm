module Http.Extra exposing (expectCsv)

import Csv.Decode as Decode exposing (Decoder)
import Http exposing (..)


expectCsv : (Result Error (List a) -> msg) -> Decoder a -> Expect msg
expectCsv toMsg decoder =
    expectStringResponse toMsg <|
        resolve <|
            \s ->
                Result.mapError
                    Decode.errorToString
                    (Decode.decodeCsv Decode.FieldNamesFromFirstRow decoder s)


resolve : (body -> Result String a) -> Response body -> Result Error a
resolve toResult response =
    case response of
        BadUrl_ url ->
            Err (BadUrl url)

        Timeout_ ->
            Err Timeout

        NetworkError_ ->
            Err NetworkError

        BadStatus_ metadata _ ->
            Err (BadStatus metadata.statusCode)

        GoodStatus_ _ body ->
            Result.mapError BadBody (toResult body)
