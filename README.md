
                         js         view   init   update  subs   cmd  onNavigaton  

Browser.staticPage      embed         ✓
Browser.sandbox         embed         ✓      ✓      ✓
Browser.embed           embed         ✓      f      ✓      ✓      ✓   
Browser.fullscreen    fullscreen      P      Ef     ✓      ✓      ✓     ✓

f = flags
P = Browser.Page
E = Browser.Env


* Can I use fullscreen without changing the title?
* I like the idea of a list (children of the node), to simplify it could be used everywhere
* Do we need embed/fullscrin on the js side? Can we just specify a node and if the node is body, is like fullscreen?
* I need to modify also some metatag, not only the title
* It doens't work with file:// now

what is the difference between

main =
  staticPage (text "Hello!")

and

main =
  text "Hello!"
