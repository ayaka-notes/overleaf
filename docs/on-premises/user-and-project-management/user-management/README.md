# User management

## Creating an administrator user

Overleaf Toolkit deployments:

{% code title="Overleaf Toolkit" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/create-user --admin --email=joe@example.com"
```
{% endcode %}

Legacy docker-compose.yml deployments:

{% code title="Legacy docker-compose" %}
```bash
$ docker exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/create-user --admin --email=joe@example.com"
```
{% endcode %}

The command will create a user with the provided email address if they don't already exist, and make them an administrator. The command output includes a URL to visit where you can set the password for this user and log in for the first time.

{% hint style="info" %}
For a programmatic approach you can use the same script to create regular users as well as administrators. For regular users omit the --admin flag.
{% endhint %}

If you use internal accounts for authentication and need to elevate an existing user to an instance admin or revoke admin permissions, do the following:

{% stepper %}
{% step %}
### Via the Admin UI

* Log in as an existing administrator.
* Click Admin -> Manage Users.
* Search for the user and click on their email address.
* Scroll down to the Site Admin section and click the (show) link.
* Check the box Is Site Admin.
* Click Save to finish.
{% endstep %}
{% endstepper %}

***

## Deleting users

As explained in our guide on [understanding license usage](/broken/pages/67a3d6166ad54d8b596d81da20ce20e3269c0955), it is generally advisable not to delete accounts unless they are no longer required. Deleting an account removes the account and causes collaborators to lose access to projects. There is currently no way to deactivate accounts — they either exist with their data retained or are deleted.

By default, accounts are soft-deleted. For information about permanently removing users from your instance see `ENABLE_CRON_RESOURCE_DELETION` in the [Environment variables](../../environment-variables.md) guide.

{% hint style="info" %}
Accounts are soft-deleted by default. See `ENABLE_CRON_RESOURCE_DELETION` for permanent deletion behavior.
{% endhint %}

### Via Admin -> Manage Users

{% stepper %}
{% step %}
* Log in as an administrator.
* Click Admin -> Manage Users.
* Search for the user and check the box next to their email address.
* Click the bin icon.
* Click Delete to confirm.
{% endstep %}
{% endstepper %}

### Via the command line

User accounts (and their projects) can be deleted using the following commands.

Overleaf Toolkit deployments:

{% code title="Overleaf Toolkit" %}
```bash
$ bin/docker-compose exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/delete-user.mjs --email=joe@example.com"
```
{% endcode %}

Legacy docker-compose.yml deployments:

{% code title="Legacy docker-compose" %}
```bash
$ docker exec sharelatex /bin/bash -ce "cd /overleaf/services/web && node modules/server-ce-scripts/scripts/delete-user.mjs --email=joe@example.com"
```
{% endcode %}

{% hint style="danger" %}
The deletion script uses a hard-coded force option that ensures deletion proceeds even if the account deletion email fails to send (e.g., when the user's email is no longer in service).
{% endhint %}

{% hint style="info" %}
Since version 5.5.0, the option --skip-email can be used to prevent sending an informative email to the deleted user.
{% endhint %}

***

## Restoring a soft-deleted user

If a user has only been soft-deleted, you can restore their account and projects.

{% stepper %}
{% step %}
* Log in as an administrator.
* Click Admin -> Manage Users.
* Search for the user you want to restore.
* Click the Display deleted users button.
* Click on the deleted user's email address.
* Click Recover This Account.
* Click Recover to confirm.
{% endstep %}
{% endstepper %}

{% hint style="danger" %}
When ENABLE\_CRON\_RESOURCE\_DELETION is set to true, soft-deleted accounts can be restored within a 90-day window. After 90 days, account recovery is not possible.
{% endhint %}

***

## Counting users

You can obtain user counts via the admin UI at https://you-instance-url/admin/user#license. For programmatic checks and exports, the following examples may help.

Total number of users:

{% code title="Total number of users" %}
```bash
echo 'db.users.countDocuments()' | docker exec -i mongo mongosh --quiet localhost/sharelatex
# overleaf [direct: primary] sharelatex> 16
```
{% endcode %}

Total number of users using the metrics endpoint:

{% code title="Num active users from metrics" %}
```bash
docker exec sharelatex curl http://127.0.0.1:3000/metrics | grep num_active_users
# # HELP num_active_users num_active_users
# # TYPE num_active_users gauge
# num_active_users{app="web-api",host="b3ae4ff549d8"} 16
```
{% endcode %}

Total number of active users (example: users active within last 365 days):

{% code title="Total number of active users" %}
```bash
echo 'db.users.countDocuments({ lastActive: { $gte: new Date(new Date().getTime() - (365 * 24 * 60 * 60 * 1000)) } })' | docker exec -i mongo mongosh --quiet localhost/sharelatex
# overleaf [direct: primary] sharelatex> 10
```
{% endcode %}

***

## Updating user account information

How account updates are performed depends on whether SSO is enabled.

* If SSO is not used:
  * Administrators can modify user account information via Admin -> Manage Users (email, first name, last name, and generate a password reset link).
  * Regular users can update their own details via Account -> Account Settings (including changing password and generating Git authentication tokens).
* If SSO is used:
  * Server Pro can be configured to update a user's first and last name during login based on the authentication system.
  * When OVERLEAF\_SAML\_UPDATE\_USER\_DETAILS\_ON\_LOGIN or OVERLEAF\_LDAP\_UPDATE\_USER\_DETAILS\_ON\_LOGIN are true, the user details form on https://your-instance-url/user/settings is disabled and first/last name can only be set in your identity management system.

For more details see:

* SAML 2.0 configuration: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/saml-2.0
* LDAP configuration: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/ldap

***

Last updated 4 months ago

This documentation page contains links to external guides and configuration pages. All links and query parameters are preserved as in the original content.
