---
icon: arrows-rotate
---

# (v3.5.13 Migration)  Full project history migration

## Full project history migration

The `3.5.x` release of the Community Edition includes the [Full Project History feature](https://www.overleaf.com/learn/latex/Using_the_History_feature) that is already available in our SaaS offering, [overleaf.com](http://overleaf.com/)

After upgrading your instance to Overleaf CE `3.5.13`, all new projects will be using Full Project History by default. Existing projects will continue using the legacy History system, until they’re migrated.

{% hint style="info" %}
If you upgrade to `3.5.13` and decide to downgrade to an earlier version, then you should restore from a full system backup. The history of projects created in `3.5.13` is not compatible with earlier versions of Overleaf CE.
{% endhint %}

The new Full Project History brings several improvements for users:

* It tracks changes in binary files, which is unsupported in the legacy system.
* There is support for labelled versions.
* The system is in general more robust, there is less chance of data loss.

Check [Full Project History documentation](https://www.overleaf.com/learn/latex/Using_the_History_feature) for more information about full project history.

### Migrating existing projects

{% stepper %}
{% step %}
#### Create a backup

Create a full [backup](https://docs.overleaf.com/on-premises/maintenance/data-and-backups#performing-a-consistent-backup) of your instance with a consistent snapshot of the **mongo**, **redis** and **sharelatex** directories.
{% endstep %}

{% step %}
#### Update

Update the version of sharelatex/sharelatex image to 3.5.13.

Toolkit: Use the `$ bin/upgrade` script for upgrading the toolkit to the latest version and edit **config/version** to 3.5.13.
{% endstep %}

{% step %}
#### Start the instance

Ideally, you’d want to prevent users from accessing your instance while the migration takes place, to avoid data loss in case you need to restore your backup. See [Offline migration](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration/#offline-migration) for more information on how to do this.
{% endstep %}

{% step %}
#### Wait until all services are up and running

Wait until all services are up and running (see command below)

{% code overflow="wrap" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "curl http://localhost:3000/status"
web sharelatex is alive (api)%
```
{% endcode %}
{% endstep %}

{% step %}
#### Run the migration script

{% code overflow="wrap" %}
```bash
# Overleaf Toolkit users:
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; VERBOSE_LOGGING=true node scripts/history/migrate_history.js --force-clean --fix-invalid-characters --convert-large-docs-to-file"

# legacy docker-compose.yml users:
$ docker exec sharelatex /bin/bash -c "cd /overleaf/services/web; VERBOSE_LOGGING=true node scripts/history/migrate_history.js --force-clean --fix-invalid-characters --convert-large-docs-to-file"
```
{% endcode %}

`--force-clean` clears partially migrated project history data in the new system, this allows retrying the migration for individual projects that failed in prior attempts;

`--fix-invalid-characters` replaces non printable characters that are not supported by the new history system;

`--convert-large-docs-to-file` converts documents that are above the 2MB editable-size threshold to a non-editable file)

The output should look like this:

```bash
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

```bash
Projects failed:  0
Done.
```

You can reopen access to your users (see next step). If there are failures, please see the troubleshooting section below. You can still reopen the site if the problems are not immediately fixed, and the unmigrated projects will remain on the legacy history system.
{% endstep %}

{% step %}
#### Reopen the site

If you had chosen to perform an offline migration then you will need to re-open the site. If you are still logged in you will need to:

1. Click on the **Admin** button and choose **Manage Site**
2. Click the **Open/Close Editor** tab
3. Click the **Reopen Editor** button

If you have closed your browser then you will need to restart the site with `$ bin/up`.
{% endstep %}
{% endstepper %}

#### Offline migration

To prevent users from being able to log in while the history migration script is running, please follow these steps:

* Log into your Overleaf instance with an admin account
* Click on the **Admin** button and choose **Manage Site**
* Click the **Open/Close Editor** tab
* Click on the **Close Editor** button
* Click on the **Disconnect all users** button

Once this has been done, if any users are logged in they will get redirected to the maintenance page, and any new users visiting the log-in page will see the maintenance page and **won't** be able to log in.

#### Online migration

It is possible to run the migration scripts while the application is still running. There are a few considerations to take into account:

* The migration process is CPU intensive, you should monitor resource usage while the script is running.
* With a high `--concurrency` value, the event loop in some services (`track-changes` in particular) might experience some blocking, which would lead to a degraded UX experience. We recommend starting with the default `--concurrency=1` value.
* You can stop the script at any time. Starting it again will resume the migration when you left it. This is useful in case you prefer to run the migration in less busy hours (e.g. at night).

Our recommendation is to close the site and run the migration offline in a maintenance window when your project count is less than 1000 projects (`db.projects.count()`). If the number of projects is large you can run the script and monitor its progress, then decide whether to continue running it online or offline based on your particular case.

#### Clean up legacy history data

A script to cleanup legacy history data was added in Server Pro `3.5.6`, `4.0.6` and `4.1.0`.

{% code overflow="wrap" %}
```bash
bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/history/clean_sl_history_data.js"
```
{% endcode %}

The script can be run after all the projects have been migrated. It can also be used to free some space while performing an online migration.

{% hint style="info" %}
In Server Pro before version 3.5.13, the script deletes the content of `docHistory` and `docHistoryIndex` collections. MongoDB does not release disk space after you delete documents, instead, it will reuse that space for future documents in the same collection. Nothing will write to these collections again after the history migration, so the disk space will remain unused.

If you want to make the disk space available again you can upgrade to Server Pro 3.5.13 (when still using the 3.x release) or Server Pro 4.2.5 (when using the 4.x release) and re-run the cleanup script.

The cleanup script as included in Server Pro the latest patch releases of `3.5.x` and latest `4.x.x` are dropping the collections as the final step.

It is safe to re-run the cleanup script.
{% endhint %}

### Troubleshooting

We will add troubleshooting advice here. Please note that while we normally offer support only to Server Pro customers, given the nature of this migration, we will also do our best to support CE customers who experience problems specific to the full project history migration.

If the full project history migration script fails (i.e. exits with an error or prints a non-zero number of failed projects), please send the following details to our support team by email [support+historymigration@overleaf.com](mailto:support+historymigration@overleaf.com?subject=Full%20project%20history%20migration%20problem\&body=Instance%20Type%3A%20CE%20or%20Server%20Pro%20%28delete%20as%20appropriate%29%0A%0AInstallation%20Type%3A%20Overleaf%20toolkit%20or%20docker-compose.yml%20or%20other%20%28delete%20as%20appropriate%29%0A%0AScript%20output%3A%0A%0Abin%2Fdoctor%20output%20%28if%20using%20toolkit%29%3A%0A), detailing:

Subject: Full project history migration problem

* Instance Type: CE or Server Pro (delete as appropriate)
* Installation Type: Overleaf toolkit or `docker-compose.yml` or other (delete as appropriate)
* Version: 3.5.x (toolkit: `$ cat config/version`)
* Migration script output (which should be located in the container under `/overleaf/services/web`)
* Migrated Projects: (as per migration script output)
* Total Projects: (as per migration script output)
* Remaining Projects: (as per migration script output)
* Duration of the migration:
* `bin/doctor` output (when using toolkit)
* Toolkit version: `$ git rev-parse HEAD` (when using Toolkit)

Consider attaching the log files for the `history-v1`, `project-history` and `track-changes` services to the email. You can find these at `/var/log/sharelatex` inside the `sharelatex` container and export them like this:

```bash
$ docker cp sharelatex:/var/log/sharelatex/history-v1.log history-v1.log
$ docker cp sharelatex:/var/log/sharelatex/project-history.log project-history.log
$ docker cp sharelatex:/var/log/sharelatex/track-changes.log track-changes.log
```

Please redact any sensitive information from the log files before attaching them.

#### Finding broken file trees

The migration may fail for projects which have a malformed file tree (for example, where filenames are empty). You can find a list of these problems using the `find_malformed_filetrees` script which checks all projects in the database:

{% code overflow="wrap" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/find_malformed_filetrees.js"
BAD PATH: 123456789012345678901234 rootFolder.0.1.2.3
BAD PATH: 123456789012345678901234 rootFolder.0.4.5.6
...
```
{% endcode %}

To fix the invalid paths, use the `fix_malformed_filetree` script, running the command once for each bad path:

{% code overflow="wrap" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/fix_malformed_filetree.js 123456789012345678901234 rootFolder.0.1.2.3"
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; node scripts/fix_malformed_filetree.js 123456789012345678901234 rootFolder.0.4.5.6"
...
```
{% endcode %}

#### Downgrading projects from full project history to legacy history

If there is a project that has been migrated to full project history but you want to go back to the legacy history, use the `downgrade_project` script as follows:

{% code overflow="wrap" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -c "cd /overleaf/services/web; PROJECT_ID=YOUR
```
{% endcode %}
