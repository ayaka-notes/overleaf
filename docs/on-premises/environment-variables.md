# Environment variables

{% hint style="info" %}
It is necessary that you re-create the Docker containers after changing anything in `overleaf.rc` or `variables.env` by running `bin/up`.
{% endhint %}

This page describes the environment variables that are supported in the `config/variables.env` file for Toolkit deployments.

The `config/variables.env` file consists of variable definitions in the form `NAME=value`. Lines beginning with `#` are treated as comments.

{% hint style="info" %}
Previously, these environment variables were prefixed with `SHARELATEX_` instead of `OVERLEAF_`.
{% endhint %}

These environment variables are compatible with Server CE and Server Pro, providing an easy migration path between these two on-premise versions. They can also be used with both Toolkit and Docker Compose deployments.

### Environment variables

`OVERLEAF_SITE_URL`\
Where your instance of Overleaf is publicly available. This is used in public links, and when connecting over websockets, so must be configured correctly!

`OVERLEAF_ADMIN_EMAIL`\
The email address where users can reach the person who runs the site.

`OVERLEAF_APP_NAME`\
The name to display when talking about the running application. Defaults to 'Overleaf (Community Edition)'.

`OVERLEAF_MONGO_URL` and `MONGO_URL`\
The URL of the Mongo database to use.

