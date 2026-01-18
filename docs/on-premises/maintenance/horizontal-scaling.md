---
icon: distribute-spacing-horizontal
---

# Horizontal scaling

Starting with version 3.5.6 Server Pro supports horizontal scaling.

This document lists the technical requirements and provides guidelines for running Server Pro in more than one node.

{% hint style="danger" %}
Starting with Server CE/Server Pro `5.0.3` environment variables have been rebranded from `SHARELATEX_*` to `OVERLEAF_*`.

If you're using a `4.x` version (or earlier) please make sure the variables are prefix accordingly (e.g. `SHARELATEX_SITE_URL` instead of `OVERLEAF_SITE_URL`)
{% endhint %}

Setting up horizontal scaling requires a significant amount of effort. We advise considering horizontal scaling **only** when reaching a certain scale. As an example, a Server Pro installation for 1,000 total users has been set up successfully using a single server provisioned with two 4-core processors and 32GB of system memory. See the [hardware requirements](../getting-started/requirements/hardware-requirements.md) documentation for recommendations.

A deployment of Server Pro with horizontal scaling involves a set of external components, such as a Load Balancer and an S3-compatible storage backend.

We can help troubleshoot errors in the Server Pro containers that might be the result of misconfiguration and provide general advice based on this document. Unfortunately, we are unable to provide assistance configuring third-party applications/systems.

Resolving technical issues specific to your hardware/software to provide the external components are not covered by our support terms.

### Requirements

#### External, central data storage

The data storage in Server Pro can be split into four data stores:

