---
icon: database
---

# Updating MongoDB

{% hint style="info" %}
Any new release of Server CE/Server Pro will indicate any change on the supported version of MongoDB in its [release notes](https://docs.overleaf.com/on-premises/release-notes).
{% endhint %}

### Should I update MongoDB?

You should **only** consider updating your MongoDB version if you're planning to upgrade your instance of Server CE/Server Pro.

If you're running a MongoDB version that is newer than the recommended for your current (or target) version there's no need to make any changes.

{% hint style="warning" %}
You should never downgrade your MongoDB version.
{% endhint %}

If you experience a specific problem that you think might be related to your current version of MongoDB, feel free to [raise an issue](https://github.com/overleaf/overleaf/issues) if you are a Server CE user or contact Overleaf Support if you are Server Pro a user.

### Checking your MongoDB version

Opening the `mongo` shell should immediately print the current version.

Overleaf Toolkit users:

```bash
bin/docker-compose exec mongo mongod --version
db version v5.0.24
Build Info: {
    "version": "5.0.24",
    "gitVersion": "f034f0c51b3dffef4b8c9452d77ede9888f28f66",
    "openSSLVersion": "OpenSSL 1.1.1f  31 Mar 2020",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "ubuntu2004",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

Docker Compose users:

```bash
docker compose exec mongo mongod --version
db version v5.0.24
Build Info: {
    "version": "5.0.24",
    "gitVersion": "f034f0c51b3dffef4b8c9452d77ede9888f28f66",
    "openSSLVersion": "OpenSSL 1.1.1f  31 Mar 2020",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "ubuntu2004",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}

```

### Update process

Updating the version of MongoDB during an upgrade of your Server CE/Server Pro instance is as follows:

1. Decide the version of Server CE/Server Pro you plan to upgrade to.
2. Find the version of MongoDB recommended by that specific Overleaf Server CE/Server Pro release.
3. Follow the instructions to upgrade MongoDB to the target version.
4. Upgrade Server CE/Server Pro image version and restart the instance.

Our recommendation is to always upgrade **Server CE/Server Pro** to the latest version available, since it's always guaranteed to be supported (Server Pro users only).

{% hint style="danger" %}
When performing an upgrade of Server CE/Pro, we recommend upgrading to the latest release of the deployed major version **before** upgrading to the latest release of the **next** major version. If your deployment is more than one major version behind latest, you will be required to perform a multi-stepped upgrade.

For example, if you're running 3.5.10, you'll need to upgrade to 3.5.13 -> Perform the Full Project History migration -> 4.2.9 -> 5.5.4.

You should **never** skip major versions (3.5.10 -> 5.5.4). If you are using the Toolkit, and are more than one major version behind latest, you must **not** use the `bin/upgrade` script as you will be need to perform a manual multi-stepped upgrade.
{% endhint %}

{% hint style="warning" %}
It is important to ensure that you take a [consistent backup](data-and-backups/#performing-a-consistent-backup) **before** every major version upgrade to enable you to roll back should you require it.
{% endhint %}

#### Version support information

In case you decide to go to an earlier version, this table shows the recommended version of MongoDB for earlier releases of Server CE/Server Pro, but you should **never** downgrade your MongoDB version.

<table><thead><tr><th width="175">Server CE/Server Pro</th><th width="139" align="center">MongoDB Version</th><th align="center">Minimum Feature Compatibility Version</th><th align="center">Maximum Version Supported by Node.js Driver</th></tr></thead><tbody><tr><td>2.0.x</td><td align="center">3.4</td><td align="center">-</td><td align="center">-</td></tr><tr><td>2.1.x to 2.4.x</td><td align="center">3.6</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=2.5.0</td><td align="center">4.0</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=3.1.0</td><td align="center">4.2</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=3.2.0</td><td align="center">4.4</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=4.2.0</td><td align="center">5.0</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=5.1.0</td><td align="center">6.0</td><td align="center">-</td><td align="center">-</td></tr><tr><td>>=5.3.1</td><td align="center">6.0</td><td align="center">5.0</td><td align="center">8.0</td></tr><tr><td>>=5.5.0</td><td align="center">6.0</td><td align="center">6.0</td><td align="center">8.0</td></tr><tr><td>6.0.0</td><td align="center">8.0</td><td align="center">8.0</td><td align="center">8.0</td></tr></tbody></table>

{% hint style="danger" %}
The minimum feature compatibility version above is based on the corresponding MongoDB version recommend for use with the version of Overleaf shown. If you plan to use a higher version, MongoDB will have its own minimum requirement.
{% endhint %}

You can view the compatibility table that specifies the supported versions of the MongoDB Node.js driver for use with MongoDB [here](https://www.mongodb.com/docs/drivers/node/current/reference/compatibility/).

You can view the end-of-life status for each version of MongoDB [here](https://endoflife.date/mongodb).

#### Upgrading MongoDB

MongoDB requires **step-by-step upgrades**. That means you can't go straight from, let's say `4.0` to `5.0`. You need first to update `4.2` to `4.4`, and then `5.0`.

{% hint style="info" %}
MongoDB uses even numbers for their stable versions.
{% endhint %}

#### **Update instructions when running MongoDB outside Docker**

Here are links to the update instructions from mongodb.com when upgrading MongoDB.

* [MongoDB release notes - upgrading MongoDB from `4.2` to `4.4`](https://www.mongodb.com/docs/v4.4/release-notes/4.4-upgrade-standalone/)
* [MongoDB release notes - upgrading MongoDB from `4.4` to `5.0`](https://www.mongodb.com/docs/v5.0/release-notes/5.0-upgrade-replica-set/)
* [MongoDB release notes - upgrading MongoDB from `5.0` to `6.0`](https://www.mongodb.com/docs/v6.0/release-notes/6.0-upgrade-replica-set/)
* [MongoDB release notes - upgrading MongoDB from `6.0` to `7.0`](https://www.mongodb.com/docs/manual/release-notes/7.0-upgrade-replica-set/#std-label-7.0-upgrade-replica-set)
* [MongoDB release notes - upgrading MongoDB from `7.0` to `8.0`](https://www.mongodb.com/docs/manual/release-notes/8.0-upgrade-replica-set/#std-label-8.0-upgrade-replica-set)

{% hint style="info" %}
Instructions for `5.0` and higher point to a replica set install, instead of standalone. As Server Pro/CE 4.0.1+ uses transactions, MongoDB needs to be run as a replica set.
{% endhint %}

{% hint style="warning" %}
Documentation for MongoDB 3.2 to 4.2 is now available via [https://www.mongodb.com/docs/legacy/](https://www.mongodb.com/docs/legacy/)
{% endhint %}

**Basic Instructions**

In most cases the update requires setting up a compatibility flag before actually updating the mongo version. The steps are as follows:

1. Set the compatibility flag as described in MongoDB release notes (see the examples below).
2. Then update the mongo image:
   1. **Toolkit users** Update `MONGO_VERSION`, e.g. `MONGO_VERSION=6.0`
   2. **Docker Compose users** Update the version of the `mongo` image tag,\
      e.g. `services -> mongo -> image: mongo:6.0`;

**Example: Upgrading MongoDB from `5.0` to `6.0`**

Let's start by making sure we're running MongoDB `6.0`:

Overleaf Toolkit users:

```bash
bin/docker-compose exec mongo mongod --version
# db version v5.0.24
```

Docker Compose users:

```bash
docker compose exec mongo mongod --version
# db version v5.0.24
```

According to the [upgrade instructions](https://docs.mongodb.com/manual/release-notes/3.6-upgrade-standalone/#upgrade-version-path), the only requirement is to have `featureCompatibilityVersion` set to `5.0`. We do so by opening a MongoDB shell and running the indicated command:

Overleaf Toolkit users:

```bash
bin/mongo
# MongoDB shell version v5.0.24
# ...
# overleaf:PRIMARY> db.adminCommand( { setFeatureCompatibilityVersion: "5.0" } )
# { 
# "ok" : 1,
# ...
# }
overleaf:PRIMARY> exit
# bye
```

{% hint style="info" %}
Docker Compose users can run `docker compose exec mongo mongosh` to get a shell and run the same commands as Toolkit users.
{% endhint %}

Overleaf Toolkit users:

We'll then stop Server CE/Server Pro and MongoDB instances using the `bin/stop` command, set `MONGO_VERSION=6.0` in `config/overleaf.rc`, and then restart the `mongo` service using `bin/up mongo`) to verify the update went smoothly.

Finally, we'll update the Server CE/Server Pro image version to our target version and recreate all the services using the `bin/up -d` command.

Docker Compose users:

We'll then stop Server CE/Server Pro and MongoDB instances using the `docker compose stop` command, update [`docker-compose.yml`](https://github.com/overleaf/overleaf/blob/4b1babd4ea634ab12c54e9a9aea7db0e8a500941/docker-compose.yml) file to use `image: mongo:6.0`, and then restart the `mongo` service using the `docker compose up mongo` command to verify the update went smoothly.

Finally, we'll update Server CE/Server Pro image version to our target version and recreate all services using the `docker compose up` command.

**Example: Upgrading MongoDB from `6.0` to `7.0` (toolkit users)**

Start by making sure that you're running MongoDB `6.0` using the `mongod --version` commands above.

According to the [upgrade instructions](https://www.mongodb.com/docs/manual/release-notes/7.0-upgrade-replica-set/#std-label-7.0-upgrade-replica-set), the only requirement is to have `featureCompatibilityVersion` set to `6.0`. We do so by opening a MongoDB shell and running the command `db.adminCommand({ setFeatureCompatibilityVersion: "6.0" })` .

Overleaf Toolkit users:

```bash
bin/mongo
# ...
# overleaf:PRIMARY> db.adminCommand( { setFeatureCompatibilityVersion: "6.0" } )
# { 
# "ok" : 1,
# ...
# }
overleaf:PRIMARY> exit
# bye
```

We'll then stop Server CE/Server Pro and MongoDB instances using the `bin/stop` command, set `MONGO_VERSION=7.0` in `config/overleaf.rc`, and then restart the `mongo` service using `bin/up mongo`) to verify the update went smoothly.

Finally, we'll update the Server CE/Server Pro image version to our target version and recreate all the services using the `bin/up -d` command.

**Example: Upgrading MongoDB from `7.0` to `8.0` (toolkit users)**

Start by making sure that you're running MongoDB `7.0` using the `mongod --version` commands above.

According to the [upgrade instructions](https://www.mongodb.com/docs/manual/release-notes/8.0-upgrade-replica-set/#std-label-8.0-upgrade-replica-set), the only requirement is to have `featureCompatibilityVersion` set to `7.0`. We do so by opening a MongoDB shell and running the command `db.adminCommand({ setFeatureCompatibilityVersion: "7.0", confirm: true })`. Note that this now requires an additional `confirm: true` parameter.

```bash
bin/mongo
# ...
# overleaf:PRIMARY> db.adminCommand( { setFeatureCompatibilityVersion: "7.0", confirm: true } )
# { 
# "ok" : 1,
# ...
# }
overleaf:PRIMARY> exit
# bye
```

We'll then stop Server CE/Server Pro and MongoDB instances using the `bin/stop` command, set `MONGO_VERSION=8.0` in `config/overleaf.rc`, and then restart the `mongo` service using `bin/up mongo`) to verify the update went smoothly.

Finally, we'll update the Server CE/Server Pro image version to our target version and recreate all the services using the `bin/up -d` command.

#### Equivalent commands for docker compose users

For docker compose users, the equivalent command are:

* `docker compose exec mongo mongod --version` to display the mongo version
* `docker compose exec mongo mongosh` to start a mongo shell for admin commands
* `docker compose stop` command to stop the server
* Edit the [`docker-compose.yml`](https://github.com/overleaf/overleaf/blob/4b1babd4ea634ab12c54e9a9aea7db0e8a500941/docker-compose.yml) file to use `image: mongo:6.0` to upgrade the mongo version
* `docker compose up mongo` to restart the mongo service and verify the update went smoothly
* Edit the [`docker-compose.yml`](https://github.com/overleaf/overleaf/blob/4b1babd4ea634ab12c54e9a9aea7db0e8a500941/docker-compose.yml) file to use `image: sharelatex:VERSION` to upgrade the image version
* `docker compose up` to recreate all services.

### Creating a custom role

In version `5.5.1`, we introduced a startup check to verify the feature compatibility version for MongoDB. If your MongoDB database uses authentication (e.g., basic authentication), the `sharelatex` container might not start, displaying a "_not authorized on admin to execute command_" permission error.

To resolve this, you can either create a new role in MongoDB and assign it to the user account used to access the database using the instructions below, or set `ALLOW_MONGO_ADMIN_CHECK_FAILURES=true` to allow the check to fail without preventing the deployment from starting.

{% hint style="success" %}
This new role **only** grants permission to read cluster-wide MongoDB server parameters and could be reused for monitoring purposes,
{% endhint %}

{% code overflow="wrap" %}
```bash
# Toolkit users
$ bin/docker-compose exec -it mongo mongosh -u {{YOUR-ADMIN-USERNAME}} -p

# Switch to the "admin" database using
overleaf [direct: primary] sharelatex> use admin
switched to db admin
overleaf [direct: primary] admin> 

# Create a new role with permission to use "getParamter". Copy and paste the function below into the shell and press the return key

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

# Switch back to the "sharelatex" database 
use sharelatex
switched to db sharelatex
overleaf [direct: primary] sharelatex> 

# Assign the new "clusterParameterReader" role to your database user by copy and pasting the function below into the shell and press the return key 
db.grantRolesToUser(
  "{{YOUR-DATABASE-USER}}",
  [
    { role: "clusterParameterReader", db: "admin" }
  ]
);

# Type exit then return to exit the MongoDB shell
# Run bin/up -d to start the deployment stack
$ bin/up -d
```
{% endcode %}