`OVERLEAF_REDIS_HOST` and `REDIS_HOST`\
The host name of the Redis instance to use. Both are required (see [release notes](/broken/pages/feb29583707671142ff031939bdd07535af5facc#changes-to-the-docker-compose-file-format)).

`OVERLEAF_REDIS_PORT` and `REDIS_PORT`\
The port of the Redis instance to use. Both are required (see [release notes](/broken/pages/feb29583707671142ff031939bdd07535af5facc#changes-to-the-docker-compose-file-format)).

`OVERLEAF_REDIS_PASS` and `REDIS_PASSWORD`\
The password to use when connecting to Redis (if applicable). **Both** environment variables need to be set. See [enabling password authentication](configuration/overleaf-toolkit/redis.md) for more infomration.

`OVERLEAF_REDIS_TLS`\
If set to `true`, allows for the connection to a Redis instance requiring TLS.

Note: mTLS is currently not supported.

`OVERLEAF_NAV_TITLE`\
Set the tab title of the application.

`OVERLEAF_SESSION_SECRET`\
A random string which is used to secure tokens; if load balancing this needs to be set to the same token across boxes. If only 1 instance is being run it does not need to be set by the user.

`OVERLEAF_COOKIE_SESSION_LENGTH`\
This environment variable allows you to override the default session cookie expiration time of 5 days. The override value provided should be specified in milliseconds. For example, to make the session last for 1 hour, set `COOKIE_SESSION_LENGTH=3600000`. (Added in Server Pro 4.2)

`OVERLEAF_TRUSTED_PROXY_IPS`\
If not set, defaults to `loopback`. If setting manually, in addition to your trusted IPs, you must also include one of `loopback`, `localhost` or `127.0.0.1`, which trusts the nginx instance running inside the **sharelatex** container.

If using a subnet from `172.16.0.0/12` (default subnet for Docker networks) for your regular network, please set `OVERLEAF_TRUSTED_PROXY_IPS=loopback,<network>` in your `config/variables.env`. Where `<network>` is the `IPAM -> Config -> Subnet` value in `docker inspect overleaf_default`, e.g. `OVERLEAF_TRUSTED_PROXY_IPS=loopback,172.19.0.0/16`. This is to prevent the spoofing of `X-Forwarded` headers.

If you are using an external TLS proxy (i.e. not managed by the Overleaf Toolkit), please ensure that `OVERLEAF_TRUSTED_PROXY_IPS=loopback,<ip-of-your-tls-proxy>`, e.g. `OVERLEAF_TRUSTED_PROXY_IPS=loopback,192.168.13.37`.

`OVERLEAF_RESTRICT_INVITES_TO_EXISTING_ACCOUNTS`\
If set to `true`, will restrict project invites to email addresses which correspond with existing user accounts.

`OVERLEAF_ALLOW_PUBLIC_ACCESS`\
If set to `true`, will allow non-authenticated users to view the site. The default is `false`, which means non-authenticated users will be unconditionally redirected to the login page when they try to view any part of the site. Note, setting this option does not disable authentication or security in any way. This option is necessary if your users intend to make their projects public and have non-authenticated users view those projects.

`OVERLEAF_ALLOW_ANONYMOUS_READ_AND_WRITE_SHARING`\
If set to `true`, will allow anonymous users to view and edit projects shared via the [link-sharingarrow-up-right](https://www.overleaf.com/blog/integration-update-link-sharing-2017-11-27) feature.

`OVERLEAF_DISABLE_LINK_SHARING`\
Disables the [link-sharingarrow-up-right](https://www.overleaf.com/blog/integration-update-link-sharing-2017-11-27) feature.

`EMAIL_CONFIRMATION_DISABLED`\
When set to `true` the banner requesting email confirmation won't be displayed.

`ADDITIONAL_TEXT_EXTENSIONS`\
An array of strings to configure additional extensions for editable files.

`OVERLEAF_STATUS_PAGE_URL`\
Custom status page URL (Added in Server Pro 3.4.0), e.g. `status.example.com`.

`OVERLEAF_FPH_INITIALIZE_NEW_PROJECTS`\
Set to `'false'` to prevent new projects from being initialised with Full Project History (Added in Server Pro 3.5.0).

`OVERLEAF_FPH_DISPLAY_NEW_PROJECTS`\
Set to `'false'` to prevent new projects from displaying Full Project History instead of the legacy history (Added in Server Pro 3.5.0).

`ENABLE_CRON_RESOURCE_DELETION`\
Set this environment variable to `true` to enable the automatic clean-up of deleted projects and users after 90 days.

`OVERLEAF_USER_HARD_DELETION_DELAY`\
Used to modify the deleted users expiration delay. Configured in milliseconds.

Defaults: 90 days

`OVERLEAF_PROJECT_HARD_DELETION_DELAY`\
Used to modify the deleted projects expiration delay. Configured in milliseconds.

Defaults: 90 days

`COMPILE_SIZE_LIMIT`\
Controls the maximum request body size in bytes. This is the sum of all doc file sizes within the project (main.tex, references.bib (if not linked) etc) that needs to be sent in the initial compile request to the CLSI service.

`COMPILE_TIMEOUT`\
This is the amount of time in seconds allowed for a compile to complete. For more information see [Updating project compile timeout](user-and-project-management/project-management/#updating-project-compile-timeout).

`MAX_RECONNECT_GRACEFULLY_INTERVAL_MS`\
A configurable delay between editor graceful reconnection, data flushing, and container shutdown to mitigate the risk of data loss.

`SECCOMP_PROFILE`\
Set this environment variable to a path on the Docker **host** machine that points to the SECCOMP profile. You can download a copy of the profile [herearrow-up-right](https://raw.githubusercontent.com/overleaf/overleaf/365af778b68a7940e08282119dc4ef473e2f0044/services/clsi/seccomp/clsi-profile.json).

Currently needed for Podman deployments when using Sandboxed Compiles.

`OVERLEAF_DISABLE_CHAT`\
If set to `true`, disables the in-project chat feature.

`OVERLEAF_LOGIN_SUPPORT_TEXT`\
When set, can be used to display support information underneath the login button. Text will be shown on the login screen and can be used to direct users to internal support or provide guidance related to logging in, creating accounts, etc.

`ALLOW_MONGO_ADMIN_CHECK_FAILURES`\
If set to `true`, allows the MongoDB start-up checks to fail and not prevent the deployment from starting. This may be required if you use a MongoDB database where your database user does not have the `clusterParameterReader` role.

For help on creating a custom role see [here](maintenance/updating-mongodb.md#creating-a-custom-role).

`V1_HISTORY_URL_FOR_GIT_BRIDGE`\
Allows separating the **history-v1** endpoint for internal traffic (`web` service → `history-v1` service, both in `sharelatex` container) and external traffic (`git-bridge` → `history-v1`, running in separate containers).

`OVERLEAF_MAINTENANCE_MESSAGE` and `OVERLEAF_MAINTENANCE_MESSAGE_HTML`\
Used to customize the title and content of the Maintenance page.

Can't be used with `OVERLEAF_STATUS_PAGE_URL`.

{% hint style="info" %}
It is possible to enforce password restrictions on users when using the Overleaf login system (local accounts), not an SSO option such as LDAP. For SSO accounts, password policies will be enforced by your identity provider or directory service, additionally allowing support for multi-factor authentication.
{% endhint %}
