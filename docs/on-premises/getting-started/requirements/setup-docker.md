---
icon: docker
---

# Setup Docker

Overleaf runs on Docker. You must install:

* Docker Engine (Docker CE)
* Docker Compose **plugin** (`docker compose`, v2)

These steps target a recent Ubuntu LTS (20.04/22.04/24.04).

{% hint style="warning" %}
Avoid installing `docker.io` from Ubuntu's default apt repository.\
Use Docker's official repository so you get a recent Docker version and the `docker compose` plugin.
{% endhint %}

The official document comes from: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/).

{% stepper %}
{% step %}
### 1) Remove old/conflicting packages (if present)

If Docker was previously installed from another source, remove it first:

{% code overflow="wrap" %}
```bash
 sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)
```
{% endcode %}

This command is safe if some packages are not installed.
{% endstep %}

{% step %}
### 2) Add Docker’s official apt repository

Install prerequisites:

```bash
sudo apt update
sudo apt install -y ca-certificates curl
```

Add the Docker GPG key:

{% code overflow="wrap" %}
```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
{% endcode %}

Add the repository:

{% code overflow="wrap" %}
```bash
# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
```
{% endcode %}
{% endstep %}

{% step %}
### 3) Install Docker Engine + Compose plugin

Install Docker and the Compose plugin:

{% code overflow="wrap" %}
```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
{% endcode %}

Start Docker on boot:

```bash
sudo systemctl enable --now docker
```
{% endstep %}

{% step %}
### 4) Verify the installation

These commands should run without errors:

```bash
docker --version
docker compose version
sudo docker run --rm hello-world
docker ps
```
{% endstep %}

{% step %}
### 5) (Optional) Run Docker without sudo

Add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

Then **log out and back in**, or run:

```bash
newgrp docker
```

Now this should work without `sudo`:

```bash
docker ps
```

{% hint style="danger" %}
The `docker` group has root-equivalent access on the host.\
This is expected for typical Overleaf installs, and especially relevant if you enable Sandboxed Compiles.
{% endhint %}
{% endstep %}
{% endstepper %}

### Next step

Once Docker is working, continue with the Toolkit installation steps in [Using the Toolkit](../../installation/using-the-toolkit/).
