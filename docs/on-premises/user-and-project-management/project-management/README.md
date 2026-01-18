---
icon: rectangle-history
---

# Project management

### Viewing a projects audit log

Administrators can see an **Audit Log** for each project. This audit log shows events such as when link-sharing changed between private/token-based, when invites were sent/accepted and when a user joined the project using a token. Administrators can view these logs on a per-project basis via **Your Instance** -> **Admin** -> **Manage Users** then:

* Search for the user
* Click the **Projects** tab
* Select a project
* Click on the (i) icon
* Click the **Audit Log** tab

If a project is shared with a named collaborator (using their email address), once the recipient has joined, they will be listed on the Share modal with their permission and visible to the project owner. This information will also be shown to Administrators when viewing the Project Info tab for the project via the admin panel.

### Recovering deleted documents

1. Log in using your administrator credentials
2. Click **Admin** and select **Manage Users**
3. Using the search field, enter the email of the user you want to restore the doc for
4. Click their email address in the list of returned results to open their user info page
5. Click the **Projects** tab and use the search field to search for the project
6. Click on the information icon next to the project name to open the **Project Info**
7. Click on the **Deleted Docs** tab
8. Click on the **Undelete** button next to the deleted doc to restore it back to the users project.

The restored file will take the following format: `FILENAME-TIMESTAMP.EXTENSION`. For example, a restored version of `main.tex` will be restored to the root of the project with the file name `main-2024-02-23-130441542.tex`.

### Transferring ownership of a project

The admin panel in Server Pro has a dedicated page per project. You can either get to it by searching for the user on "/admin/user", then going to their **Projects** tab, finding the project in the list and clicking on the infomration icon; or by directly navigating to the page with a known project-id [**https://your-instance-url/admin/project/**](https://your-instance-url/admin/project/). On the project info page, you can find a **Transfer Ownership** button, which opens a modal where you can specify any user as the new owner. The new owner does not need to be an existing collaborator on the project.

{% hint style="info" %}
Note that the previous owner will be added as a collaborator with read-and-write access to the project as part of the ownership transfer process.
{% endhint %}

### Updating project compile timeout&#x20;

The default compile timeout for projects is currently set to 180 seconds. Changing this value is possible and requires a two-step process.

First, edit the **config/variables.env** file and add the `COMPILE_TIMEOUT`environment variable and set it's value to the desired timeout in seconds. For example, `COMPILE_TIMEOUT=300` for 5 minutes.

{% hint style="danger" %}
It's not worth pushing the timeout past 10 minutes. If you do, you'll most likely hit a timeout in another component of the application.
{% endhint %}

Once this change has been made, you'll need to recreate the **sharelatex** container by running the `bin/up -d`command.

Setting this environment variable will update the timeout value for new users only it **won't** be applied in retrospect to existing users as it is populated when the user is first created.

To adjust the timeout for existing users, you'll need to change each user record in the database. We advise being very cautious about doing this, and recommend taking a consistent backup before making any changes.

You can find information about performing back-ups [here](../../maintenance-1/data-and-backups/).

To update the compile timeout value on all existing users you'll need to run the following shell command on the Docker host:

{% code overflow="wrap" %}
```bash
echo 'db.users.updateMany({}, {$set: {"features.compileTimeout": <value>}})' | docker exec -i mongo mongosh --quiet localhost/sharelatex
```
{% endcode %}

You will need to substitute `<value>` in the above query with the desired timeout value in seconds.

After the command completes, you should see an acknowledgement with the number of modified records. You can then type exit and then press the enter key to return to the host shell.

### Tracking project access

It is possible to see who and when a project is loaded with the following command:

{% code overflow="wrap" %}
```bash
docker exec sharelatex bash -c 'grep "join project request" /var/log/overleaf/web.log'
```
{% endcode %}

This will give both the `timestamp`, `user_id` and `project_id`.
