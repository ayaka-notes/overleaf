# Binary files migration

{% stepper %}
{% step %}
### Check progress (script report)

Run the report to estimate how much work remains:

For Overleaf Toolkit users:

```bash
bin/docker-compose exec sharelatex /bin/bash -c "source /etc/overleaf/env.sh && source /etc/container_environment.sh && cd /overleaf/services/history-v1 && /sbin/setuser www-data node storage/scripts/back_fill_file_hash.mjs --report"
```

For legacy docker-compose.yml users:

```bash
docker compose exec sharelatex /bin/bash -c "source /etc/overleaf/env.sh && source /etc/container_environment.sh && cd /overleaf/services/history-v1 && /sbin/setuser www-data node storage/scripts/back_fill_file_hash.mjs --report"
```

Example output (truncated):

```
Current status:
- Total number of projects: 10
- Total number of deleted projects: 5
Sampling 1000 projects to estimate progress...
Sampled stats for projects:
- Sampled projects: 9 (90% of all projects)
- Sampled projects with all hashes present: 5
- Percentage of projects that need back-filling hashes: 44% (estimated)
...
Sampled stats for deleted projects:
- Sampled deleted projects: 4 (80% of all deleted projects)
- Sampled deleted projects with all hashes present: 3
- Percentage of deleted projects that need back-filling hashes: 25% (estimated)
...
```
{% endstep %}

{% step %}
### Flush project history queues

For Overleaf Toolkit users:

```bash
bin/docker-compose exec sharelatex /overleaf/bin/flush-history-queues
```

For legacy docker-compose.yml users:

```bash
docker compose exec sharelatex /overleaf/bin/flush-history-queues
```

Repeat the flush until all projects have been flushed (`"project_ids":0`).

Example success output:

```
found projects {"project_ids":0,"limit":100000,"ts":"2025-09-01T10:35:33.353Z"}
total {"succeededProjects":0,"failedProjects":0}
```

{% hint style="danger" %}
If "failedProjects" is not zero, please reach out to support and do not continue with the binary files migration.
{% endhint %}
{% endstep %}

{% step %}
### Advance the migration phase to 1

* Toolkit: Set `OVERLEAF_FILESTORE_MIGRATION_LEVEL=1` in `config/variables.env`.
* Legacy docker-compose.yml: Set `OVERLEAF_FILESTORE_MIGRATION_LEVEL: '1'` in the `environment` section of the `sharelatex` service.
{% endstep %}

{% step %}
### Apply the configuration change and start the instance

* Toolkit: `bin/up -d`
* Legacy docker-compose.yml: `docker compose up -d`
{% endstep %}

{% step %}
### Verify access to binary files

Open a project in the Overleaf editor in the browser and select a binary file (for example, an image) to verify access.
{% endstep %}

{% step %}
### Run the migration script

For Overleaf Toolkit users:

```bash
bin/docker-compose exec sharelatex /bin/bash -c "source /etc/overleaf/env.sh && source /etc/container_environment.sh && cd /overleaf/services/history-v1 && /sbin/setuser www-data node storage/scripts/back_fill_file_hash.mjs --all"
```

For legacy docker-compose.yml users:

```bash
docker compose exec sharelatex /bin/bash -c "source /etc/overleaf/env.sh && source /etc/container_environment.sh && cd /overleaf/services/history-v1 && /sbin/setuser www-data node storage/scripts/back_fill_file_hash.mjs --all"
```

{% hint style="warning" %}
If you're persisting log files outside the **sharelatex** container, ensure the logs directory owner is `www-data` (uid=33) so the script can write the output log file.
{% endhint %}

Expected script output (truncated):

```
Set UV_THREADPOOL_SIZE=16
{"name":"default","hostname":"c25e9faaeb53","pid":971,"level":30,"backend":"fs","msg":"Loading backend",...}
Writing logs into /var/log/overleaf/file-migration-2025-07-25T15_00_58_199Z.log
Starting project file backup...
...
Done.
```

Successful run returns exit code `0` and ends with `Done.`

Example log excerpt:

```
{"name":"file-migration","hostname":"c25e9faaeb53","pid":971,"level":30,"msg":"file-migration stats","v":0}
```
{% endstep %}

{% step %}
### Stop the instance

* Toolkit: `bin/stop sharelatex`
* Legacy docker-compose.yml: `docker compose stop sharelatex`
{% endstep %}

{% step %}
### Make old files inaccessible to the application

You can move the old files to secondary storage (recommended to keep them for a period in case you need to restore). Example commands:

Toolkit users:

```bash
bin/docker-compose run --rm --entrypoint mv sharelatex --no-clobber --verbose /var/lib/overleaf/data/user_files /var/lib/overleaf/data/old_user_files
```

