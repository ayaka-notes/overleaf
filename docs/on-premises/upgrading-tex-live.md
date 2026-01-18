# Upgrading TeX Live

```
tlmgr revision 59291 (2021-05-21 05:14:40 +0200)
tlmgr using installation: /usr/local/texlive/2021
TeX Live (https://tug.org/texlive) version 2021
```

{% hint style="info" %}
The current release of TeX Live can be found on the TeX Live homepage: https://www.tug.org/texlive/

If you are running an older TeX Live version, you have two options:

* Wait for a new Overleaf Docker image (usually released shortly after a TeX Live release) and upgrade your deployment using the `bin/upgrade` script.
* Or keep the older TeX Live release and configure `tlmgr` to use a historic repository. Instructions are available here: https://www.tug.org/texlive/acquire.html#past
{% endhint %}

### Installing packages

To install a complete TeX Live installation, run this command inside the `sharelatex` container:

{% code title="Install full TeX Live" %}
```
tlmgr install scheme-full
```
{% endcode %}

You can also install individual packages manually:

{% code title="Install individual packages" %}
```
tlmgr install tikzlings tikzmarmots tikzducks
```
{% endcode %}

{% hint style="warning" %}
From `3.3.0` release onwards, running `tlmgr path add` is **required** again after every use of `tlmgr install`, in order to correctly symlink all the binaries into the system path.
{% endhint %}

Many more commands are available. Find out more with:

{% code title="tlmgr help" %}
```
tlmgr help
```
{% endcode %}

When you're done, type `exit` or press Control-D to exit the shell.

### Saving your changes

The changes you've just made inside the `sharelatex` container are ephemeral — they will be lost if Docker Compose recreates the container (for example, during updates). To make them persistent, use `docker commit` to save the changes to a new docker image:

{% code title="Save container changes" %}
```
cat config/version #5.2.1
docker commit sharelatex sharelatex/sharelatex:5.2.1-with-texlive-full
echo 5.2.1-with-texlive-full > config/version
```
{% endcode %}

After committing the changes, update the `config/version` accordingly and run `bin/up` to recreate the `sharelatex` container.

{% hint style="danger" %}
You will need to repeat these steps each time you upgrade to a new Overleaf version.

See also: https://github.com/overleaf/toolkit/blob/master/doc/upgrading.md
{% endhint %}
