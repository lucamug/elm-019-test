module Main exposing (main)

import Browser
import Html


main : Program () () msg
main =
    Browser.staticPage
        (Html.div []
            [ Html.h1 [] [ Html.text "staticPage" ]
            , Html.text "Hello, World!"
            ]
        )
