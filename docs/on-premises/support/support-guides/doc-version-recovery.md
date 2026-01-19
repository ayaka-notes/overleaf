---
icon: arrow-rotate-left
---

# (v5.0.1 Migration) Doc version recovery

{% hint style="info" %}
If you never ran Server Pro version 5.0.1 or Community Edition version 5.0.1, or you started a brand new instance with 5.0.1, you do not need to run this recovery process.
{% endhint %}

**Updates to this page:**

* (2024-04-22 13:40 BST): Added step "Stop new updates from getting into the system and flush all changes to MongoDB".
* (2024-04-23 11:45 BST): Account for broken flushes in 5.0.1 and skip flushes when 5.0.2 was started.

The duration of the recovery will depend on the number and size of projects in your instance and the storage backend used by the history store for chunks (as defined in `OVERLEAF_HISTORY_CHUNKS_BUCKET`).

The recovery process will delay the application start inside the Server Pro container. The site will appear offline during that time. We only support running the recovery from a single instance of the Server Pro container, all other horizontal scaling workers need to be offline.

You can stop and resume the recovery process if needed.

Based on our performance tests, the recovery process can process approximately 10k small projects per minute on modern hardware (3GHz CPU clock speed and local NVMe storage). As an example, for an instance with 100k projects, schedule a maintenance window that allows at least 10+2min of downtime. Use the following query to estimate the number of projects in your instance:

{% code overflow="wrap" %}
```bash
$ docker exec mongo mongosh sharelatex --quiet --eval 'db.projects.estimatedDocumentCount() + db.deletedProjects.estimatedDocumentCount()'
```
{% endcode %}

Please read the following recovery steps in full before you start. Server Pro customers are more than welcome to reach out to [support@overleaf.com](mailto:support@overleaf.com) with any questions.

### Recovery process

{% stepper %}
{% step %}
#### Pull release images

Pull the `5.0.3` release images.
{% endstep %}

{% step %}
#### Identify a few projects

Identify a few projects by id that are missing history; ideally you have permission to make a change to one of them.
{% endstep %}

{% step %}
#### Schedule maintenance

Schedule a maintenance window for the downtime.
{% endstep %}

{% step %}
#### Stop all but one worker

Stop all but one worker when using a horizontal scaling setup.
{% endstep %}

{% step %}
#### Stop new updates and flush all changes to MongoDB

Stop new updates from getting into the system and flush all changes to MongoDB:

1. Close the editor and disconnect all users manually via the admin panel on `https://my-server-pro.example.com/admin#open-close-editor` in the "Open/Close Editor" tab.
2.  Stop the Websocket/real-time service.

    ```bash
    $ docker exec sharelatex sv stop real-time-overleaf
    ```
3.  Wait for the real-time service to exit, as indicated by `down:`.

    ```bash
    $ docker exec sharelatex sv status real-time-overleaf
    run: real-time-sharelatex: (pid 394) 50s, want down, got TERM
    # wait a little longer...

    $ docker exec sharelatex sv status real-time-overleaf
    down: real-time-sharelatex: 7s, normally up
    ```
4.  Stop the git-bridge container if enabled.

    ```bash
    $ docker stop git-bridge
    ```
5.  If you never ran 5.0.2: Issue a manual flush for document updates and wait for it to finish with success.

    You can repeat the command on error. In case you see a non-zero `failureCount` in successive runs, please stop the migration (restore the services via `docker restart git-bridge sharelatex`) and reach out to support.

    <pre class="language-bash" data-overflow="wrap"><code class="lang-bash">$ docker exec sharelatex bash -c 'source /etc/container_environment.sh &#x26;&#x26; source /etc/overleaf/env.sh &#x26;&#x26; cd services/document-updater &#x26;&#x26; LOG_LEVEL=info node scripts/flush_all.js'
    ...
    {"name":"default","hostname":"...","pid":324,"level":30,"successCount":...,"failureCount":0,"msg":"finished flushing all projects","time":"...","v":0}
    Done flushing all projects
    </code></pre>
6.  If you never ran 5.0.2: Ensure that all changes have been flushed out of redis.

    If you get any output from `redis-cli`, please stop the migration (restore the services via `docker restart git-bridge sharelatex`) and reach out to support.

    <pre class="language-bash" data-overflow="wrap"><code class="lang-bash">$ docker exec redis redis-cli --scan --pattern 'DocVersion:*'
    # no output from redis-cli indicates success, check exit code of redis-cli next, it should be zero
    $ echo $?
    0
    </code></pre>
7.  Try to flush any pending history changes.

    This will need to be a best effort flush as some projects have broken histories due to the bad database migration. Any failures will be addressed with a re-sync of the history at the end of the recovery process.

    <pre class="language-bash" data-overflow="wrap"><code class="lang-bash">$ docker exec sharelatex bash -c 'source /etc/container_environment.sh &#x26;&#x26; source /
    </code></pre>
{% endstep %}

{% step %}
#### Take a backup

Consider taking a [consistent backup](https://docs.overleaf.com/on-premises/maintenance/data-and-backups#performing-a-consistent-backup) of the instance.
{% endstep %}

{% step %}
#### Upgrade

Upgrade to version `5.0.3`.
{% endstep %}

{% step %}
#### Automatic recovery

The recovery process runs on container start automatically.
{% endstep %}

{% step %}
#### Follow progress

You can follow the progress of the script by tailing the log file `/var/lib/overleaf/data/history/doc-version-recovery.log`. It will print the total number of projects at the start and a summary after every 1000 projects processed.

{% code overflow="wrap" %}
```bash
$ docker exec sharelatex tail --retry --follow /var/lib/overleaf/data/history/doc-vers
```
{% endcode %}
{% endstep %}

{% step %}
#### Wait for the recovery process to finish

Wait for the recovery process to finish by either tailing the above log file until a `Done.` line has been printed or waiting for `Finished recovery of doc versions.` to be printed to the standard output of the Server Pro container.
{% endstep %}

{% step %}
#### Validate the recovery process

Validate the recovery process by opening the history pane for a few of the projects with previously missing history.

1.  Expedite the resync for the projects to test (They will get processed eventually, but we do not want to wait for them to get their turn.)

    <pre class="language-bash" data-overflow="wrap"><code class="lang-bash">$ docker exec sharelatex curl -X POST --silent "http://127.0.0.1:3054/project/000000000000000000000000/resync?force=true"
    </code></pre>

    (Repeat with each of the project-ids to test, replace `000000000000000000000000` with one project-id at a time.)
2. Open the project editor for the projects `https://my-server-pro.example.com/project/000000000000000000000000`
3. Open the "History" pane for the project and see the latest content.
4. Optional: Close the "History" pane again. Make a code change, such as adding a comment to the header.
5. Optional: Issue a re-compile to trigger a flush of the local change. Open the "History" pane again and see the change. When done, undo the change.
{% endstep %}

{% step %}
#### For horizontal scaling...

Start the other workers again.
{% endstep %}

{% step %}
#### Keep the instance running

Please keep the instance running that executed the recovery process. It will resync the history for all projects in the background with a concurrency of 1. This will result in slightly elevated base load. (You can restart the instance, but it will need to start over with the resyncs.)
{% endstep %}

{% step %}
#### Let us know when you're done

Server Pro customers: Please let the support team know when you have completed the recovery process.
{% endstep %}
{% endstepper %}
