Type                 |    exposed   |  view | init | update | subs | cmd | onNavigaton  
---------------------|--------------|-------|------|--------|------|-----|-------------
Browser.staticPage   |    embed     |   ✓   |      |        |      |     |
Browser.sandbox      |    embed     |   ✓   |   ✓  |   ✓    |      |     |
Browser.embed        |    embed     |   ✓   |   f  |   ✓    |  ✓   |  ✓  |
Browser.fullscreen   | fullscreen   |   P   |   Ef |   ✓    |  ✓   |  ✓  |  ✓

f = flags
P = Browser.Page (title and list of views)
E = Browser.Env  (url and flags)

* onNaviagation should be decoupled from fullscreen and appliccable to all
* Is it possible to opt-out from changing the title?
* I like the idea of a list (children of the node), to simplify it could be used everywhere
* Do we need embed/fullscrin on the js side? Can we just specify a node and if the node is body, is like fullscreen?
* I need to modify also some metatag, not only the title
* It doens't work with file:// now

to me fullscreen to embed could be merged. So the present difference between embed/fullscreen depend on the node where the app is attached (body vs. children)

Changing the title should be optional

what is the difference between

main =
  staticPage (text "Hello!")

and

main =
  text "Hello!"
