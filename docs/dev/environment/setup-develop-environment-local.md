---
description: Setup your development environment with your local server or desktop.
icon: envira
---

# Setup Develop Environment (Local)

## Prerequisites

Overleaf is a typical open-source project for microservice architecture, with all services running in Docker.&#x20;

* The Official Community Edition source code is on [GitHub Overleaf Official](https://github.com/overleaf/overleaf/tree).&#x20;
* The source code for Overleaf-CEP is available on [GitHub Yu-i-i/Overleaf](https://github.com/yu-i-i/overleaf-cep).
* Overleaf Pro Edition is availabe on [GitHub Ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro).

To set up an Overleaf development environment, you'll need a powerful server; a configuration of at least 8 cores and 16GB of RAM is recommended, as you'll need to run more than 20 containers simultaneously.

{% hint style="info" %}
Since servers with 8 or more CPU cores are typically expensive, It's highly recommend using your local computer for development.
{% endhint %}

Meanwhile, as a developer, we believe you should already be familiar with [Docker installation](https://docs.docker.com/engine/install/ubuntu/). We strongly suggest using latest Ubuntu LTS and Docker for development, as this reduces the possibility of encountering unexpected errors.

In summary, you will need:

* [x] A powerful server/desktop to develop
* [x] The latest version of Ubuntu LTS
* [x] Docker and Git environment

## Configuration Tutorial

Here, we will use overleaf-cep as an example to demonstrate how to configure an Overleaf development environment.

{% stepper %}
{% step %}
### Pull the Source Code

First of all let's clone the repo:

{% code title="bash" %}
```bash
git clone https://github.com/ayaka-notes/overleaf-pro.git
cd overleaf-pro
```
{% endcode %}
{% endstep %}

{% step %}
### Synchronize `package-lock.json`

Since Overleaf is developed in an [internal repository](http://github.com/overleaf/internal), the `package-lock.json` file is very likely to become out of sync due to some development issues. We need to run the following command to synchronize it. (if you have your local nodejs environment)

{% code title="bash" %}
```bash
npm install --package-lock-only --ignore-scripts
```
{% endcode %}

If you don't have nodejs installed, don't be worried, you can directly use `docker` to run the same command. run **from the root of the Overleaf repository:**

{% code title="bash" %}
```bash
docker run --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  node:22.18.0 \
  npm install --package-lock-only --ignore-scripts
```
{% endcode %}
{% endstep %}

{% step %}
### Build Develop Image

Overleaf provides a dedicated directory `/develop` for storing development scripts. Just build the services:

{% code title="bash" %}
```bash
cd ./develop
bin/build
```
{% endcode %}

{% hint style="info" %}
If Docker is running out of RAM while building the services in parallel, create a `.env` file in this directory containing `COMPOSE_PARALLEL_LIMIT=1`.
{% endhint %}
{% endstep %}

{% step %}
### Start All Micro Services

Then start the services:

{% code title="bash" %}
```bash
bin/up
```
{% endcode %}

Once the services are running, open [http://localhost/launchpad](http://localhost/launchpad) to create the first admin account.

{% hint style="danger" %}
You must run `bin/up` before run `bin/dev` commnad. Otherwise you may encounter a series of permission problems.
{% endhint %}
{% endstep %}
{% endstepper %}

{% hint style="info" %}
By default admin privilege is not available. you need to add this to `develop/dev.env`. After that, you can have access to Admin panel.

```
ADMIN_PRIVILEGE_AVAILABLE=true
```
{% endhint %}

### TeX Live

Compiling a PDF requires building a TeX Live image to handle the compilation inside Docker:

```
docker build texlive -t texlive-full
```

To compile on a macOS host, you may need to override the path to the Docker socket by creating a `.env` file in this directory, containing `DOCKER_SOCKET_PATH=/var/run/docker.sock.raw`

Also, you are welcome to use [ayaka-notes/texlive-full](https://github.com/ayaka-notes/texlive-full), but you can use base tag, which is the minium version of texlive.

### Development

To avoid running `bin/build && bin/up` after every code change, you can run Overleaf Community Edition in _development mode_, where services will automatically update on code changes.

To do this, use the included `bin/dev` script:

```
bin/dev
```

This will start all services using `node --watch`, which will automatically monitor the code and restart the services as necessary.

To improve performance, you can start only a subset of the services in development mode by providing a space-separated list to the `bin/dev` script:

```
bin/dev [service1] [service2] ... [serviceN]
```

{% hint style="info" %}
Starting the `web` service in _development mode_ will only update the `web` service when backend code changes. In order to automatically update frontend code as well, make sure to start the `webpack` service in _development mode_ as well.
{% endhint %}

If no services are named, all services will start in development mode.

### Debugging

When run in _development mode_ most services expose a debugging port to which you can attach a debugger such as the inspector in Chrome's Dev Tools or one integrated into an IDE. The following table shows the port exposed on the **host machine** for each service:

| Service            | Port |
| ------------------ | ---- |
| `web`              | 9229 |
| `clsi`             | 9230 |
| `chat`             | 9231 |
| `contacts`         | 9232 |
| `docstore`         | 9233 |
| `document-updater` | 9234 |
| `filestore`        | 9235 |
| `notifications`    | 9236 |
| `real-time`        | 9237 |
| `references`       | 9238 |
| `history-v1`       | 9239 |
| `project-history`  | 9240 |
| `linked-url-proxy` | 9241 |

To attach to a service using Chrome's _remote debugging_, go to chrome://inspect/ and make sure _Discover network targets_ is checked. Next click _Configure..._ and add an entry `localhost:[service port]` for each of the services you want to attach a debugger to.

After adding an entry, the service will show up as a _Remote Target_ that you can inspect and debug.

### Logging

In develop env, overleaf provide a script `bin/logs`, however, you need to install some dependency:

```bash
sudo npm install -g bunyan
# Or sudo apt install node-bunyan 
```

Or, you can run directly with:

```
docker compose logs -f [service name]
```

### Other Tools

Once you've done all, you can refer to the [next section](setup-develop-tools.md) to add some debug tools to your overleaf development.
