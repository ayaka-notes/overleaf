---
icon: list-check
---

# Software requirements

### Operating systems <a href="#operating-systems" id="operating-systems"></a>

For the best experience when running Overleaf, we highly recommend using a **Debian-based** operating system, such as **Ubuntu**. This choice aligns with the software's development environment and is the preferred option among the majority of Overleaf users.

{% hint style="danger" %}
When using Server Pro with Sandboxed Compiles, it's **important** to note that the application requires root access to the Docker socket.
{% endhint %}

### Dependencies <a href="#dependencies" id="dependencies"></a>

* Docker 25.0 and 29
* MongoDB 7.0 and 8.0
* Redis 6.2 and 7.5

{% hint style="info" %}
You can track End-of-Life (EOL) dates for the above dependencies, and other popular products using the end of life.date service here: [https://endoflife.date/](https://endoflife.date/)
{% endhint %}

{% hint style="info" %}
MongoDB and Redis are automatically pulled by `docker compose` when running Server CE or Server Pro, unless configured to use a different installation.
{% endhint %}

The Toolkit depends on the following programs:

* bash
* Docker

`docker compose` is required and is generally installed with Docker.

We recommend that you install the most recent version of Docker that is available for your operating system.

Once Docker is installed correctly, you should be able to run these commands without error:

```bash
# Shows the installed Docker version
docker --version

# docker compose plugin (v2)
docker compose version

# List the running Docker containers on your system
docker ps
```
