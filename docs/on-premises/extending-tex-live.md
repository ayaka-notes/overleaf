# Extending TeX Live

```dockerfile
# e.g. RUN tlmgr option repository ftp://tug.org/historic/systems/texlive/2022/tlnet-final
RUN tlmgr update --force ebproof
```

### Installing new fonts

There are different procedures to install new fonts in a TeX Live distribution, and installing a custom font might require several steps. Checking the official TeX Live documentation is a good starting point: https://tug.org/fonts/fontinstall.html

The following example Dockerfile shows installing a TrueType font over an existing TeX Live 2022 image:

{% code title="Dockerfile" %}
```dockerfile
FROM quay.io/sharelatex/texlive-full:2022.1

COPY ./myfonts/*.ttf /usr/share/fonts/truetype/myfont/

# rebuild font information cache
RUN fc-cache
```
{% endcode %}

For additional guidance specific to Overleaf Server Pro, see: https://docs.overleaf.com/on-premises/maintenance/extending-tex-live#installing-new-fonts

### Configuring Server Pro to use the new images

Use the base image name `quay.io/sharelatex/texlive-full` with a custom tag when building the new image, for example:

{% code title="Build custom image" %}
```bash
docker build -t quay.io/sharelatex/texlive-full:2023.1-custom
```
{% endcode %}

Then configure Server Pro to use the new `2023.1-custom` image by updating the `TEX_LIVE_DOCKER_IMAGE` and `ALL_TEX_LIVE_DOCKER_IMAGES` environment variables:

{% code title="Environment variables (example)" %}
```yaml
TEX_LIVE_DOCKER_IMAGE: "quay.io/sharelatex/texlive-full:2023.1-custom"
ALL_TEX_LIVE_DOCKER_IMAGES: "quay.io/sharelatex/texlive-full:2023.1,quay.io/sharelatex/texlive-full:2023.1-custom"
```
{% endcode %}

In the example above, new projects are set by default to use the new `2023.1-custom` image, while `2023.1` remains available when needed.

For Server Pro configuration details, see: https://docs.overleaf.com/on-premises/maintenance/extending-tex-live#configuring-server-pro-to-use-the-new-images
