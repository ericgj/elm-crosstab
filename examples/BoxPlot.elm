module BoxPlot exposing (view)

import Html exposing (..)
import Round

import Crosstab.Column exposing (Column, column)
import Crosstab.Stats exposing 
    ( NumericDescription, numericDescriptionAndValues, numericDescriptionAndValuesOf
    )

import Data exposing (Custody, Region(..))


view : List Custody -> Html msg
view data =
    data
        |> List.filter currentExcludingTotals
        |> custodyWStatsBy (.region >> toString)
        |> viewColumn "Incarceration of Women by Region, 2015"


viewColumn :
    String
    -> Column (Maybe NumericDescription, List Float) (Maybe NumericDescription, List Float) String
    -> Html msg
viewColumn title col =
    let
        levels = 
            Crosstab.Column.levelList col
        
        values =
            Crosstab.Column.valueList col

        (sumdesc, _) =
            Crosstab.Column.summary col

        head = 
            levels
                |> List.map (\s -> th [] [text s])
                |> tr []

        body =
            ( (List.map Tuple.first values) ++ [ sumdesc ] )
                |> List.map (Maybe.map bodyCell)
                |> List.map (Maybe.withDefault (td [] [ text "No data"]))
                |> tr []

        bodyCell desc =
            td [] [ viewDescription desc ]

    in
        div []
            [ h1 [] [ text title ]
            , table []
                  [ thead [] [ head ]
                  , tbody [] [ body ]
                  ]
            ]


viewDescription : NumericDescription -> Html msg
viewDescription desc =
    ul []
        [ li []
            [ strong [] [ text "25%:" ]
            , span [] [ text <| Round.round 1 <| desc.p25 ]
            ]
        , li []
            [ strong [] [ text "50%:" ]
            , span [] [ text <| Round.round 1 <| desc.p50 ]
            ]
        , li []
            [ strong [] [ text "75%:" ]
            , span [] [ text <| Round.round 1 <| desc.p75 ]
            ]
        , li []
            [ em [] [ text "mean:" ]
            , em [] [ text <| Round.round 1 <| desc.mean ]
            ]
        , li []
            [ em [] [ text "n=" ]
            , em [] [ text <| toString <| desc.count ]
            ]
        ]



-- DATA MODEL

custodyWStatsBy : 
    (Custody -> String) 
    -> List Custody 
    -> Column (Maybe NumericDescription, List Float) (Maybe NumericDescription, List Float) String
custodyWStatsBy levelmap =
    column
        numericDescriptionAndValues
        ( numericDescriptionAndValuesOf (.totalF >> toFloat) )
        levelmap


currentExcludingTotals : Custody -> Bool
currentExcludingTotals {region, year} =
    not (region == USTotal) && not (region == StateTotal) && year == 2015