*   **MongoDB**

    * Most of the data is persisted into MongoDB.
    * We support either a local instance or an external instance, such as [MongoDB](https://www.mongodb.com/atlas) Atlas (a fully managed MongoDB service that runs within the AWS infrastructure).<br>

    **Note:** Unfortunately, there is no official support for MongoDB compatible databases such as CosmoDB/DocumentDB at the moment, as we have not tested Server Pro with them. While deploying Server Pro with compatible databases **may** be possible, we only officially support deployments using MongoDB.<br>
*   **Redis**

    * Redis stores temporary data, such as pending document updates before they are flushed to MongoDB.
    * Redis is used for communicating document updates between different services and notifying the editor about state changes in a given project.
    * Redis is used for storing the user sessions.
    * We support either a local instance or an external instance.<br>

    **Note:** Unfortunately, there is no official support for Redis compatible key/values stores such as KeyDB/Valkey at the moment, as we have not tested Server Pro with them. While deploying Server Pro with compatible stores **may** be possible, we only officially support deployments using Redis.<br>
*   **Project files and History files**

    *   Non-editable project files are stored outside of MongoDB.

        The new project history system (Server Pro 3.5 onwards) stores the history outside MongoDB as well.
    * For small single instances we support either a local file system (which could be backed by a local SSD, NFS or EBS) or a [S3 compatible data storage system](../s3.md).
    * For horizontal scaling, we **only** support S3 compatible data storage systems.<br>

    **Important:** NFS/Amazon EFS/Amazon EBS are **not** supported for horizontal scaling. Please see the [hardware storage](../getting-started/requirements/hardware-requirements.md#storage) requirements section on scaling storage in Server Pro for more details.
* **Ephemeral files**
  * LaTeX compiles need to run on fast, local disks for optimal performance. The output of the compilation does not need to persisted or backed up.
  * Buffering of new file uploads and the creation of project zip files also benefits from using a local disk.

{% hint style="danger" %}
We strongly advise on using a local disk. Using any kind of networked disk (such as NFS or EBS) can result in unexpected compile errors and other performance issues.
{% endhint %}

#### **Git-bridge**

{% hint style="info" %}
Git-bridge is available in Server Pro starting with version 4.0.1.
{% endhint %}

The git-repositories are stored locally on disk. There are no replication options available. Git-bridge should be run as a **singleton**. For optimal performance, we advise on using a local disk for git-bridge data. The git-bridge data disk should be backed up regularly.

For the data storage with horizontal scaling, you need:

* a central MongoDB instance that is accessible from all Server Pro instances
* a central Redis instance that is accessible from all Server Pro instances
* a central S3 compatible storage backend for project and history files
* a local disk on each instance for ephemeral files
* a local disk on the instance that hosts the git-bridge container for git-bridge data

#### Load balancer requirements

*   **Persistent routing**, e.g. using a cookie

    This requirement stems from these components:

    * The real-time editing capability in Server Pro uses WebSockets with a fallback to XHR polling. Each editing session has local state on the server side and the requests of a given editing session always need to be routed to the same Server Pro instance. The collaboration feature uses Redis [Pub/Sub](https://redis.io/docs/latest/develop/interact/pubsub/) for sharing updates between multiple Server Pro instances.
    * The LaTeX compilation keeps the output and compile cache locally for optional performance. Upon issuing a compile request to one Server Pro instance, the following PDF/log download requests need to be routed to the same Server Pro instance.
* **Long request timeouts** to support the compilation of large LaTeX documents
* **WebSocket support** for optimal performance
* **POST payload size of 50MB**
*   **Keep-alive timeout** must be lower than the Server Pro keep-alive timeout

    The keep-alive timeout inServer Pro can be configured using the environment variable `NGINX_KEEPALIVE_TIMEOUT`. The default value is 65s.

    With the default, a keep-alive timeout of 60s in the load balancer works.

    With `NGINX_KEEPALIVE_TIMEOUT=120`, the load balancer could pick 115s.
*   **Client IPs**

    Set the request header `X-Forwarded-For` to the client IP.
*   When **terminating SSL**

    The load balancer needs to add the request header `X-Forwarded-Proto: https`.

<details>

<summary>Sample HAProxy configuration</summary>

```
global
  group haproxy
  user haproxy

  # Verbose logging
  log stdout format raw local0 debug

defaults
  mode                    http
  option                  httpchk HEAD /status
  http-check              expect status 200
  default-server          check

  # Verbose logging
  log                     global
  option                  httplog

  # Reroute to a different backend if the sticky one is down
  option                  redispatch 1
  # These retries are for TCP connect errors, not on HTTP status 500 responses
  retries                 3

  # Sticky session for 24h of inactivity -- compile output is deleted after 24h
  cookie                  server-pro-ha insert maxidle 24h

  # Try to connect to any backend for 1min, then return 503
  timeout queue           1m
  # Give Server Pro instances 15s to startup
  timeout connect         15s

  # Abort requests from very slow clients (allow 1min of inactivity when reading a request)
  timeout client          1m

  # Allow slow compiles -- hard-coded limit in clsi is 10min
  timeout server          10m

  # Disconnect the editor after 23h -- 1h ahead of their last use yesterday
  timeout tunnel          23h

  # Note: The keepalive behavior in haproxy works great with the default keepalive setup in Server Pro.
  #       Haproxy is cleaning up connections in the background and it will redispatch requests when needed.

listen server-pro-ha-http
  bind :80
  http-request redirect scheme https unless { ssl_fc }

listen server-pro-ha-https
  bind :443 ssl crt /etc/ssl/certs/ssl-key-and-certificate-bundle.pem

  # Tell the application that we are behind https
  http-request set-header X-Forwarded-Proto https

  # Tell the application the actual client ip
  option forwardfor

  # See https://hstspreload.org/#deployment-recommendations
  http-response set-header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload;"

  # Route git traffic to the sibling container of the git-bridge
  use-server server-pro-ha-1 if { path_beg /git/ }

  # Debugging
  http-response add-header X-Served-By %s
  stats enable
  stats uri /haproxy

  server server-pro-ha-1 198.18.1.1:80 cookie server-pro-ha-1
  server server-pro-ha-2 198.18.1.2:80 cookie server-pro-ha-2
  server server-pro-ha-3 198.18.1.3:80 cookie server-pro-ha-3
```

</details>

#### Server Pro configuration

**Secrets**

The Server Pro instances need to agree on shared secrets:

* `WEB_API_PASSWORD` (web api auth)
* `STAGING_PASSWORD` and `V1_HISTORY_PASSWORD` same value (history auth)
* `CRYPTO_RANDOM` (for session cookie)
* `OT_JWT_AUTH_KEY` (history auth)

All of these secrets need to be configured with their own unique value and shared between the instances.

When not configured and user requests get routed to different Server Pro instances, their request will fail authentication checks and they either get redirect to the login page frequently or their actions in the UI will fail in unexpected ways.

When not configured, Server Pro uses a new random value for each secret based on 32 random bytes from `/dev/urandom` (256 random bits).

{% code overflow="wrap" %}
```bash
# https://github.com/overleaf/overleaf/blob/45ca0f796c679103efd305ddbef28073c4a5de32/server-ce/init_scripts/00_regen_sharelatex_secrets.sh#L14
dd if=/dev/urandom bs=1 count=32 2>/dev/null | base64 -w 0 | rev | cut -b 2- | rev | tr -d '\n+/'
```
{% endcode %}

**MongoDB**

Point `OVERLEAF_MONGO_URL` (`SHARELATEX_MONGO_URL` for versions `4.x` and earlier) at the central MongoDB instance.

**Redis**

Point `OVERLEAF_REDIS_HOST` (`SHARELATEX_REDIS_HOST` for versions `4.x` and earlier) and `REDIS_HOST` at the central Redis instance.

**S3 compatible storage for project and history files**

Please see the documentation on [S3 compatible storage](../s3.md) for details.

**Ephemeral files**

The default bind-mount of a local SSD to `/var/lib/overleaf` (`/var/lib/sharelatex` for versions `4.x` and earlier) will be sufficient. Be sure to point `SANDBOXED_COMPILES_HOST_DIR` at the mount point on the host.

{% hint style="danger" %}
We strongly advise using a local disk. Using any kind of networked disk (such as NFS or EBS) can result in unexpected compile errors and other performance issues.
{% endhint %}

**Proxy configuration**

* Set `OVERLEAF_BEHIND_PROXY=true` (`SHARELATEX_BEHIND_PROXY` for versions `4.x` and earlier) for accurate client IPs.
* Set `TRUSTED_PROXY_IPS` to the IP of the load balancer (Multiple CIDRs can be specified, separated with a comma).

**Git-bridge integration**

{% hint style="info" %}
Git-bridge is available in Server Pro starting with version 4.0.1.
{% endhint %}

The git-bridge container needs a sibling Server Pro container for handling incoming git requests. This sibling container can serve regular user traffic as well. In the sample configuration, the first instance acts as sibling container for git-bridge, but any instance could function as that really.

Why do we need to designate one Server Pro container as sibling for git-bridge? Server Pro hands out download URLs for the history service to git-bridge. We need to configure these history URLs to be accessible from the git-bridge container.

Server Pro container config:

* Set `GIT_BRIDGE_ENABLED` to `'true'`
* Set `GIT_BRIDGE_HOST` to `<git-bridge container name>` e.g. `git-bridge`
* Set `GIT_BRIDGE_PORT` to `8000`
*   Set `V1_HISTORY_URL` to `http://<server-pro sibling container name>:3100/api`.

    Note: This is only necessary on the sibling container for the git-bridge container. The other instances can use a localhost URL, which is the default.

git-bridge container config:

* Set `GIT_BRIDGE_API_BASE_URL` to `http://<server-pro sibling container name>/api/v0`, e.g. `http://server-pro-ha-1/api/v0`
* Set `GIT_BRIDGE_OAUTH2_SERVER` to `http://<server-pro sibling container name>`, e.g. `http://server-pro-ha-1`
* Set `GIT_BRIDGE_POSTBACK_BASE_URL` to `http://<git-bridge container name>:8000`, e.g. `http://git-bridge:8000`
* Set `GIT_BRIDGE_ROOT_DIR` to the bind-mounted git-bridge data disk, e.g. `/data/git-bridge`

<details>

<summary>Sample docker-compose.yml configuration</summary>

The following configuration is showing a self-contained setup. For the demo to work, you need to provide a valid SSL key/certificate and adjust the `OVERLEAF_SITE_URL` (`SHARELATEX_SITE_URL` for versions `4.x` and earlier). For an actual setup, you must replace the dummy secrets with actual secrets as noted inline. For an actual setup, you need to move the individual containers onto dedicates nodes and adjust the IP addresses to your local network setup.

```yaml
version: '2.2'

# Actual horizontal scaling setup: pick your own network and replace IPs in config.
networks:
    default:
        ipam:
            config:
                # This subnet is part of a reserved subnet used for benchmarking
                # https://tools.ietf.org/html/rfc2544
                # The full subnet is 198.18.0.0/15
                # Use 198.18.0.0/24 for lb and dbs
                # Use 198.18.1.0/24 for server-pro
                # Use 198.18.0.128/25 for ephemeral container
                - gateway: 198.18.0.1
                  ip_range: 198.18.0.128/25
                  subnet: 198.18.0.0/23

services:
    # Actual horizontal scaling setup: run haproxy outside docker on a separate host.
    lb:
        image: haproxy:2.6
        container_name: lb
        user: root
        logging:
            driver: local
            options:
                max-size: 10g
                max-file: '100'
        volumes:
            - ./haproxy.conf:/usr/local/etc/haproxy/haproxy.cfg
            # $ cat certificate.pem key.pem > ssl-key-and-certificate-bundle.pem
            - /path/to/ssl-key-and-certificate-bundle.pem:/etc/ssl/certs/ssl-key-and-certificate-bundle.pem
        # Alternative to "ports": use host network to avoid docker-proxy overhead
        network_mode: host

        # Alternative to "network_mode: host": use docker-proxy for network isolation
        # ports:
        #     - "80:80"
        #     - "443:443"
        # networks:
        #     default:
        #         ipv4_address: 198.18.0.2

        # Actual horizontal scaling setup: remove these as they run on other hosts.
        depends_on:
            server-pro-ha-1:
                condition: service_started
            server-pro-ha-2:
                condition: service_started
            server-pro-ha-3:
                condition: service_started

    # Actual horizontal scaling setup: run this container next to server-pro-ha-1.
    # For Server Pro 4.0 onwards.
    git-bridge:
        restart: always
        # The tag should match the `server-pro-ha-1` container tag.
        image: quay.io/sharelatex/git-bridge:4.0.1
        volumes:
            # Actual horizontal scaling setup: point /data/git-bridge at a dedicated local ssd.
            - ~/git_bridge_data:/data/git-bridge
        container_name: git-bridge
        environment:
            GIT_BRIDGE_API_BASE_URL: "http://server-pro-ha-1/api/v0"
            GIT_BRIDGE_OAUTH2_SERVER: "http://server-pro-ha-1"
            GIT_BRIDGE_POSTBACK_BASE_URL: "http://198.18.0.6:8000"
            GIT_BRIDGE_ROOT_DIR: "/data/git-bridge"
        user: root
        command: ["/server-pro-start.sh"]

        # Actual horizontal scaling setup: run on host 198.18.0.6 and expose port
        # ports:
        #     - "8000:8000"
        networks:
            default:
                ipv4_address: 198.18.0.6

    # Actual horizontal scaling setup: run this container on a separate host.
    server-pro-ha-1: &server-pro-ha-config
        restart: always
        image: quay.io/sharelatex/sharelatex-pro:4.0.1
        container_name: server-pro-ha-1
        hostname: server-pro-ha-1
        depends_on:
            # Actual horizontal scaling setup: keep this entry.
            git-bridge:
                condition: service_started

            # Actual horizontal scaling setup: remove the ones below as they run on other hosts.
            mongo:
                condition: service_healthy
            redis:
                condition: service_started
            minio:
                condition: service_started
            mongo_replica_set_setup:
                condition: service_completed_successfully
            minio_setup:
                condition: service_completed_successfully
        stop_grace_period: 60s
        volumes:
            - /tmp/scratch-disk1:/var/lib/sharelatex
            - /var/run/docker.sock:/var/run/docker.sock
        environment: &server-pro-ha-environment
            # Actual horizontal scaling setup: provide your own domain/app name.
            OVERLEAF_SITE_URL: 'https://overleaf.example.com'
            OVERLEAF_APP_NAME: Server Pro Horizontal Scaling Demo

            OVERLEAF_MONGO_URL: mongodb://198.18.0.3/sharelatex
            OVERLEAF_REDIS_HOST: 198.18.0.4
            REDIS_HOST: 198.18.0.4

            ENABLED_LINKED_FILE_TYPES: 'project_file,project_output_file'
            EMAIL_CONFIRMATION_DISABLED: 'true'

            SANDBOXED_COMPILES: 'true'
            SANDBOXED_COMPILES_SIBLING_CONTAINERS: 'true'
            SANDBOXED_COMPILES_HOST_DIR: '/tmp/scratch-disk1/data/compiles'

            # S3
            # Actual horizontal scaling setup: pick secure credentials.
            OVERLEAF_FILESTORE_BACKEND: s3
            OVERLEAF_FILESTORE_USER_FILES_BUCKET_NAME: overleaf-user-files
            OVERLEAF_FILESTORE_TEMPLATE_FILES_BUCKET_NAME: overleaf-template-files
            OVERLEAF_FILESTORE_S3_ACCESS_KEY_ID: OVERLEAF_FILESTORE_S3_ACCESS_KEY_ID
            OVERLEAF_FILESTORE_S3_SECRET_ACCESS_KEY: OVERLEAF_FILESTORE_S3_SECRET_ACCESS_KEY
            OVERLEAF_FILESTORE_S3_ENDPOINT: http://198.18.0.5:9000
            OVERLEAF_FILESTORE_S3_PATH_STYLE: 'true'
            OVERLEAF_FILESTORE_S3_REGION: ''

            OVERLEAF_HISTORY_BACKEND: "s3"
            OVERLEAF_HISTORY_PROJECT_BLOBS_BUCKET: "overleaf-project-blobs"
            OVERLEAF_HISTORY_CHUNKS_BUCKET: "overleaf-chunks"
            OVERLEAF_HISTORY_S3_ACCESS_KEY_ID: "OVERLEAF_HISTORY_S3_ACCESS_KEY_ID"
            OVERLEAF_HISTORY_S3_SECRET_ACCESS_KEY: "OVERLEAF_HISTORY_S3_SECRET_ACCESS_KEY"
            OVERLEAF_HISTORY_S3_ENDPOINT: http://198.18.0.5:9000
            OVERLEAF_HISTORY_S3_PATH_STYLE: 'true'
            OVERLEAF_HISTORY_S3_REGION: ''
            # /S3

            # git-bridge
            GIT_BRIDGE_ENABLED: 'true'
            GIT_BRIDGE_HOST: 198.18.0.6
            GIT_BRIDGE_PORT: 8000
            # Only needed on the sibling instance of git-bridge
            V1_HISTORY_URL: "http://server-pro-ha-1:3100/api"
            # /git-bridge

            # Horizontal scaling
            # Actual horizontal scaling setup: pick secure credentials.
            WEB_API_PASSWORD: WEB_API_PASSWORD
            STAGING_PASSWORD: V1_HISTORY_PASSWORD
            V1_HISTORY_PASSWORD: V1_HISTORY_PASSWORD
            CRYPTO_RANDOM: CRYPTO_RANDOM
            OT_JWT_AUTH_KEY: OT_JWT_AUTH_KEY
            OVERLEAF_BEHIND_PROXY: 'true'
            # Actual horizontal scaling setup: IPs of load balancers
            TRUSTED_PROXY_IPS: 198.18.0.1,198.18.0.2
            # /Horizontal scaling

        # Actual horizontal scaling setup: run on host 198.18.1.1 and expose ports
        # ports:
        #     - "80:80"
        networks:
            default:
                ipv4_address: 198.18.1.1

    # Actual horizontal scaling setup: run this container on a separate host.
    server-pro-ha-2:
        <<: *server-pro-ha-config
        hostname: server-pro-ha-2
        container_name: server-pro-ha-2
        volumes:
            - /tmp/scratch-disk2:/var/lib/sharelatex
            - /var/run/docker.sock:/var/run/docker.sock
        environment:
            <<: *server-pro-ha-environment
            SANDBOXED_COMPILES_HOST_DIR: '/tmp/scratch-disk2/data/compiles'
            V1_HISTORY_URL: "http://localhost:3100/api"

        # Actual horizontal scaling setup: run on host 198.18.1.2 and expose ports
        # ports:
        #     - "80:80"
        networks:
            default:
                ipv4_address: 198.18.1.2

    # Actual horizontal scaling setup: run this container on a separate host.
    server-pro-ha-3:
        <<: *server-pro-ha-config
        hostname: server-pro-ha-3
        container_name: server-pro-ha-3
        volumes:
            - /tmp/scratch-disk3:/var/lib/sharelatex
            - /var/run/docker.sock:/var/run/docker.sock
        environment:
            <<: *server-pro-ha-environment
            SANDBOXED_COMPILES_HOST_DIR: '/tmp/scratch-disk3/data/compiles'
            V1_HISTORY_URL: "http://localhost:3100/api"

        # Actual horizontal scaling setup: run on host 198.18.1.3 and expose ports
        # ports:
        #     - "80:80"
        networks:
            default:
                ipv4_address: 198.18.1.3

    # Actual horizontal scaling setup: run this container on a separate host.
    minio:
        image: minio/minio:RELEASE.2023-05-18T00-05-36Z
        container_name: minio
        command: server /data
        volumes:
            # Actual horizontal scaling setup: run minio with multiple disks, see minio docs.
            - ~/minio_data:/data
        environment:
            # Actual horizontal scaling setup: pick secure credentials.
            MINIO_ROOT_USER: MINIO_ROOT_USER
            MINIO_ROOT_PASSWORD: MINIO_ROOT_PASSWORD

        # Actual horizontal scaling setup: run on host 198.18.0.5 and expose port
        # ports:
        #     - "9000:9000"
        networks:
            default:
                ipv4_address: 198.18.0.5

    # Actual horizontal scaling setup: run this setup once on a separate host.
    minio_setup:
        depends_on:
            - minio
        image: minio/mc:RELEASE.2023-05-18T16-59-00Z
        entrypoint: sh
        command:
            - '-c'
            # Actual horizontal scaling setup: pick secure credentials.
            - |
                mc alias set s3 http://198.18.0.5:9000 MINIO_ROOT_USER MINIO_ROOT_PASSWORD \
                || sleep 10 && \
                mc alias set s3 http://198.18.0.5:9000 MINIO_ROOT_USER MINIO_ROOT_PASSWORD \
                || sleep 10 && \
                mc alias set s3 http://198.18.0.5:9000 MINIO_ROOT_USER MINIO_ROOT_PASSWORD \
                || sleep 10 && \
                mc alias set s3 http://198.18.0.5:9000 MINIO_ROOT_USER MINIO_ROOT_PASSWORD

                mc mb --ignore-existing s3/overleaf-user-files
                mc mb --ignore-existing s3/overleaf-template-files
                mc admin user add s3 \
                  OVERLEAF_FILESTORE_S3_ACCESS_KEY_ID \
                  OVERLEAF_FILESTORE_S3_SECRET_ACCESS_KEY

                mc mb --ignore-existing s3/overleaf-project-blobs
                mc mb --ignore-existing s3/overleaf-chunks
                mc admin user add s3 \
                  OVERLEAF_HISTORY_S3_ACCESS_KEY_ID \
                  OVERLEAF_HISTORY_S3_SECRET_ACCESS_KEY

                echo '
                  {
                    "Version": "2012-10-17",
                    "Statement": [
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:ListBucket"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-user-files"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:PutObject",
                          "s3:GetObject",
                          "s3:DeleteObject"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-user-files/*"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:ListBucket"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-template-files"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:PutObject",
                          "s3:GetObject",
                          "s3:DeleteObject"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-template-files/*"
                      }
                    ]
                  }' > policy-filestore.json

                echo '
                  {
                    "Version": "2012-10-17",
                    "Statement": [
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:ListBucket"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-project-blobs"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:PutObject",
                          "s3:GetObject",
                          "s3:DeleteObject"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-project-blobs/*"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:ListBucket"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-chunks"
                      },
                      {
                        "Effect": "Allow",
                        "Action": [
                          "s3:PutObject",
                          "s3:GetObject",
                          "s3:DeleteObject"
                        ],
                        "Resource": "arn:aws:s3:::overleaf-chunks/*"
                      }
                    ]
                  }' > policy-history.json

                # Put the contents of the policy from the previous section in policy-filestore.json
                # Reminder: Replace the bucket names accordingly.
                mc admin policy create s3 overleaf-filestore policy-filestore.json
                mc admin policy attach s3 overleaf-filestore \
                  --user=OVERLEAF_FILESTORE_S3_ACCESS_KEY_ID || true

                mc admin policy create s3 overleaf-history policy-history.json
                mc admin policy attach s3 overleaf-history \
                  --user=OVERLEAF_HISTORY_S3_ACCESS_KEY_ID || true

    # Actual horizontal scaling setup: run this container on a separate host.
    mongo:
        restart: always
        image: mongo:4.4
        container_name: mongo
        command: "--replSet overleaf"
        expose:
            - 27017
        volumes:
            - ~/mongo_data:/data/db
        healthcheck:
            test: echo 'db.stats().ok' | mongo localhost:27017/test --quiet
            interval: 10s
            timeout: 10s
            retries: 5

        # Actual horizontal scaling setup: run on host 198.18.0.3 and expose port
        # ports:
        #     - "27017:27017"
        networks:
            default:
                ipv4_address: 198.18.0.3

    mongo_replica_set_setup:
        image: mongo:4.4
        entrypoint: sh
        depends_on:
            mongo:
                condition: service_healthy
        command:
            - '-c'
            - |
                mongo 198.18.0.3 --eval "rs.initiate({ _id: \"overleaf\", members: [ { _id: 0, host: \"198.18.0.3:27017\" } ] })"

    # Actual horizontal scaling setup: run this container on a separate host.
    redis:
        restart: always
        image: redis:6.2
        container_name: redis
        expose:
            - 6379
        volumes:
            - ~/redis_data:/data

        # Actual horizontal scaling setup: run on host 198.18.0.4 and expose port
        # ports:
        #     - "6379:6379"
        networks:
            default:
                ipv4_address: 198.18.0.4
```

</details>

#### Hardware

We recommend using the same hardware specifications for all the Server Pro instances that are taking part in horizontal scaling.

The general recommendations on [hardware specifications](../getting-started/requirements/hardware-requirements.md) for Server Pro instances apply.

#### Upgrading Server Pro

As part of the upgrade process, Server Pro automatically runs database migrations. These migrations are **not** designed to be run from multiple instances in parallel.

The migrations need to finish before the actual web application is started. You can either check the logs for an entry of `Finished migrations` or wait until the application accepts traffic.

The upgrade procedure looks like this:

1. Schedule a maintenance window
2. Stop all the instances of Server Pro
3. Take a consistent backup as described in the [documentation](data-and-backups/#performing-a-consistent-backup)
4. Start a single instance of Server Pro with the new version
5. Validate that the new instance is working as expected
6. Bring up the other instances with the new version
