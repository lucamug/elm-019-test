I am really impressed on the first results of thins new version and there are several new features, especially about SPA that I am looking forward to try! (I still have several dependencies that have not been ported).

In the mean time I have been testing Browser a bit. To recap, these are, in my anderstanding, the 4 way of writing an app in 0.19

Type               | exp. in js | view | init | update | subs | cmd | onNavigaton  
-------------------|------------|------|------|--------|------|-----|-------------
Browser.staticPage |    embed   |  ✓   |      |        |      |     |
Browser.sandbox    |    embed   |  ✓   |  ✓   |  ✓     |      |     |
Browser.embed      |    embed   |  ✓   |  f   |  ✓     |  ✓   |  ✓  |
Browser.fullscreen | fullscreen |  P   |  Ef  |  ✓     |  ✓   |  ✓  |  ✓

f = flags
P = Browser.Page (title and list of views)
E = Browser.Env  (url and flags)

(1) In some of my app I need `embed` (I can only occupy a part of the page) but I also need `onNavigation`
(2) Other apps need to run both as `embed` and as `fullscreen`, depending on the client that use them. In 0.18 both options are available at runtime
(3) I need to be able to opt-out from changing the title, because sometime I need to preserve it
(4) Often I need to change head's meta-tags too, for SEO
(5) `fullscreen` seems not working with `file://` as I am getting `Cannot navigate to the following URL. It seems to be invalid`. Running apps without a server was useful sometime for quick testing

I believe, as workaround, all the above features can be implemented in javascript and used with  `Browser.embed` and ports.

I like the new feature of having a list of views. To me the optimal solution would be to have only `Browser.fullscreen` but where it would be possible from js to give it a node, that could be possibly `document.body` - in case i want to app to take all space - where changing the title should be optional.

to me fullscreen to embed could be merged. So the present difference between embed/fullscreen depend on the node where the app is attached (body vs. children)


## Useful commands

to get bug fixes in `elm-lang/core` and `elm-lang/time`

$ rm -rf ~/.elm && rm -rf elm-stuff
