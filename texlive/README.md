# Overleaf Texlive 

> [!WARNING]  
> - This Docker Image **doesn't contain** any sharelatex/overleaf component.
> - If you want to use Sharelatex CE with inner contained texlive, refer to [Overleaf official](github.com/overleaf/overleaf) to find more tutorials.

This folder includes Texlive images Dockerfile for Overleaf. You can also use it for your personal Tex-Writing, or mount it to your sharelatex container.

## TeXLive Version

Thanks to Github Action, we can build all tex image parallel, which includes:
- `ghcr.io/ayaka-notes/overleaf/texlive:2023` (Also `latest` tag)
- `ghcr.io/ayaka-notes/overleaf/texlive:2022`
- `ghcr.io/ayaka-notes/overleaf/texlive:2021`
- `ghcr.io/ayaka-notes/overleaf/texlive:2020`
- `ghcr.io/ayaka-notes/overleaf/texlive:2019`
- `ghcr.io/ayaka-notes/overleaf/texlive:2018`
- `ghcr.io/ayaka-notes/overleaf/texlive:2017`
- `ghcr.io/ayaka-notes/overleaf/texlive:2016`
- `ghcr.io/ayaka-notes/overleaf/texlive:2015`
- `ghcr.io/ayaka-notes/overleaf/texlive:2014`
- `ghcr.io/ayaka-notes/overleaf/texlive:2013`
- `ghcr.io/ayaka-notes/overleaf/texlive:2012`
- `ghcr.io/ayaka-notes/overleaf/texlive:2011`
- `ghcr.io/ayaka-notes/overleaf/texlive:2010`

We use mirror archive from [utah university](https://ftp.math.utah.edu/pub/tex/historic/systems/texlive/), which includes almost all texlive image ranging from 1996 to 2023. And thankes to Overleaf's Dockerfile, we can build this project faster.

> Why texlive 2016 and earlier are not supported ?
>
> Because Git-Action can't finish it as 2017,2018..., and we believe you may not use it any more since it's too old

## Contained Component

The following things are contained in the docker image.
- fontconfig 
- inkscape 
- pandoc 
- python3-pygments 
- wget
- python3
- gnupg 
- gnuplot
- perl-modules 
- perl 
- ca-certificates 
- git


## Tech Reminder

While install texlive image, you may need to pay attention to the following problems:
- Only `http`/`ftp` is supported before 2017, so you can't use `https`, unless you modify the `peal` script.
- Before 2015, only sha256 file is provided. So you can't use sha512 to check.

