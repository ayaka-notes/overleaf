---
icon: git-alt
---

# Git integration

The Git integration is available for Overleaf CEP

{% stepper %}
{% step %}
### Enable the git-bridge (Toolkit)

If you’re using the Toolkit, enable the `git-bridge` by setting the following in your `config/overleaf.rc`:

{% code title="config/overleaf.rc" %}
```
GIT_BRIDGE_ENABLED=true
```
{% endcode %}
{% endstep %}

{% step %}
### Add the git-bridge container (docker-compose)

For users running a custom `docker-compose.yml`, add the following container configuration to your compose file:

{% code title="docker-compose.yml (git-bridge service)" %}
```yaml
git-bridge:
    restart: always
    image: quay.io/sharelatex/git-bridge:4.0.0 # tag should match the `sharelatex` container tag
    volumes:
        - ~/git_bridge_data:/data/git-bridge
    container_name: git-bridge
    expose:
        - "8000"
    environment:
        GIT_BRIDGE_API_BASE_URL: "http://sharelatex:3000/api/v0/" # "http://sharelatex/api/v0/" for version 4.1.6 and earlier
        GIT_BRIDGE_OAUTH2_SERVER: "http://sharelatex"
        GIT_BRIDGE_POSTBACK_BASE_URL: "http://git-bridge:8000"
        GIT_BRIDGE_ROOT_DIR: "/data/git-bridge"
    user: root
    command: ["/server-pro-start.sh"]
```
{% endcode %}
{% endstep %}

{% step %}
### Update the sharelatex container configuration

You’ll also need to link the `git-bridge` container in the `sharelatex` container and define the following environment variables, please pay attention to `V2_HISTORY_URL`:

<pre class="language-yaml" data-title="docker-compose.yml (sharelatex service)"><code class="lang-yaml">sharelatex:
    links:
        - git-bridge
    environment:
         GIT_BRIDGE_ENABLED: true
         GIT_BRIDGE_HOST: "git-bridge"
         GIT_BRIDGE_PORT: "8000"
<strong>         V2_HISTORY_URL: "http://sharelatex:3054"
</strong></code></pre>
{% endstep %}

{% step %}
### Authentication

When authenticating a git client, users need a Personal Access Token. Users can manage Personal Access Tokens through the application UI (see the documentation):

<figure><img src="../../.gitbook/assets/image (3) (1).png" alt=""><figcaption><p>Git Intergration Personal Access Token</p></figcaption></figure>
{% endstep %}

{% step %}
### Monitoring and resource considerations

We recommend you monitor your host resources after enabling the `git-bridge`. The load increase will depend on:

* the number of users accessing the feature
* the types of projects hosted in your instance (larger projects are generally more resource intensive)
{% endstep %}
{% endstepper %}

### Swapping projects to S3

The Git integration stores a complete git repository on disk for each project that gets cloned by a user. If you have limited disk space, you can activate a swap job that will move repositories that are less used to AWS S3. If a swapped repository is needed again, it gets moved back to the disk. The following environment variables control the swap job:







