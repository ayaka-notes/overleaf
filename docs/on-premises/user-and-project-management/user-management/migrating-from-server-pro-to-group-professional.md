---
hidden: true
icon: rectangle-pro
---

# Migrating from Server Pro to Group Professional

Switching from a self-hosted Server Pro instance to a new cloud-based Overleaf Group Professional subscription is a big change, so to make this process as smooth as possible we've put together the following guidance.

In general, we propose a three-month overlap period starting on your renewal date. This means that:

* Your existing Server Pro instance and your new Group Professional subscription will both be fully active.
* Your technical team can schedule time to get the Group Professional subscription set up and decide on the future of your on-premises deployment of Server Pro.
* Most importantly, your users will have ample time to copy their projects over to the new Overleaf Group Professional platform.

This quick guide will walk you through the key steps for this migration. Let’s get you started!

{% stepper %}
{% step %}
### Phase 1: Setup and Configuration

(Link: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/migrating-from-server-pro-to-group-professional#phase-1-setup-and-configuration)

* Overleaf will create your Group Professional subscription and add your Lead Administrator.
* Your group administrator will be able to enable [Managed Usersarrow-up-right](https://docs.overleaf.com/groups/user-management/managed-user-accounts), configure [Single Sign-On (SSO)arrow-up-right](https://docs.overleaf.com/groups/overleaf-group-single-sign-on/setting-up-group-sso), and [invite the end usersarrow-up-right](https://docs.overleaf.com/groups/user-management/how-to-add-and-remove-users).

{% hint style="warning" %}
Enabling Managed Users and implementing SSO is a required step for FedRAMP® LI-SaaS compliance. If your organization requires FedRAMP compliance, set up Managed Users and SSO prior to inviting end users.
{% endhint %}
{% endstep %}

{% step %}
### Phase 2: User Migration & Data Management

(Link: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/migrating-from-server-pro-to-group-professional#phase-2-user-migration-and-data-management)

This is the primary migration window and has the following responsibilities:

#### End-Users

* Users should migrate any projects they wish to keep from your Server Pro instance to their new accounts on [overleaf.comarrow-up-right](http://overleaf.com/). The process involves [exporting projectsarrow-up-right](https://www.overleaf.com/learn/how-to/Exporting_your_work_from_Overleaf) from Server Pro and [uploading themarrow-up-right](https://www.overleaf.com/learn/how-to/Uploading_a_project) to their account on [overleaf.comarrow-up-right](http://overleaf.com/). If a user doesn't already have an [overleaf.comarrow-up-right](http://overleaf.com/) account, they can register at [overleaf.com/registerarrow-up-right](http://overleaf.com/register).

{% hint style="warning" %}
Only the project source code (LaTeX and binary files) will be transferred through this export procedure. Any existing project settings, sharing settings, comments, tracked changes, etc. will NOT be transferred. Users will need to re-invite their collaborators after migration.
{% endhint %}

#### Technical Staff

* During this phase, your technical team should plan for post-migration handling of your on-premises Server Pro instance and its data.
* **Data Backup:** You can export all projects before decommissioning to create an archive that allows you to assist users who may have forgotten to migrate or download their work. Instructions: https://docs.overleaf.com/on-premises/maintenance/data-and-backups/exporting-projects
* **Server Pro Decommissioning:** After the migration window closes and your license key is disabled, you have two main options for the Server Pro instance itself (see next stepper).
{% endstep %}

{% step %}
### Server Pro Decommissioning Options

{% stepper %}
{% step %}
### Uninstall Server Pro Completely

Uninstalling will decommission Server Pro and remove the software entirely.
{% endstep %}

{% step %}
### Switch to Community Edition

Switching preserves the database of users and projects with full project history by converting the instance from Server Pro to Community Edition.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
The Community Edition does NOT include [Sandboxed Compilesarrow-up-right](https://docs.overleaf.com/on-premises#overview-of-server-pro-and-community-edition) nor [LDAP](/broken/pages/f4506677de6b63078c05a043c53577eefdcd1ce9)/[SAML](/broken/pages/0678ecc6373795657b07ffa4a4c4674a38832096). If you need to revert back to native authentication (username/password), see: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/migrating-to-ldap-or-saml#going-the-other-way-switching-from-ldap-saml-back-to-native-authentication

For a comparison of Server CE vs. Server Pro see: https://docs.overleaf.com/on-premises/welcome/server-pro-vs.-community-edition
{% endhint %}
{% endstep %}

{% step %}
### Phase 3: Server Pro Decommission

(Link: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/migrating-from-server-pro-to-group-professional#phase-3-server-pro-decommission)

* The Overleaf team will formally deactivate your Server Pro license key and will send confirmation once complete.
* At that point, perform one of the decommissioning actions described above: uninstall Server Pro completely or switch to Community Edition.
{% endstep %}
{% endstepper %}

Additional resources and links referenced above remain unchanged.
