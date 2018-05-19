module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


type alias Model =
    { count : Int }


initialModel : Model
initialModel =
    { count = 0 }


type Msg
    = Increment
    | Decrement


update msg model =
    case msg of
        Increment ->
            ( { model | count = model.count + 1 }, Cmd.none )

        Decrement ->
            ( { model | count = model.count - 1 }, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ Html.h1 [] [ text "fullscreen" ]
        , button [ onClick Increment ] [ text "+1" ]
        , div [] [ text <| String.fromInt model.count ]
        , button [ onClick Decrement ] [ text "-1" ]
        ]


main : Program () Model Msg
main =
    Browser.fullscreen
        { init = \_ -> ( initialModel, Cmd.none )
        , onNavigation = Nothing
        , subscriptions = \_ -> Sub.none
        , view =
            \model ->
                { title = ""
                , body = [ view model ]
                }
        , update = update
        }
