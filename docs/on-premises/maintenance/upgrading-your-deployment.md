# Upgrading your deployment

{% hint style="danger" %}
It is important to ensure that you take a [consistent backup](data-and-backups/#performing-a-consistent-backup) **before** every major version upgrade to enable you to roll back should you require it.
{% endhint %}

The [Overleaf Toolkit↗](https://github.com/overleaf/toolkit) is a git repository, so it's easy to get new Toolkit features. Just run the `bin/upgrade` command and follow the on-screen prompts.

It is worth noting that the Docker image version (at `config/version`) is managed separately from the Toolkit code updates. Updating the Toolkit code will **not** automatically change the version of the Docker image that you are running. This means that in most cases, you are able to upgrade your Toolkit version without upgrading your deployment.

#### [The `bin/upgrade` Script](upgrading-your-deployment.md#the-bin-upgrade-script)

When you run the `bin/upgrade` command, the script will check if there is an available update to the Toolkit code, and offer to update your Toolkit. You can always say no to this upgrade, and nothing will change.

If you do choose to update the Toolkit code, the script will then check if the _default_ Docker image version has changed, and offer to upgrade your local version file (at `config/version`) to match the new default.

If you do choose to switch versions, the script will then walk you through a process of shutting down the Docker services, taking a backup, and restarting the Docker services. Your old version file will be automatically copied to `config/__old-version`, just in case you need to roll back to that version of the Docker images.

{% hint style="warning" %}
When performing an upgrade of Server CE/Pro, we recommend upgrading to the latest release of the deployed major version **before** upgrading to the latest release of the **next** major version. If your deployment is more than one major version behind latest, you will be required to perform a multi-stepped upgrade.

For example, if you're running 3.5.10, you'll need to upgrade to 3.5.13 -> Perform the Full Project History migration -> 4.2.9 -> 5.5.4.

You should **never** skip major versions (3.5.10 -> 5.5.4). If you are using the Toolkit, and are more than one major version behind latest, you must **not** use the `bin/upgrade` script as you will be need to perform a manual multi-stepped upgrade.
{% endhint %}

{% hint style="info" %}
For air-gapped setups that manually import Docker images, please set `PULL_BEFORE_UPGRADE=false` in your `config/overleaf.rc` file.

Please check [here](../air-gapped-offline-deployments.md) for more infomration on deploying in an air-gapped/offline environments.
{% endhint %}

### [Upgrade path](upgrading-your-deployment.md#upgrade-path)

The `bin/upgrade` command will always choose the most recent version of Server Pro/CE available to it at that time. If your upgrade cycle is infrequent, this could result in skipping major versions and potentially upgrading to a version you might not have expected.

When performing an upgrade we recommend upgrading to the latest release of the current major version before upgrading to the latest release of the next major version. For example, if you're currently running 3.3.2 and the latest version available is 5.3.1, the correct upgrade path would be:

{% stepper %}
{% step %}
### Step

3.3.2 → 3.5.13
{% endstep %}

{% step %}
### Step

3.5.13 → 4.2.9
{% endstep %}

{% step %}
### Step

4.2.9 → 5.5.1
{% endstep %}
{% endstepper %}

To avoid any upgrade issues we recommend consulting our [Release notes](/broken/pages/bec04e5dc7d926ef372820bf767af13f918b8166) prior to performing any upgrades as certain versions may require additional steps. Such as, making manual changes to the Toolkit, upgrading databases or running migration scripts.

If you haven't already done so, signing up to our [mailing list↗](https://mailchi.mp/overleaf.com/community-edition-and-server-pro) so that you can be notified when new versions/updates are released. This would allow you to schedule regular maintenance windows that closely follow our release schedule.

Last updated 4 months ago
