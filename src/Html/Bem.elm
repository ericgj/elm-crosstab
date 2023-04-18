module Html.Bem exposing
    ( Block
    , Element
    , block
    , blockList
    , blockMod
    , blockOf
    , element
    , elementList
    , elementMod
    , elementName
    , elementNameMod
    , elementNameOf
    , elementOf
    , elementOfList
    , init
    )

import Html exposing (Attribute)
import Html.Attributes exposing (class, classList)


type alias Block =
    { name : String
    , element : String -> Element
    }


type alias Element =
    { block : String
    , name : String
    }


init : String -> Block
init b =
    { name = b
    , element = Element b
    }


elementName : Element -> String
elementName e =
    joinElement e.block e.name


elementNameMod : Element -> String -> String
elementNameMod e m =
    joinElementMod e.block e.name m


elementNameOf : Element -> String -> String -> String
elementNameOf e k v =
    joinElementOf e.block e.name k v


block : Block -> Attribute a
block b =
    class b.name


blockOf : String -> String -> Block -> Attribute a
blockOf k v b =
    classList
        [ ( b.name, True )
        , ( joinBlockOf b.name k v, True )
        ]


blockMod : String -> Block -> Attribute a
blockMod m b =
    classList
        [ ( b.name, True )
        , ( joinBlockMod b.name m, True )
        ]


blockList : List ( String, Bool ) -> Block -> Attribute a
blockList list b =
    classList <|
        ( b.name, True )
            :: (list |> List.map (\( m, incl ) -> ( joinBlockMod b.name m, incl )))


element : Element -> Attribute a
element e =
    class <| joinElement e.block e.name


elementOf : String -> String -> Element -> Attribute a
elementOf k v e =
    classList
        [ ( joinElement e.block e.name, True )
        , ( joinElementOf e.block e.name k v, True )
        ]


elementMod : String -> Element -> Attribute a
elementMod m e =
    classList
        [ ( joinElement e.block e.name, True )
        , ( joinElementMod e.block e.name m, True )
        ]


elementList : List ( String, Bool ) -> Element -> Attribute a
elementList list e =
    classList <|
        ( joinElement e.block e.name, True )
            :: (list |> List.map (\( m, incl ) -> ( joinElementMod e.block e.name m, incl )))


elementOfList : List ( String, String ) -> Element -> Attribute a
elementOfList list e =
    classList <|
        ( joinElement e.block e.name, True )
            :: (list |> List.map (\( k, v ) -> ( joinElementOf e.block e.name k v, True )))


joinBlockOf : String -> String -> String -> String
joinBlockOf b k v =
    b ++ "--" ++ k ++ "-" ++ v


joinBlockMod : String -> String -> String
joinBlockMod b m =
    b ++ "--" ++ m


joinElement : String -> String -> String
joinElement b e =
    b ++ "__" ++ e


joinElementOf : String -> String -> String -> String -> String
joinElementOf b e k v =
    b ++ "__" ++ e ++ "--" ++ k ++ "-" ++ v


joinElementMod : String -> String -> String -> String
joinElementMod b e m =
    b ++ "__" ++ e ++ "--" ++ m
