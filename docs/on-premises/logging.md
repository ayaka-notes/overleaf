# Logging

You can use the `bin/logs` script to view logs for the services.

Basic usage examples:

```bash
# View the web service logs
bin/logs web

# Show help
bin/logs --help

# View logs for multiple services at once
bin/logs filestore docstore web clsi

# Follow log output (like tail -f)
bin/logs -f filestore docstore web clsi

# Limit the number of lines printed (default 50)
bin/logs -n 50 web

# Show all log lines
bin/logs -n all web

# Redirect output to a file
bin/logs -n all web > web.log
```

You can use the `bin/logs` script to view logs for the following services: `clsi`, `contacts`, `docstore`, `document-updater`, `filestore`, `git-bridge`, `mongo`, `notifications`, `real-time`, `redis`, `spelling`, `tags`, `track-changes`, `web`, `web-api`, `history-v1`, `project-history`.

## Copying logs

See the original docs: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/logging#copying-logs

Copy log files from the main `sharelatex` container to your local computer:

```bash
docker cp sharelatex:/var/log/overleaf/{service-name}.log {service-name}.log
```

## Persisting logs

See the original docs: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/logging#persisting-logs

Docker containers are ephemeral, which means files/directories created inside the container during runtime (including log files) will be discarded if the container is recreated (for example, when running `bin/up`). To retain log files between container recreations:

* Set the environment variable `OVERLEAF_LOG_PATH` in the `config/overleaf.rc` file used by the Toolkit. This should be the directory on the host that will be bind-mounted to the log directory inside the `sharelatex` container.
* After changing this and running `bin/up -d`, log files will be persisted on the host and accessible directly.

{% hint style="warning" %}
You must set the owner of the host logs directory used for the bind-mount to the `www-data` user (uid=33) and ensure permissions are `drwxr-xr-x` (755).

Example:

```bash
chown 33:33 data/overleaf/logs
chmod 755 data/overleaf/logs
```
{% endhint %}
