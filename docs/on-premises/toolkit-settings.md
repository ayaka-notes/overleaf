# Toolkit settings

This page describes the environment variables that are supported in the `config/overleaf.rc` file for Toolkit deployments.

The `config/overleaf.rc` file consists of variable definitions in the form `NAME=value`; lines beginning with `#` are treated as comments.

{% hint style="info" %}
It is necessary to re-create the Docker containers after changing anything in `overleaf.rc` or `variables.env` by running `bin/up`.
{% endhint %}

### Container

#### `sharelatex`

`PROJECT_NAME`\
Sets the value of the `--project-name` flag supplied to `docker-compose`. Useful when running multiple instances of Overleaf on one host, as each instance can have a different project name.\
Default: `overleaf`

`OVERLEAF_IMAGE_NAME`\
Docker image used by the Server Pro/CE application container. This is just the Docker image name; the Docker image tag is sourced from `config/version`.\
Default:

* Server Pro: `quay.io/sharelatex/sharelatex-pro`
* Community Edition: `sharelatex/sharelatex`

`SERVER_PRO`\
When set to `true`, tells the Toolkit to use the Server Pro image (`quay.io/sharelatex/sharelatex-pro`) rather than the default Server CE image (`sharelatex/sharelatex`).\
Default: `false`

`GIT_BRIDGE_ENABLED`\
Set to `true` to enable the git-bridge feature (Server Pro only). For more information see the Git integration user documentation: https://www.overleaf.com/learn/how-to/Git\_integration\
Default: `false`

`GIT_BRIDGE_IMAGE`\
Docker image used by the git-bridge container (Server Pro only). This is just the Docker image name; the Docker image tag is sourced from `config/version`.\
Default: `quay.io/sharelatex/git-bridge`

`GIT_BRIDGE_DATA_PATH`\
Sets the path to the directory that will be mounted into the `git-bridge` container (Server Pro only), and used to store the git-repositories. Can be either a full path (beginning with `/`) or relative to the base directory of the Toolkit.

`GIT_BRIDGE_LOG_LEVEL`\
Configure the logging level of the `git-bridge` container. Available levels: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`.\
Default: `INFO`

`SIBLING_CONTAINERS_ENABLED`\
When set to `true`, tells the Toolkit to use the Sibling Containers technique for compiling projects in separate sandboxes, using a separate Docker container for each project. See the Sandboxed Compiles documentation for more information: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles\
Requires: `SERVER_PRO=true`\
Default: `true`

`SIBLING_CONTAINERS_PULL`\
When set to `true`, tells the Toolkit to automatically pull all TeX Live images set using `ALL_TEX_LIVE_DOCKER_IMAGES` in the `config/variables.env` file when using the `bin/up` command.\
Default: `true`

`DOCKER_SOCKET_PATH`\
Sets the path to the Docker socket on the host machine (the machine running the Toolkit). When `SIBLING_CONTAINERS_ENABLED` is `true`, the socket will be mounted into the container to allow the compiler service to spawn new Docker containers on the host.\
Requires: `SIBLING_CONTAINERS_ENABLED=true`\
Default: `/var/run/docker.sock`

`OVERLEAF_DATA_PATH`\
Sets the path to the directory that will be mounted into the main `sharelatex` container, and used to store compile data. Can be either a full path (beginning with `/`) or relative to the base directory of the Toolkit.\
Default: `data/overleaf`

`OVERLEAF_LISTEN_IP`\
Sets the host IP address(es) that the container will bind to. Example: if set to `0.0.0.0`, the web interface will be available on any host IP address. For direct container access the value of `OVERLEAF_LISTEN_IP` must be set to your public IP address. Setting `OVERLEAF_LISTEN_IP` to `0.0.0.0` or the external IP of your host will typically cause errors when used in conjunction with the TLS Proxy: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/tls-proxy\
Default: `127.0.0.1`

`OVERLEAF_PORT`\
Sets the host port that the container will bind to. Example: if set to `8099` and `OVERLEAF_LISTEN_IP` is `127.0.0.1`, the web interface will be available on `http://localhost:8099`.\
Default: `80`

