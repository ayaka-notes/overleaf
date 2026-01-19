---
icon: file-lines
---

# TeXLive Full Images

## Why you need TeXLive full

[Ayaka-notes/TeXLive-full](https://github.com/ayaka-notes/texlive-full/) is Overleaf's fullest texlive image designed specially for sandbox compile. It can provide you with extreme excellent experience. You can also use this for your personal TeX-Writing, or mount it to your sharelatex container.

{% hint style="info" %}


* This Docker Image **doesn't contain** any sharelatex/overleaf component. It's used for Overleaf/Overleaf Pro's compile.
* If you want to use Sharelatex CE with inner contained LaTeX compile, refer to Overleaf official to find more tutorials. This repository is for server-pro's Docker Compile.
* A long time compile bug [link #1](https://github.com/ayaka-notes/texlive-full/issues/1) has been fixed now(2024.4.17), please update your docker image.
* TeXLive 2025 is in beta!(2025.4.17).
{% endhint %}

### Overleaf-CEP Usage

Texlive-full@Ayaka-notes support [overleaf-cep](https://github.com/yu-i-i/overleaf-cep), you can use the following environment variables to `config/variables.env` file if you are [toolkit user](https://github.com/overleaf/toolkit).

For example:

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
ALL_TEX_LIVE_DOCKER_IMAGES=ghcr.io/ayaka-notes/texlive-full:2025.1, ghcr.io/ayaka-notes/texlive-full:2024.1
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=Texlive 2025, Texlive 2024
TEX_LIVE_DOCKER_IMAGE=ghcr.io/ayaka-notes/texlive-full:2025.1
```
{% endcode %}

If you need more help, refer to [overleaf-cep documentation](https://github.com/yu-i-i/overleaf-cep/wiki/Extended-CE:-Sandboxed-Compiles)

### TeXLive Version

Thanks to Github Action, we can build all tex image parallel, which includes:

* `ghcr.io/ayaka-notes/texlive-full:2025.1` (Also `latest` tag)
* `ghcr.io/ayaka-notes/texlive-full:2024.1`
* `ghcr.io/ayaka-notes/texlive-full:2023.1`
* `ghcr.io/ayaka-notes/texlive-full:2022.1`
* `ghcr.io/ayaka-notes/texlive-full:2021.1`
* `ghcr.io/ayaka-notes/texlive-full:2020.1`
* `ghcr.io/ayaka-notes/texlive-full:base`

We use mirror archive from [utah university](https://ftp.math.utah.edu/pub/tex/historic/systems/texlive/), which includes almost all texlive image ranging from 1996 to 2024. And thankes to Overleaf's Dockerfile, we can build this project faster.

> Why texlive 2019 and earlier are not supported ?
>
> To maintain such images is more than difficult. And we believe you may not use it any more since it's too old. If you need, open a issue to let me know.

### Contained Component

The following packages are contained in the docker image.

* fontconfig inkscape pandoc python3-pygments wget python3
* gnupg gnuplot perl-modules perl ca-certificates git
* ghostscript qpdf r-base-core tar

The following fonts are contained in the docker image.

* [Google Fonts](https://fonts.google.com/)
* [Microsoft msttcorefonts](https://packages.ubuntu.com/jammy/ttf-mscorefonts-installer)
* [Overleaf supported fonts](https://www.overleaf.com/learn/latex/Questions/Which_OTF_or_TTF_fonts_are_supported_via_fontspec%3F)

{% hint style="warning" %}
Please confirm whether the relevant fonts can be used commercially. We are **not responsible** for any legal issues arising from your incorrect use of fonts. Once you download image, You agree with this automatically.
{% endhint %}

### License

MIT

### Problem 01: Font Cache Miss Problem

When overleaf compile latex project, if font miss occurs, **you may find the compile progress takes a long time**, that is because when a font is miss, texlive will try to **rebuild the whole font cache**. This is a time-consuming process.

In our image, we have pre-built the font cache, we fix this problem by [this commit](https://github.com/ayaka-notes/texlive-full/commit/0cb66b0dc8b82be628cf6999cfd659d9784e132f)

### Problem 02: Sync Tex Extremely Slow

When you use this image in sharelatex, you may find that the sync tex is extremely slow.

See: https://github.com/overleaf/overleaf/issues/1150, just disable http 2.0.

### Problem 03: Re-Compile Error with Official Texlive Image

If you use texlive official image on docker hub `texlive/texlive`, you may find that when you re-compile a project, it will report error. However, in our image, this problem is fixed. Becase we use latest ubuntu base image and install all dependencies from ubuntu official repo.

### Other Tech Reminder

While build texlive image(before 2019), you may need to pay attention to the following problems:

* Only `http`/`ftp` is supported before texlive 2017, so you can't use `https` to download, unless you modify the `peal` script.
* Before 2015, only sha256 file is provided. So you can't use sha512 to check.
