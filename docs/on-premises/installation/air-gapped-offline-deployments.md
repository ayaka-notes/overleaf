---
icon: block-brick
---

# Air-gapped/offline deployments

Overleaf Community Edition and Server Pro have both been architected to work offline, which means that it may not always be possible to reach the quay.io registry to pull the required `sharelatex` , `sharelatex-pro` and TeX Live images. This is not a problem as Docker provides tooling for exporting and importing images that will help you with an offline/air-gapped deployment.

At a high level, you'll download the required images on a device with internet connectivity, export them to a portable device (or transfer them using SCP/Rsync), and import them on the air-gapped server.

To do this, you'll need to complete the following steps:

* Pull all the required images (`sharelatex`, `sharelatex-pro`, `git-bridge`, `mongo`, `redis` + any required [TeX Live images](https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles#available-tex-live-images) for use with [Sandboxed Compiles](https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles)) on a machine with internet connectivity
  * `docker pull quay.io/sharelatex/sharelatex-pro:5.1.1`
  * `docker pull quay.io/sharelatex/git-bridge:5.1.1` (tag must be the same as `sharelatex-pro`)
  * `docker pull mongo:6`
  * `docker pull redis:6.2`
  * `docker pull quay.io/sharelatex/texlive-full:2024.1`<br>
* For **each** of the pulled images, you'll need to then export them to a .tar file. For example, `docker save quay.io/sharelatex/sharelatex-pro:5.1.1 > sharelatex-pro:5.1.1.tar`
* Using your preferred method, transfer the .tar files from your internet-connected machine to the offline/air-gapped server
* For each of the .tar files, use the `docker load` command to load the image from the .tar file. For example, `docker load < sharelatex-pro:5.1.1.tar`
* Finally, run the `docker images` command to view/confirm the loading of images was successful and that they are available

{% hint style="danger" %}
By default, when you run the `bin/up` command, the Toolkit will attempt to automatically pull each of the TeX Live images set via `ALL_TEX_LIVE_DOCKER_IMAGES` in `config/variables.env`. As your deployment is air-gapped this will fail -- you can stop this by using `SIBLING_CONTAINERS_PULL=false` in `config/overleaf.rc`.
{% endhint %}
