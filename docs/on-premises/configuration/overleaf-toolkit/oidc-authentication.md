---
icon: id-card-clip
---

# OIDC Authentication

Available in Overleaf Extended CE is the ability to use a OpenID Connect (OIDC) server to manage users. The information in this page is valid for both Overleaf Toolkit Users and legacy `docker-compose.yml` users.

### Configuration

Internally, Overleaf OIDC module uses the [passport-openidconnect](https://github.com/jaredhanson/passport-openidconnect) library. If you are having issues configuring OpenID Connect, it is worth reading the README for `passport-openidconnect` to get a feel for the configuration it expects.

The environment variable `EXTERNAL_AUTH` is required to enable the OIDC authentication module. This environment variable specifies which external authentication methods are activated. The value of this variable is a list. If the list includes `oidc` then OIDC authentication will be activated.

For example: `EXTERNAL_AUTH=ldap oidc`

When using the OIDC authentication method, a user is redirected to the Identity Provider (IdP) authentication site. If the IdP successfully authenticates the user, the Overleaf users database is checked for a record containing a `thirdPartyIdentifiers` field structured as follows:

```
thirdPartyIdentifiers: [
  {
    externalUserId: "...",
    externalData: null,
    providerId: "..."
  }
]
```

The `externalUserId` must match the user ID in the profile returned by the IdP server (see the `OVERLEAF_OIDC_USER_ID_FIELD` environment variable), and `providerId` must match the ID of the OIDC provider (see the `OVERLEAF_OIDC_PROVIDER_ID`).

If no matching record is found, the database is searched for a user with the primary email address matching the email in the IdP user profile:

* If such a user is found, the `thirdPartyIdentifiers` field is updated.
* If no matching user is found and JIT account creation is not disabled, a new user is created with the email address and `thirdPartyIdentifiers` from the IdP profile.

In both cases, the user is said to be 'linked' to the external OIDC user. The user can be unlinked from the OIDC provider on the `/user/settings` page.

#### Environment Variables

The values of the following five required variables can be found using `.well-known/openid-configuration` endpoint of your OpenID Provider (OP).

* `OVERLEAF_OIDC_ISSUER` **(required)**
* `OVERLEAF_OIDC_AUTHORIZATION_URL` **(required)**
* `OVERLEAF_OIDC_TOKEN_URL` **(required)**
* `OVERLEAF_OIDC_USER_INFO_URL` **(required)**
* `OVERLEAF_OIDC_LOGOUT_URL` **(required)**

The values of the following two required variables will be provided by the admin of your OP

* `OVERLEAF_OIDC_CLIENT_ID` **(required)**
* `OVERLEAF_OIDC_CLIENT_SECRET` **(required)**
* `OVERLEAF_OIDC_SCOPE`
  * Default: `openid profile email`
* `OVERLEAF_OIDC_PROVIDER_ID`
  * Arbitrary ID of the OP, defaults to `oidc`.
* `OVERLEAF_OIDC_PROVIDER_NAME`
  * The name of the OP, used in the `Linked Accounts` section of the `/user/settings` page, defaults to `OIDC Provider`.
* `OVERLEAF_OIDC_IDENTITY_SERVICE_NAME`
  * Display name for the identity service, used on the login page (default: `Log in with $OVERLEAF_OIDC_PROVIDER_NAME`).
* `OVERLEAF_OIDC_PROVIDER_DESCRIPTION`
  * Description of OP, used in the `Linked Accounts` section (default: `Log in with $OVERLEAF_OIDC_PROVIDER_NAME`).
* `OVERLEAF_OIDC_PROVIDER_INFO_LINK`
  * `Learn more` URL in the OP description, default: no `Learn more` link in the description.
* `OVERLEAF_OIDC_PROVIDER_HIDE_NOT_LINKED`
  * Do not show OP on the `/user/settings` page, if the user's account is not linked with the OP, default `false`.
* `OVERLEAF_OIDC_USER_ID_FIELD`
  * The value of this attribute will be used by Overleaf as the external user ID, defaults to `id`. Other possible reasonable values are `email` and `username` (corresponding to `preferred_username` OIDC claim).
* `OVERLEAF_OIDC_ALLOWED_EMAIL_DOMAINS`
  * Restricts Just-in-Time (JIT) account creation for users authenticating via OIDC. If set to a comma-separated list of domain names, a new account will be created only if the domain of the user's email address matches one in the listed domains. If the domain does not match, an admin must manually create the user account using the OIDC user’s email address, with either a strong random password or, preferably, without the `hashedPassword` field at all. Domain names may include a leading `*.` wildcard to match subdomains.
    * Example: To allow JIT account creation for users with email address like `name@example.com` and `name@math.example.com`:\
      `OVERLEAF_OIDC_ALLOWED_EMAIL_DOMAINS=example.com, *.example.com`
    * Example: To completely disable JIT account creation:\
      `OVERLEAF_OIDC_ALLOWED_EMAIL_DOMAINS=`
* `OVERLEAF_OIDC_UPDATE_USER_DETAILS_ON_LOGIN`
  * If set to `true`, updates the user `first_name` and `last_name` field on login, and disables the user details form on `/user/settings` page.
* `OVERLEAF_OIDC_IS_ADMIN_FIELD` and `OVERLEAF_OIDC_IS_ADMIN_FIELD_VALUE`
  * When both environment variables are set, the login process updates `user.isAdmin = true` if the profile returned by the OP contains the attribute specified by `OVERLEAF_OIDC_IS_ADMIN_FIELD` and its value matches `OVERLEAF_OIDC_IS_ADMIN_FIELD_VALUE`, otherwise `user.isAdmin` is set to `false`. If `OVERLEAF_OIDC_IS_ADMIN_FIELD` is `email` then the value of the attribute `emails[0].value` is used for match checking.

The redirect URL for your OpenID Provider is `https://my-overleaf-instance.com/oidc/login/callback`.

<details>

<summary>Sample variables.env file</summary>

{% code title="variables.env" overflow="wrap" %}
```dotenv
OVERLEAF_APP_NAME="Our Overleaf Instance"

ENABLED_LINKED_FILE_TYPES=project_file,project_output_file,url

# Enables Thumbnail generation using ImageMagick
ENABLE_CONVERSIONS=true

# Disables email confirmation requirement
EMAIL_CONFIRMATION_DISABLED=true

## Nginx
# NGINX_WORKER_PROCESSES=4
# NGINX_WORKER_CONNECTIONS=768

## Set for TLS via nginx-proxy
# OVERLEAF_BEHIND_PROXY=true
# OVERLEAF_SECURE_COOKIE=true

OVERLEAF_SITE_URL=http://my-overleaf-instance.com
OVERLEAF_NAV_TITLE=Our Overleaf Instance
# OVERLEAF_HEADER_IMAGE_URL=http://somewhere.com/mylogo.png
OVERLEAF_ADMIN_EMAIL=support@example.com

OVERLEAF_LEFT_FOOTER=[{"text": "Contact your support team", "url": "mailto:support@example.com"}]
OVERLEAF_RIGHT_FOOTER=[{"text":"Hello, I am on the Right", "url":"https://github.com/yu-i-i/overleaf-cep"}]

OVERLEAF_EMAIL_FROM_ADDRESS=team@example.com
OVERLEAF_EMAIL_SMTP_HOST=smtp.example.com
OVERLEAF_EMAIL_SMTP_PORT=587
OVERLEAF_EMAIL_SMTP_SECURE=false
# OVERLEAF_EMAIL_SMTP_USER=
# OVERLEAF_EMAIL_SMTP_PASS=
# OVERLEAF_EMAIL_SMTP_NAME=
OVERLEAF_EMAIL_SMTP_LOGGER=false
OVERLEAF_EMAIL_SMTP_TLS_REJECT_UNAUTH=true
OVERLEAF_EMAIL_SMTP_IGNORE_TLS=false
OVERLEAF_CUSTOM_EMAIL_FOOTER=This system is run by department x

OVERLEAF_PROXY_LEARN=true
NAV_HIDE_POWERED_BY=true

#################
## OIDC for CE ##
#################

EXTERNAL_AUTH=oidc

OVERLEAF_OIDC_PROVIDER_ID=oidc
OVERLEAF_OIDC_ISSUER=https://keycloak.provider.com/realms/example
OVERLEAF_OIDC_AUTHORIZATION_URL=https://keycloak.provider.com/realms/example/protocol/openid-connect/auth
OVERLEAF_OIDC_TOKEN_URL=https://keycloak.provider.com/realms/example/protocol/openid-connect/token
OVERLEAF_OIDC_USER_INFO_URL=https://keycloak.provider.com/realms/example/protocol/openid-connect/userinfo
OVERLEAF_OIDC_LOGOUT_URL=https://keycloak.provider.com/realms/example/protocol/openid-connect/logout
OVERLEAF_OIDC_CLIENT_ID=Overleaf-OIDC
OVERLEAF_OIDC_CLIENT_SECRET=DoNotUseThisATGgaAcTgCcATgGATTACAagGtTCaGcGTAG
OVERLEAF_OIDC_IDENTITY_SERVICE_NAME='Log in with Keycloak OIDC Provider'
OVERLEAF_OIDC_PROVIDER_NAME=OIDC Keycloak Provider
OVERLEAF_OIDC_PROVIDER_INFO_LINK=https://openid.net
OVERLEAF_OIDC_IS_ADMIN_FIELD=email
OVERLEAF_OIDC_IS_ADMIN_FIELD_VALUE=overleaf.admin@example.com
OVERLEAF_OIDC_UPDATE_USER_DETAILS_ON_LOGIN=false
```
{% endcode %}

</details>

