---
icon: lock
---

# Bulk transfer of project ownership

{% code overflow="wrap" %}
```bash
# email based
toolkit$ bin/run-script modules/server-ce-scripts/scripts/transfer-all-projects-to-user.mjs --from-user=alice@example.com --to-user=bob@example.com

# user-id based
tookit$ bin/run-script modules/server-ce-scripts/scripts/transfer-all-projects-to-user.mjs --from-user=68880f000000000000000000 --to-user=68880f000000000000000001

# Legacy docker-compose.yml setup:
$ docker exec sharelatex /bin/bash -c "source /etc/overleaf/env.sh && source /etc/container_environment.sh && cd /overleaf/services/web && node ./modules/server-ce-scripts/scripts/transfer-all-projects-to-user.mjs --from-user=alice@example.com --to-user=bob@example.com"
```
{% endcode %}

## Flags

| Name          | Description                               |
| ------------- | ----------------------------------------- |
| `--from-user` | Email or user-id of current project owner |
| `--to-user`   | Email or user-id of the new project owner |

## Completion

If the script terminates prematurely due to an error, it will print the error and exit with code 1 to denote that it was unsuccessful.

If the migration is completed successfully it will print "Done" and exit with code 0.
