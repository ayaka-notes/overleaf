---
icon: memory
---

# Redis

### Enabling password authentication

If you're using an external Redis service and need to provide a password you can do this by setting the `OVERLEAF_REDIS_PASS` and `REDIS_PASSWORD` environment variables in the **config/variables.env** file and running the `bin/up -d` command to recreate the **sharelatex** container.

If you're running a local instance of Redis, you'll need to configure the **redis** service to start with password authentication. After setting the above environment variables, you'll also need to complete these additional steps:

Create a **docker-compose.override.yml** file in the **config/** directory with the following content:

{% code title="config/docker-compose.override.yml" %}
```yaml
services:
    redis:
        command: "redis-server --requirepass <YOUR-PASSWORD>"
```
{% endcode %}

{% hint style="warning" %}
If you have AOF persistence enabled, you'll need to add `--appendonly yes` to the `command`.
{% endhint %}

Run `bin/up -d` to recreate the containers.

### Enabling Append-Only File Persistence

(Original: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/redis#enabling-append-only-file-persistence)

Redis AOF (Append-Only File) persistence provides a robust way to ensure data durability by logging every write operation received by the server. Unlike RDB snapshots, which take point-in-time copies of your dataset, AOF keeps a complete record of all changes made to your data.

{% hint style="info" %}
Disabling RDB is optional. It's generally recommended that both persistence methods be used together. Before making any changes in production, review the advantages and disadvantages of running AOF and RDB together.
{% endhint %}

You can read more about enabling AOF persistence in Redis here: [https://redis.io/docs/latest/operate/oss\_and\_stack/management/persistence/#how-i-can-switch-to-aof-if-im-currently-using-dumprdb-snapshotsarrow-up-right](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/#how-i-can-switch-to-aof-if-im-currently-using-dumprdb-snapshotsarrow-up-right)

1. Schedule a maintenance window for the upgrade.
2. Stop the instance using `bin/stop` and take a backup of the **config/** and **data/** folders.
3. Run `bin/up` to start the instance
4. Run the command `docker exec -it redis sh`
5. Run the command `redis-cli` to open the Redis command line interface
6. In the redis-cli, run the command `config set appendonly yes`
7. Now you'll need to wait for AOF rewrite to finish persisting the data. You can do that by typing `INFO persistence` into the redis-cli and waiting for `aof_rewrite_in_progress` and `aof_rewrite_scheduled` to be `0`, and validating that `aof_last_bgrewrite_status` is `ok`.
8. Exit the redis-cli by typing `exit` and pressing the return key
9. Exit the redis container by typing `exit` and pressing the return key
10. ​Run the command `ls ./data/redis` and confirm you can see the **appendonly.aof** file
11. Edit the **config/overleaf.rc** file and change the `REDIS_AOF_PERSISTENCE` environment variable from `false` to `true`
12. Run `bin/up -d` and make sure the application works (The project editor and history pane are functional).

