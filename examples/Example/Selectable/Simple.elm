module Example.Selectable.Simple exposing (Model, Msg(..), default, init, update, view)

import Crosstab
import Crosstab.Accum as Accum exposing (ParametricStats)
import Crosstab.Display as Display
import Crosstab.Query as Query exposing (Query)
import Crosstab.Spec as Spec
import Crosstab.View.Selectable as Selectable
import Data.Incarceration as Incarceration exposing (Incarceration)
import Html exposing (..)



-- MODEL


type alias I =
    Incarceration


type Model
    = Model ModelData


type alias ModelData =
    { data : List I
    , query : Query ParametricStats
    , value : ( String, I -> Int )
    , row : ( String, I -> String )
    , column : ( String, I -> String )
    , sortType : SortType
    , sortDir : Query.SortDir
    , selected : Selectable.State
    }


type SortType
    = SortSum
    | SortMean


default : Model
default =
    init
        { data = []
        , query = Query.sortingRowsBy <| regionSort <| [ "State Total", "Federal" ]
        , value = ( "incarcerated", \i -> i.totalM + i.totalF )
        , row = ( "region", .region >> Incarceration.regionToString )
        , column = ( "year", .year >> String.fromInt )
        , sortType = SortSum
        , sortDir = Query.Asc
        , selected = Selectable.empty
        }


regionSort : List String -> Query.CompareAxis a
regionSort lsort =
    lsort
        |> Query.sortByFirstLevelInGivenOrder LT
        |> Query.withSummaryAtEnd


init : ModelData -> Model
init =
    Model


toTable : Model -> Maybe (Display.Table ParametricStats)
toTable (Model m) =
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
        |> Crosstab.query m.query


selected : Model -> Selectable.State
selected (Model m) =
    m.selected



-- CONFIG


tableConfig : Model -> Selectable.Config ParametricStats Float
tableConfig (Model m) =
    let
        sortvals =
            case m.sortType of
                SortSum ->
                    Query.sortByValueAs .sum m.sortDir

                SortMean ->
                    Query.sortByValueMaybeAs .mean LT m.sortDir
    in
    Selectable.valueConfig
        sortvals
        [ ( "Pop"
          , .sum >> round >> String.fromInt >> text
          )
        , ( "Avg/State"
          , .mean
                >> Maybe.map (round >> String.fromInt >> text)
                >> Maybe.withDefault Selectable.defaultEmptyCell
          )
        ]



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
            case submsg of
                Selectable.UpdateQuery qmsg ->
                    Model { m | query = Query.update qmsg m.query }

                _ ->
                    Model { m | selected = Selectable.update submsg m.selected }



-- VIEW


view : Model -> Html Msg
view m =
    let
        mtab =
            m |> toTable

        conf =
            m |> tableConfig

        sel =
            m |> selected
    in
    case mtab of
        Nothing ->
            viewEmptyTable

        Just tab ->
            Selectable.view conf tab sel |> Html.map UpdateSelected


viewEmptyTable : Html x
viewEmptyTable =
    h1 [] [ text "No data." ]
