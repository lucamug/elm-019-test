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
                    [ Html.h2 [] [ Html.text "url" ]
                    , Html.div [] [ Html.text <| Debug.toString <| url ]
                    , Html.h2 [] [ Html.text "parsed" ]
                    , Html.div [] [ Html.text <| Debug.toString <| Url.Parser.parse docs url ]
                    ]


maybeMyUrl =
    Url.Parser.toUrl "http://example.com/page/#a/b/c"


type alias Docs =
    { name : String
    , value : Maybe String
    }


docs : Url.Parser.Parser (Docs -> a) a
docs =
    Url.Parser.map Docs (Url.Parser.string </> Url.Parser.fragment identity)
