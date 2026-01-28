---
icon: box-archive
---

# Setup Sandbox Compiles

There are a little difference between development and production environment, if you want to setup sandbox compile for dev. There are 3 things you need to mind:

* File Permission Problem
* Volume Share Between history-v1 and filestore
* Subdirectories Problem

### Enable Sandbox Compiles

Here, we just need to enable Sandbox Compiles like what we do in overleaf ce. However, we only need to mind the user. Here we set it to root.

In production environment, we use www-data as a shared user between overleaf container and tex compile container. However, in dev env, node is the default user in container. And there's no www-data user to hook this. So we just use root as a workaround.

{% hint style="warning" %}
Please don't use your self-built image, you may encounter a series of errors.
{% endhint %}

<pre class="language-dotenv" data-overflow="wrap"><code class="lang-dotenv">#################
#   Sandbox     #
#################
SANDBOXED_COMPILES=true
<strong>TEXLIVE_IMAGE_USER=root
</strong>ALL_TEX_LIVE_DOCKER_IMAGES=ghcr.io/ayaka-notes/texlive-full:2025.1, ghcr.io/ayaka-notes/texlive-full:2024.1
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=Texlive 2025, Texlive 2024
TEX_LIVE_DOCKER_IMAGE=ghcr.io/ayaka-notes/texlive-full:2025.1
</code></pre>

### Fix File Permissions

LaTeX runs in the sibling containers as the user specified in the `TEXLIVE_IMAGE_USER` environment variable. In the example above this is set to `root`, which has uid `0`. This creates a problem with the above permissions, as the root user does not have permission to write to subfolders of `compiles`.

A quick fix is to give the `root` group ownership and read write permissions to `compiles`, with `setgid` set so that new subfolders also inherit this ownership:

{% code title="bash" %}
```bash
sudo chown -R 1000:root compiles
sudo chmod -R g+w compiles
sudo chmod g+s compiles
```
{% endcode %}

For detailed document, you can see `services/clsi/README.md`.

### Volume Share Between history-v1 and filestore

By default, filestore act as a bridge between s3 and other services in overleaf. However, in overleaf ce or server pro, all files are stored locally by default. So, overleaf introduced a very tricky method.

{% code title="server-ce/config/settings.js" overflow="wrap" %}
```javascript
switch (process.env.OVERLEAF_FILESTORE_BACKEND) {
  case 's3':
    // s3 case...
  default:
    settings.filestore = {
      backend: 'fs',
      stores: {
        template_files: Path.join(DATA_DIR, 'template_files'),

        // NOTE: The below paths are hard-coded in server-ce/config/production.json, so hard code them here as well.
        // We can use DATA_DIR after switching history-v1 from 'config' to '@overleaf/settings'.
        project_blobs:
          process.env.OVERLEAF_HISTORY_PROJECT_BLOBS_BUCKET ||
          '/var/lib/overleaf/data/history/overleaf-project-blobs',
        global_blobs:
          process.env.OVERLEAF_HISTORY_BLOBS_BUCKET ||
          '/var/lib/overleaf/data/history/overleaf-global-blobs',
      },
    }
}
```
{% endcode %}

And in the meantime, `data/history` is also used by history service. In this way, they can share the same data between different micro service. You need to add this volume `history-v1-buckets` to your filestore service in develop. Otherwise, **clsi will not be able to pull blob files from filestore service**.

<pre class="language-yml" data-title="develop/docker-compose.yml" data-overflow="wrap"><code class="lang-yml">  filestore:
    build:
      context: ..
      dockerfile: services/filestore/Dockerfile
    env_file:
      - dev.env
#    environment:
#      - ENABLE_CONVERSIONS=true
    volumes:
      - filestore-public-files:/overleaf/services/filestore/public_files
      - filestore-template-files:/overleaf/services/filestore/template_files
      - filestore-uploads:/overleaf/services/filestore/uploads
<strong>      - history-v1-buckets:/buckets
</strong>
</code></pre>

Also you need to add BUCKET name to `dev.env` settings:

{% code title="develop/dev.env" %}
```dotenv
OVERLEAF_EDITOR_PROJECT_BLOBS_BUCKET='/buckets/project_blobs'
OVERLEAF_EDITOR_BLOBS_BUCKET='/buckets/blobs'
```
{% endcode %}

### Use Subdirectories

Filestore use useSubdirectories as true by default, however, in development, history v1 will **flatten all the data.** This cause some conflict. To fix this, you need add the following:&#x20;

<pre class="language-dotenv" data-title="develop/dev.env"><code class="lang-dotenv">OVERLEAF_EDITOR_PROJECT_BLOBS_BUCKET='/buckets/project_blobs'
OVERLEAF_EDITOR_BLOBS_BUCKET='/buckets/blobs'
<strong>NODE_CONFIG='{"persistor":{"useSubdirectories":true}}'
</strong></code></pre>

In history v1, all `project_blobs` files are stored like this originally:

{% code overflow="wrap" %}
```bash
node@43eb5dac5b1b:/buckets/project_blobs$ ls
169_609_71360f687c431b9796_5b_889ef3cf71c83a4c027c4e4dc3d1a106b27809  
94e_655_88cb5cc77ab70c9796_a0_e21c740cf81e868f158e30e88985b5ea1d6c19
169_609_71360f687c431b9796_a0_e21c740cf81e868f158e30e88985b5ea1d6c19
94e_655_88cb5cc77ab70c9796_fd_3c0326302e49486d3ea86c833edf9b88320c41
169_609_71360f687c431b9796_fd_3c0326302e49486d3ea86c833edf9b88320c41 

```
{% endcode %}

You need to set useSubdirectories to `true` to change it use subdir mode. Now, orignal `_`  in blob will be substitute as `/` .
