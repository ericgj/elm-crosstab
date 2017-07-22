module Static exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Csv.Decode exposing (Errors(..))
import Round
import Crosstab exposing (Crosstab)
import Crosstab.Calc
import Data exposing (parsed, Custody)


main : Html msg
main =
    div []
        [ (case parsed of
            Ok data ->
                view data

            Err errs ->
                viewErrs errs
          )
        ]


view : List Custody -> Html msg
view data =
    div []
        [ h1 [] [ text "Women in US prisons by year, % change" ]
        , viewTable (stateCustodyW "PA" "CA" data)
        , h1 [] [ text "Women of Color in US prisons by year, % change" ]
        , viewTable (stateCustodyWOC "PA" "CA" data)
        , p [ style [ ( "font-size", "0.7em" ) ] ]
            [ span [] [ text "Source: " ]
            , span []
                [ a
                    [ href "http://www.icpsr.umich.edu/icpsrweb/NACJD/studies/36657" ]
                    [ text "National Prisoner Statistics, 1978-2015 (ICPSR 36657)" ]
                ]
            ]
        ]


viewErrs : Csv.Decode.Errors -> Html msg
viewErrs errs =
    let
        parseErrors errs =
            div []
                [ h1 [] [ text "Errors occurred parsing CSV data" ]
                , ul []
                    (List.map (\e -> li [] [ text e ]) errs)
                ]

        decodeErrors errs =
            div []
                [ h1 [] [ text "Errors occurred decoding CSV data to records" ]
                , ul []
                    (List.map
                        (\( i, e ) -> li [] [ text (e ++ " (line " ++ (toString i) ++ ")") ])
                        errs
                    )
                ]
    in
        case errs of
            CsvErrors errs ->
                parseErrors errs

            DecodeErrors errs ->
                decodeErrors errs


viewTable : Crosstab Int Int String String -> Html msg
viewTable tab =
    displayCrosstab
        tableConfig
        (tab |> Crosstab.compare (carryValue prevColPct) ( 0, Nothing ))


tableConfig =
    let
        cell ( value, colpct ) =
            let
                html pct =
                    div []
                        [ div [] [ text pct ]
                        , div [ style [ ( "opacity", "0.5" ), ( "font-size", "0.7em" ) ] ]
                            [ text (toString value) ]
                        ]
            in
                colpct
                    |> Maybe.map (((*) 100) >> Round.round 1 >> (flip (++) "%") >> html)
                    |> Maybe.withDefault (html "-")
    in
        { rowLabel = text
        , colLabel = text
        , rowTotalLabel = text "All Years, Total"
        , colTotalLabel = text "US Total"
        , cell = cell
        , summary = toString >> text
        }


colPct : { x | col : Int } -> Int -> Float
colPct { col } val =
    (toFloat val) / (toFloat col)


prevColPct : { x | prevCol : Maybe Int } -> Int -> Maybe Float
prevColPct { prevCol } val =
    prevCol
        |> Maybe.map (\prev -> (toFloat (val - prev)) / (toFloat val))


carryValue : (compare -> x -> new) -> compare -> x -> ( x, new )
carryValue func comp x =
    ( x, func comp x )


stateCustodyW : String -> String -> List Custody -> Crosstab Int Int String String
stateCustodyW state1 state2 =
    Crosstab.fromList
        (Crosstab.Calc.sum)
        (Crosstab.Calc.sumOf .totalF)
        (Crosstab.levelMap
            { row =
                (\r ->
                    if r.state == state1 || r.state == state2 then
                        r.state
                    else
                        "zOther"
                )
            , col = .year >> toString
            }
        )


stateCustodyWOC : String -> String -> List Custody -> Crosstab Int Int String String
stateCustodyWOC state1 state2 =
    let
        woc r =
            r.blackF + r.hispF + r.asianF + r.nativeHawaiianF + r.asianPacificF + r.twoRaceF
    in
        Crosstab.fromList
            (Crosstab.Calc.sum)
            (Crosstab.Calc.sumOf woc)
            (Crosstab.levelMap
                { row =
                    (\r ->
                        if r.state == state1 || r.state == state2 then
                            r.state
                        else
                            "zOther"
                    )
                , col = .year >> toString
                }
            )


displayCrosstab :
    { x
        | rowLabel : comparable1 -> Html msg
        , colLabel : comparable2 -> Html msg
        , rowTotalLabel : Html msg
        , colTotalLabel : Html msg
        , cell : a -> Html msg
        , summary : b -> Html msg
    }
    -> Crosstab a b comparable1 comparable2
    -> Html msg
displayCrosstab { rowLabel, colLabel, rowTotalLabel, colTotalLabel, cell, summary } crosstab =
    let
        rowLevels =
            Crosstab.rowLevelList crosstab

        colLevels =
            Crosstab.colLevelList crosstab

        values =
            Crosstab.rowList crosstab

        rowSummary =
            Crosstab.rowSummaryList crosstab

        colSummary =
            Crosstab.colSummaryList crosstab

        tableSummary =
            Crosstab.tableSummary crosstab

        alignCols =
            ( "text-align", "right" )

        widthCols =
            ( "min-width", "100px" )

        vertAlign =
            ( "vertical-align", "bottom" )

        styleCols =
            style [ widthCols, vertAlign, alignCols ]

        styleRowHeads =
            style [ widthCols, vertAlign ]

        styleRowSums =
            style [ widthCols, vertAlign, alignCols ]

        head =
            [ tr []
                ([ th [ styleRowHeads ] [] ]
                    ++ (List.map (\col -> th [ styleCols ] [ colLabel col ]) colLevels)
                    ++ [ th [ styleRowSums ] [ rowTotalLabel ] ]
                )
            ]

        foot =
            [ tr []
                ([ td [ styleRowHeads ] [ colTotalLabel ] ]
                    ++ (List.map (\c -> td [ styleCols ] [ summary c ]) colSummary)
                    ++ [ td [ styleRowSums ] [ summary tableSummary ] ]
                )
            ]

        body =
            List.map3
                bodyRow
                rowLevels
                values
                rowSummary

        bodyRow r cvalues csum =
            tr []
                ([ td [ styleRowHeads ] [ rowLabel r ] ]
                    ++ (List.map (\v -> td [ styleCols ] [ cell v ]) cvalues)
                    ++ ([ td [ styleRowSums ] [ summary csum ] ])
                )
    in
        table []
            [ thead [] head
            , tbody [] body
            , tfoot [] foot
            ]