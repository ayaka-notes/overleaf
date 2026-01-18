---
icon: microchip
---

# Microservices

The recommended way to deploy and manage Overleaf Server CE and Server Pro instances is via the use of the Toolkit.

The Toolkit simplifies the creation of your Overleaf instance through the use of some custom scripts that abstract away the orchestration of required microservices. Simply run the bundled initialization script, provide a few configuration options like your persistent storage paths, and the Toolkit will take care of provisioning and connecting the microservices that make up your Overleaf Server CE or Server Pro instance.

This leaves you free to focus on customizing the user experience and implementing the specific features that make up your on-premise instance. The Toolkit handles all the complexity behind the scenes, enabling a simplified deployment of your Overleaf instance.

{% hint style="info" %}
For legacy reasons, the main Overleaf container is called `sharelatex`, and is based on the `sharelatex/sharelatex` Docker image. This is because the technology is based on the ShareLaTeX code base, which was merged into Overleaf. See [this blog postarrow-up-right](https://www.overleaf.com/blog/518-exciting-news-sharelatex-is-joining-overleaf) for more details. At some point in the future, this will be renamed to match the Overleaf naming scheme.
{% endhint %}

#### Architecture

Inside the Overleaf container, the software runs as a set of microservices, managed by `runit`. Some of the more interesting files inside the container are:

* `/etc/service/`: initialization files for the microservices.
* `/var/log/overleaf/`: logs for each microservice.
* `/overleaf/services/`: code for the various microservices.
* `/var/lib/overleaf/`: the mount-point for persistent data (corresponds to the directory indicated by `OVERLEAF_DATA_PATH` on the host).

#### The MongoDB and Redis Containers

Overleaf depends on two external databases: MongoDB and Redis. By default, the Toolkit will provision a container for each of these databases, in addition to the Overleaf container, for a total of three Docker containers.

{% hint style="info" %}
If you would prefer to connect to an existing MongoDB or Redis instance, you can do so by setting the appropriate settings in the [overleaf.rc](../configuration/overleaf-toolkit/files-and-locations.md#the-overleaf.rc-file) configuration file.
{% endhint %}

#### Editor and compile process

This section provides a broad overview for the handling of documents and the compile process.

{% hint style="info" %}
This page describes the compile process with Sandboxed Compiles as available in Server Pro only. In Server CE, the compile process uses simple sub-processes — replace the items referencing a **container** with a single item **run compile in sub-process**.
{% endhint %}

Components / Actors:

* `user` — A user of the application
* `editor` — The client application running in the browser
* `clsi` — The micro service used for compiling PDFs
* `document-updater` — The micro service used for processing document updates
* `filestore` — The micro service handling binary files
* `real-time` — The micro service used for handling web sockets
* `web` — The (not so) micro service used for handling API requests

**Redis caching**

* **user**: loads editor page
* **editor**: opens web socket
* **editor**: sends request to open a document via web socket
  * **real-time** -> **document-updater**: document is loaded from MongoDB into Redis
* **editor**: sends document update via web socket
  * **real-time** -> **document-updater**: document is updated in Redis
* **editor**: sends more compile requests
  * After 5 minutes have passed since last flush (per doc):
    * **document-updater**: flush doc from Redis to MongoDB
* **editor**: sends more updates
  * every 100 updates (per doc):
    * **document-updater**: flush doc history from Redis to MongoDB
* **user**: leaves the editor/closes browser tab
  * 5 minutes later
    * **real-time**: checks for other collaborators, if there are none:
      * **real-time** -> **document-updater**: flushes docs from Redis to MongoDB

**Reading from MongoDB into Redis**

* **document-updater** -> **web** -> **docstore**: read from MongoDB

**Flushing from Redis into MongoDB**

* **document-updater** -> **web** -> **docstore**: write into MongoDB

**Compile — "full" sync-mode**

* **editor**: sends compile request with sync-mode set to "full"
* **web** -> **document-updater**: any documents are flushed from Redis into MongoDB
* **web** -> **docstore**: all documents are downloaded from MongoDB
* **web** -> **clsi**: compile request is sent to `clsi`, including:
  * the sync-mode
  * a hash of the file tree -> the "project state"
  * all docs with their content -> subject to 7MB request body limit
  * binary file URLs for separate downloading
* **clsi**: check on-disk state with sync-mode and "project state"
  * this is a full sync, so previous on-disk state can be ignored
* **clsi**: cleanup compile dir
* **clsi**: write all docs into compile dir
* **clsi**: write all binary files into compile dir
  * `clsi` copies the files from a per-project local cache
  * on cache miss:
    * **clsi** -> **filestore**: download files
* **clsi**: write the "project state"
* **clsi**: ensure docker container exists with desired config
  * build container options, includes texlive version
  * hash options
  * container name: `project-<project-id>-<user-id>-<hash>`
* **clsi**: start container and stream stdout/stderr into memory -> limit 2MB
* **clsi**: leave stopped container behind -> cleaned up after 24h
* **clsi**: write stdout/stderr to disk
* **clsi**: copy output files into unique output directory
  * build-id composed of 8 random bytes plus timestamp in ms precision
  * delete all but last 3 (anonymous) / last 1 (logged in user) build folders
* **clsi**: compile was failure/timeout
  * delete compile cache — it may have partial files/corrupted cache
* **editor**: downloads output.log and output.pdf

**Compile — "incremental" sync-mode**

* **editor**: sends compile request with sync-mode set to "incremental"
* **web** -> **document-updater**: get any documents from Redis
  * the "project state" hash is also stored in Redis
  * **web** sends the hash of the file tree to `document-updater` and `document-updater` can turn the incremental compile into a full compile on mismatch
    * see compile process as performed when editor requested "full" compile
* **web** -> **clsi**: compile request is sent to `clsi`, including:
  * the sync-mode
  * a hash of the file tree -> the "project state"
  * all docs from Redis with their content -> subject to 7MB request body limit
  * no binary files
* **clsi**: check on-disk state with sync-mode and "project state"
  * this is an incremental sync, so the "project state" must match
  * on mismatch: respond with 409, let web retry with "full" sync
    * see compile process as performed when editor requested "full" compile
* **clsi**: write updated docs into compile dir
* **clsi**: ensure docker container exists with desired config
  * build container options, includes texlive version
  * hash options
  * container name: `project-<project-id>-<user-id>-<hash>`
* **clsi**: start container and stream stdout/stderr into memory -> limit 2MB
* **clsi**: leave stopped container behind -> cleaned up after 24h
* **clsi**: write stdout/stderr to disk
* **clsi**: copy output files into unique output directory
  * build-id composed of 8 random bytes plus timestamp in ms precision
  * delete all but last 3 (anonymous) / last 1 (logged in user) build folders
* **clsi**: compile was failure/timeout
  * delete compile cache — it may have partial files/corrupted cache
* **editor**: downloads output.log and output.pdf

**Compile — switching between modes**

* **editor**: observes a compile failure, next compile is a "full" compile
* **editor**: observes a compile success, next compile is an "incremental" compile
