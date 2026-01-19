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

{% stepper %}
{% step %}
### 1) Remove old/conflicting packages (if present)

If Docker was previously installed from another source, remove it first:

{% code overflow="wrap" %}
```bash
sudo apt-get remove -y docker.io docker-doc docker-compose podman-docker containerd runc
```
{% endcode %}

This command is safe if some packages are not installed.
{% endstep %}

{% step %}
### 2) Add Docker’s official apt repository

Install prerequisites:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
```

Add the Docker GPG key:

{% code overflow="wrap" %}
```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```
{% endcode %}

Add the repository:

{% code overflow="wrap" %}
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo ${VERSION_CODENAME}) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
```
{% endcode %}
{% endstep %}

{% step %}
### 3) Install Docker Engine + Compose plugin

Install Docker and the Compose plugin:

{% code overflow="wrap" %}
```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
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
