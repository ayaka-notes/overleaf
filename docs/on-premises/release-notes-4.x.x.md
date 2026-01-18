# Release notes 4.x.x

The standard Server Pro license allows you to run the application in a production environment as well as one in a non-production/sandbox environment; it is highly recommended that you provision a non-production environment for testing.

### [Server Pro 4.2.9](release-notes-4.x.x.md#server-pro-4.2.9)

Release date: 2025-03-21

* Server Pro Image ID: `dcfa08126e52`
* Community Edition Image ID: `8fda0e836de1`
* Git Bridge Image ID: `59a17a340612`

This is a security release, we updated internal dependencies used by SAML integration.

***

### [Server Pro 4.2.8](release-notes-4.x.x.md#server-pro-4.2.8)

Release date: 2024-08-13

* Server Pro Image ID: `03df62558008`
* Community Edition Image ID: `b455e431db42`
* Git Bridge Image ID: `59a17a340612`

#### Bugfixes

* Fix for invalid URLs returning `500` instead of `400`.

#### Other changes

* `/metrics` and `/health_check` now return `404`.
* Security update to prevent remote image loading in Visual Editor.

***

### [Server Pro 4.2.7](release-notes-4.x.x.md#server-pro-4.2.7)

Release date: 2024-07-12

* Server Pro Image ID: `b57040dd7e45`
* Community Edition Image ID: `60b9c65a00a7`
* Git Bridge Image ID: `59a17a340612`

This is a security release. We added stricter controls for accessing project invite details and locked down access to files via the LaTeX compilation service.

We strongly recommend turning on the [Sandboxed Compiles](configuration/overleaf-toolkit/sandboxed-compiles.md) feature in Server Pro.

***

### [Server Pro 4.2.6](release-notes-4.x.x.md#server-pro-4.2.6)

Release date: 2024-06-20

* Server Pro Image ID: `e9c52f2dd6df`
* Community Edition Image ID: `8ac3da599b94`
* Git Bridge Image ID: `59a17a340612`

This is a security release. We added stricter controls for creating projects from ZIP URLs.

***

### [Server Pro 4.2.5](release-notes-4.x.x.md#server-pro-4.2.5)

Release date: 2024-06-11

* Server Pro Image ID: `cbe8a3d11874`
* Community Edition Image ID: `8ac3da599b94`
* Git Bridge Image ID: `59a17a340612`

This release provides security updates, bugfixes, and performance enhancements, including:

* Stricter controls to prevent arbitrary JavaScript execution in the project editor.
* Stricter controls to prevent arbitrary CSS loading in the project editor.
* Updated libraries to enhance security and performance.

***

### [Server Pro 4.2.4](release-notes-4.x.x.md#server-pro-4.2.4)

Release date: 2024-04-17

* Server Pro Image ID: `875dd6e64e96`
* Community Edition Image ID: `ab1e82612ec9`
* Git Bridge Image ID: `455a8c0559a4`

#### Security release

**Server Pro 4.2.4 is a security release for the application runtime.**

