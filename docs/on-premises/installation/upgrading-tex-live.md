---
icon: square-up
---

# Upgrading TeX Live

To save bandwidth, both the Overleaf Community Edition and Server Pro images only come with a minimal install of [TeX Live](https://www.tug.org/texlive/). You can install more packages or upgrade to a complete TeX Live installation using the [tlmgr](https://www.tug.org/texlive/tlmgr.html) command in the `sharelatex` container.

{% hint style="warning" %}
The following instructions **only** apply to Community Edition installations. We highly recommend that Server Pro users enable [Sandboxed Compiles](../configuration/overleaf-toolkit/sandboxed-compiles.md) as this provides users with access to the same TeX Live images used on [overleaf.com](../configuration/overleaf-toolkit/) as well as providing isolation between project compiles for enhanced security.
{% endhint %}

#### Getting inside the sharelatex container

To start a shell inside the `sharelatex` container, run

```bash
bin/shell
```

You will get a prompt that looks like:

```bash
root@309b192d4030:/#
```

In the following instructions, we will assume that you are in the container.

#### Determining your current TeX Live version

TeX Live is released every year around the month of April. Steps for using `tlmgr` are different depending on whether you are using the current release or an older one. You can check which version of TeX Live you are running with `tlmgr --version`. For example, this installation runs TeX Live 2021:

```bash
# tlmgr --version
tlmgr revision 59291 (2021-05-21 05:14:40 +0200)
tlmgr using installation: /usr/local/texlive/2021
TeX Live (https://tug.org/texlive) version 2021
```

{% hint style="info" %}
The current release of TeX Live can be found on [the TeX Live homepage](https://www.tug.org/texlive/).
{% endhint %}

If you are running an older TeX Live version, you have two options. A new version of the Overleaf Docker image is usually released shortly after a TeX Live release, you can either wait for it and upgrade your deployment using `bin/upgrade` script, or, if you prefer to keep the older TeX Live release, you will first need to tell `tlmgr` to use a historic repository. You will find instructions for doing so [here](https://www.tug.org/texlive/acquire.html#past).

#### Installing packages

To install a complete TeX Live installation, run this command inside the `sharelatex` container:

```
tlmgr install scheme-full
```

You can also install individual packages manually:

```bash
tlmgr install tikzlings tikzmarmots tikzducks
```

{% hint style="warning" %}
From `3.3.0` release onwards running `tlmgr path add` is **required** again after every use of `tlmgr install`, in order to correctly symlink all the binaries into the system path.
{% endhint %}

Many more commands are available. Find out more with:

```
tlmgr help
```

When you're done, type `exit` or press Control-D to exit the shell.

#### Saving your changes

The changes you've just made have changed the `sharelatex` container, but they are ephemeral -- they will be lost if Docker Compose recreates the container, e.g. as part of updating the config.

To make them persistent, use `docker commit` to save the changes to a new docker image:

```bash
cat config/version #5.2.1
docker commit sharelatex sharelatex/sharelatex:5.2.1-with-texlive-full
echo 5.2.1-with-texlive-full > config/version
```

After committing the changes, update the `config/version` accordingly. Then run `bin/up`, to recreate the `sharelatex` container.

{% hint style="danger" %}
You will need to repeat these steps each time you [upgrade](https://github.com/overleaf/toolkit/blob/master/doc/upgrading.md) to a new Overleaf version.
{% endhint %}
