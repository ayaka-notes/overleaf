# Air-gapped/offline deployments

Overleaf Community Edition and Server Pro are designed to work offline. If your air-gapped environment cannot reach quay.io to pull the required images (sharelatex, sharelatex-pro and TeX Live images), use Docker's export/import tooling to transfer images from a connected machine to the offline server.

{% stepper %}
{% step %}
### 1. Pull required images on a machine with internet access

Pull the required images (ensure tags are correct — e.g., git-bridge tag must match sharelatex-pro). Also pull any TeX Live images required for Sandboxed Compiles (see the TeX Live images list):

{% code title="Commands to run on the internet-connected machine" %}
```
```
{% endcode %}

See the TeX Live images here: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles#available-tex-live-images

And Sandboxed Compiles here: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles
{% endstep %}

{% step %}
### 2. Export each pulled image to a .tar file

For each pulled image, export it with docker save. Example:

```
```

Repeat for each image you pulled.
{% endstep %}

{% step %}
### 3. Transfer the .tar files to the air-gapped server

Use your preferred transfer method (portable device, SCP, rsync, etc.) to move the .tar files to the offline server.
{% endstep %}

{% step %}
### 4. Import the images on the air-gapped server

For each .tar file on the offline server, load the image into Docker:

```
```

Repeat for each .tar file.
{% endstep %}

{% step %}
### 5. Verify the images are available

Confirm the images were loaded successfully:

```
```
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
By default, running the Toolkit's bin/up will attempt to pull each TeX Live image defined by ALL\_TEX\_LIVE\_DOCKER\_IMAGES in config/variables.env. In an air-gapped deployment this will fail. To prevent automatic pulls, set the following in config/overleaf.rc:

SIBLING\_CONTAINERS\_PULL=false
{% endhint %}
