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
                Html.text <| Debug.toString <| Url.Parser.parse docs url


maybeMyUrl =
    Url.Parser.toUrl "http://example.com/List/#map/mm"


type alias Docs =
    { name : String
    , value1 : Maybe String
    , value2 : Maybe String
    }


docs : Url.Parser.Parser (Docs -> a) a
docs =
    Url.Parser.map Docs (Url.Parser.string </> Url.Parser.fragment (\a -> a) </> Url.Parser.fragment identity)
