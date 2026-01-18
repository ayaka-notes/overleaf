# Doc version recovery

```
$ docker exec sharelatex sv status real-time-overleaf
down: real-time-sharelatex: 7s, normally up
```

{% stepper %}
{% step %}
### Stop the git-bridge container (if enabled)

Copy:

```bash
$ docker stop git-bridge
```
{% endstep %}

{% step %}
### If you never ran 5.0.2: Issue a manual flush for document updates and wait for it to finish with success

You can repeat the command on error. In case you see a non-zero `failureCount` in successive runs, please stop the migration (restore the services via `docker restart git-bridge sharelatex`) and reach out to support.

Copy:

```bash
$ docker exec sharelatex bash -c 'source /etc/container_environment.sh && source /etc/overleaf/env.sh && cd services/document-updater && LOG_LEVEL=info node scripts/flush_all.js'
...
{"name":"default","hostname":"...","pid":324,"level":30,"successCount":...,"failureCount":0,"msg":"finished flushing all projects","time":"...","v":0}
Done flushing all projects
```
{% endstep %}

{% step %}
### If you never ran 5.0.2: Ensure that all changes have been flushed out of redis

If you get any output from `redis-cli`, please stop the migration (restore the services via `docker restart git-bridge sharelatex`) and reach out to support.

Copy:

```bash
$ docker exec redis redis-cli --scan --pattern 'DocVersion:*'

# no output from redis-cli indicates success, check exit code of redis-cli next, it should be zero
$ echo $?
0
```
{% endstep %}

{% step %}
### Try to flush any pending history changes

This will need to be a best-effort flush as some projects have broken histories due to the bad database migration. Any failures will be addressed with a re-sync of the history at the end of the recovery process.

Copy:

```bash
$ docker exec sharelatex bash -c 'source /etc/container_environment.sh && source /
```

(Note: the command above is shown truncated in the original content.)
{% endstep %}

{% step %}
### Take a backup

Consider taking a consistent backup of the instance:

https://docs.overleaf.com/on-premises/maintenance/data-and-backups#performing-a-consistent-backup
{% endstep %}

{% step %}
### Upgrade

Upgrade to version `5.0.3`.
{% endstep %}

{% step %}
### Automatic recovery

The recovery process runs on container start automatically.
{% endstep %}

{% step %}
### Follow progress

You can follow the progress of the script by tailing the log file `/var/lib/overleaf/data/history/doc-version-recovery.log`. It will print the total number of projects at the start and a summary after every 1000 projects processed.

Copy:

```bash
$ docker exec sharelatex tail --retry --follow /var/lib/overleaf/data/history/doc-vers
```
{% endstep %}

{% step %}
### Wait for the recovery process to finish

Wait for the recovery process to finish by either tailing the above log file until a `Done.` line has been printed or waiting for `Finished recovery of doc versions.` to be printed to the standard output of the Server Pro container.
{% endstep %}

{% step %}
### Validate the recovery process

Validate the recovery process by opening the history pane for a few of the projects with previously missing history.

*   Expedite the resync for the projects to test (They will get processed eventually, but we do not want to wait for them to get their turn.)

    Copy:

    ```bash
    $ docker exec sharelatex curl -X POST --silent "http://127.0.0.1:3054/project/000000000000000000000000/resync?force=true"
    ```

    (Repeat with each of the project-ids to test, replace `000000000000000000000000` with one project-id at a time.)
*   Open the project editor for the projects:

    https://my-server-pro.example.com/project/000000000000000000000000
* Open the "History" pane for the project and see the latest content.
* Optional: Close the "History" pane again. Make a code change, such as adding a comment to the header.
* Optional: Issue a re-compile to trigger a flush of the local change. Open the "History" pane again and see the change. When done, undo the change.
{% endstep %}

{% step %}
### For horizontal scaling

Start the other workers again.
{% endstep %}

{% step %}
### Keep the instance running

Please keep the instance running that executed the recovery process. It will resync the history for all projects in the background with a concurrency of 1. This will result in slightly elevated base load. (You can restart the instance, but it will need to start over with the resyncs.)
{% endstep %}

{% step %}
### Let us know when you're done

Server Pro customers: Please let the support team know when you have completed the recovery process.
{% endstep %}
{% endstepper %}
