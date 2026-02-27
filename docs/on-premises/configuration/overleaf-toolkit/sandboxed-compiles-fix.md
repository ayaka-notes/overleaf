---
icon: gear-code
---

# Sandboxed Compiles (fix)

Overleaf Pro comes with the option to run compiles in a secured sandbox environment for enterprise security. It does this by running every project in its own secured docker environment.

### Improved security

Sandboxed Compiles are the recommended approach for Server Pro due to many LaTeX documents requiring/having the ability to execute arbitrary shell commands as part of the PDF compile process. If you use Sandboxed Compiles, each compile runs in a separate Docker container with limited capabilities that are not shared with any other user or project and has no access to outside resources such as the host network.

{% hint style="warning" %}
If you attempt to run Overleaf Pro **without** Sandboxed Compiles, the compile runs alongside other concurrent compiles inside the main Docker container and users have full read and write access to the `sharelatex` container resources (filesystem, network and environment variables) when running LaTeX compiles.
{% endhint %}

### Easier package management

To avoid manually installing packages, we recommend enabling Sandboxed Compiles. This is a configurable setting within Server Pro that will provide your users with access to the same TeX Live environment as that on overleaf.com but within your own on-premise installation. TeX Live images used by Sandboxed Compiles contain the most popular packages and fonts tested against our gallery templates, ensuring maximum compatibility with on-premise projects.

Enabling Sandboxed Compiles allows you to configure which TeX Live versions users are able to choose from within their project along with setting a default TeX Live image version for new projects.

{% hint style="info" %}
If you attempt to run Overleaf Pro without Sandboxed Compiles, your instance will default to using a basic scheme version of TeX Live for compiles. This basic version is lightweight and only contains a very limited subset of LaTeX packages, which will most likely result in missing package errors for your users, especially if they try to use pre-built templates.
{% endhint %}

As Overleaf Pro has been architected to work offline, there isn't an automated way to integrate overleaf.com gallery templates into your on-premise installation; it is, however, possible to do this manually on a per-template basis. For more information on how this works, please check out our transferring templates from overleaf.com guide: [#transferring-templates-from-overleaf.com](templates.md#transferring-templates-from-overleaf.com "mention")

{% hint style="info" %}
Sandboxed Compiles requires that the `sharelatex` container has access to the Docker socket on the host machine (via a bind mount) so it can manage these sibling compile containers.
{% endhint %}

## How it works

When Sandboxed Compiles are enabled, the Docker socket will be mounted from the host machine into the `sharelatex` container, so that the compiler service in the container can create new Docker containers on the host. Then for each run of the compiler in each project, the LaTeX compiler service (CLSI) will do the following:

* Write out the project files to a location inside the `OVERLEAF_DATA_PATH`.
* Use the mounted Docker socket to create a new `texlive` container for the compile run.
* Have the `texlive` container read the project data from the location under `OVERLEAF_DATA_PATH`.
* Compile the project inside the `texlive` container.

### Enabling Sandboxed Compiles&#xD;

#### For Toolkit User

To enable sandboxed compiles (also known as Sibling containers), set the following configuration options in `overleaf-toolkit/config/overleaf.rc`:

{% code title="config/overleaf.rc" %}
```dotenv
SERVER_PRO=true
SIBLING_CONTAINERS_ENABLED=true
```
{% endcode %}

#### For Docker Compose User <a href="#docker-compose-example" id="docker-compose-example"></a>

{% hint style="danger" %}
Starting with Overleaf CE/Server Pro `5.0.3` environment variables have been rebranded from `SHARELATEX_*` to `OVERLEAF_*`.
{% endhint %}

If you're using a `4.x` version (or earlier) please make sure the variables are prefixed accordingly (e.g. `SHARELATEX_MONGO_URL` instead of `OVERLEAF_MONGO_URL`).

<pre class="language-yml"><code class="lang-yml">version: '2'
services:
    sharelatex:
        #...
        volumes:
            - /data/overleaf_data:/var/lib/overleaf
<strong>            - /var/run/docker.sock:/var/run/docker.sock
</strong>        environment:
            #...
<strong>            DOCKER_RUNNER: "true"
</strong><strong>            SANDBOXED_COMPILES: "true"
</strong><strong>            SANDBOXED_COMPILES_HOST_DIR: "/data/overleaf_data/data/compiles"
</strong>            #...
        #...
</code></pre>

### Changing the TexLive Image

{% hint style="info" %}
For China mainland user, you can use `ghcr.nju.edu.cn` to accelerate your download.&#x20;
{% endhint %}

Overleaf Pro uses three environment variables to determine which TeX Live images to use for Sandboxed Compiles:

* `TEX_LIVE_DOCKER_IMAGE` **(required),** The default TeX Live image used for compiling new projects. This image must be included in `ALL_TEX_LIVE_DOCKER_IMAGES`.
* `ALL_TEX_LIVE_DOCKER_IMAGE_NAMES` **(required),** A comma-separated list of friendly names for the images, used for frontend options.
* `ALL_TEX_LIVE_DOCKER_IMAGES` **(required),** A comma-separated list of TeX Live images to use. If the Overleaf Toolkit is used for deployment, these images will be downloaded or updated. To skip downloading, set `SIBLING_CONTAINERS_PULL=false` in `config/overleaf.rc`.

When starting your Overleaf Pro instance using the `bin/up` command, the Toolkit will automatically pull all of the images listed in `ALL_TEX_LIVE_DOCKER_IMAGES`.

Here's an example where we default to TeX Live 2025 for new projects, and keep 2024 in use for existing projects.

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
ALL_TEX_LIVE_DOCKER_IMAGES=ghcr.io/ayaka-notes/texlive-full:2025.1, ghcr.io/ayaka-notes/texlive-full:2024.1
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=Texlive 2025, Texlive 2024
TEX_LIVE_DOCKER_IMAGE=ghcr.io/ayaka-notes/texlive-full:2025.1
```
{% endcode %}

{% hint style="danger" %}
It's highly recommended to set **at least 2 texlive-full images**. For detailed reason, see [#known-issues](sandboxed-compiles-fix.md#known-issues "mention")
{% endhint %}



