module Main exposing (main)

import Browser
import Html


main : Program () () msg
main =
    Browser.staticPage (Html.text "Hello, World!")
