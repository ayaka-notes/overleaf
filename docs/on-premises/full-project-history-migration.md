# Full project history migration

{% tabs %}
{% tab title="Overleaf Toolkit users" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; VERBOSE_LOGGING=true node scripts/history/migrate_history.js --force-clean --fix-invalid-characters --convert-large-docs-to-file"
```
{% endtab %}

{% tab title="legacy docker-compose.yml users" %}
```bash
$ docker exec sharelatex /bin/bash -c "cd /overleaf/services/web; VERBOSE_LOGGING=true node scripts/history/migrate_history.js --force-clean --fix-invalid-characters --convert-large-docs-to-file"
```
{% endtab %}
{% endtabs %}

Options used:

* `--force-clean` clears partially migrated project history data in the new system, allowing retrying the migration for individual projects that failed in prior attempts.
* `--fix-invalid-characters` replaces non-printable characters that are not supported by the new history system.
* `--convert-large-docs-to-file` converts documents that are above the 2MB editable-size threshold to a non-editable file.

Expected output example:

```
Migrated Projects  :  1
Total Projects     :  51
Remaining Projects :  51
Total history records to migrate: 98
Starting migration...
Migrating project: 63d29b5772dd80015a81bffe
migration result { upgraded: true, historyType: 'NoneWithoutConversion' }
Migrating project: 63d29c2e72dd80015a81c0a2
migration result { upgraded: true, historyType: 'NoneWithoutConversion' }

// …

Migration complete
==================
Projects migrated:  51
Projects failed:  0
Done.
```

If the migration is successful, you'll get an exit code of `0`, and the last lines indicating no failures:

```
Projects failed:  0
Done.
```

You can reopen access to your users (see next step). If there are failures, see the troubleshooting section below. You can still reopen the site if the problems are not immediately fixed; unmigrated projects will remain on the legacy history system.

{% stepper %}
{% step %}
### Reopen the site

If you performed an offline migration you will need to re-open the site. If you are still logged in:

* Click on the **Admin** button and choose **Manage Site**
* Click the **Open/Close Editor** tab
* Click the **Reopen Editor** button
{% endstep %}

{% step %}
### Reopen the site (if you closed your browser)

Restart the site with:

```bash
$ bin/up
```
{% endstep %}
{% endstepper %}

Offline migration

To prevent users from logging in while the history migration script is running:

* Log into your Overleaf instance with an admin account
* Click on the **Admin** button and choose **Manage Site**
* Click the **Open/Close Editor** tab
* Click the **Close Editor** button
* Click the **Disconnect all users** button

Once done, any logged-in users are redirected to the maintenance page, and new visitors to the log-in page will see the maintenance page and won't be able to log in.

Online migration

It is possible to run the migration scripts while the application is still running. Considerations:

* The migration process is CPU intensive — monitor resource usage while the script runs.
* With a high `--concurrency` value, the event loop in some services (`track-changes` in particular) might experience blocking, leading to degraded UX. Start with the default `--concurrency=1`.
* You can stop the script at any time. Starting it again will resume the migration where it left off — useful to run the migration during less busy hours.

Recommendation: Close the site and run the migration offline in a maintenance window when your project count is less than 1000 (`db.projects.count()`). If the number of projects is large you can start online, monitor progress, and decide whether to continue online or switch to offline.

Clean up legacy history data

A cleanup script was added in Server Pro `3.5.6`, `4.0.6` and `4.1.0`:

```bash
bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/history/clean_sl_history_data.js"
```

* The script can be run after all projects have been migrated or to free some space while performing an online migration.
* In Server Pro before version 3.5.13, the script deletes the content of `docHistory` and `docHistoryIndex` collections. MongoDB does not release disk space after deleting documents; it will reuse that space for future documents in the same collection. Nothing will write to these collections again after the history migration, so the disk space will remain unused.
* To make disk space available again, upgrade to Server Pro 3.5.13 (when still on 3.x) or Server Pro 4.2.5 (when on 4.x) and re-run the cleanup script.
* In the latest patch releases of `3.5.x` and latest `4.x.x`, the cleanup script drops the collections as the final step.
* It is safe to re-run the cleanup script.

<details>

<summary>Troubleshooting</summary>

If the full project history migration script fails (exits with an error or prints a non-zero number of failed projects), send the following details to support by email to support+historymigration@overleaf.com?subject=Full%20project%20history%20migration%20problem\&body=Instance%20Type%3A%20CE%20or%20Server%20Pro%20%28delete%20as%20appropriate%29%0A%0AInstallation%20Type%3A%20Overleaf%20toolkit%20or%20docker-compose.yml%20or%20other%20%28delete%20as%20appropriate%29%0A%0AScript%20output%3A%0A%0Abin%2Fdoctor%20output%20%28if%20using%20toolkit%29%3A%0A):

Email Subject: Full project history migration problem

Include:

* Instance Type: CE or Server Pro (delete as appropriate)
* Installation Type: Overleaf toolkit or `docker-compose.yml` or other (delete as appropriate)
* Version: 3.5.x (toolkit: `$ cat config/version`)
* Migration script output (located in the container under `/overleaf/services/web`)
* Migrated Projects: (as per migration script output)
* Total Projects: (as per migration script output)
* Remaining Projects: (as per migration script output)
* Duration of the migration
* `bin/doctor` output (when using toolkit)
* Toolkit version: `$ git rev-parse HEAD` (when using Toolkit)

Consider attaching the log files for the `history-v1`, `project-history` and `track-changes` services. They are at `/var/log/sharelatex` inside the `sharelatex` container and can be exported like this:

```bash
$ docker cp sharelatex:/var/log/sharelatex/history-v1.log history-v1.log
$ docker cp sharelatex:/var/log/sharelatex/project-history.log project-history.log
$ docker cp sharelatex:/var/log/sharelatex/track-changes.log track-changes.log
```

Please redact any sensitive information from the log files before attaching them.

</details>

<details>

<summary>Finding broken file trees</summary>

The migration may fail for projects with a malformed file tree (for example, empty filenames). Find these problems using the `find_malformed_filetrees` script, which checks all projects in the database:

```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/find_malformed_filetrees.js"
BAD PATH: 123456789012345678901234 rootFolder.0.1.2.3
BAD PATH: 123456789012345678901234 rootFolder.0.4.5.6
...
```

To fix the invalid paths, run the `fix_malformed_filetree` script once for each bad path:

```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/fix_malformed_filetree.js 123456789012345678901234 rootFolder.0.1.2.3"
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/fix_malformed_filetree.js 123456789012345678901234 rootFolder.0.4.5.6"
...
```

</details>

<details>

<summary>Downgrading projects from full project history to legacy history</summary>

If a project was migrated to full project history but you want to revert it to legacy history, use the `downgrade_project` script as follows:

```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; PROJECT_ID=YOUR
```

(Complete the command with the appropriate script usage and PROJECT\_ID as required by your installation.)

</details>

Last updated 9 months ago

Was this helpful?

This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the privacy policy: https://www.overleaf.com/legal
