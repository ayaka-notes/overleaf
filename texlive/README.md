# Overleaf Texlive 

> Attention! This image doesn't contain any sharelatex component. 
> 
> If you want to use Sharelatex CE with inner texlive, refer to [Overleaf official](github.com/overleaf/overleaf) to find more tutorials.

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

