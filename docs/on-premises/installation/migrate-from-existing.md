---
description: Migrate an existing Overleaf Toolkit deployment to Ayakaleaf Pro.
icon: u-turn-up-right
---

# Migrate from Existing

{% hint style="danger" %}
It is important to ensure that you take a [consistent backup](../maintenance/data-and-backups/#performing-a-consistent-backup) **before** every major version migration to enable you to roll back should you require it.
{% endhint %}

### Migrate from Overleaf Community

#### Case 01: From Overleaf Toolkit

If you are using the official Overleaf Toolkit for Overleaf Community, just add a file named `docker-compose.override.yml` with the following or similar content into the `overleaf-toolkit/config` directory:

{% code title="docker-compose.override.yml" %}
```yml
---
services:
    sharelatex:
        image: ghcr.io/ayaka-notes/overleaf-pro:X.x.x # change to specific version
```
{% endcode %}

To start your instance run:

```bash
bin/up
```

That's it! You're all set. Next, you can verify that your Ayakaleaf instance is running correctly and you can access the web interface. Once everything is working, continue with the [configuration](../configuration/overleaf-toolkit/) steps below to enable the advanced features like:

* [sandboxed-compiles.md](../configuration/overleaf-toolkit/sandboxed-compiles.md "mention")
* [authentication](../configuration/overleaf-toolkit/authentication/ "mention")
* [github-synchronisation.md](../configuration/overleaf-toolkit/github-synchronisation.md "mention")
* [zotero-integration.md](../configuration/overleaf-toolkit/zotero-integration.md "mention")

#### Case 02: From Docker Compose File

If you use a standalone `docker-compose.yml`, first migrate it to the Overleaf Toolkit. The Toolkit simplifies on-premises installation, upgrades, and maintenance.

Follow the [docker-compose.yml-to-toolkit-migration.md](../maintenance/docker-compose.yml-to-toolkit-migration.md "mention") to convert your existing deployment. Preserve your current configuration and data-volume paths during this migration.

After the Toolkit deployment is running, follow [#from-overleaf-toolkit](migrate-from-existing.md#from-overleaf-toolkit "mention") to switch its image to Ayakaleaf Pro. Start the instance with `bin/up`, then verify that you can access the web interface.

***

### Migrate from Overleaf Server Pro

If you are currently running a commercially licensed instance of [Overleaf Server Pro](https://www.overleaf.com/for/enterprises) and would like to migrate to Ayakaleaf Pro, please be aware that the migration may require some additional work because certain data formats (`templates`) may not be fully compatible. However, we would be happy to assist you. Please [open an issue](https://github.com/ayaka-notes/ayakaleaf-pro/issues) or contact us at [ayaka-notes@outlook.com](mailto:ayaka-notes@outlook.com), and we will help you migrate to our Ayakaleaf Pro free of charge.

***

### Migrate from Overleaf CEP

We frequently receive questions from users about whether they can migrate from [Overleaf CEP](https://github.com/yu-i-i/overleaf-cep) to Ayakaleaf Pro. In most cases, Overleaf CEP and Ayakaleaf Pro offer broadly equivalent functionality and remain data-compatible as of version 6.2.0. The two projects may release features at different times; for example, we may cherry-pick a feature from Overleaf CEP, and vice versa. Although our implementations of the same feature may differ slightly, there is generally no compelling reason to migrate.

If you would still like to migrate to or try Ayakaleaf Pro, please refer to: [#case-01-from-overleaf-toolkit](migrate-from-existing.md#case-01-from-overleaf-toolkit "mention"). The migration process is the same.

***

### Migrate from Overleaf SaaS

Unfortunately, migrating from the Overleaf SaaS platform to a self-hosted Ayakaleaf Pro instance can be considerably more difficult. At present, the only generally available method is to download each project as a ZIP archive and then upload it to your self-hosted Ayakaleaf Pro instance. This transfers only the current project files, which means you will _<mark style="color:$danger;">**lose**</mark>_:

* All project history and previous revisions
* All comments and tracked changes
* All Git metadata and commit history
* All GitHub synchronization links and settings
* All links between BibTeX files and third-party reference-management platforms

***

### Migrate from a Third-Party Overleaf Fork

Ayakaleaf Pro may not support features that are specific to a particular third-party Overleaf fork. Once a fork diverges significantly from the upstream Overleaf codebase—or introduces changes without maintaining upstream compatibility—merging subsequent Overleaf releases can become extremely difficult. You may still try the migration method described above, but compatibility is not guaranteed, and we may be unable to provide assistance or technical support for migrations from unsupported forks.



