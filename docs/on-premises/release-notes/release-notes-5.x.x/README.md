# Release notes 5.x.x

```bash
MONGO_IMAGE=my.docker.hub/mongo
MONGO_VERSION=6.0-custom
```

Please ensure you have a consistent database backup before upgrading.

### Redis AOF Persistence enabled by default

AOF (Append Only File) persistence is now the recommended configuration for Redis persistence.

Redis documentation in the Overleaf wiki: https://github.com/overleaf/overleaf/wiki/Data-and-Backups/#redis

Toolkit users have AOF persistence enabled by default for new installs. Existing users are recommended to follow the instructions on the official documentation to switch to AOF:

https://redis.io/docs/latest/operate/oss\_and\_stack/management/persistence/#how-i-can-switch-to-aof-if-im-currently-using-dumprdb-snapshots

### Deprecation for docker-compose v1

`docker-compose` v1 has reached its End Of Life in July 2023 (https://docs.docker.com/compose/migrate/). Support for `docker-compose` v1 in the Overleaf Toolkit will be dropped with the release of Server Pro 5.2. We recommend upgrading to Docker Compose v2 before then.

### New features

* SAML: multiple certificates are now supported. You can now set a list of comma-separated certificates in `OVERLEAF_SAML_SIGNING_CERT` and `OVERLEAF_SAML_CERT`
* CSP (Content Security Policy) is now enabled by default. It can be disabled adding `OVERLEAF_CSP_ENABLED=false` to `config/variables.env`.

### Bugfixes

* Fixes a bug where projects created before enabling the templates feature couldn't be published as templates.
* Fixed spacing in project list footer.
* Fixed post-login redirection when login after clicking the "Log in" button in the header.

### Other changes

* Removed support for running LaTeX compiles with Docker-In-Docker in Server Pro. Sandboxed compiles using "sibling" containers is not affected by this.
* TeX Live images, as used for Sandboxed Compiles, need to be pulled outside of Server Pro now. All customers have been granted read access to `quay.io/sharelatex/texlive-full`.

The Overleaf Toolkit is pulling all configured images as part of `bin/up`. You can disable the automatic pulling using `SIBLING_CONTAINERS_PULL=false` in your `config/overleaf.rc` file.

* Stricter and faster graceful shutdown procedure for the Server Pro container
* The environment variable `SYNCTEX_BIN_HOST_PATH` is no longer used by the application
* We are sunsetting window properties like `window.project_id`. If you need access to any of these, please reach out to support: mailto:support@overleaf.com
* Significant reduction in Docker image size for Server Pro and CE
* Security updates to the base image and installed dependencies.
* Minor improvements and bugfixes.

***

## Server Pro 5.0.7

Release date: 2024-07-12

* Server Pro Image ID: `a8c301474a4d`
* Community Edition Image ID: `6f3e55a67fd5`
* Git Bridge Image ID: `455a8c0559a4`

This is a security release. We added stricter controls for accessing project invite details and locked down access to files via the LaTeX compilation service.

We strongly recommend turning on the Sandboxed Compiles feature in Server Pro: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/sandboxed-compiles

***

## Server Pro 5.0.6

Release date: 2024-06-20

* Server Pro Image ID: `c9de60b06959`
* Community Edition Image ID: `46bb44d4215d`
* Git Bridge Image ID: `455a8c0559a4`

This is a security release. We added stricter controls for creating projects from ZIP URLs.

***

## Server Pro 5.0.5

Release date: 2024-06-11

* Server Pro Image ID: `60da5806f83e`
* Community Edition Image ID: `46bb44d4215d`
* Git Bridge Image ID: `455a8c0559a4`

This is a security release. We added stricter controls to prevent arbitrary CSS loading in the project editor.

***

## Server Pro 5.0.4

Release date: 2024-05-24

* Server Pro Image ID: `b0db0405a7ce`
* Community Edition Image ID: `abcec6efbbf7`
* Git Bridge Image ID: `455a8c0559a4`

This release provides security updates, bugfixes, and performance enhancements, including:

* Stricter controls to prevent arbitrary JavaScript execution in the browser.
* Updated libraries to enhance security and performance.

***

## Server Pro 5.0.3

Release date: 2024-04-24

* Server Pro Image ID: `dc88a9ade14d`
* Community Edition Image ID: `b4712d596c75`
* Git Bridge Image ID: `455a8c0559a4`

This release builds up on 5.0.2 and includes the second revision of the recovery process for doc versions.

If you never ran Server Pro version 5.0.1 or Community Edition version 5.0.1, or you started a brand new instance with 5.0.1, you do not need to run this recovery process. Please see the Bugfixes section for Server Pro 5.0.2 below for details on the need for a recovery and follow the updated wiki page on the recovery process: https://docs.overleaf.com/on-premises/release-notes/release-notes-5.x.x/doc-version-recovery

***

## Server Pro 5.0.2 (Retracted)

⚠️ 2024-04-22: We are retracting version 5.0.2. We have identified a few corner cases in the recovery procedure for docs.

2024-04-24: Server Pro version 5.0.3 sports fixes for the previously identified corner cases.

Release date: 2024-04-22

* Server Pro Image ID: `06eed5680340`
* Community Edition Image ID: `9f018f899ba5`
* Git Bridge Image ID: `455a8c0559a4`

Security release Server Pro 5.0.2 is a security release for the application runtime.

The Node.js runtime has been upgraded to `18.20.2`. Check their release notes for more information:

* https://nodejs.org/en/blog/release/v18.20.1
* https://nodejs.org/en/blog/release/v18.20.2

### Bugfixes

* Fixes database migration that resulted in the loss of doc versions. These are used by the history system and their loss resulted in the history system skipping over updates effectively resulting in no further changes to the history view and git-integration. This release fixes the database migration and also sports a recovery process for instances that ran release 5.0.1. If you ran version 5.0.1, please take a look at the dedicated doc version recovery process.
* Fixes `references` and `templates` services on Docker 26 IPv6.

### Other changes

* Adds `bin/flush-history-queues` and `bin/force-history-resyncs` utility scripts.

***

## Server Pro 5.0.1 (Retracted)

⚠️ 2024-04-18: We have identified a critical bug in a database migration that causes data loss. Please defer upgrading to release 5.0.1 until further notice.

2024-04-24: Server Pro 5.0.3 has been released with a fix and recovery process that does not need access to a backup.

Release date: 2024-04-02

* Server Pro Image ID: `0d28770b4692`
* Community Edition Image ID: `ee69bf0baddf`
* Git Bridge Image ID: `455a8c0559a4`

This major release includes the following changes:

* Required database upgrade from MongoDB 4 to MongoDB 5
* Rebranding of `SHARELATEX_*` to `OVERLEAF_*` environment variables
* Rebranding of filesystem paths from ShareLaTeX brand to Overleaf brand

Important: the Toolkit will help migrating your configuration, please follow the prompts of `bin/upgrade`.

### MongoDB upgrade to v5

MongoDB 4.4 has reached end of life on February 2024. All customers should upgrade to MongoDB 5.0 before upgrading to the 5.0 release line: https://docs.overleaf.com/on-premises/maintenance/updating-mongodb

The release also includes migrations that update the database in a backwards incompatible format.

Please ensure you have a consistent database backup before upgrading. In case of roll-back, you will need to restore the database backup. Server Pro 4.x is not capable of reading the new format, which can result in data-loss or broken projects.

### Configuration changes

Environment variables have been rebranded from `SHARELATEX_*` to `OVERLEAF_*`. Overleaf Toolkit users should be prompted to perform the migration when running `bin/upgrade`, and warnings will be printed when trying to run the Overleaf instance with the incorrect configuration.

Filesystem paths have also been rebranded from ShareLaTeX brand to Overleaf brand:

* `/var/lib/sharelatex` -> `/var/lib/overleaf`
* `/var/log/sharelatex` -> `/var/log/overleaf`
* `/etc/sharelatex` -> `/etc/overleaf`

Filesystem changes are automatically handled by the Overleaf Toolkit. Otherwise, make sure bind-mount targets are updated to refer to the Overleaf equivalent, e.g.

Before:

```yaml
volumes:
    - /my/docker-host/path:/var/log/sharelatex
```

After:

```yaml
volumes:
    - /my/docker-host/path:/var/log/overleaf
```

### New features

* Added support for using IAM credentials when using AWS S3 for project/history files
* Server Pro will refuse to start when using an older version of MongoDB

### Bugfixes

* Fixes a scenario in which the share project modal doesn't display the link-sharing links immediately after turning on the feature

### Other changes

* All services are now using IPv4 in the container
* Container image upgrade from Ubuntu 20.04 to 22.04 LTS
* Security updates to the base image and installed packages, along with improvements and bugfixes.

***

Related:

* Previous: https://docs.overleaf.com/on-premises/release-notes/release-notes-6.x.x
* Next: https://docs.overleaf.com/on-premises/release-notes/release-notes-5.x.x/binary-files-migration

Last updated 1 month ago

This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the privacy policy: https://www.overleaf.com/legal
