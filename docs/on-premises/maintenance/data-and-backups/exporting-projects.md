# Exporting projects

{% code title="Toolkit" %}
```bash
bin/docker-compose exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/export-user-projects.mjs --export-all --output-dir=/var/lib/overleaf/data/exports"
```
{% endcode %}

{% hint style="info" %}
If you are running Server Pro or Community Edition <= 3.5.13 you will need to update the above example to use the `export-legacy-user-projects.js` script.
{% endhint %}

## Legacy docker-compose.yml users

{% code title="Legacy docker-compose" %}
```bash
docker exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/export-user-projects.mjs --export-all --output-dir=/var/lib/overleaf/data/exports"
```
{% endcode %}

## Completion

Once the export is completed, you can access the files via the directory on the host that is bind-mounted to **/var/lib/overleaf** in your **docker-compose.yml** file or the `OVERLEAF_DATA_PATH` environment variable in the **config/overleaf.rc** file if you are using the Toolkit.

{% hint style="info" %}
Overleaf currently allows for duplicate project names. If a user's project contains a duplicate, these projects will still be added to the user's Zip export, but when extracted, only one version will be present. On Linux, `unzip -B` will write files with the same name as backup files instead of overwriting.
{% endhint %}

For more details, see: https://docs.overleaf.com/on-premises/maintenance/data-and-backups/exporting-projects#completion

***

This documentation links to the Overleaf privacy policy: https://www.overleaf.com/legal
