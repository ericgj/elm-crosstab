module CsvParser exposing
    ( Parser
    , parse
    , next, field
    , (</>)
    , oneOf
    , map
    , maybe
    )

import Tuple
import Csv exposing (Csv)

{-----------
   Csv parsing, lifted from url-parser   
-}

type Parser a b = 
    Parser (State a -> Result String (State b))

type alias State value =
    { visited : List (String,String)
    , unvisited : List (String,String)
    , value : value
    }

type Errors
   = CsvErrors (List String)
   | ParseErrors (List (Int, String))


parse : Parser (a -> a) a -> Result (List String) Csv -> Result Errors (List a)
parse parser =
    Result.mapError CsvErrors >> Result.andThen (parseCsv parser)

parseCsv : Parser (a -> a) a -> Csv -> Result Errors (List a)
parseCsv parser {headers, records} =
    List.map (parseRecord parser headers) records
        |> sequenceResultsAccumErrs
        |> Result.mapError ParseErrors

parseRecord : Parser (a -> a) a -> List String -> List String -> Result String a
parseRecord (Parser parser) headers record =
    (Result.map .value) <| parser <| 
        { visited = []
        , unvisited = List.map2 (,) headers record 
        , value = identity
        } 


next : (String -> Result String a) -> Parser (a -> b) b
next fn =
    Parser <| \{visited,unvisited,value} ->
        case unvisited of
            [] ->
                Err "Past the end of the record"
            
            (rawField,rawValue) :: rest ->
                case fn rawValue of
                    Ok nextValue ->
                        Ok <| State ((rawField,rawValue) :: visited) rest (value nextValue)
                    Err msg ->
                        Err msg

field : String -> (String -> Result String a) -> Parser (a -> b) b
field name fn =
    Parser <| \{visited,unvisited,value} ->
        case (listFind (\(name_,_) -> name_ == name) unvisited) of
            Nothing ->
                Err ("No field named '" ++ name ++ "' found")

            Just (rawField,rawValue) ->
                case fn rawValue of
                    Ok nextValue ->
                        Ok <| State visited unvisited (value nextValue)
                    Err msg ->
                        Err msg

(</>) : Parser a b -> Parser b c -> Parser a c
(</>) (Parser parseBefore) (Parser parseAfter) =
    Parser <| \state -> 
        Result.andThen parseAfter (parseBefore state)

infixr 7 </>


oneOf : List (Parser a b) -> Parser a b
oneOf parsers =
    Parser <| \state ->
        ( listFindOk (\(Parser p) -> p state)  parsers
            |> Maybe.withDefault (Err "No parsers succeeded in oneOf")
        )


map : a -> Parser a b -> Parser (b -> c) c
map subValue (Parser parse) =
    Parser <| \{visited,unvisited,value} ->
         Result.map (mapHelp value) <| parse <|
             { visited = visited
             , unvisited = unvisited
             , value = subValue
             }

mapHelp : (a -> b) -> State a -> State b
mapHelp fn {visited,unvisited,value} =
    { visited = visited
    , unvisited = unvisited
    , value = fn value
    }



maybe : (String -> Result String a) -> (String -> Result String (Maybe a))
maybe fn =
    \s -> if s == "" then (Ok Nothing) else (fn s |> Result.map Just)


---- Utils

sequenceResultsAccumErrs : List (Result e a) -> Result (List (Int,e)) (List a)
sequenceResultsAccumErrs list =
    let
        accum next (i,result) =
            case (next, result) of
                (Ok b, Ok a) ->
                    (i - 1, Ok (b :: a))
                (Err b, Ok a) ->
                    (i - 1, Err [(i,b)])
                (Ok b, Err a) ->
                    (i - 1, Err a)
                (Err b, Err a) ->
                    (i - 1, Err ((i,b) :: a))
    in
        List.foldr accum ((List.length list - 1), Ok []) list |> Tuple.second


-- List.Extra.find
listFind : (a -> Bool) -> List a -> Maybe a
listFind pred list =
    case list of
        [] ->
            Nothing

        first :: rest ->
            if pred first then
                Just first
            else
                listFind pred rest


listFindOk : (a -> Result e b) -> List a -> Maybe (Result e b)
listFindOk fn list =
    case list of
        [] ->
            Nothing

        first :: rest ->
            case fn first of
                Ok b ->
                    Just <| Ok b
                Err e ->
                    listFindOk fn rest

