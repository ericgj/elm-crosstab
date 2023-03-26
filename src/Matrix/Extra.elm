module Matrix.Extra exposing (updateRows)
import Array exposing (Array)
import Matrix exposing (..)

updateRows : (a -> b -> c) -> Array a -> Matrix b -> Maybe (Matrix c)
updateRows fn array matrix =
    let
        w = width matrix
        upd = (\b i data -> 
            array
                |> Array.get (modBy w i)
                |> Maybe.map 
                    (\a -> data |> Array.push (fn a b) ) 
            )           
    in
    if Array.length array == w then
        matrix.data
            |> Array.foldr 
                (\b (i,m) -> (i+1, m |> Maybe.andThen (upd b i))) 
                (0, Just Array.empty)
            |> Tuple.second
            |> Maybe.map (\d -> {size = matrix.size, data = d})
    else
        Nothing