`OVERLEAF_LOG_PATH`\
Sets the path to the directory that will be mounted into the main `sharelatex` container and used for making application logs available on the Docker host. Can be either a full path (beginning with `/`) or relative to the base directory of the Toolkit. Remove the config entry to disable the bind-mount. When not set, logs will be discarded when recreating the container. See the logging documentation: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/logging\
Default: not set

***

#### `mongo`

`MONGO_ENABLED`\
When set to `true`, tells the Toolkit to create a MongoDB container to host the database. When set to `false`, this container will not be created, and the system will use the MongoDB database specified by `MONGO_URL` instead.\
Default: `true`

`MONGO_URL`\
Specifies the MongoDB connection URL to use when `MONGO_ENABLED` is `false`.\
Default: not set

`MONGO_DATA_PATH`\
Sets the path to the directory that will be mounted into the `mongo` container and used to store the MongoDB database. Can be either a full path (beginning with `/`) or relative to the base directory of the Toolkit. This option only affects the local `mongo` container that is created when `MONGO_ENABLED` is `true`.\
Default: `data/mongo`

`MONGO_IMAGE`\
Docker image used by the MongoDB container. This is just the name of the Docker image; the Docker image tag should go into `MONGO_VERSION`.\
Default: `mongo`

`MONGO_VERSION`\
MongoDB version used by the MongoDB container. The value must start with the major MongoDB version and a dot, e.g. `6.0` or `6.0-with-suffix`.\
Default: `6.0`

***

#### `redis`

`REDIS_ENABLED`\
When set to `true`, tells the Toolkit to create a Redis container to host the Redis database. When set to `false`, this container will not be created, and the system will use the Redis database specified by `REDIS_HOST` and `REDIS_PORT` instead.\
Default: `true`

`REDIS_HOST`\
Specifies the Redis host to use when `REDIS_ENABLED` is `false`.\
Default: not set

`REDIS_PORT`\
Specifies the Redis port to use when `REDIS_ENABLED` is `false`.\
Default: not set

`REDIS_DATA_PATH`\
Sets the path to the directory that will be mounted into the `redis` container and used to store the Redis database. Can be either a full path (beginning with `/`) or relative to the base directory of the Toolkit. This option only affects the local `redis` container that is created when `REDIS_ENABLED` is `true`.\
Default: `data/redis`

`REDIS_AOF_PERSISTENCE`\
Turn on AOF (Append Only File) persistence for Redis. This is the recommended configuration for Redis persistence. For additional details, see the AOF section in Data and backups: https://docs.overleaf.com/on-premises/maintenance/data-and-backups#aof-append-only-file\
Default: `true`

***

#### `nginx`

`NGINX_ENABLED`\
When set to `true`, tells the Toolkit to create an NGINX container to act as a TLS Proxy.\
Default: `false`

`NGINX_CONFIG_PATH`\
Path to the NGINX config file to use for the TLS Proxy.\
Default: `config/nginx/nginx.conf`

`NGINX_TLS_LISTEN_IP`\
Sets the host IP address(es) that the TLS Proxy container will bind to for HTTPS. Example: if set to `0.0.0.0`, the HTTPS web interface will be available on any host IP address. Typically this should be set to the external IP of your host.\
Default: `127.0.1.1`

`NGINX_HTTP_LISTEN_IP`\
Sets the host IP address(es) that the TLS Proxy container will bind to for HTTP redirect. Example: if set to `127.0.1.1`, HTTP connections to `127.0.1.1` will be redirected to the HTTPS web interface. Typically this should be set to the external IP of your host. Do not set it to `0.0.0.0` as this will typically cause a conflict with `OVERLEAF_LISTEN_IP`.\
Default: `127.0.1.1`

`NGINX_HTTP_PORT`\
Sets the host port that the TLS Proxy container will bind to for HTTP.\
Default: `80`

`TLS_PORT`\
Sets the host port that the TLS Proxy container will bind to for HTTPS.\
Default: `443`

`TLS_PRIVATE_KEY_PATH`\
Path to the private key to use for the TLS Proxy.\
Default: `config/nginx/certs/overleaf_key.pem`

`TLS_CERTIFICATE_PATH`\
Path to the public certificate to use for the TLS Proxy.\
Default: `config/nginx/certs/overleaf_certificate.pem`

***

Last updated 5 months ago

Was this helpful?

This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the privacy policy: https://www.overleaf.com/legal
