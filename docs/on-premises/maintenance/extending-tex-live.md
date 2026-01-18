---
icon: rectangle-pro
---

# Extending TeX Live

It's possible to extend an existing TeX Live image using a new Dockerfile and configure the application to use the new image.

Here we offer some guidelines to install new packages or fonts, but the configuration of a custom image is not covered by our support terms.

The TeX Live images receive infrequent updates. We suggest rebuilding custom images when upgrading Server Pro.

{% hint style="danger" %}
The following sections apply to Server Pro and [Sandboxed Compiles](https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles) only.
{% endhint %}

### Installing and updating new packages

You can use `tlmgr` commands such as `tlmgr install` and `tlmgr update` to manage Tex Live packages as in the following example:

```dockerfile
FROM quay.io/sharelatex/texlive-full:2023.1

RUN tlmgr update --force ebproof
```

### Using `tlmgr` in an older TeX Live image

By default `tlmgr` downloads resources from the latest TeX Live release. When patching an older TeX Live image, the downloads need to be switched to the respective archive. See the list in [https://www.tug.org/historic/](https://www.tug.org/historic/) for mirrors of archives.

```dockerfile
FROM quay.io/sharelatex/texlive-full:2022.1

RUN tlmgr option repository <MIRROR>/systems/texlive/<YEAR>/tlnet-final
# e.g. RUN tlmgr option repository ftp://tug.org/historic/systems/texlive/2022/tlnet-final

RUN tlmgr update --force ebproof
```

### Installing new fonts

There are different procedures to install new fonts in a Tex Live distribution, and installing a custom font might require several steps. Checking the [instructions to install TeX fonts](https://tug.org/fonts/fontinstall.html) in the official Tex Live documentation is probably a good starting point.

The following `Dockerfile` shows an example of installing a TrueType font over an existing Tex Live 2022 image:

```dockerfile
FROM quay.io/sharelatex/texlive-full:2022.1

COPY ./myfonts/*.ttf /usr/share/fonts/truetype/myfont/

# rebuild font information cache
RUN fc-cache
```

### Configuring Server Pro to use the new images

Use the name `quay.io/sharelatex/texlive-full` and a custom tag to build the new image, as in:

```bash
docker build -t quay.io/sharelatex/texlive-full:2023.1-custom
```

We can now configure Server Pro to use the new `2023.1-custom` image updating the `TEX_LIVE_DOCKER_IMAGE` and `ALL_TEX_LIVE_DOCKER_IMAGES` environment variables:

{% code overflow="wrap" %}
```
TEX_LIVE_DOCKER_IMAGE: "quay.io/sharelatex/texlive-full:2023.1-custom"
ALL_TEX_LIVE_DOCKER_IMAGES: "quay.io/sharelatex/texlive-full:2023.1,quay.io/sharelatex/texlive-full:2023.1-custom"
```
{% endcode %}

In the example above new projects are set by default to use the new `2023.1-custom` image, while `2023.1` is still available for when it's needed.
