# Release notes 6.x.x

{% hint style="success" %}
The standard Server Pro license allows you to run the application in a production environment as well as one in a non-production/sandbox environment; it is highly recommended that you provision a non-production environment for testing.
{% endhint %}

### [Server Pro 6.0.1](release-notes-6.x.x.md#server-pro-6.0.1)

Release date: 2025-11-17

* Server Pro Image ID: `a339d58ea444`
* Community Edition Image ID: `719649cd32f8`
* Git Bridge Image ID: `38f569f6f277`

This release fixes several compile issues emerging after the latest `runc` updates.

{% hint style="info" %}
The **minimum** MongoDB version for Server CE/Pro 6.0.1 is now MongoDB 8.0. You can view our documentation about upgrading MongoDB [here](maintenance/updating-mongodb.md#upgrading-mongodb).
{% endhint %}

***

### [Server Pro 6.0.0](release-notes-6.x.x.md#server-pro-6.0.0)

Release date: 2025-10-30

* Server Pro Image ID: `579c87536b16`
* Community Edition Image ID: `21b21080312f`
* Git Bridge Image ID: `38f569f6f277`

#### [Binary file migration](release-notes-6.x.x.md#binary-file-migration)

This new release reduces the storage usage of binary files in half.

An online migration is included in version `5.5`, allowing for minimal downtime as part of the upgrade. Before upgrading to Server Pro `v6` make sure you're already running the latest version of Server Pro `v5.5` ([Release Notes 5.x.x](release-notes/release-notes-5.x.x/)) and have run the migration.

[See full migration instructionsarrow-up-right](release-notes/release-notes-5.x.x/binary-files-migration.md).

#### [MongoDB upgrade to v8](release-notes-6.x.x.md#mongodb-upgrade-to-v8)

This release bumps the minimum MongoDB version to `8.0`.

If you're currently using MongoDB `v6` or earlier, you'd need to update your versions one major version at a time (`v6 → v7 → v8`).

{% hint style="danger" %}
Please ensure you have a [databasearrow-up-right](maintenance/data-and-backups/) backup **before** upgrading. In case of roll-back, you will need to restore the database backup.

For instructions on how to upgrade MongoDB `v6 → v7 → v8` see our step-by-step guide [here](maintenance/updating-mongodb.md#example-upgrading-mongodb-from-6.0-to-7.0-toolkit-users).
{% endhint %}

#### [Redis upgrade to v7.4](release-notes-6.x.x.md#redis-upgrade-to-v7.4)

This release also bumps the minimum Redis version to `7.4`.

Update your `REDIS_IMAGE` in your `config/overleaf.rc` to `REDIS_IMAGE=7.4`.

#### [New Features](release-notes-6.x.x.md#new-features)

* Link sharing can now be disabled with `OVERLEAF_DISABLE_LINK_SHARING=true`.
* `OVERLEAF_MAINTENANCE_MESSAGE` and `OVERLEAF_MAINTENANCE_MESSAGE_HTML` are now available to customise the title and content of the Maintenance page.
* `OVERLEAF_USER_HARD_DELETION_DELAY` and `OVERLEAF_PROJECT_HARD_DELETION_DELAY` can be configured (in milliseconds) to modify the deleted users/projects expiration delay (defaults to 90 days).

#### [Bugfixes](release-notes-6.x.x.md#bugfixes)

* Fixed footer rendering with links.
* Improved error messages on SAML login errors.
* Fixed audit log entry not added when a user's admin state is updated on SSO login.
* Fixed History panel errors when TLS is enabled in Redis.
* Compilations can now be stopped when using non-sandboxed compiles.

#### [Other changes](release-notes-6.x.x.md#other-changes)

* All the links to the status page (set via `OVERLEAF_STATUS_PAGE_URL`) now use `HTTPS` and open in a new browser tab.
