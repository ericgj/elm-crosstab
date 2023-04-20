module View.Crosstab.Header exposing (Header, labelOrSummary, toHeaderRowCells)

import Crosstab.Levels exposing (Levels)
import Dict exposing (Dict)
import Dict.Extra as Dict
import Html exposing (..)
import Html.Attributes exposing (rowspan)
import List.Extra as List


type alias Header =
    { colspan : Int
    , rowspan : Int
    , isSpacer : Bool
    , levels : Levels
    }


labelOrSummary : String -> Header -> Maybe String
labelOrSummary sumlbl hdr =
    case hdr.levels of
        [] ->
            Just sumlbl

        _ ->
            if hdr.isSpacer then
                Nothing

            else
                List.last hdr.levels


toHeaderRowCells : Int -> (Header -> Html msg) -> List Levels -> List (List (Html msg))
toHeaderRowCells factor render levels =
    levels
        |> toHeaderRows factor
        |> renderHeaderRowCells render



{- Render headers with given function, adding a spacer cell of the correct
   rowspan to the left of the first header row, to leave space for the row
   headings column. Whew, rowspan and colspan give you some weird markup.

   Note that these are lists of lists of td's -- leaving it to the caller to
   determine tr attributes on each.
-}


renderHeaderRowCells : (Header -> Html msg) -> List (List Header) -> List (List (Html msg))
renderHeaderRowCells render rows =
    case rows of
        [] ->
            [ [ td [] [] ] ]

        -- degenerate case
        row :: rest ->
            let
                spacer =
                    td [ rowspan <| List.length <| rows ] []
            in
            (spacer :: (row |> List.map render))
                :: (rest |> List.map (List.map render))


toHeaderRows : Int -> List Levels -> List (List Header)
toHeaderRows factor levels =
    let
        maxdims =
            levels
                |> List.map List.length
                |> List.maximum
                |> Maybe.withDefault 1

        lookup =
            levelDescendants levels

        init_ =
            Dict.repeat (List.range 1 maxdims) []
    in
    levels
        |> List.foldl (toHeaderRowsInner factor maxdims lookup) init_
        |> Dict.toList
        |> List.sortBy Tuple.first
        |> List.map Tuple.second


toHeaderRowsInner : Int -> Int -> Dict Levels Int -> Levels -> Dict Int (List Header) -> Dict Int (List Header)
toHeaderRowsInner factor maxdims lookup levels acc =
    lookup
        |> Dict.get levels
        |> Maybe.map
            (\ndesc ->
                let
                    len =
                        levelsHeaderRow levels

                    hdrs =
                        toHeaders factor maxdims ndesc levels
                in
                acc |> updateHeadersInRow len hdrs
            )
        |> Maybe.withDefault acc


levelsHeaderRow : Levels -> Int
levelsHeaderRow levels =
    case levels of
        [] ->
            1

        -- Note: summary column header is on same level as first dimension
        _ ->
            List.length levels


updateHeadersInRow : Int -> List Header -> Dict Int (List Header) -> Dict Int (List Header)
updateHeadersInRow i headers =
    Dict.update i (Maybe.map (\cur -> cur ++ headers) >> Maybe.withDefault [] >> Just)


toHeaders : Int -> Int -> Int -> Levels -> List Header
toHeaders factor maxdims ndesc levels =
    case levels of
        [] ->
            [ { rowspan = maxdims -- Note: summary column header spans same number of rows as first dimension
              , colspan = 1 * factor
              , isSpacer = False
              , levels = levels
              }
            ]

        _ ->
            if ndesc > 0 then
                [ { rowspan = maxdims - List.length levels + 1
                  , colspan = 1 * factor
                  , isSpacer = False
                  , levels = levels
                  }
                , { rowspan = 1
                  , colspan = ndesc * factor
                  , isSpacer = True
                  , levels = levels
                  }
                ]

            else
                [ { rowspan = maxdims - List.length levels + 1
                  , colspan = 1 * factor
                  , isSpacer = False
                  , levels = levels
                  }
                ]


levelDescendants : List Levels -> Dict Levels Int
levelDescendants =
    List.foldr levelDescendantsInner Dict.empty


levelDescendantsInner : Levels -> Dict Levels Int -> Dict Levels Int
levelDescendantsInner levels d =
    levels
        |> List.inits
        |> List.foldr (\k -> Dict.update k (maybeIncr >> Just)) d


maybeIncr : Maybe Int -> Int
maybeIncr =
    Maybe.map ((+) 1) >> Maybe.withDefault 0
