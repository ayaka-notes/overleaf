# Updating MongoDB

db version v5.0.24

{% stepper %}
{% step %}
### Example: Upgrading MongoDB from 5.0 to 6.0

Start by making sure you're running MongoDB 5.0:

{% tabs %}
{% tab title="Toolkit users" %}
```bash
# Toolkit: check mongod version inside toolkit mongo container
bin/mongo

# MongoDB shell version v5.0.24
# ...
# overleaf:PRIMARY> db.adminCommand( { setFeatureCompatibilityVersion: "5.0" } )
# {
#   "ok" : 1,
#   ...
# }
overleaf:PRIMARY> exit

# bye
```
{% endtab %}

{% tab title="Docker Compose users" %}
```bash
docker compose exec mongo mongod --version

# db version v5.0.24

# To open a shell:
docker compose exec mongo mongosh
```
{% endtab %}
{% endtabs %}

According to the MongoDB upgrade instructions, the only requirement is to have `featureCompatibilityVersion` set to `5.0` (see: https://docs.mongodb.com/manual/release-notes/3.6-upgrade-standalone/#upgrade-version-path). Set it by running the admin command in a MongoDB shell:

```js
db.adminCommand({ setFeatureCompatibilityVersion: "5.0" })
```

Then:

{% tabs %}
{% tab title="Toolkit users" %}
1. Stop Server CE/Server Pro and MongoDB instances:

```bash
bin/stop
```

2. Set the target MongoDB version:

* Edit `config/overleaf.rc` and set:

```bash
MONGO_VERSION=6.0
```

3. Restart just the mongo service to verify the update:

```bash
bin/up mongo
```

4. Update the Server CE/Server Pro image to your target version and recreate all services:

```bash
bin/up -d
```
{% endtab %}

{% tab title="Docker Compose users" %}
1. Stop Server CE/Server Pro and MongoDB instances:

```bash
docker compose stop
```

2. Update the `docker-compose.yml` to use:

```yaml
image: mongo:6.0
```

(See: https://github.com/overleaf/overleaf/blob/4b1babd4ea634ab12c54e9a9aea7db0e8a500941/docker-compose.yml)

3. Restart the mongo service to verify the update:

```bash
docker compose up mongo
```

4. Update the Server CE/Server Pro image version in `docker-compose.yml` (set `image: sharelatex:VERSION`) and recreate all services:

```bash
docker compose up
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
### Example: Upgrading MongoDB from 6.0 to 7.0

Start by confirming you're running MongoDB 6.0 (use the same `mongod --version` / shell commands as above).

Per MongoDB upgrade instructions, ensure `featureCompatibilityVersion` is set to `6.0` (see: https://www.mongodb.com/docs/manual/release-notes/7.0-upgrade-replica-set/#std-label-7.0-upgrade-replica-set). Run:

```js
db.adminCommand({ setFeatureCompatibilityVersion: "6.0" })
```

Then perform the same sequence as the 5.0→6.0 example:

* Toolkit: stop with `bin/stop`, set `MONGO_VERSION=7.0` in `config/overleaf.rc`, `bin/up mongo` to verify, then `bin/up -d`.
* Docker Compose: `docker compose stop`, update `docker-compose.yml` to `image: mongo:7.0`, `docker compose up mongo` to verify, then update services and `docker compose up`.
{% endstep %}

{% step %}
### Example: Upgrading MongoDB from 7.0 to 8.0

Start by confirming you're running MongoDB 7.0.

Per MongoDB upgrade instructions, ensure `featureCompatibilityVersion` is set to `7.0`. Note: this upgrade requires an additional `confirm: true` parameter. Run:

```js
db.adminCommand({ setFeatureCompatibilityVersion: "7.0", confirm: true })
```

Then perform the same sequence as previous examples:

* Toolkit: stop with `bin/stop`, set `MONGO_VERSION=8.0` in `config/overleaf.rc`, `bin/up mongo` to verify, then `bin/up -d`.
* Docker Compose: `docker compose stop`, update `docker-compose.yml` to `image: mongo:8.0`, `docker compose up mongo` to verify, then update services and `docker compose up`.
{% endstep %}
{% endstepper %}

### Equivalent commands for Docker Compose users

For Docker Compose users, the equivalent commands are:

* `docker compose exec mongo mongod --version` — display the mongo version
* `docker compose exec mongo mongosh` — start a mongo shell for admin commands
* `docker compose stop` — stop the server
* Edit the `docker-compose.yml` file to use `image: mongo:6.0` (or your desired mongo image) to upgrade the mongo version (see the repo: https://github.com/overleaf/overleaf/blob/4b1babd4ea634ab12c54e9a9aea7db0e8a500941/docker-compose.yml)
* `docker compose up mongo` — restart the mongo service and verify the update
* Edit the `docker-compose.yml` file to use `image: sharelatex:VERSION` to upgrade the app image
* `docker compose up` — recreate all services

## Creating a custom role

In version 5.5.1, a startup check was added to verify the MongoDB feature compatibility version. If your MongoDB uses authentication (for example basic auth), the `sharelatex` container might fail to start with a "not authorized on admin to execute command" permission error.

You can either:

* create a new MongoDB role and assign it to the database user (instructions below), or
* set `ALLOW_MONGO_ADMIN_CHECK_FAILURES=true` to allow the check to fail without preventing the deployment from starting.

This new role only grants permission to read cluster-wide MongoDB server parameters and can be reused for monitoring.

{% stepper %}
{% step %}
### Create role and grant to user (Toolkit users)

1. Open an interactive mongo shell as an admin:

```bash
# Toolkit users
bin/docker-compose exec -it mongo mongosh -u {{YOUR-ADMIN-USERNAME}} -p
```

2. Switch to the admin database:

```js
use admin
```

3. Create the role `clusterParameterReader` (paste into the shell):

```js
db.createRole(
  {
    role: "clusterParameterReader",
    privileges: [
      {
        resource: { cluster: true },
        actions: ["getParameter"]
      }
    ],
    roles: []
  }
);
```

4. Switch to the `sharelatex` database:

```js
use sharelatex
```

5. Grant the new role to your database user (replace the user placeholder):

```js
db.grantRolesToUser(
  "{{YOUR-DATABASE-USER}}",
  [
    { role: "clusterParameterReader", db: "admin"" }
  ]
);
```

6. Exit the shell and restart the deployment stack:

```bash
exit
bin/up -d
```
{% endstep %}

{% step %}
### Notes / Alternatives

* If you prefer not to create the role, set:

```bash
ALLOW_MONGO_ADMIN_CHECK_FAILURES=true
```

in your environment to let the startup check fail without blocking deployment.
{% endstep %}
{% endstepper %}

Last updated 1 month ago
