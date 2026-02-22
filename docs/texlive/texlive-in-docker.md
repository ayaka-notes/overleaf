---
icon: file-lines
---

# TeXLive In Docker

### Docker

Docker provides a lightweight and portable way to package and run applications in isolated containers. By bundling the application together with all required dependencies, a container ensures consistent behavior across different machines, from laptops to production servers.

TeX Live is powerful but large and sensitive to system-level differences. Packaging TeX Live inside a Docker image makes the LaTeX toolchain predictable, reproducible, and easy to distribute.

However, some TeX Live packages rely on shell access. For security reasons, the container should run in a restricted environment that prevents users from executing arbitrary shell commands (for example via `\write18` or shell escape). This isolation protects the host system and avoids unintended access to the container’s underlying filesystem or tools such as `bash`.

### TeXLive Full Edition

[TeXLive-Full@ayaka-notes](https://github.com/ayaka-notes/texlive-full/) is a fully-featured **TeXLive Docker image** designed specially for Overleaf Server Pro, Overleaf Pro, and also standalone LaTeX compilation environments, like CI or pipelines.

This image aims to provide an almost complete TeXLive distribution with common fonts and tools preinstalled, in order to minimize compilation failures caused by missing packages or fonts.

Features:

* 📦 Nearly full TeXLive installation
* 🧩 Preinstalled common fonts and utilities
* 🐳 Ready to use with Docker and Docker Compose
* 🧪 Tested with Overleaf Server Pro / Overleaf Pro/ Overleaf CEP...
* 🏷 Multiple version tags (2020 – Latest)

### Overleaf Pro Usage

[TeXLive-Full@ayaka-notes](https://github.com/ayaka-notes/texlive-full/) support **overleaf pro**, you can use the following environment variables to `config/variables.env` file if you are [toolkit user](https://github.com/overleaf/toolkit).

For example:

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
ALL_TEX_LIVE_DOCKER_IMAGES=ghcr.io/ayaka-notes/texlive-full:2025.1, ghcr.io/ayaka-notes/texlive-full:2024.1
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=Texlive 2025, Texlive 2024
TEX_LIVE_DOCKER_IMAGE=ghcr.io/ayaka-notes/texlive-full:2025.1
```
{% endcode %}

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

### Problems

<details>

<summary>Problem 01: Font Cache Miss Problem</summary>

When overleaf compile latex project, if font miss occurs, **you may find the compile progress takes a long time**, that is because when a font is miss, texlive will try to **rebuild the whole font cache**. This is a time-consuming process.

In our image, we have pre-built the font cache, we fix this problem by [this commit](https://github.com/ayaka-notes/texlive-full/commit/0cb66b0dc8b82be628cf6999cfd659d9784e132f)

</details>

<details>

<summary>Problem 02: Sync Tex Extremely Slow</summary>

When you use this image in sharelatex, you may find that the sync tex is extremely slow.

See: [https://github.com/overleaf/overleaf/issues/1150](https://github.com/overleaf/overleaf/issues/1150), just disable http 2.0.

</details>

<details>

<summary>Problem 03: Re-Compile Error with Official Texlive Image</summary>

If you use texlive official image on docker hub `texlive/texlive`, you may find that when you re-compile a project, it will report error. However, in our image, this problem is fixed. Becase we use latest ubuntu base image and install all dependencies from ubuntu official repo.

</details>

### Other Tech Reminder

While build texlive image(before 2019), you may need to pay attention to the following problems:

* Only `http`/`ftp` is supported before texlive 2017, so you can't use `https` to download, unless you modify the `peal` script.
* Before 2015, only sha256 file is provided. So you can't use sha512 to check.
