module Example.Selectable.Simple exposing (Model, Msg(..), default, init, update, view)

import Crosstab exposing (Crosstab)
import Crosstab.Accum as Accum exposing (ParametricStats)
import Crosstab.Display as Display
import Crosstab.Query as Query exposing (Query)
import Crosstab.Spec as Spec
import Data.Incarceration as Incarceration exposing (Incarceration)
import Html exposing (..)
import View.Crosstab.Selectable as Selectable



-- MODEL


type alias I =
    Incarceration


type Model
    = Model ModelData


type alias ModelData =
    { data : List I
    , value : ( String, I -> Int )
    , row : ( String, I -> String )
    , column : ( String, I -> String )
    , selected : Selectable.State
    }


default : Model
default =
    init
        { data = []
        , value = ( "incarcerated", \i -> i.totalM + i.totalF )
        , row = ( "region", getRegionWithCode )
        , column = ( "year", .year >> String.fromInt )
        , selected = Selectable.init
        }


getRegionWithCode : I -> String
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


init : ModelData -> Model
init =
    Model


toCrosstab : Model -> Crosstab ParametricStats
toCrosstab (Model m) =
    let
        ( vlab, vaccess ) =
            m.value

        spec =
            Spec.init
                { rows = [ m.row ]
                , columns = [ m.column ]
                , value = ( vlab, Accum.parametric vaccess )
                }
    in
    m.data
        |> List.filter
            (\i ->
                (i.year >= 2005)
                    && not (i.region == Incarceration.USTotal)
            )
        |> Crosstab.tabulate spec
        |> Crosstab.map "Stats" Crosstab.parametricStats


selected : Model -> Selectable.State
selected (Model m) =
    m.selected



-- CONFIG


tableConfig : Model -> Selectable.Config ParametricStats Float
tableConfig (Model m) =
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
        |> Selectable.withCssBlock "simple-crosstab"



-- UPDATE


type Msg
    = SetData (List I)
    | UpdateSelected (Selectable.Msg ParametricStats)


update : Msg -> Model -> Model
update msg (Model m) =
    case msg of
        SetData d ->
            Model { m | data = d }

        UpdateSelected submsg ->
            Model { m | selected = Selectable.update submsg m.selected }



-- VIEW


view : Model -> Html Msg
view m =
    m
        |> toCrosstab
        |> (\tab ->
                Selectable.view (tableConfig m) tab (selected m)
                    |> Html.map UpdateSelected
           )
