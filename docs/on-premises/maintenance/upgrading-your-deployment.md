---
icon: arrow-up-from-square
---

# Upgrading your deployment

{% hint style="danger" %}
It is important to ensure that you take a [consistent backup](data-and-backups/#performing-a-consistent-backup) **before** every major version upgrade to enable you to roll back should you require it.
{% endhint %}

The [ayakaleaf toolkit↗](https://github.com/ayaka-notes/toolkit) is a git repository, so it's easy to get new Toolkit features. Just run the `bin/upgrade` command and follow the on-screen prompts.

It is worth noting that the Docker image version (at `config/version`) is managed separately from the Toolkit code updates. Updating the Toolkit code will **not** automatically change the version of the Docker image that you are running. This means that in most cases, you are able to upgrade your Toolkit version without upgrading your deployment.

#### The `bin/upgrade` Script

When you run the `bin/upgrade` command, the script will check if there is an available update to the Toolkit code, and offer to update your Toolkit. You can always say no to this upgrade, and nothing will change.

If you do choose to update the Toolkit code, the script will then check if the _default_ Docker image version has changed, and offer to upgrade your local version file (at `config/version`) to match the new default.

If you do choose to switch versions, the script will then walk you through a process of shutting down the Docker services, taking a backup, and restarting the Docker services. Your old version file will be automatically copied to `config/__old-version`, just in case you need to roll back to that version of the Docker images.

{% hint style="info" %}
For air-gapped setups that manually import Docker images, please set `PULL_BEFORE_UPGRADE=false` in your `config/overleaf.rc` file.

Please check [here](../installation/air-gapped-offline-deployments.md) for more infomration on deploying in an air-gapped/offline environments.
{% endhint %}

### Upgrade path <a href="#upgrade-path" id="upgrade-path"></a>

If you are running an earlier version of Overleaf Community before v6.0.0, refer to the [official Overleaf documentation](https://docs.overleaf.com/on-premises/maintenance/upgrading-your-deployment#upgrade-path)  to complete the upgrade.

