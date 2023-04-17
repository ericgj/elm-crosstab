module View.Crosstab.Query exposing
    ( Config
    , CssConfig
    , config
    , viewColumnDimensions
    , viewRowDimensions
    )

import Crosstab.Query as Query exposing (CompareAxis, Query)
import Html exposing (..)
import Html.Bem as Bem exposing (elementOf)
import Html.Events exposing (onClick)
import List.Extra as List
import Maybe.Extra as Maybe
import View.Breadcrumbs as Breadcrumbs


type Config a msg
    = Config (ConfigData a msg)


type alias ConfigData a msg =
    { newQuery : Query a -> msg
    , summaryLabel : String
    , css : CssConfig
    }


type alias CssConfig =
    { block : String
    , iconSeparator : Maybe String
    }


config : ConfigData a msg -> Config a msg
config =
    Config


newQuery : Config a msg -> (Query a -> msg)
newQuery (Config c) =
    c.newQuery



-- VIEWS


viewRowDimensions : Config a msg -> List String -> Query a -> Html msg
viewRowDimensions c dims q =
    viewDimensions "row" Query.rowDimensions Query.SetRowDimensions Query.SortRows c dims q


viewColumnDimensions : Config a msg -> List String -> Query a -> Html msg
viewColumnDimensions c dims q =
    viewDimensions "column" Query.columnDimensions Query.SetColumnDimensions Query.SortColumns c dims q


viewDimensions :
    String
    -> (Query a -> Maybe Int)
    -> (Maybe Int -> Query.Msg a)
    -> (CompareAxis a -> Query.Msg a)
    -> Config a msg
    -> List String
    -> Query a
    -> Html msg
viewDimensions etype getDims setDims setSort c dims q =
    viewDimensionsInner etype getDims setDims setSort c dims q |> Html.map (newQuery c)


viewDimensionsInner :
    String
    -> (Query a -> Maybe Int)
    -> (Maybe Int -> Query.Msg a)
    -> (CompareAxis a -> Query.Msg a)
    -> Config a msg
    -> List String
    -> Query a
    -> Html (Query a)
viewDimensionsInner etype getDims setDims setSort (Config c) dims q =
    let
        b =
            Bem.init c.css.block

        e =
            b.element "dimensions"

        cur =
            q
                |> getDims
                |> Maybe.withDefault (List.length dims)

        bconfig =
            Breadcrumbs.config
                { closedLabel = c.summaryLabel
                , toMsg = unlessMaxDimension dims >> setDims >> (\m -> Query.update m q)
                , css =
                    { block = c.css.block
                    , iconSeparator = c.css.iconSeparator
                    }
                }
    in
    div
        [ e |> elementOf "type" etype
        ]
        [ Breadcrumbs.view bconfig cur dims
        ]


unlessMaxDimension : List String -> Int -> Maybe Int
unlessMaxDimension dims i =
    if i >= List.length dims then
        Nothing

    else
        Just i
