module Example.Selectable.TwoByTwo exposing (Model, Msg(..), default, update, view)

import Crosstab exposing (Crosstab)
import Crosstab.Accum as Accum exposing (ParametricStats)
import Crosstab.Spec as Spec
import Data.Incarceration as Incarceration
import Html exposing (..)
import View.Crosstab.Selectable as Selectable



-- MODEL


type alias I =
    Incarceration.Incarceration


type alias Model =
    Selectable.State


default : Model
default =
    Selectable.init



-- CROSSTAB


getRegionWithCode : { r | region : Incarceration.Region, regionCode : Int } -> String
getRegionWithCode i =
    (i.regionCode |> String.fromInt)
        ++ "-"
        ++ (i.region |> Incarceration.regionToString)



{- can't handle this kind of thing yet :(
   regionSort : List String -> Query.CompareAxis a
   regionSort lsort =
       lsort
           |> Query.sortByFirstLevelInGivenOrder LT
           |> Query.withSummaryAtEnd

-}


spec =
    Spec.init
        { rows =
            [ ( "region", getRegionWithCode )
            , ( "state", .state )
            ]
        , columns =
            [ ( "year", .year >> String.fromInt )
            , ( "gender", .gender )
            ]
        , value = ( "incarceration", Accum.parametric (\i -> i.total) )
        }


toCrosstab : List I -> Crosstab ParametricStats
toCrosstab data =
    data
        |> List.filter
            (\i ->
                (i.year >= 2005)
                    && not (i.region == Incarceration.USTotal)
            )
        |> Incarceration.stackedByGender
        |> Crosstab.tabulate spec
        |> Crosstab.map "Stats" Crosstab.parametricStats



-- CONFIG


tableConfig : Selectable.Config ParametricStats Float
tableConfig =
    Selectable.valueConfig
        [ { label = "Pop"
          , render = .sum >> round >> String.fromInt >> text
          , sort = .sum
          }
        , { label = "Avg/State"
          , render =
                .mean
                    >> Maybe.map (round >> String.fromInt >> text)
                    >> Maybe.withDefault Selectable.defaultEmptyCell
          , sort = .mean >> Maybe.withDefault 0.0
          }
        ]
        |> Selectable.withCssBlock "twobytwo-crosstab"



-- UPDATE


type Msg
    = UpdateSelected Selectable.Msg


update : Msg -> Model -> Model
update msg m =
    case msg of
        UpdateSelected submsg ->
            Selectable.update submsg m



-- VIEW


view : List I -> Model -> Html Msg
view data model =
    data
        |> toCrosstab
        |> (\tab ->
                Selectable.view tableConfig tab model
                    |> Html.map UpdateSelected
           )
