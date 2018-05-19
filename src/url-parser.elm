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
    Url.Parser.toUrl "http://example.com/page/#a/b/c"


type alias Docs =
    { name1 : Route
    , value1 : Maybe String
    , value2 : Maybe String
    }


type Route
    = Page
    | ThreeLevels String String String


whatIsThis : Maybe String -> Maybe String
whatIsThis a =
    let
        _ =
            Debug.log "xxx" a
    in
    case a of
        Nothing ->
            Nothing

        Just b ->
            Just b


parse1 : Url.Parser.Parser (Docs -> a) a
parse1 =
    Url.Parser.oneOf
        [ Url.Parser.map Docs (parse3 </> parse5 </> Url.Parser.fragment whatIsThis)
        ]


parse2 : Url.Parser.Parser (Route -> a) a
parse2 =
    Url.Parser.oneOf
        [ parse3
        , Url.Parser.map ThreeLevels parse4
        ]


parse3 : Url.Parser.Parser (Route -> a) a
parse3 =
    Url.Parser.map Page (Url.Parser.s "page")


parse4 : Url.Parser.Parser (String -> String -> String -> a) a
parse4 =
    Url.Parser.string </> Url.Parser.string </> Url.Parser.string


parse5 : Url.Parser.Parser (Maybe String -> a) a
parse5 =
    Url.Parser.fragment whatIsThis



--      top :                                                 Parser  a              a
--   string :                                                 Parser (String   -> a) a
--      int :                                                 Parser (Int      -> a) a
--        s : String                                       -> Parser  a              a
-- fragment : (Maybe String -> fragment)                   -> Parser (fragment -> a) a
--    query : Parser query                                 -> Parser (query    -> a) a
--    oneOf : List (Parser a b)                            -> Parser  a              b
--   custom : String                -> (String -> Maybe a) -> Parser (a        -> b) b
--    (<?>) : Parser a (query -> b) -> Parser query        -> Parser  a              b
--    (</>) : Parser a b            -> Parser b c          -> Parser  a              c
--      map : a                     -> Parser a b          -> Parser (b        -> c) c
