---
icon: toolbox
---

# What is the Overleaf Toolkit?

The Overleaf Toolkit is the recommended deployment method for on-premises installations of the Community Edition and Server Pro and has been designed to work with the most common environment: a single physical server or virtual machine. The Toolkit uses `docker compose` to manage your server's Docker containers and provides a set of scripts which wrap `docker` commands to assist with the more technical side of managing an on-premises version of Overleaf.

#### The `bin/docker-compose` wrapper

The `bin/docker-compose` script is a wrapper around `docker compose`. It loads configuration from the `config/` directory, before invoking `docker compose` with whatever arguments were passed to the script.

You can treat `bin/docker-compose` as a transparent wrapper for the `docker compose` program installed on your machine.

Example:

{% code title="Check running containers" %}
```bash
$ bin/docker-compose ps
```
{% endcode %}

#### Convenience helpers

In addition to `bin/docker-compose`, the Toolkit provides convenient scripts to assist with common tasks:

* `bin/up`: shortcut for `bin/docker-compose up`
* `bin/start`: shortcut for `bin/docker-compose start`
* `bin/stop`: shortcut for `bin/docker-compose stop`
* `bin/shell`: starts a shell inside the **sharelatex** container
* `bin/doctor`: script used to gather installation and deployment information. See the "Checking your server" section below
* `bin/mongo`: starts a shell inside the **mongo** container and switches to the correct database (**sharelatex**)
* `bin/backup-config`: create a copy (zip or tar) of your current configuration and store it in a destination directory of your choice
* `bin/logs`: view/tail service logs
* `bin/error-logs`: view/tail service error logs
* `bin/rename-env-vars-5-0`: migration script to update environment variables in **config/variables.env** (re-branding from ShareLaTeX to Overleaf)
* `bin/rename-rc-vars`: migration script to update environment variables in **config/overleaf.rc** (re-branding from ShareLaTeX to Overleaf)
* `bin/run-script`: helper to simplify running scripts stored within the **sharelatex** container
* `bin/upgrade`: assists with instance upgrades. The script will check for Toolkit updates (via git) and offer to pull changes, check for the latest Docker image version and offer to update it. It provides step-by-step confirmation, the option to back up current configuration, and handles stopping/starting Docker services. See Upgrading your deployment for more information: https://docs.overleaf.com/on-premises/maintenance/upgrading-your-deployment

{% hint style="info" %}
If you prefer to run your instance without attaching to the Docker logs you can run `bin/up -d` to run in detached mode.
{% endhint %}

#### Checking your server

The Overleaf Toolkit includes a handy script called `bin/doctor` that produces a report pointing to any unfulfilled dependency.

Before continuing, run the `bin/doctor` script and check that everything is working correctly:

{% code title="Run Overleaf Doctor" %}
```bash
bin/doctor
```
{% endcode %}

Example output (truncated/illustrative):

<details>

<summary>Sample output from bin/doctor</summary>

```
====== Overleaf Doctor ======
- Host Information
    - Linux
    - Output of 'lsb_release -a':
            No LSB modules are available.
            Distributor ID:     Ubuntu
            Description:        Ubuntu 22.04.5 LTS
            Release:    22.04
            Codename:   jammy
- Dependencies
    - bash
        - status: present
        - version info: 5.1.16(1)-release
    - docker
        - status: present
        - version info: Docker version 27.3.1, build ce12230
    - realpath
        - status: present
        - version info: realpath (GNU coreutils) 8.32
    - perl
        - status: present
        - version info: 5.034000
    - awk
        - status: present
        - version info: GNU Awk 5.1.0, API: 3.0 (GNU MPFR 4.1.0, GNU MP 6.2.1)
    - openssl
        - status: present
        - version info: OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2 15 Mar 2022)
    - docker compose
        - status: present
        - version info: Docker Compose version v2.29.7
- Docker Daemon
    - status: up
====== Configuration ======
- config/version
    - status: present
    - version: 5.1.1
- config/overleaf.rc
    - status: present
    - values
        - OVERLEAF_DATA_PATH: data/overleaf
        - OVERLEAF_LOG_PATH: data/overleaf/logs
        - SERVER_PRO: true
            - logged in to quay.io: true
        - SIBLING_CONTAINERS_ENABLED: true
        - OVERLEAF_LISTEN_IP: 0.0.0.0
        - OVERLEAF_PORT: 80
        - MONGO_ENABLED: true
        - MONGO_IMAGE: mongo
        - MONGO_VERSION: 6.0
        - MONGO_DATA_PATH: data/mongo
        - REDIS_ENABLED: true
        - REDIS_IMAGE: redis:6.2
        - REDIS_DATA_PATH: data/redis
- config/variables.env
    - status: present
    - values
        - OVERLEAF_FILESTORE_BACKEND: fs
        - OVERLEAF_HISTORY_BACKEND: fs
====== Warnings ======
- None, all good
====== End ======
```

</details>

If any dependencies are missing, the doctor will print warnings. If you run into problems, first run `bin/doctor` and check its output for warnings.

{% hint style="info" %}
* Users of the free Community Edition should open an issue on GitHub: https://github.com/overleaf/toolkit/issues
* Users of Server Pro should contact support: mailto:support+serverpro@overleaf.com

In both cases, include the output of `bin/doctor` in your message.
{% endhint %}
