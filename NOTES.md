I know this is already taken into account for investigation but let me share some more insight. These are, in my understanding, 4 tiers of writing apps in 0.19
```
main =             | exposed js | view | init | update | Cmd/Sub | onNavigation
-------------------|------------|------|------|--------|---------|-------------
Browser.staticPage | embed      |  ✓   |      |        |         |     
Browser.sandbox    | embed      |  ✓   |  ✓   |  ✓     |         |     
Browser.embed      | embed      |  ✓   |  f   |  ✓     |  ✓      |     
Browser.fullscreen | fullscreen |  P   |  Ef  |  ✓     |  ✓      |  ✓  

f = flags
P = Browser.Page (title and list of views)
E = Browser.Env  (url and flags)
```

My use cases (for reasons expresses in my post above):

(1) Some of my apps run as `embed` but need `onNavigation`
(2) Even if in `fullscreen`, sometime apps are not allow to change the title
(3) Apps need to change meta-tags in the head, for SEO
(4) `fullscreen` seems not working with `file://` (Error: `Cannot navigate to the following URL. It seems to be invalid`). Running apps without a server was useful sometime for quick testing

A way that would work for my cases would be to have all `Browser.fullscreen` functionalities (I like the `list of views` approach of `Browser.Page`, but changing the head's title should be optional) and, on the javascript side, being able to start the app with a node that could be either `document.body` or `document.querySelector("elm")`.
