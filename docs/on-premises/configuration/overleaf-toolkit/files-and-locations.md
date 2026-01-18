---
icon: folder-open
---

# Files and locations

This page describes the configuration files that are used by the Toolkit to configure your on-premises deployment of Overleaf.

### Persistent Data

The Overleaf Toolkit needs to store persistent data, such as the files required to compile LaTeX projects, and the contents of the MongoDB database. This is achieved by mounting a few directories from the host machine into the Docker containers, and writing the data to those directories.

#### Data Directories

The `sharelatex` container requires a directory in which to store data relating to LaTeX compiles. This directory is set with the `OVERLEAF_DATA_PATH` variable in `config/overleaf.rc`.

The `mongo` container, if it is enabled, requires a directory in which to store its database files, and the same is true of the `redis` container. These directories can also be configured in `config/overleaf.rc`.

#### File Permissions

Because Docker runs as `root`, the data directories will end up being owned by the `root` user, even if the Toolkit is being used by a non-root user. This is not a problem, but is worth being aware of if you intend to alter the persistent data from outside of the containers.

### Configuration file location

All user-owned configuration files are found in the `config/` directory.

This directory is **excluded** from the git revision control system, so it will not be changed by updating the Toolkit code. The Toolkit will **not** change any data in the `config/` directory without your permission.

{% hint style="info" %}
Changes to the configuration files will not be automatically applied to existing containers, even if the container is stopped and restarted (with `bin/stop` and `bin/start`). To apply the changes, run `bin/up`, and behind the scenes, `docker compose` will automatically apply the configuration changes to a new container. (Or, run `bin/up -d`, if you prefer not to attach to the Docker logs.)
{% endhint %}

### The `overleaf.rc` file

The `config/overleaf.rc` file contains the most important top-level configuration settings used by the Toolkit. It contains statements that set variables, in the format: `VARIABLE_NAME=value`

To see a breakdown of all available configuration options see our settings section.

### The `variables.env` file

The `config/variables.env` file contains environment variables that are loaded into the `sharelatex` container, and used to configure the Overleaf microservices. These include the name of the application, as displayed in the header of the web interface, settings for sending emails, and other premium settings such as SSO for use with Server Pro.

To see a breakdown of all available environment variables see the [Environment variables](../../environment-variables.md) section.

### The `version` file

The `config/version` file contains the version number of the Docker image that will be used to create the running instance of your Overleaf server.

{% hint style="info" %}
Changes to these configuration files will not be automatically applied to existing containers, even if the container is stopped and restarted (with `bin/stop` and `bin/start`). To apply your changes, run `bin/up`, and the Toolkit will automatically create a new container for you with configuration changes applied.
{% endhint %}

### The `docker-compose.override.yml` file

If present, the `config/docker-compose.override.yml` file will be included in the invocation to `docker compose`. This is useful for overriding configuration specific to Docker Compose.

See the [docker-compose documentation](https://docs.docker.com/compose/extends/#adding-and-overriding-configuration) for more details.
