# Table of contents

* [Welcome](README.md)
  * [Features and Copyright](readme/features-and-copyright.md)
  * [Overleaf Pro vs. Server Pro](readme/community-edition-vs-server-pro.md)
  * [Hidden Pages](readme/hidden-pages.md)

## Getting started

* [Before you start](getting-started/before-you-start.md)
* [Requirements](getting-started/requirements/README.md)
  * [Skills needed](getting-started/requirements/skills-needed.md)
  * [Hardware requirements](getting-started/requirements/hardware-requirements.md)
  * [Software requirements](getting-started/requirements/software-requirements.md)
  * [Setup Docker](getting-started/requirements/setup-docker.md)
* [Microservices](getting-started/microservices.md)
* [Pro infrastructure](getting-started/cep-infrastructure.md)
* [What is the Overleaf Toolkit?](getting-started/what-is-the-overleaf-toolkit.md)

## installation

* [Introduction](installation/introduction.md)
* [Using GitHub Codespace](installation/using-the-github-codespace.md)
* [Using the Toolkit](installation/using-the-toolkit/README.md)
  * [1. Download the Toolkit](installation/using-the-toolkit/1.-download-the-toolkit.md)
  * [2. Familiarize yourself with the Toolkit](installation/using-the-toolkit/2.-familiarize-yourself-with-the-toolkit.md)
  * [3. Initialize the configuration](installation/using-the-toolkit/3.-initialize-the-configuration.md)
  * [4. Get Overleaf CEP Images](installation/using-the-toolkit/4.-get-overleaf-cep-images.md)
  * [5. Personalizing your instance](installation/using-the-toolkit/5.-personalizing-your-instance.md)
  * [6. Post-installation tasks](installation/using-the-toolkit/6.-post-installation-tasks.md)
* [Air-gapped/offline deployments](installation/air-gapped-offline-deployments.md)
* [Upgrading TeX Live](installation/upgrading-tex-live.md)

## Configuration

* [Overleaf Toolkit](configuration/overleaf-toolkit/README.md)
  * [Files and locations](configuration/overleaf-toolkit/files-and-locations.md)
  * [Toolkit settings](configuration/overleaf-toolkit/toolkit-settings.md)
  * [Environment variables](configuration/overleaf-toolkit/environment-variables.md)
  * [Public Access](configuration/overleaf-toolkit/public-access.md)
  * [Authentication](configuration/overleaf-toolkit/authentication/README.md)
    * [OIDC Authentication](configuration/overleaf-toolkit/authentication/oidc-authentication.md)
    * [SAML Authentication](configuration/overleaf-toolkit/authentication/saml-authentication.md)
    * [LDAP Authentication](configuration/overleaf-toolkit/authentication/ldap-authentication.md)
  * [Sandboxed Compiles](configuration/overleaf-toolkit/sandboxed-compiles.md)
  * [Git integration](configuration/overleaf-toolkit/git-integration.md)
  * [Templates](configuration/overleaf-toolkit/templates.md)
  * [External URL](configuration/overleaf-toolkit/external-url.md)
  * [Logging](configuration/overleaf-toolkit/logging.md)
  * [TLS proxy](configuration/overleaf-toolkit/tls-proxy.md)
  * [Branding](configuration/overleaf-toolkit/branding.md)
  * [Localization](configuration/overleaf-toolkit/localization.md)
  * [Email delivery](configuration/overleaf-toolkit/email-delivery.md)
  * [Password restrictions](configuration/overleaf-toolkit/password-restrictions.md)
  * [Redis](configuration/overleaf-toolkit/redis.md)
  * [S3](configuration/overleaf-toolkit/s3.md)

## Maintenance

* [docker-compose.yml to Toolkit migration](maintenance/docker-compose.yml-to-toolkit-migration.md)
* [Upgrading your deployment](maintenance/upgrading-your-deployment.md)
* [Data and backups](maintenance/data-and-backups/README.md)
  * [Exporting projects](maintenance/data-and-backups/exporting-projects.md)
* [Extending TeX Live](maintenance/extending-tex-live.md)
* [Horizontal scaling](maintenance/horizontal-scaling.md)
* [S3 migration](maintenance/s3-migration.md)
* [Updating MongoDB](maintenance/updating-mongodb.md)

## User and project management

* [Roles and permissions](user-and-project-management/roles-and-permissions.md)
* [User management](user-and-project-management/user-management/README.md)
  * [Username migration](user-and-project-management/user-management/username-migration.md)
  * [Migrating to LDAP or SAML](user-and-project-management/user-management/migrating-to-ldap-or-saml.md)
  * [Migrating from Server Pro to Group Professional](user-and-project-management/user-management/migrating-from-server-pro-to-group-professional.md)
* [Project management](user-and-project-management/project-management/README.md)
  * [Bulk transfer of project ownership](user-and-project-management/project-management/bulk-transfer-of-project-ownership.md)

## Support

* [Project limits](support/project-limits.md)
* [Troubleshooting](support/troubleshooting.md)
* [Getting help](support/getting-help.md)
* [Support guides](support/support-guides/README.md)
  * [Using templates as an individual](support/support-guides/using-templates-as-an-individual.md)
  * [(v5.0.1 Migration) Doc version recovery](support/support-guides/doc-version-recovery.md)
  * [(v5.5.7 Migration) Binary files migration](support/support-guides/v5.5.7-migration-binary-files-migration.md)
  * [(v3.5.13 Migration)  Full project history migration](support/support-guides/full-project-history-migration.md)
