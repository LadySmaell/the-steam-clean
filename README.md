# The Steam Clean website

A static website built from The Steam Clean backlog spreadsheet.

## Preview locally
Because the site loads `games.json`, open it through a local web server rather than double-clicking `index.html`.

1. Open a terminal in this folder.
2. Run `python -m http.server 8000`.
3. Visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new public GitHub repository.
2. Upload all files from this folder.
3. In repository Settings, open Pages.
4. Choose Deploy from a branch, then select the main branch and root folder.

## Update the social links
Search `index.html` for `lady_smaell` and replace any URL that does not match your exact profile address.

## Update the backlog
The current game library is stored in `games.json`. A later version can automate rebuilding this file from the spreadsheet.
