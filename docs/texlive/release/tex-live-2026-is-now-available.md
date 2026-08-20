---
icon: box-isometric
---

# TeX Live 2026 is now available

{% hint style="info" %}
This document is a mirror of [overleaf blog](https://www.overleaf.com/blog/tex-live-2026-is-now-available). Overleaf released its TeX Live 2026 on August 18 2026, and we have also updated our [ayaka-notes/texlive-full](https://github.com/ayaka-notes/texlive-full) 2026 now.
{% endhint %}

Here's what's changed, what to check before switching, and how to fix the most common new errors. The most notable update in this release is that the features that produce accessible PDFs are ready to use in production workflows, and have graduated from the prototype phase. This update also gives you access to new and updated TeX-related programs, fonts, and macro packages. This blog post covers all the key information and important changes you need to know about.

Overleaf releases an official update once a year after rigorous testing to ensure everything works as expected. We do this in order to ensure a consistent and stable experience for the millions of Overleaf users, and ensure our support team is able to assist you with any issues or questions.

### What is TeX Live? <a href="#what-is-tex-live" id="what-is-tex-live"></a>

[TeX Live](https://tug.org/texlive/) is a free distribution of the TeX typesetting system that includes many TeX-related programs, fonts, and macro packages, including LaTeX, maintained by a core group of TeX users and the [TeX User Group](https://tug.org/). Overleaf uses TeX Live on its compile servers to power the preview and produce your project PDF.

With the introduction of TeX Live 2026, users can expect the ability to create fully accessible, tagged PDFs, including readable mathematics.

### Will my existing projects work as usual? <a href="#will-my-existing-projects-work-as-usual" id="will-my-existing-projects-work-as-usual"></a>

Yes, your existing projects will still work as they will continue to use the TeX Live version from when they were created. We advise against changing TeX Live versions on an existing project unless necessary; changing may result in new errors or warnings.

**Note:** There may be templates in the Overleaf gallery that don’t work or compile with the accessibility options enabled. Most templates are not created or maintained by Overleaf; please reach out to the creator regarding any issues.

### Can I switch to TeX Live 2026 for existing projects? <a href="#can-i-switch-to-tex-live-2026-for-existing-projects" id="can-i-switch-to-tex-live-2026-for-existing-projects"></a>

Yes, you can easily switch to TeX Live 2026 for existing projects; the transition is simple and hassle-free. In the project you want to change, open _Settings_, then click _Compiler_ in the sidebar, you’ll see a dropdown to select the TeX Live version. This allows you to quickly update your project to fit the requirements of publishers, preprint servers, and other platforms that use a specific TeX Live version to compile submissions.

If your project compiled without problems in TeX Live 2025 (or earlier versions), but is now throwing errors in TeX Live 2026, this can be due to changes in the kernel or in some packages. Some packages are known to produce new errors or warnings under TeX Live 2026; we've collected the most common ones, along with fixes, in a separate section below.

### Key changes in TeX Live 2026 <a href="#key-changes-in-tex-live-2026" id="key-changes-in-tex-live-2026"></a>

#### Tagged, accessible PDF has left the prototype stage <a href="#tagged-accessible-pdf-has-left-the-prototype-stage" id="tagged-accessible-pdf-has-left-the-prototype-stage"></a>

Since the LaTeX Project’s [November 2025 update](https://www.latex-project.org/news/latex2e-news/ltnews42.pdf), tagging is no longer described as a prototype, it’s considered usable in production workflows, provided your document sticks to packages and classes that already support tagging.

Enabling tagged PDF output takes a single command placed before `\documentclass`:

```latex
\DocumentMetadata{
 pdfstandard = {UA-2, A-4f},
 tagging = on,
 lang = en
 }
\documentclass{article}
```

Using `\DocumentMetadata` also switches on a few defaults: T1 font encoding, and, [since June 2025](https://www.latex-project.org/news/latex2e-news/ltnews41.pdf), **PDF 2.0** output rather than the older 1.7. PDF 2.0 matters here because it’s what allows MathML tagging (the piece that makes mathematics readable to screen readers rather than an unlabelled wall of symbols).

A few practical notes:

* While drafting, you can set `tagging = draft` to keep the accessibility warnings but skip writing the structure tree (useful for speeding up compiles on long documents).
* A check-tagging-status key reports at the end of your log whether the packages you’re using are known to be tagging-compatible. There’s also a [live status database](https://latex3.github.io/tagging-project/tagging-status/) you can check before you start.
* If you only want the PDF-management side of things without the tagging code, there’s now a separate `pdfmanagement` package for that.

One change worth flagging in particular: `\DocumentMetadata` can now only be called once in a document. A second call results in a compile error, the same way a second `\documentclass` would.

#### Accessible math, with meaning <a href="#accessible-math-with-meaning" id="accessible-math-with-meaning"></a>

[New since November 2025](https://www.latex-project.org/news/latex2e-news/ltnews42.pdf), `\MathMLintent` and `\MathMLarg` let authors tell assistive technology what a piece of notation means, not just how it’s built. For example, `|y|` can now be read aloud as _“the absolute value of y”_ instead of _“bar y bar”_.

Accessible math tagging requires compiling with LuaLaTeX, as it's the engine that generates the MathML, and either the `unicode-math` or `lua-unicode-math` package.

#### Graphics and figures now carry meaning too <a href="#graphics-and-figures-now-carry-meaning-too" id="graphics-and-figures-now-carry-meaning-too"></a>

Accessibility isn’t limited to text and math. `\includegraphics`, `picture`, and `tikzpicture` now accept accessibility keys, so each graphic can be marked up appropriately:

```latex
\includegraphics[alt={A bar chart of quarterly revenue}]{revenue}
```

Graphics can be classified four ways: as a genuine illustrative figure, as a decorative artifact to be ignored by assistive tools, as a stand-in for a symbol, or as ordinary text (handy for things like `todonotes`). TikZ output is supported out of the box.

#### A new class for creating tagged, accessible presentations <a href="#a-new-class-for-creating-tagged-accessible-presentations" id="a-new-class-for-creating-tagged-accessible-presentations"></a>

The `beamer` document class is very popular for creating presentation slides in LaTeX. Unfortunately, it’s not compatible with LaTeX tagging code. Instead, a new document class, [`ltx-talk`](https://ctan.org/pkg/ltx-talk), has been created from scratch. Its syntax is largely similar to `beamer`'s, though not all of `beamer`'s functionalities have been implemented in `ltx-talk`.

#### New templating mechanisms for styling sectional headings <a href="#new-templating-mechanisms-for-styling-sectional-headings" id="new-templating-mechanisms-for-styling-sectional-headings"></a>

Sectional heading commands have been re-implemented in the LaTeX kernel with a new templating mechanism, solving the issue that packages like `titlesec` aren't fully compatible with the LaTeX tagging code. Here's a quick example:

```latex
\EditInstance{heading}{section}{
  number-format=\fbox{\LARGE\bfseries\theheading},
  title-decls=\Large\bfseries\sffamily\color{blue},
  before-vspace=20pt,
}
```

Detailed information is available in the [documentation](https://tug.ctan.org/macros/latex-dev/required/latex-lab/latex-lab-sec-template.pdf).

#### A kernel rebuilt underneath <a href="#a-kernel-rebuilt-underneath" id="a-kernel-rebuilt-underneath"></a>

In this year's kernel, some limitations have been removed:

* **The output routine is now configurable:** For nearly 40 years, LaTeX’s page-assembly machinery was effectively hardwired, forcing packages that needed to change it to overwrite internal code. It now exposes hooks and sockets to make changes instead. Packages become more stable and less likely to conflict with each other.
* **A modern mark mechanism:** The old `\markboth` / `\leftmark` / `\rightmark` system, which only ever supported two intertwined marks, has been rebuilt on a flexible system supporting any number of independent marks, while the familiar commands keep working exactly as before.
* **Block environments and section headings now run on templates:** Lists, quotes, theorem-like environments, and now heading commands share a consistent underlying system. One practical payoff: LaTeX is starting to natively emulate popular packages like `enumitem` and `amsthm`’s `\newtheoremstyle`, and `titlesec` emulation is in progress. Now there’s less need to install packages just to restyle a list or a theorem box.
* **Better cross-references for theorem-like environments:** A new `\newcounteralias` command means a lemma sharing a counter with theorems will correctly show up as _“lemma 1”_, not _“theorem 1”_, when referenced with `cleveref`, `zref-clever`, or `hyperref`.

If you maintain packages rather than just documents, two changes are worth your attention: the kernel now formally requires **`expl3` dated 2023-11-27 or newer**, and _“fake math”_ (using math mode purely to position boxes) has been removed from constructs like `\textsuperscript`, `\parbox`/`minipage`, and around tabular structures. This improves tagging and right-to-left text support, but you’ll notice it if you compare `\showoutput` results against older TeX Live versions.

#### New reach: more languages <a href="#new-reach-more-languages" id="new-reach-more-languages"></a>

* **Indexing for Brahmic scripts,** including Bengali, Gujarati, Kannada, Malayalam, Sinhala, Tamil, and Telugu, has arrived experimentally in `upmendex`.
* New **BCP 47 language metadata** keys (`language`, `other-languages`) let you declare a document’s language precisely, down to regional variants, which also feeds into the PDF’s own language metadata.

#### Other things to be aware of <a href="#other-things-to-be-aware-of" id="other-things-to-be-aware-of"></a>

* The `enumerate`, `theorem`, and `verbatim` packages are now considered legacy; for new documents, prefer `enumitem`, `amsthm`, and `fancyvrb` respectively.
* If you're on a printing workflow or platform that expects an older PDF version, you can still set the PDF version yourself (for example, `\DocumentMetadata{pdfversion=1.7}`) and the TeX Live 2026 documentation covers how to compile documents targeting earlier defaults.
* You can find the [official release notes](https://tug.org/texlive/doc/texlive-en/texlive-en.html#news) for TeX Live 2026 on the TeX Users Group (TUG) website, as well as [release notes for all TeX Live versions](https://www.tug.org/texlive/doc/texlive-en/texlive-en.html#x1-710009).

### Common packages affected by TeX Live 2026 <a href="#common-packages-affected-by-tex-live-2026" id="common-packages-affected-by-tex-live-2026"></a>

In the following sections, we highlight some changes that would cause projects that compiled successfully in Tex Live 2025, but would now have compile errors in TeX Live 2026.

#### Unsupported tabular-related packages <a href="#unsupported-tabular-related-packages" id="unsupported-tabular-related-packages"></a>

With new changes to tabular structures in the LaTeX kernel, the `tabu` and `tabls` packages are no longer supported in TL2026 — they will cause compile errors now. The `arydshln` package may also be incompatible with other packages, e.g. `tabularx` and `tabular*` environments. Similarly, packages or templates that re-define `\@array` and `\tabular` would also cause compile errors around tabular-like structures.

#### `babel` obsolete language options <a href="#babel-obsolete-language-options" id="babel-obsolete-language-options"></a>

The `frenchb` and `francais` language options are now obsolete. These should now be replaced with `french`.

#### `varioref` bug <a href="#varioref-bug" id="varioref-bug"></a>

Due to a [bug in the `varioref` package](https://github.com/latex3/latex2e/issues/2112#issuecomment-4881772493), loading it in KOMA-Script document classes will cause a TeX capacity exceeded error, and no PDF would be generated.

```
\documentclass{scrartcl}
\usepackage{varioref}
\begin{document}
Hello World!
\end{document}
```

The workaround is to add

```
\def\extrasenglish{}
```

in the preamble.

#### KOMA-script classes and `capt-of` <a href="#koma-script-classes-and-capt-of" id="koma-script-classes-and-capt-of"></a>

The KOMA-script document classes (`scrbook`, `scrartcl`, `scrreport`, `scrletter`) now define `\captionof`, so the `capt-of` package should no longer be loaded. (On the other hand the `caption` package is still safe to load with these document classes.)

#### `thmtools`: `sibling`/`numberlike`/`sharenumber` errors <a href="#thmtools-siblingnumberlikesharenumber-errors" id="thmtools-siblingnumberlikesharenumber-errors"></a>

When declaring new theorem-like environments with the `thmtools` option `sibling` (or `numberlike`, or `sharenumber`), [errors about counters being already defined](https://github.com/muzimuzhi/thmtools/issues/75) e.g. `Command \c@proposal already defined` would arise.

```
\documentclass{article}
\usepackage{thmtools}
\declaretheorem{theorem}
\declaretheorem{proposal}[sibling=theorem]

\begin{document}

\begin{theorem}This is a theorem.\end{theorem}
\begin{proposal}This is a proposal.\end{proposal}

\end{document}
```

The workaround is to add the following lines in the preamble, after loading `thmtools` but before the `\declaretheorem`:

```
\makeatletter
\@ifundefined{newcounteralias}{}{%
  \renewcommand\thmt@autorefsetup{\@xa\def\csname\thmt@envname autorefname\@xa\endcsname\@xa{\thmt@thmname}}%
}
\makeatother
```

#### `polyglossia`, `xepersian`, and `array` <a href="#polyglossia-xepersian-and-array" id="polyglossia-xepersian-and-array"></a>

If you're using the `polyglossia` or `xepersian` packages for typesetting the Arabic script, and you have loaded the `array` package or other tabular-related packages that load `array`, then you would get an error about `\UseMathForPositioningText` not being defined when Arabic text is placed within a tabular-like structure.

```
\documentclass[12pt,a4paper]{article}
\usepackage{polyglossia}
\usepackage{array}
\setdefaultlanguage{arabic}
\newfontfamily\arabicfont[Script=Arabic]{Noto Naskh Arabic}
\begin{document}
\begin{tabular}{c}
السلام عليكم
\end{tabular}
\end{document}
```

This can be solved by adding `\DocumentMetadata{}` before the `\documentclass` declaration; or consider switching to the `babel` package for typesetting Arabic scripts.

#### `babel-spanish` and `biblatex-apa` <a href="#babel-spanish-and-biblatex-apa" id="babel-spanish-and-biblatex-apa"></a>

Loading `babel-spanish` while using the `biblatex` style `apa` would cause a compile error about hooks and `\@makecaption`:

```
\usepackage[spanish]{babel}
\usepackage[style=apa]{biblatex}
```

But the error can be avoided by adding the option `shorthands=off` to `babel`.

#### `xgreek`, `hyperref`, and `\appendix` <a href="#xgreek-hyperref-and-appendix" id="xgreek-hyperref-and-appendix"></a>

When the `xgreek` (for XeLaTeX and LuaLaTeX only) and `hyperref` packages are loaded, a compile error would be thrown for sectional headings that appear after `\appendix`:

```
\documentclass{article}
\usepackage{xgreek}
\usepackage{fontspec}
\setmainfont{GFS Artemisia}
\usepackage{hyperref}
\begin{document}
\section{Εισαγωγή}
\appendix
\section{Δεδομένα}
\end{document}
```

The fix is to add the option `hypertexnames=false` to `hyperref`.

#### `flowfram` and `titlesec` <a href="#flowfram-and-titlesec" id="flowfram-and-titlesec"></a>

For now the `flowfram` and `titlesec` packages are incompatible with each other. But authors might consider styling sectional headings using the new `\EditInstance` interface, e.g.

```
\DocumentMetadata{}
\documentclass{article}
\usepackage{flowfram}
\usepackage[dvipsnames]{xcolor}
\EditInstance{heading}{section}{
  number-format=\fbox{\LARGE\bfseries\theheading},
  title-decls=\Large\bfseries\sffamily\color{NavyBlue}
}
\begin{document}
\section{Introduction}
\end{document}
```

See [this link](https://mirrors.ctan.org/macros/latex-dev/required/latex-lab/latex-lab-sec-template.pdf) for more details.

### TeX Live 2026 in Ayakaleaf Pro <a href="#tex-live-2026-in-server-pro" id="tex-live-2026-in-server-pro"></a>

Ayakaleaf Pro admins will be able to install TeX Live 2026 by updating their config in the usual way: pointing `TEX_LIVE_DOCKER_IMAGE` (and `ALL_TEX_LIVE_DOCKER_IMAGES`) at the new TeX Live 2026 image. No other upgrade is required.
