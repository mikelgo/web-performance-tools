

To use a code snippet as bookmark:
1. Minify code using for example [javascript-minifier](https://javascript-minifier.com/)
2. Create bookmark snippet
  1. prefix it with `javascript:`
  2. wrap it inside an [IIFE](https://developer.mozilla.org/de/docs/Glossary/IIFE) `(()=>{ ... })();`
  
Example:  
`javascript:(()=>{ console.log('logged in bookmark') })();`

3. Create a new bookmark and paste wrapped result in URL field.

4. Add Bookmark
  1. Show bookmarks 
  `Settings => Bookmarks => Show bookmarks` or `STRG+SHIFT+B`
  2. Right click on the bookmark panel
  3. Add Page
  4. Insert title and snippet
  [Bookmark Title](./images/bookmarks-edit.png)


**hint**
The bookmarked script will only be executed when you visit a page. If you e.g. open
Chrome and no page is open, the script will not be executed.
