# docker-compose.yml to Toolkit migration

{% hint style="info" %}
These instructions are for v4.x and earlier. Therefore all variables use the `SHARELATEX_` prefix instead of `OVERLEAF_`.
{% endhint %}

{% stepper %}
{% step %}
### Clone the Toolkit repository

First, clone the Toolkit repository to the host machine:

```bash
git clone https://github.com/overleaf/toolkit.git ./overleaf-toolkit
```

Next run the `bin/init` command to initialise the Toolkit with its default configuration.
{% endstep %}

{% step %}
### Setting the image and version

In a typical `docker-compose.yml` the image and version are defined in the component description, for example:

```yaml
version: '2.2'
services:
    sharelatex:
        restart: always
        # Server Pro users:
        # image: quay.io/sharelatex/sharelatex-pro
        image: sharelatex/sharelatex:3.5.13
```

When using the Toolkit, the image name is automatically resolved; the only requirement is to set `SERVER_PRO=true` in **config/overleaf.rc** to pick the Server Pro image or `SERVER_PRO=false` to use Community Edition.

The desired Server Pro/Community Edition version number is set in the **config/version** file. The Toolkit requires a specific version number like `4.2.3`. If you are using `latest`, you can use `bin/images` to find the image id of your local `latest` version, then use the release notes for [2.x.x](../release-notes-2.x.x.md), [3.x.x](../release-notes-3.x.x.md), [4.x.x](../release-notes-4.x.x.md) or [5.x.x](../release-notes/release-notes-5.x.x/) to map the image id to the version.

If you are sourcing the image from your own internal registry you can override the image the Toolkit uses by setting `OVERLEAF_IMAGE_NAME`. You do not need to specify the tag as the Toolkit will automatically add it based on your **config/version** file.
{% endstep %}

{% step %}
### Configuring external access

By default, Overleaf will listen on `127.0.0.1:80`, only allowing traffic from the Docker host machine.

To allow external access, set the `OVERLEAF_LISTEN_IP` and `OVERLEAF_PORT` in the [**config/overleaf.rc**](../toolkit-settings.md) file.
{% endstep %}

{% step %}
### Environment variable migration

You’ll likely have a set of environment variables defined in the `sharelatex` service in your `docker-compose.yml`, for example:

```yaml
environment:
    OVERLEAF_APP_NAME: Overleaf Community Edition
    OVERLEAF_PROXY_LEARN: 'true'
    …
```

Copy these variables into the Toolkit’s [**config/variables.env**](../environment-variables.md) file, ensuring the following form (use `=` instead of `:`):

```env
OVERLEAF_APP_NAME=Overleaf Community Edition
OVERLEAF_PROXY_LEARN=true
```

Exceptions / differences when using the Toolkit:

* Variables starting with `SANDBOXED_COMPILES_` and `DOCKER_RUNNER` are no longer needed. To enable Sandboxed Compiles, set `SIBLING_CONTAINERS_ENABLED=true` in your **config/overleaf.rc** file.
* Variables starting with `OVERLEAF_MONGO_`, `OVERLEAF_REDIS_` and the `REDIS_HOST` variable are no longer needed. MongoDB and Redis are now configured in the **config/overleaf.rc** file using `MONGO_URL`, `REDIS_HOST` and `REDIS_PORT`.

For advanced configuration options, refer to the [config/overleaf.rc](../toolkit-settings.md) documentation.
{% endstep %}

{% step %}
### NGINX Proxy

For instructions on how to migrate `nginx`, see the TLS Proxy documentation:

https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/tls-proxy
{% endstep %}

{% step %}
### Volumes

Set the locations of data volumes in **config/overleaf.rc**:

#### ShareLaTeX

Set the `OVERLEAF_DATA_PATH` to the location of the data volume used by the `sharelatex` container.

#### MongoDB

Set the `MONGO_DATA_PATH` to the location of the data volume used by the `mongo` container.

#### Redis

Set the `REDIS_DATA_PATH` to the location of the data volume used by the `redis` container.
{% endstep %}
{% endstepper %}

For more details and advanced configuration, consult the relevant Toolkit configuration docs linked above.