The Node.js runtime has been upgraded to `18.20.2`. Check the release notes ([`18.20.1`](https://nodejs.org/en/blog/release/v18.20.1), [`18.20.2`](https://nodejs.org/en/blog/release/v18.20.2)) for more information.

#### Other changes

* All services are now using IPv4 in the container
* Adds `bin/flush-history-queues` and `bin/force-history-resyncs` utility scripts.

***

### [Server Pro 4.2.3](release-notes-4.x.x.md#server-pro-4.2.3)

Release date: 2024-02-16

* Server Pro Image ID: `a251a3f77aaa`
* Community Edition Image ID: `168968a20483`
* Git Bridge Image ID: `59a17a340612`

#### Security release

**Server Pro 4.2.3 is a security release for the application runtime.**

The Node.js runtime has been upgraded to 18.19.1 as per the [security announcement upstream](https://nodejs.org/en/blog/vulnerability/february-2024-security-releases/). It is worth noting that only CVE-2024-22019, a Denial of Service vulnerability, is applicable to Server Pro.

**If an access point to your Server Pro instance is publicly accessible via the internet**, such as a login page or redirect to it, it is particularly important that you upgrade to Server Pro version 4.2.3.

***

### [Server Pro 4.2.2](release-notes-4.x.x.md#server-pro-4.2.2)

Release date: 2024-02-07

* Server Pro Image ID: `166a56c173a1`
* Community Edition Image ID: `f33f1873b490`
* Git Bridge Image ID: `59a17a340612`

This release increases security against brute force attacks on projects with link-sharing enabled.

**If your Server Pro instance is configured with link-sharing enabled**, using `SHARELATEX_ALLOW_PUBLIC_ACCESS=true`, it is particularly important that you upgrade to Server Pro version 4.2.2.

We would also like to highlight a required upgrade of MongoDB to version 5.0 for the next Server Pro release. MongoDB 4.4 reaches end of life this month, February 2024. We recommend that all customers [upgrade to MongoDB](maintenance/updating-mongodb.md) 5.0 at their earliest convenience.

***

### [Server Pro 4.2.1](release-notes-4.x.x.md#server-pro-4.2.1)

Release date: 2023-11-23

* Server Pro Image ID: `3a75a815d297`
* Community Edition Image ID: `ae1b8c082224`
* Git Bridge Image ID: `59a17a340612`

This release restores public access to the `/saml/meta` endpoint.

***

### [Server Pro 4.2.0](release-notes-4.x.x.md#server-pro-4.2.0)

Release date: 2023-11-10

* Server Pro Image ID: `8bdf368e59f4`
* Community Edition Image ID: `ae1b8c082224`
* Git Bridge Image ID: `59a17a340612`

This release separates the web service into an internal API service and a user facing service. Most of the changes in this regard are behind the scenes. The Git integration in Server Pro talks to the Server Pro container "from the outside" and its config needs changing.

* Toolkit users: please upgrade the toolkit (`bin/upgrade`) before upgrading to Server Pro 4.2.0.
* `docker-compose` deployments: please update the contents of the `GIT_BRIDGE_API_BASE_URL` variable:

Copy

```
-GIT_BRIDGE_API_BASE_URL: "http://sharelatex/api/v0/"
+GIT_BRIDGE_API_BASE_URL: "http://sharelatex:3000/api/v0/"
```

#### New features

**Toolbar in Code Editor**

A toolbar has been added to the Code Editor, which provides buttons for basic text styling, and inserting special characters, figures, code for tables, citations, and more.

**Add and edit tables without writing code**

An easier way to create and edit tables is now available in Server Pro. You can also copy and paste tables and formatted text directly into Visual Editor, without losing the formatting.

Check the [blog post](https://www.overleaf.com/blog/major-feature-news-add-and-edit-tables-without-writing-code) for more information.

**New toolbar option: Insert figure**

The new Insert figure feature allows user to upload or just copy and paste an image file from your computer directly into the editor.

Please refer to the [blog post](https://www.overleaf.com/blog/an-easier-way-to-insert-figures-in-overleaf) for more information.

**Symbol preview in editor autocomplete**

Math symbols are now previewed along with the autocomplete options in the editor.

#### Bugfixes

* XeLatex is now available in the default Tex Live install when not using Sandboxed Compiles.

#### Other changes

As announced with the [previous](release-notes-4.x.x.md#server-pro-4.1.0) Server Pro release, the legacy source editor has been removed from the editor. You can read more about the new editing experience [on our blog](https://www.overleaf.com/blog/towards-the-future-a-new-source-editor).

The new release also includes the following changes:

* Session length can now be configured with `SHARELATEX_COOKIE_SESSION_LENGTH`.
* Node runtime has been updated to v18.18.2

***

### [Server Pro 4.1.6](release-notes-4.x.x.md#server-pro-4.1.6)

Release date: 2023-11-02

* Server Pro Image ID: `e40c0df3207f`
* Community Edition Image ID: `50437e9a470c`
* Git Bridge Image ID: `f499a7ef6e64`

This release adds several dependency patches bringing performance improvements in different parts of the application.

***

### [Server Pro 4.1.5](release-notes-4.x.x.md#server-pro-4.1.5)

Release date: 2023-10-25

* Server Pro Image ID: `47246d85316b`
* Community Edition Image ID: `d909899af648`
* Git Bridge Image ID: `f499a7ef6e64`

This release includes a bug-fix for streaming compression in the history system that could result in hanging flushes. History changes will accumulate in Redis and do not get flushed for permanent storage on disk/ [S3](https://github.com/overleaf/overleaf/wiki/S3), leading to potential data-loss when Redis runs out of memory.

We advise all customers to upgrade to this release at their earliest convenience.

***

### [Server Pro 4.1.4](release-notes-4.x.x.md#server-pro-4.1.4)

Release date: 2023-10-24

* Server Pro Image ID: `ef772a5f1148`
* Community Edition Image ID: `1bcb24c3b31a`
* Git Bridge Image ID: `f499a7ef6e64`

This release includes additional logging and a new config option for a request timeout.

***

### [Server Pro 4.1.3](release-notes-4.x.x.md#server-pro-4.1.3)

Release date: 2023-10-06

* Server Pro Image ID: `6661a336d695`
* Community Edition Image ID: `e46e0cf12e97`
* Git Bridge Image ID: `f499a7ef6e64`

This release includes a fix for the history soft retry cronjob, which was executing the operation as a hard retry.

***

### [Server Pro 4.1.2](release-notes-4.x.x.md#server-pro-4.1.2)

Release date: 2023-09-27

* Server Pro Image ID: `fab9def8230a`
* Community Edition Image ID: `1ce6ef6ea798`
* Git Bridge Image ID: `f499a7ef6e64`

This release includes security updates for the Git Bridge.

***

### [Server Pro 4.1.1](release-notes-4.x.x.md#server-pro-4.1.1)

Release date: 2023-09-05

* Server Pro Image ID: `fab9def8230a`
* Community Edition Image ID: `1ce6ef6ea798`
* Git Bridge Image ID: `e5e9753fc979`

#### Bugfixes

* Hide tabs on user admin info pages that are only relevant for overleaf.com

***

### [Server Pro 4.1.0](release-notes-4.x.x.md#server-pro-4.1.0)

Release date: 2023-08-24

* Server Pro Image ID: `a6c6bfe92bd1`
* Community Edition Image ID: `1ce6ef6ea798`
* Git Bridge Image ID: `e5e9753fc979`

#### Security release

**Server Pro 4.1 is a security release for the application runtime.**

The Node.js runtime has been upgraded from version 16 to 18 ahead of the upcoming [deprecation of Node.js 16 on September 11, 2023](https://nodejs.org/en/blog/announcements/nodejs16-eol).

Only Server Pro 4.1 will operate with Node.js 18. All other supported versions of Server Pro require Node.js 16, which is being deprecated. **We recommend that all customers upgrade to Server Pro 4.1 at their earliest convenience.**

**If an access point to your Server Pro instance is publicly accessible via the internet**, such as a login page or redirect to it, it is particularly important that you upgrade to Server Pro version 4.1 before September 11, 2023.

#### History migration

**Reminder: History migration for Server Pro 3.5.X and earlier**

If you are still using a Server Pro version before 4.0, we recommend starting with the upgrade process immediately. In Server Pro 4.0 we introduced a breaking change in the history system that requires [migrating all the history data into the new system](full-project-history-migration.md) in order for Server Pro to function.

The migration process can handle the majority of project histories without any manual work. However, very old projects can contain data that require additional steps to migrate. Starting the migration process now will give our support team adequate time to take a look into your migration issues and help you finish the migration ahead of the EOL date.

#### History cleanup

**Cleanup of orphaned data**

Server Pro versions 3.5.11, 4.0.6 and the latest 4.1 release include an updated script that fully deletes orphaned mongo data from the old history system. It is safe to run the script again. Please refer to the [documentation](full-project-history-migration.md#clean-up-legacy-history-data) on how to run the cleanup script.

#### Upcoming changes

**Retirement of legacy source editor**

Server Pro 4.1 will be the last release with the legacy source editor. You can read more about the new editing experience [on our blog](https://www.overleaf.com/blog/towards-the-future-a-new-source-editor).

#### Other changes

**Rich Text/Visual Editor enhancements**

* The Rich Text/Visual editing experience has been improved.
* The "Source" editor has been renamed to "Code Editor" and the "Rich Text" editor has been renamed to "Visual Editor".

***

### [Server Pro 4.0.6](release-notes-4.x.x.md#server-pro-4.0.6)

Release date: 2023-08-10

* Image ID: `da6f6f617532`
* Community Edition Image ID: `504b19c82c27`
* Bring back the [History Migration Cleanup Script](full-project-history-migration.md#clean-up-legacy-history-data) with a fix to free up mongo storage space.

We advise customers to re-run the script again as per the documentation.

***

### [Server Pro 4.0.5](release-notes-4.x.x.md#server-pro-4.0.5)

Release date: 2023-07-20

* Server Pro Image ID: `bd37a572f01a`
* Community Edition Image ID: `883bb853c896`
* Git Bridge Image ID: `9bfd98050a43`

#### Bugfixes

* Fixes numbers replaced by underscores when downloading projects ([overleaf/overleaf/issues/1133](https://github.com/overleaf/overleaf/issues/1133)).

#### Other changes

* Security updates.

***

### [Server Pro 4.0.4](release-notes-4.x.x.md#server-pro-4.0.4)

Release date: 2023-07-14

* Server Pro Image ID: `bcec664460d0`
* Community Edition Image ID: `1cf00822f942`
* Git Bridge Image ID: `9bfd98050a43`

This release includes security updates.

***

### [Server Pro 4.0.3](release-notes-4.x.x.md#server-pro-4.0.3)

Release date: 2023-06-29

* Server Pro Image ID: `963eb95c3c86`
* Community Edition Image ID: `380e3cb72a42`
* Git Bridge Image ID: `9bfd98050a43`

Fixes a bug preventing anonymous users from adding changes to the Project History.

***

### [Server Pro 4.0.2](release-notes-4.x.x.md#server-pro-4.0.2)

Release date: 2023-06-08

* Server Pro Image ID: `aa27991a39a7`
* Community Edition Image ID: `26c75dfb6485`
* Git Bridge Image ID: `9bfd98050a43`

Fixes a bug navigating through the documentation pages when `SHARELATEX_PROXY_LEARN=true`.

***

### [Server Pro 4.0.1](release-notes-4.x.x.md#server-pro-4.0.1)

Release date: 2023-05-30

* Server Pro Image ID: `3014d696b579`
* Community Edition Image ID: `26c75dfb6485`
* Git Bridge Image ID: `9bfd98050a43`

**Note:** An issue was discovered with version 4.0 so it was never made public. This resulted in 4.0.1 being the first release in the 4.0 release line.

**Important**: Before upgrading to this new major version you will need to first upgrade your Overleaf Server Pro instance to version [3.5.10](https://github.com/overleaf/overleaf/wiki/Release-Notes-3.x.x#server-pro-3510) and migrate your projects to the new Full Project History system. Server Pro 4.0.0 will fail to start unless all the projects have been migrated.

Read [Full Project History migration instructions](full-project-history-migration.md).

This major release includes database migrations. Please ensure you have a [database backup](maintenance/data-and-backups/#performing-a-consistent-backup) before upgrading.

MongoDB now needs to run as a Replica Set. If you use an external Mongo database, you might already be running a replica set. If you use the Overleaf Toolkit you just need to pull the Toolkit's latest version. If you don't use the Toolkit, please see the instructions at the end of these release notes.

We’ve also updated the version of Redis to `6.2`. This change requires no action other than updating the image version. If you’re using the Overleaf Toolkit, add the environment variable `REDIS_IMAGE=redis:6.2` to config/overleaf.rc (or update the version, if it was already defined). If you’re using a custom `docker-compose.yml`, change the `redis` container image to `redis:6.2`.

If upgrading to Redis 6.2 results in a restart loop, see [this](troubleshooting.md#upgrading-to-redis-6.2-results-in-a-restart-loop) article in our troubleshooting guide for more information.

#### New features (Server Pro only)

* [Overleaf Git integration](https://www.overleaf.com/learn/how-to/Using_Git_and_GitHub#The_Overleaf_Git-Bridge) – See the documentation for [instructions](configuration/overleaf-toolkit/git-integration.md) to set up the git-bridge in your Server Pro install.
* [Enhanced Rich Text functionality](https://www.overleaf.com/blog/the-updated-rich-text-editor-simplifies-team-collaboration) – Rich-text commenting and tracked changes.
* Support documentation for [horizontal scaling](horizontal-scaling.md), which allows for increased computing resources for large deployments

#### New features for Overleaf Community Edition and Server Pro

* A new [Source editor](https://www.overleaf.com/blog/were-retiring-our-legacy-source-editor) in addition to the Legacy editor will be available to users. (The Legacy editor will eventually be retired. If users have any feedback or issues, [please fill out this form](https://forms.gle/cf8UNM4kdorpYTmK9).) The new Source editor provides better accessibility, and better support for non-latin text.
* Deleted projects and users can be automatically cleaned up after 90 days. This is an opt-in feature that can be enabled by setting the `ENABLE_CRON_RESOURCE_DELETION` environment variable to `true`. See the [configuration documentation](environment-variables.md).

#### Other changes

* TeX Live 2023 is now the default version for instances not running Sandboxed Compiles.
* The limit on a project’s editable content size (the sum of sizes of all editable files) has been increased from 5MB to 7MB.
* General performance and stability improvements to the application, along with many small improvements and bugfixes.

#### Manually setting up MongoDB as a replica set

The following instructions are not necessary if you use the Overleaf Toolkit or if you use an external Mongo database already configured as a replica set.

If you run MongoDB with `docker-compose`, add the following command to the `mongo` container configuration:

Copy

```
mongo:
    command: "--replSet overleaf"
```

Restart the mongo container then start a mongo shell with `docker-compose exec mongo mongo`. In that shell, run the following command to initiate the replica set:

Copy

```
rs.initiate({ _id: "overleaf", members: [ { _id: 0, host: "mongo:27017" } ] })
```

***

Last updated 9 months ago

This content is provided as-is from the release notes.
