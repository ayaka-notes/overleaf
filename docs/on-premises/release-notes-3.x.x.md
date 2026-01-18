# Release notes 3.x.x

{% hint style="info" %}
The standard Server Pro license allows you to run the application in a production environment as well as one in a non-production/sandbox environment; it is highly recommended that you provision a non-production environment for testing.
{% endhint %}

## [Server Pro 3.x.x release notes — Server Pro 3.5.13](release-notes-3.x.x.md#server-pro-3.5.13)

Release date: 2023-10-06

Image ID: `4f2113a3c903` (Community Edition Image ID: `0038aa2cc383`)

* Fixes history soft retry cronjob, which was executing the operation as a hard retry.

***

## [Server Pro 3.5.12](release-notes-3.x.x.md#server-pro-3.5.12)

Release date: 2023-09-25

Image ID: `af3621af7b83` (Community Edition Image ID: `a461cd37241b`)

* Workaround a bug in the [History Migration Scriptsarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration) when multiple updates have the same version.

***

## [Server Pro 3.5.11](release-notes-3.x.x.md#server-pro-3.5.11)

Release date: 2023-08-10

Image ID: `dcfec83c5091` (Community Edition Image ID: `6f8a5409f146`)

* Fixed a bug in the [History Migration Scriptsarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration) when large deleted documents exist.
* Extended the [History Migration Cleanup Scriptarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration#clean-up-legacy-history-data) to free up mongo storage space.

{% hint style="warning" %}
We advise customers to re-run the script again as per the documentation.
{% endhint %}

***

## [Server Pro 3.5.10](release-notes-3.x.x.md#server-pro-3.5.10)

Release date: 2023-07-20

Image ID: `f83dc1e03fcf` (Community Edition Image ID: `373b0b94b156`)

* This release includes security updates.

***

## [Server Pro 3.5.9](release-notes-3.x.x.md#server-pro-3.5.9)

Release date: 2023-07-14

Image ID: `d746f967e231` (Community Edition Image ID: `25aa7097b27b`)

* This release includes security updates.

***

## [Server Pro 3.5.8](release-notes-3.x.x.md#server-pro-3.5.8)

Release date: 2023-06-29

Image ID: `03c294380d2c` (Community Edition Image ID: `39d691cb806e`)

* Fixes a bug preventing anonymous users from adding changes to the Project History when Full Project History is enabled.

***

## [Server Pro 3.5.7](release-notes-3.x.x.md#server-pro-3.5.7)

Release date: 2023-06-01

Image ID: `65cc2f2e2af6` (Community Edition Image ID: `cc998380cad7`)

* Fixes a bug in the [History Migration Scriptsarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration) when using `--force-clean` that prevented migration reattempts in certain situations.

***

## [Server Pro 3.5.6](release-notes-3.x.x.md#server-pro-3.5.6)

Release date: 2023-05-04

Image ID: `0dee80908e57` (Community Edition Image ID: `89c35e1b6ec8`)

* Added `clean_sl_history_data` script to [cleanup legacy history dataarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration#clean-up-legacy-history-data).

***

## [Server Pro 3.5.5](release-notes-3.x.x.md#server-pro-3.5.5)

Release date: 2023-03-21

Image ID: `35bda2a2a778` (Community Edition Image ID: `9db95d7e350c`)

* This release fixes the shutdown sequence in Server Pro / Community Edition.

***

## [Server Pro 3.5.4](release-notes-3.x.x.md#server-pro-3.5.4)

Release date: 2023-03-20

Image ID: `44d12da219d7` (Community Edition Image ID: `563d00cfad2a`)

* This release disables the primary email check feature in Server Pro / Community Edition.

***

## [Server Pro 3.5.3](release-notes-3.x.x.md#server-pro-3.5.3)

Release date: 2023-03-07

Image ID: `8c7444b2e929` (Community Edition Image ID: `60bef8c323a5`)

* This release includes a performance improvement to the [Full Project History migration scriptarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration).

***

## [Server Pro 3.5.2](release-notes-3.x.x.md#server-pro-3.5.2)

Release date: 2023-03-07

Image ID: `dca7282041af` (Community Edition Image ID: `cd45ea2957b0`)

* This release includes several improvements to the [Full Project History migration scriptsarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration).

***

## [Server Pro 3.5.1](release-notes-3.x.x.md#server-pro-3.5.1)

Release date: 2023-02-28

Image ID: `6a64c0f67077` (Community Edition Image ID: `bfa72dc4430f`)

* This release includes a fix for a German translation in the editor.

***

## [Server Pro 3.5.0](release-notes-3.x.x.md#server-pro-3.5.0)

Release date: 2023-02-13

Image ID: `f6963b4eaad9` (Community Edition Image ID: `678db4634722`)

This release includes the [Full Project History featurearrow-up-right](https://www.overleaf.com/learn/latex/Using_the_History_feature) already available in our SaaS offering, [overleaf.comarrow-up-right](http://overleaf.com/), and brings several improvements for users:

* Tracks changes in binary files, which is unsupported in the legacy system. There is support for labelled versions. The system is in general more robust, there is less chance of data loss.
* After upgrading your instance all new projects will be using Full Project History by default (unless opting-out, see environment variables in [Configuring Overleafarrow-up-right](https://github.com/overleaf/overleaf/wiki/Configuring-Overleaf)). Existing projects will continue using the legacy History system, until they’re migrated.

[Full Project History migration instructionsarrow-up-right](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration).

This release also ships with official support for S3 compatible object storage. This could either be a self-hosted solution, like min.io or ceph.io, or AWS S3. The S3 based storage backend can optionally replaces the local fs/NFS storage backend. You can find a wiki page on [setting up S3 in Server Proarrow-up-right](https://github.com/overleaf/overleaf/wiki/S3) and another wiki page describes the [migration processarrow-up-right](https://github.com/overleaf/overleaf/wiki/S3-Migration) for moving existing data into S3. With S3-compatible object storage support we prepared Server Pro for horizontal scaling, look out for news here soon!

#### [Bugfixes](release-notes-3.x.x.md#bugfixes)

* Remove empty "Advanced" tab in admin panel.

#### [Other changes](release-notes-3.x.x.md#other-changes)

* Added cleanup scripts to flush redis data on container shutdown. This might increase the time it takes to stop the instance to up to 1 minute. If you're not using the Overleaf Toolkit, you need to [specify the timeouts in your container configurationarrow-up-right](https://github.com/overleaf/overleaf/pull/1090/files).
* German translation coverage significantly improved ( [d5d3fcdarrow-up-right](https://github.com/overleaf/overleaf/commit/d5d3fcda472249d5c5bf6b74f0548f4f4700ee80) )

***

## [Server Pro 3.4.0](release-notes-3.x.x.md#server-pro-3.4.0)

Release date: 2023-01-11

Image ID: `07f5275feec5` (Community Edition Image ID: `009c80a8d63e`)

This release includes database migrations. Please [backup your databasearrow-up-right](https://github.com/overleaf/overleaf/wiki/Data-and-Backups) before upgrading.

#### New Features

* New environment variable `SHARELATEX_STATUS_PAGE_URL` can be set to a custom status page URL. This URL is displayed when the site is closed for maintenance and on 500 errors.

#### Bugfixes

* Fix parsing of `authnContext` in `passport-saml` options (Server Pro).
* Fix disconnect users option in site admin panel (Server Pro).

#### Other changes

* Drop limit for `output.pdf` requests. This should mitigate errors compiling a project several times in a short time.
* Memory management improvements during file upload process. These changes reduce pressure on the disk from fewer IO operations.

***

## [Server Pro 3.3.2](release-notes-3.x.x.md#server-pro-3.3.2)

Release date: 2022-11-15

Image ID: `c03e78f10d6d` (Community Edition Image ID: `eab840a50369`)

This release includes a fix for a server error that can stop the project dashboard from opening:

> TypeError: (project.archived || \[]).some is not a function

The fix includes a migration converting the `archived` and `trashed` state of projects from a per-project setting to a per-user setting.

{% hint style="info" %}
As always, please take a [consistent backup](maintenance/data-and-backups/#performing-a-consistent-backup) of your database before upgrading to this release.
{% endhint %}

***

## [Server Pro 3.3.1](release-notes-3.x.x.md#server-pro-3.3.1)

Release date: 2022-10-18

Image Id: `9194fb1de6b3` (no Community Edition image)

* This release includes a security update addressing potential vulnerabilities with SAML auth provider integration.

***

## [Server Pro 3.3.0](release-notes-3.x.x.md#server-pro-3.3.0)

Release date: 2022-10-13

Image ID: `56f044d08198` (Community Edition Image ID: `4c4bad165ea6`)

This new release of Server Pro includes a MongoDB migration affecting several collections. **Please ensure you have a** [**database backup** arrow-up-right](https://github.com/overleaf/overleaf/wiki/Backup-of-Data) **before upgrading**.

For CE users, and Server Pro users that don't run [Sandboxed Compilesarrow-up-right](https://github.com/overleaf/overleaf/wiki/Server-Pro:-sandboxed-compiles) there is a change in how Latex packages are installed, now requiring to run `tlmgr path add` again after every use of `tlmgr install` in order to correctly symlink all the binaries into the system path.

#### New Features

* [Stop on First Error compilation modearrow-up-right](https://www.overleaf.com/blog/new-feature-stop-on-first-error-compilation-mode)
* User/Project audit logs can now store more than 200 entries.

#### Other changes

* HTML content in Template descriptions is now sanitized using [`sanitize-html` default optionsarrow-up-right](https://github.com/apostrophecms/sanitize-html#default-options). This might affect your existing templates.

***

## [Server Pro 3.2.2](release-notes-3.x.x.md#server-pro-3.2.2)

Release date: 2022-09-19

Image ID: `20e80bd600fb` (Community Edition Image ID: `8552c59519a7`)

#### Bugfixes

* Fixes TexLive package setup (non-sandboxed compiles) (https://github.com/overleaf/overleaf/issues/1044)

***

## [Server Pro 3.2.1](release-notes-3.x.x.md#server-pro-3.2.1)

Release date: 2022-08-26

Image ID: `3817bd0d07a4` (Community Edition Image ID: `31cc6bc2bfa7`)

#### Bugfixes

* Fixes source editor not being displayed (https://github.com/overleaf/overleaf/issues/1043)

***

## [Server Pro 3.2.0](release-notes-3.x.x.md#server-pro-3.2.0)

Release date: 2022-08-16

Image ID: `4db483917643` (Community Edition Image ID: `1bce84a47f1f`)

This new release of Server Pro includes several new features. It also requires updating Mongo version to `4.4`. Upgrade instructions are [available herearrow-up-right](https://github.com/overleaf/overleaf/wiki/Updating-Mongo-version). Please ensure you have a [database backuparrow-up-right](https://github.com/overleaf/overleaf/wiki/Backup-of-Data) before upgrading.

#### New Features

* User Activity and License Usage information (with a count of active users) is now displayed in the Admin Panel.
* [PDF Preview Detacharrow-up-right](https://www.overleaf.com/blog/new-feature-ready-set-detach).
* User Dictionary entries can now be deleted from the Editor Settings panel.
* TexLive 2022 is available for instances running [Sandboxed Compilesarrow-up-right](https://github.com/overleaf/overleaf/wiki/Server-Pro:-sandboxed-compiles). Check the [documentationarrow-up-right](https://github.com/overleaf/overleaf/wiki/Server-Pro:-sandboxed-compiles#changing-the-texlive-image) for instructions to upgrade. TexLive 2022 is also the default version for instances not running Sandboxed Compiles.

#### Bugfixes

* Fixed [history diff navigationarrow-up-right](https://github.com/overleaf/overleaf/issues/1035).

***

## [Server Pro 3.1.1](release-notes-3.x.x.md#server-pro-3.1.1)

Release date: 2022-08-10

Image ID: `eb5802bfd8a4` (Community Edition Image ID: `401c5a25016d`)

#### Bugfixes

* Fixes history diff navigation (https://github.com/overleaf/overleaf/issues/1035)

***

## [Server Pro 3.1.0](release-notes-3.x.x.md#server-pro-3.1.0)

Release date: 2022-05-17

Image ID: `699e7c990b0f` (Community Edition Image ID: `9c9fe33828a0`)

This release requires updating Mongo version to `4.2`. Upgrade instructions are [available herearrow-up-right](https://github.com/overleaf/overleaf/wiki/Updating-Mongo-version). Please ensure you have a [database backuparrow-up-right](https://github.com/overleaf/overleaf/wiki/Data-and-Backups) before upgrading.

#### New Features

* [Symbol Palettearrow-up-right](https://www.overleaf.com/learn/how-to/Using_the_Symbol_Palette_in_Overleaf)

#### Other changes

* TexLive 2021 is available for instances running [Sandboxed Compilesarrow-up-right](https://github.com/overleaf/overleaf/wiki/Server-Pro:-sandboxed-compiles). Check the [documentationarrow-up-right](https://github.com/overleaf/overleaf/wiki/Server-Pro:-sandboxed-compiles#changing-the-texlive-image) for instructions to upgrade.
* The path of the application inside the container has changed from `/var/www/sharelatex` to `/overleaf`; if you have bind mounts that use the old path, they will need to be updated.
* Many small improvements and bugfixes.

***

## [Server Pro 3.0.1](release-notes-3.x.x.md#server-pro-3.0.1)

Release date: 2021-10-05

Image ID: `5e87b3c5ad41` (Community Edition Image ID: `9155d8a13aaa`)

This major release includes migrations that update the database in a backwards incompatible format. **Please ensure you have a** [**database backup** arrow-up-right](https://github.com/overleaf/overleaf/wiki/Data-and-Backups) **before upgrading**, in case of roll-back you will not be able to read data in the new format.

This update brings general performance and stability improvements to the application, along with many small improvements and bugfixes.

We've recently updated the way we tag our docker images. In addition to `3.0.1`, we're also tagging the new version as `3` and `3.0`, representing the latest major and minor versions for the `3.x.x` branch respectively. These new tags will be updated again when a new minor or hotfix version is published.

`latest` tag won't be immediately updated to this new major version. If you're using a `docker-compose.yml` please update your `image` tag to `3`, `3.0` or `3.0.1`. [Toolkitarrow-up-right](https://github.com/overleaf/toolkit) users can continue using the [`bin/upgrade`arrow-up-right](https://github.com/overleaf/toolkit/blob/master/doc/upgrading.md) script as usual.

**Important**: before upgrading to this new major version you need to upgrade to version `2.7.1` first.

***

### Troubleshooting

<details>

<summary><strong>Duplicate Keys</strong></summary>

A migration may occasionally fail due to unexpected duplicate entries in a mongo collection.

</details>

<details>

<summary><strong>Duplicate keys in tags collection</strong></summary>

If upgrading from `2.7.1` to `3.0.1` fails with messages containing:

```
MongoError: Error during migrate "20190912145029_create_tags_indexes": E11000 duplicate key error collection: sharelatex.tags index: user_id_1_name_1 dup key: {<…>}
```

this means that one of your users has multiple tags/folders with the same name.

To recover, revert to your `2.7.1` backups and ask the user to make their tag/folder names unique. (The user id and specific tag name will be reported in the error message, so you can contact the affected user and mention the specific tag name that is problematic.) Then attempt the upgrade again.

You can also attempt to detect multiple tags in advance, before you upgrade, with the following aggregate:

```bash
docker exec -it mongo mongo
use sharelatex

db.tags.aggregate([
  {$group: {
    _id: {name: "$name", user_id: "$user_id"},
    count: {$sum: 1}
  }},
  {$match: {count: {$gt: 1}}},
  {$sort: {count: -1}}
])
```

If it returns no results, there are no duplicate tags, and the migration should succeed.

</details>

<details>

<summary><strong>Duplicate keys in contacts collection</strong></summary>

If you see the error:

```
MongoError: Error during migrate "20190912145001_create_contacts_indexes": E11000 duplicate key error collection: sharelatex.contacts index: user_id_1 dup key{<…>}
```

this indicates a similar problem in the `contacts` collection. You can check how many entries are affected with the following command:

```bash
docker exec -it mongo mongo
use sharelatex

db.contacts.aggregate([
  {$group: {
    _id: {user_id: "$user_id"},
    count: {$sum: 1}
  }},
  {$match: {count: {$gt: 1}}},
  {$sort: {count: -1}}
])
```

The contacts collection is a cache of names which appear as completions in the "Share Project" modal, it is not critical data. You can remove individual duplicate entries with the command:

```javascript
db.contacts.deleteOne({ "user_id" : ObjectId("...") })
```

where the ObjectId value should be taken from the list of duplicates. When the duplicate contacts have been removed, the migration should succeed.

</details>

<details>

<summary><strong>SAML initialisation error</strong></summary>

You might see a `cert is required` error when upgrading from Server Pro `2.6.2` or earlier if `SHARELATEX_SAML_CERT` [is not provided](saml-2.0.md#passing-keys-and-certificates).

If you come across the issue, please add the `SHARELATEX_SAML_CERT` value, and update your instance to `2.7.1` before attempting to upgrade to `3.x.x`.

</details>

***

Last updated 1 year ago

This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the [privacy policy](https://www.overleaf.com/legal).
