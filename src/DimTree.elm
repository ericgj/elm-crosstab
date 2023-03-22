module DimTree exposing (DimTree(..), empty, single, addBranches, walkDepth, walkBreadth)

import Dict exposing (Dict)

type DimTree comparable
    = TopNode
        { children : Dict comparable (DimTree comparable)
        }
    | DimNode 
        { label : comparable 
        , children : Dict comparable (DimTree comparable)
        }

empty : DimTree comparable
empty = 
    TopNode { children = Dict.empty }

single : comparable -> DimTree comparable
single label =
    DimNode { label = label, children = Dict.empty }

addBranches : List comparable -> DimTree comparable -> DimTree comparable
addBranches labels tree =
    case labels of
        [] ->
            tree
        (childLabel :: descLabels) ->
            case tree of
                TopNode {children} ->
                    TopNode 
                        { children =
                            Dict.update 
                                childLabel 
                                (updateChild childLabel descLabels) 
                                children                        
                        }
                DimNode {label, children} ->
                    DimNode
                        { label = label
                        , children = 
                            Dict.update 
                                childLabel 
                                (updateChild childLabel descLabels) 
                                children
                        }
                        
updateChild : comparable -> List comparable -> Maybe (DimTree comparable) -> Maybe (DimTree comparable)
updateChild label descLabels existing =
    case existing of
        Nothing ->
            single label |> addBranches descLabels |> Just
        Just tree ->
            tree |> addBranches descLabels |> Just

walkDepth = walkDepthImp []

walkDepthImp : List comparable -> ( List comparable -> comparable -> a ) -> DimTree comparable -> List a
walkDepthImp parents fn tree =
    case tree of
        TopNode {children} ->
            (Dict.values children 
                |> List.concatMap (walkDepthImp parents fn)
            )
        DimNode {label,children} ->
            fn (List.reverse parents) label :: 
            (Dict.values children 
                |> List.concatMap (walkDepthImp (label :: parents) fn)
            )

walkBreadth = walkBreadthImp []

walkBreadthImp : List comparable -> ( List comparable -> comparable -> a ) -> DimTree comparable -> List a
walkBreadthImp parents fn tree =
    case tree of
        TopNode {children} ->
            (Dict.keys children 
                |> List.map (fn (List.reverse parents))
            ) ++ 
            (Dict.values children 
                |> List.concatMap (walkBreadthImp parents fn)
            )
        DimNode {label,children} ->
            (if List.isEmpty parents then [fn parents label] else []) ++
            (Dict.keys children 
                |> List.map (fn (List.reverse (label :: parents)))
            ) ++ 
            (Dict.values children 
                |> List.concatMap (walkBreadthImp (label :: parents) fn)
            )
            