Legacy docker-compose.yml users (assuming default bind-mount at /var/lib/overleaf):

```bash
docker compose run --rm --entrypoint mv sharelatex --no-clobber --verbose /var/lib/overleaf/data/user_files /var/lib/overleaf/data/old_user_files
```

If using selective bind-mounts, you can instead remove the bind-mount for /var/lib/overleaf/data/user\_files inside the container.
{% endstep %}

{% step %}
### Advance the migration phase to 2

* Toolkit: Set `OVERLEAF_FILESTORE_MIGRATION_LEVEL=2` in `config/variables.env`.
* Legacy docker-compose.yml: Set `OVERLEAF_FILESTORE_MIGRATION_LEVEL: '2'` in the `environment` section of the `sharelatex` service.
{% endstep %}

{% step %}
### Apply the configuration change and start the instance

* Toolkit: `bin/up -d`
* Legacy docker-compose.yml: `docker compose up -d`
{% endstep %}

{% step %}
### Verify access to binary files again

Open a project in the Overleaf editor and select a binary file (e.g., an image) to ensure access still works.
{% endstep %}

{% step %}
### Offline migration (optional)

To prevent users from logging in while migration runs:

* Log into your Overleaf instance with an admin account.
* Click Admin → Manage Site.
* Open the Open/Close Editor tab.
* Click Close Editor.
* Click Disconnect all users.

All logged-in users will be redirected to the maintenance page and new visitors will see the maintenance page. Repeat these steps when restarting the instance. To re-open the site, restart the instance.

Notes:

* This is recommended for maintenance windows, especially when project count is < 1000 (see the report output).
{% endstep %}

{% step %}
### Online migration guidance

You can run the migration while the application is running, but consider:

* The migration is IO intensive — monitor resource usage.
* High concurrency may block the filestore event loop and degrade user experience. Start with defaults: `--concurrency=10` and `--concurrent-batches=1`.
* The script can be stopped and resumed; it will skip projects/files already processed.

Recommendation: close the site and run offline when project count is small; otherwise monitor and decide whether to continue online or offline.
{% endstep %}

{% step %}
### Clean up legacy binary file data

After verifying projects can access all files, you can remove the old file storage at `/var/lib/overleaf/data/user_files`. It's recommended to keep the files for some time — you can make them inaccessible by renaming the folder first.
{% endstep %}
{% endstepper %}

***

### Troubleshooting

<details>

<summary>Overview and support</summary>

We will add troubleshooting advice here. Note: while support is normally for Server Pro customers, we will also try to support CE customers for issues specific to the binary file migration.

If the migration script fails (non-zero exit code or non-zero failed projects), email support at: support+filestoremigration@overleaf.com

Suggested email subject: Binary file migration problem

Include the following in the email body:

* Instance Type: CE or Server Pro (delete as appropriate)
* Installation Type: Overleaf toolkit or `docker-compose.yml` or other
* Version: 5.5.x (toolkit: `$ cat config/version`)
* Migration script output (located in the container under `/var/log/overleaf`)
* Report: (run migration script with `--report`)
* Processed projects: (as per last run)
* Duration of the migration
* `bin/doctor` output (when using toolkit)
* Toolkit version: `$ git rev-parse HEAD` (when using Toolkit)

Attach filestore log files (redact sensitive info before attaching). Locations inside `sharelatex` container:

* `/var/log/overleaf/filestore.log`
* `/var/log/overleaf/file-migration-<timestamp>.log`

Example commands to copy logs out:

```bash
docker cp sharelatex:/var/log/overleaf/filestore.log .
# replace <timestamp> with script timestamp
docker cp sharelatex:/var/log/overleaf/file-migration-<timestamp>.log .
```

</details>

<details>

<summary>Missing files</summary>

Older Server Pro/CE versions created file-tree entries before uploads finished, which can cause missing files when uploads failed.

* If only a few missing files: manually review and delete them from the editor in the browser.
* If many missing files: consider reaching out to support (see template above).

</details>

<details>

<summary>Finding broken file trees</summary>

Malformed file trees (e.g., empty filenames) can cause migration failures. Use the provided scripts to find and fix malformed file trees.

Find malformed file trees:

```bash
bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web && /sbin/setuser www-data node scripts/find_malformed_filetrees.mjs > /tmp/malformed-file-trees.json"
```

Fix malformed file trees (run once per bad path or supply the JSON):

```bash
bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web && /sbin/setuser www-data node scripts/fix_malformed_filetree.mjs --logs=/tmp/malformed-file-trees.json"
```

</details>

***

Last updated: 28 days ago

Was this helpful?
