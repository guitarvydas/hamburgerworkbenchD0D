# hamburger workbench

1. download and install draw.io (https://www.diagrams.net)
2. open testbench.drawio (after downloading draw.io)
3. open hamburgerworkbench0d/hamburger0d.html in a browser
4. click on the button "hamburger"
5. see the results in the text area "output:"

6. change the "test source:" to "  I Want A Hamburger With Cheese And Bacon And Ketchup" (notice capitalization and exact spelling)
7. click on the button "hamburger", again
8. see new results in the text area "output:"



gotchas: 
- this is but a POC, it implements the bare minimum to get diagrams running,
  I hope to rewrite the code as diagrams, later, using this bare minimum
- names of components must be unique, multiple instances are not supported
- fanout not supported: every output port must have 0 or 1 connections
- errors are quietly ignored (only in some places), you have to check the diagrams/code yourself and can't rely on the tool to help you do this (yet) ; again, better error checking will "come in the fullness of time" when the whole thing is rewritten as diagrams...

sort-of gotcha:
supported but not atomic:
- Tagged messages ('etag') are supported but shouldn't be.  Tagged messages should be implemented by yet another layer(s) of components.  Instead, tagged messages are supported in .js code, sigh.

wish-list:
- diagram macros

