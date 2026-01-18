# Getting help

### The Doctor

The Overleaf Toolkit comes with a handy `doctor` script to help with debugging. Run `bin/doctor` and the script will print information about your host environment, your configuration, and the dependencies the Toolkit needs. This output can also help the Overleaf support team diagnose issues for Server Pro installations.

{% hint style="info" %}
Users of the free Community Edition should open an issue on GitHub: https://github.com/overleaf/toolkit/issues

Users of Server Pro should contact support+serverpro@overleaf.com for assistance.

In both cases, include the output of the `bin/doctor` script in your message.
{% endhint %}

{% stepper %}
{% step %}
### Run the doctor script

Execute:

{% code title="Run doctor" %}
```bash
bin/doctor
```
{% endcode %}
{% endstep %}
{% endstepper %}

You will see output similar to the example below.

<details>

<summary>Example full output</summary>

```
====== Overleaf Doctor ======
- Host Information
    - Linux
    - Output of 'lsb_release -a':
            No LSB modules are available.
            Distributor ID:	Ubuntu
            Description:	Ubuntu 22.04.5 LTS
            Release:	22.04
            Codename:	jammy
- Dependencies
    - bash
        - status: present
        - version info: 5.1.16(1)-release
    - docker
        - status: present
        - version info: Docker version 28.0.4, build b8034c0
    - docker compose
        - status: present
        - version info: Docker Compose version v2.34.0
    - realpath
        - status: present
        - version info: realpath (GNU coreutils) 8.32
    - perl
        - status: present
        - version info: 5.034000
    - awk
        - status: present
        - version info: mawk 1.3.4 20200120
- Docker Daemon
    - status: up
====== Configuration ======
- config/version
    - status: present
    - version: 5.4.0
- config/overleaf.rc
    - status: present
    - values
        - OVERLEAF_DATA_PATH: data/overleaf
        - OVERLEAF_LOG_PATH: data/overleaf/logs
        - SERVER_PRO: true
        - SIBLING_CONTAINERS_ENABLED: true
            - logged in to quay.io: true
        - MONGO_ENABLED: true
        - REDIS_ENABLED: true
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

### Host Information

The `Host Information` section contains information about the machine running the Toolkit (for example, Linux distribution and release).

<details>

<summary>Example Host Information output</summary>

```
- Host Information
    - Linux
    - Output of 'lsb_release -a':
            No LSB modules are available.
            Distributor ID:	Ubuntu
            Description:	Ubuntu 22.04.5 LTS
            Release:	22.04
            Codename:	jammy
```

</details>

### Dependencies

The `Dependencies` section lists tools required for the Toolkit to work. If a tool is present it will be listed as `status: present` with version info. If missing it will be listed as `status: MISSING!` and a warning will be added to the bottom of the `doctor` output.

<details>

<summary>Example Dependency output (present)</summary>

```
- docker
    - status: present
    - version info: Docker version 28.0.4, build b8034c0
```

</details>

<details>

<summary>Example Dependency output (missing)</summary>

```
- docker
    - status: MISSING!
```

</details>

If any dependencies are missing, the Toolkit will almost certainly not work.

### Configuration

The `Configuration` section contains information about files in the `config/` directory. For `config/overleaf.rc`, the doctor prints some key values. Missing files will be listed as `status: MISSING!` and a warning will be added to the bottom of the `doctor` output.

<details>

<summary>Example Configuration output</summary>

```
====== Configuration ======
- config/version
    - status: present
    - version: 5.4.0
- config/overleaf.rc
    - status: present
    - values
        - OVERLEAF_DATA_PATH: /tmp/overleaf
        - SERVER_PRO: false
        - MONGO_ENABLED: false
        - REDIS_ENABLED: true
- config/variables.env
    - status: MISSING!
```

</details>

Notes from the example above:

* `OVERLEAF_DATA_PATH` set to `/tmp/overleaf` may not be a safe location for important data.
* `MONGO_ENABLED: false` means the Toolkit will not provision its own MongoDB; ensure `MONGO_URL` points to an externally managed MongoDB if needed.
* `config/variables.env` is missing in the example.

### Warnings

The `Warnings` section summarizes problems discovered by the doctor script. If there are no problems, this section will indicate that.

<details>

<summary>Example Warnings output</summary>

```
====== Warnings ======
- configuration file variables.env not found
- rc file, OVERLEAF_DATA_PATH not set
====== End =======
```

</details>
