---
icon: git-alt
---

# Git integration





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

You’ll also need to link the `git-bridge` container in the `sharelatex` container and define the following environment variables:

{% code title="docker-compose.yml (sharelatex service)" %}
```yaml
sharelatex:
    links:
        - git-bridge
    environment:
         GIT_BRIDGE_ENABLED: true
         GIT_BRIDGE_HOST: "git-bridge"
         GIT_BRIDGE_PORT: "8000"
         V2_HISTORY_URL: "http://sharelatex:3054"
```
{% endcode %}
{% endstep %}

{% step %}
### Authentication

When authenticating a git client, users need a Personal Access Token. Users can manage Personal Access Tokens through the application UI (see the documentation):

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption><p>Git Intergration Personal Access Token</p></figcaption></figure>
{% endstep %}

{% step %}
### Monitoring and resource considerations

We recommend you monitor your host resources after enabling the `git-bridge`. The load increase will depend on:

* the number of users accessing the feature
* the types of projects hosted in your instance (larger projects are generally more resource intensive).
{% endstep %}
{% endstepper %}

### Swapping projects to S3

(Original reference: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/git-integration#swapping-projects-to-s3)

The Git integration stores a complete git repository on disk for each project that gets cloned by a user. If disk space is limited, you can activate a swap job that moves less-used repositories to AWS S3. When a swapped repository is needed again, it is moved back to disk.

The following environment variables control the swap job:

* GIT\_BRIDGE\_SWAPSTORE\_TYPE\
  Set this to "s3" to activate the swap job.
* GIT\_BRIDGE\_SWAPSTORE\_AWS\_ACCESS\_KEY\
  Your AWS access key
* GIT\_BRIDGE\_SWAPSTORE\_AWS\_SECRET\
  Your AWS secret
* GIT\_BRIDGE\_SWAPSTORE\_S3\_BUCKET\_NAME\
  This bucket will contain the zipped git repositories
* GIT\_BRIDGE\_SWAPSTORE\_AWS\_REGION\
  The bucket’s region
* GIT\_BRIDGE\_SWAPJOB\_MIN\_PROJECTS\
  How many projects to keep on disk, at a minimum.
  * Default: 50
* GIT\_BRIDGE\_SWAPJOB\_LOW\_GIB\
  Low watermark for swapping. The swap job will move projects until disk usage is below this value.
  * Default: 128 GB
* GIT\_BRIDGE\_SWAPJOB\_HIGH\_GIB\
  High watermark for swapping. The swap job will start swapping when disk usage reaches this value.
  * Default: 256 GB
* GIT\_BRIDGE\_SWAPJOB\_INTERVAL\_MILLIS\
  The amount of time between checking disk usage and running the swap job.
  * Default: 3600000 ms = 1 hour

***

Last updated 1 year ago

User documentation for the git integration: https://www.overleaf.com/learn/how-to/Using\_Git\_and\_GitHub#The\_Overleaf\_Git-Bridge

Privacy policy: https://www.overleaf.com/legal
