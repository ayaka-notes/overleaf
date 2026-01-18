# Horizontal scaling

```bash
dd if=/dev/urandom bs=1 count=32 2>/dev/null | base64 -w 0 | rev | cut -b 2- | rev | tr -d '\n+/'
```

## MongoDB

Point `OVERLEAF_MONGO_URL` (`SHARELATEX_MONGO_URL` for versions `4.x` and earlier) at the central MongoDB instance.

## Redis

Point `OVERLEAF_REDIS_HOST` (`SHARELATEX_REDIS_HOST` for versions `4.x` and earlier) and `REDIS_HOST` at the central Redis instance.

## S3 compatible storage for project and history files

Please see the documentation on [S3 compatible storage](configuration/overleaf-toolkit/s3.md) for details.

## Ephemeral files

The default bind-mount of a local SSD to `/var/lib/overleaf` (`/var/lib/sharelatex` for versions `4.x` and earlier) will be sufficient. Be sure to point `SANDBOXED_COMPILES_HOST_DIR` at the mount point on the host.

{% hint style="warning" %}
We strongly advise using a local disk. Using any kind of networked disk (such as NFS or EBS) can result in unexpected compile errors and other performance issues.
{% endhint %}

## Proxy configuration

* Set `OVERLEAF_BEHIND_PROXY=true` (`SHARELATEX_BEHIND_PROXY` for versions `4.x` and earlier) for accurate client IPs.
* Set `TRUSTED_PROXY_IPS` to the IP of the load balancer (Multiple CIDRs can be specified, separated with a comma).

## Git-bridge integration

{% hint style="info" %}
Git-bridge is available in Server Pro starting with version 4.0.1.
{% endhint %}

The git-bridge container needs a sibling Server Pro container for handling incoming git requests. This sibling container can serve regular user traffic as well. In the sample configuration, the first instance acts as sibling container for git-bridge, but any instance could function as that.

Why designate one Server Pro container as sibling for git-bridge? Server Pro hands out download URLs for the history service to git-bridge. We need to configure these history URLs to be accessible from the git-bridge container.

Server Pro container config:

* Set `GIT_BRIDGE_ENABLED` to `'true'`
* Set `GIT_BRIDGE_HOST` to `<git-bridge container name>` e.g. `git-bridge`
* Set `GIT_BRIDGE_PORT` to `8000`
* Set `V1_HISTORY_URL` to `http://<server-pro sibling container name>:3100/api`

Note: This is only necessary on the sibling container for the git-bridge container. The other instances can use a localhost URL, which is the default.

git-bridge container config:

* Set `GIT_BRIDGE_API_BASE_URL` to `http://<server-pro sibling container name>/api/v0`, e.g. `http://server-pro-ha-1/api/v0`
* Set `GIT_BRIDGE_OAUTH2_SERVER` to `http://<server-pro sibling container name>`, e.g. `http://server-pro-ha-1`
* Set `GIT_BRIDGE_POSTBACK_BASE_URL` to `http://<git-bridge container name>:8000`, e.g. `http://git-bridge:8000`
* Set `GIT_BRIDGE_ROOT_DIR` to the bind-mounted git-bridge data disk, e.g. `/data/git-bridge`

## Sample docker-compose.yml configuration

The following configuration shows a self-contained setup. For the demo to work, provide a valid SSL key/certificate and adjust the `OVERLEAF_SITE_URL` (`SHARELATEX_SITE_URL` for versions `4.x` and earlier). For an actual setup, replace the dummy secrets with actual secrets as noted inline. For an actual setup, move the individual containers onto dedicated nodes and adjust the IP addresses to your local network setup.

{% code title="docker-compose.yml" %}
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
                    "Statement": [\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:ListBucket"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-user-files"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:PutObject",\
                          "s3:GetObject",\
                          "s3:DeleteObject"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-user-files/*"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:ListBucket"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-template-files"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:PutObject",\
                          "s3:GetObject",\
                          "s3:DeleteObject"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-template-files/*"\
                      }\
                    ]
                  }' > policy-filestore.json

                echo '
                  {
                    "Version": "2012-10-17",
                    "Statement": [\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:ListBucket"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-project-blobs"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:PutObject",\
                          "s3:GetObject",\
                          "s3:DeleteObject"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-project-blobs/*"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:ListBucket"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-chunks"\
                      },\
                      {\
                        "Effect": "Allow",\
                        "Action": [\
                          "s3:PutObject",\
                          "s3:GetObject",\
                          "s3:DeleteObject"\
                        ],\
                        "Resource": "arn:aws:s3:::overleaf-chunks/*"\
                      }\
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
{% endcode %}

## Hardware

We recommend using the same hardware specifications for all the Server Pro instances that are taking part in horizontal scaling.

The general recommendations on [hardware specifications](getting-started/requirements/hardware-requirements.md) for Server Pro instances apply.

## Upgrading Server Pro

As part of the upgrade process, Server Pro automatically runs database migrations. These migrations are not designed to be run from multiple instances in parallel.

The migrations need to finish before the actual web application is started. You can either check the logs for an entry of `Finished migrations` or wait until the application accepts traffic.

The upgrade procedure looks like this:

{% stepper %}
{% step %}
### Schedule a maintenance window
{% endstep %}

{% step %}
### Stop all the instances of Server Pro
{% endstep %}

{% step %}
### Take a consistent backup

Follow the backup instructions in the documentation: https://docs.overleaf.com/on-premises/maintenance/data-and-backups#performing-a-consistent-backup
{% endstep %}

{% step %}
### Start a single instance of Server Pro with the new version
{% endstep %}

{% step %}
### Validate that the new instance is working as expected
{% endstep %}

{% step %}
### Bring up the other instances with the new version
{% endstep %}
{% endstepper %}
