---
icon: codepen
---

# Adding LaTeX dependencies

If you have `.cls`, `.sty`, `.bst` files in your project, Overleaf's compile process will not be able to locate these files unless they are placed at the top level.

However, to organize your project, you may wish to put these files in to folders so they are easier for you to find and so that the top level of your project is not cluttered.

The good news is that we can specify custom `TEXINPUTS` directories using the `latexmkrc` file, so that Overleaf knows it needs to search in that directory for the package files.

To do this, let's say you've put these package files in a folder called `tex/`; and respectively bibliography style files in a folder called `bst/`:

1. Click on “Add file” on the top of the Project side bar.
2. Select “Blank file”, and save the file name as `latexmkrc` (if it's not already there).
3.  Put the following line in `latexmkrc`:

    ```perl
    $ENV{'TEXINPUTS'}='./tex//:' . $ENV{'TEXINPUTS'}; 
    $ENV{'BSTINPUTS'}='./bst//:' . $ENV{'BSTINPUTS'};
    ```

    (or change to the relevant folder names in your project)

Overleaf will now search the `tex/` folder first before searching the system `TEXINPUTS` to locate package files, and `bst/` folder first before searching the system `BSTINPUTS` to locate bibliography style files.

(Source: [https://tex.stackexchange.com/a/50847](https://tex.stackexchange.com/a/50847))

{% hint style="info" %}
Your main document file and your `latexmkrc` file must remain at the top level of your project, not in a folder.
{% endhint %}
