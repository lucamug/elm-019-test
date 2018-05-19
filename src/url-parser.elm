module Main exposing (main)

import Browser
import Html
import Html.Attributes
import Url.Parser exposing ((</>))


main : Program () () msg
main =
    Browser.staticPage <|
        case maybeMyUrl of
            Nothing ->
                Html.text ""

            Just url ->
                Html.div []
                    [ Html.div [] [ Html.text <| Debug.toString <| url ]
                    , Html.div [] [ Html.text <| Debug.toString <| Url.Parser.parse parse1 url ]
                    , Html.div [] [ Html.text <| Debug.toString <| Url.Parser.parse parse2 url ]
                    ]


maybeMyUrl =
    Url.Parser.toUrl "http://example.com/a/b/c/#a/b/c"


type alias Docs =
    { name1 : String
    , name2 : String
    , name3 : String
    , value1 : Maybe String
    , value2 : Maybe String
    }


type Route
    = Page
    | ThreeLevels String String String


threeLevels : Url.Parser.Parser (String -> String -> String -> c) c
threeLevels =
    Url.Parser.string </> Url.Parser.string </> Url.Parser.string


parse1 : Url.Parser.Parser (Docs -> a) a
parse1 =
    Url.Parser.oneOf
        [ Url.Parser.map Docs (threeLevels </> Url.Parser.fragment (\a -> a) </> Url.Parser.fragment identity)
        ]


parse2 =
    Url.Parser.oneOf
        [ Url.Parser.map Page (Url.Parser.s "page")
        , Url.Parser.map ThreeLevels threeLevels
        ]



--   string :                               Parser (String   -> a) a
--      int :                               Parser (Int      -> a) a
-- fragment : (Maybe String -> fragment) -> Parser (fragment -> a) a
--    query : Parser query               -> Parser (query    -> a) a
--      top :                               Parser              a  a
--        s : String                     -> Parser              a  a
