---
icon: file-export
---

# Exporting projects

In Server Pro and Community Edition `5.4.0` we have included a script that allows Administrators to export all user projects (including those still visible in the **Deleted** and **Trashed** folders) to a directory on disk.

{% hint style="info" %}
The output from running this script is the same as manually downloading a Zip of all projects from the user's project dashboard. The script will flush any pending changes before starting the download to ensure that the export contains the latest version of the project.
{% endhint %}

### Limitations

The export script has the following limitations:

* No project settings, such as the TeX Live image name or compiler, are exported. These must be set when the project is uploaded to the user's account.
* Exported projects don't contain any version history.
* No collaborator information is preserved. Projects will need to be reshared. If using link-sharing, View and Edit links will be regenerated (they won't be the same as before).
* Any comments and tracked change information won't be exported.
* Project chat history won't be exported.

{% hint style="danger" %}
This script is **not** designed to replace a full system backup. To ensure you can recover your instance in a disaster recovery sceneario we **strongly** recommend taking a [consistent backup](https://docs.overleaf.com/on-premises/maintenance/#performing-a-consistent-backup).
{% endhint %}

### **Flags**

| Name           | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `--help`       | Show help                                                                       |
| `--user-id`    | The user ID (required unless using `--export-all` or `--project-id`)            |
| `--project-id` | Export a single project (**cannot** be used with `--user-id` or `--export-all`) |
| `--list`       | List user's projects (**cannot** be used with `--output`)                       |
| `--output`     | Output zip file (for single export operations)                                  |
| `--export-all` | Export all users' projects (requires `--output-dir`)                            |
| `--output-dir` | Directory for storing all users' export files                                   |
| `--log-level`  | Log level s supported: `trace`\|`debug`\|`info`\|`warn`\|`error`\|`fatal`       |

### **Usage**

Use the following command to export projects for all users:

{% code overflow="wrap" %}
```bash
# Overleaf Toolkit users
$ bin/docker-compose exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/export-user-projects.mjs --export-all --output-dir=/var/lib/overleaf/data/exports"

# Legacy docker-compose.yml users
docker exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/export-user-projects.mjs --export-all --output-dir=/var/lib/overleaf/data/exports"
```
{% endcode %}

{% hint style="info" %}
If you are running Server Pro or Community Editition <= 3.5.13 you will need to update the above example to use the **`export-legacy-user-projects.js`** script.
{% endhint %}

### **Completion**

Once the export is completed, you can access the files via the directory on the host that is bind-mounted to **/var/lib/overleaf** in your **docker-compose.yml** file or the `OVERLEAF_DATA_PATH` environment variable in the **config/overleaf.rc** file if you are using the Toolkit.

{% hint style="info" %}
Overleaf currently allows for duplicate project names. If a user's project contains a duplicate, these projects will still be added to the user's Zip export, but when extracted, only one version will be present. On Linux, `unzip -B` will write files with the same name as backup files instead of overwriting.
{% endhint %}
