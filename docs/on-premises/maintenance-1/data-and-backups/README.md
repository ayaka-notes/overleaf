# Data and backups

{% tabs %}
{% tab title="Standalone / Non-Docker" %}
```bash
# Gracefully shutdown the old instance
old-server$ bin/stop

# Create the tar-ball
old-server$ tar --create --file backup-old-server.tar config/ data/

# Copy the backup-old-server.tar file from the old-server to the
# new-server using any method that fits

# Gracefully shutdown new instance (if started yet)
new-server$ bin/stop

# Move new data, you can delete it too
new-server$ mkdir backup-new-server
new-server$ mv config/ data/ backup-new-server/

# Populate config/data dir again
new-server$ tar --extract --file backup-old-server.tar

# Start containers
new-server$ bin/up
```
{% endtab %}

{% tab title="Docker Compose" %}
```bash
# Gracefully shutdown the old instance
old-server$ docker stop sharelatex
old-server$ docker stop mongo redis

# Create the tar-ball
old-server$ tar --create --file backup-old-server.tar ~/OVERLEAF_data ~/mongo_data ~/redis_data

# Copy the backup-old-server.tar file from the old-server to
# the new-server using any method that fits

# Gracefully shutdown new instance (if started yet)
new-server$ docker stop sharelatex
new-server$ docker stop mongo redis

# Move new data, you can delete it too
new-server$ mkdir backup-new-server
new-server$ mv ~/OVERLEAF_data ~/mongo_data ~/redis_data backup-new-server/

# Populate data dirs again
new-server$ tar --extract --file backup-old-server.tar

# Start containers
new-server$ docker start mongo redis
new-server$ docker start sharelatex
```

Depending on your **docker-compose.yml** file, you may need to adjust the paths of the `mongo`, `redis`, `overleaf` volumes.

{% hint style="info" %}
When running as the root user (or with sudo), tar will retain the file owner/group and permissions, which is critical when restoring the backup.
{% endhint %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
See folders in detail for additional hints about what to include in backups, what can be deleted, and what is ephemeral.

* (b) include in backups — best when the instance is stopped to ensure consistency
* (d) can be deleted
* (e) ephemeral files — can be deleted when the instance is stopped
{% endhint %}

{% stepper %}
{% step %}
### mongo\_data

* Purpose: mongodb datadir
* Backup: (b) include in backups
{% endstep %}

{% step %}
### redis\_data

* Purpose: redis db datadir
* Backup: (b) include in backups
{% endstep %}

{% step %}
### overleaf\_data

Contains several subfolders and files:

#### bin

* synctex (d)
  * unused in latest release; previously a custom synctex binary was used (synctex is used for source mapping between .tex files and the pdf)

#### data

* cache (e)
  * binary file cache for compiles
* compiles (e)
  * latex compilation happens here
* db.sqlite (d)
  * unused in latest release; previously stored clsi cache details (either moved to simple in-memory maps or we scan the disk)
* db.sqlite-wal (d)
  * unused in latest release; see db.sqlite
* output (e)
  * latex compilation output storage for serving to client
* template\_files (b)
  * image previews of template system (Server Pro only)
* user\_files (b)
  * binary files of projects
* history (b)
  * full project history files

#### tmp

* dumpFolder (e)
  * temporary files from handling zip files
* uploads (e)
  * buffering of file uploads (binary file/new-project-from-zip upload)
* projectHistories (e)
  * temporary files for full project history migrations
{% endstep %}
{% endstepper %}
