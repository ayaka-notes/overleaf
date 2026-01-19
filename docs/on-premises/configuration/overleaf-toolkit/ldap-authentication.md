---
icon: lock
---

# LDAP Authentication

Available in Overleaf Extended CE is the ability to use a LDAP server to manage users. It is also possible to use with Active Directory systems. The information in this page is valid for both Overleaf Toolkit Users and legacy `docker-compose.yml` users.

### Configuration

Internally, Overleaf LDAP uses the [passport-ldapauth](https://github.com/vesse/passport-ldapauth) library. Most of these configuration options are passed through to the `server` config object which is used to configure `passport-ldapauth`. If you are having issues configuring LDAP, it is worth reading the README for `passport-ldapauth` to get a feel for the configuration it expects.

The environment variable `EXTERNAL_AUTH` is required to enable the LDAP authentication module. This environment variable specifies which external authentication methods are activated. The value of this variable is a list. If the list includes `ldap` then LDAP authentication will be activated.

For example: `EXTERNAL_AUTH=ldap saml`

When using Local and LDAP authentication methods, a user enters a `username` and `password` in the login form. If LDAP authentication is enabled, it is attempted first:

1. An LDAP user is searched for in the LDAP directory using the filter defined by `OVERLEAF_LDAP_SEARCH_FILTER` and authenticated.
2. If authentication is successful, the Overleaf users database is checked for a user with the primary email address that matches the email address of the authenticated LDAP user:
   * If a matching user is found, the `hashedPassword` field for this user is deleted (if it exists). This ensures that the user can only log in via LDAP authentication in the future.
   * If no matching user is found, a new Overleaf user is created using the email, first name, and last name retrieved from the LDAP server.
3. If LDAP authentication fails or is unsuccessful, local authentication is attempted.

#### Environment Variables



* `OVERLEAF_LDAP_URL` **(required)**
  * URL of the LDAP server.
    * Example: `ldaps://ldap.example.com:636` (LDAP over SSL)
    * Example: `ldap://ldap.example.com:389` (unencrypted or STARTTLS, if configured).
* `OVERLEAF_LDAP_EMAIL_ATT`
  * The email attribute returned by the LDAP server, default `mail`. Each LDAP user must have at least one email address. If multiple addresses are provided, only the first one will be used.
* `OVERLEAF_LDAP_FIRST_NAME_ATT`
  * The property name holding the first name of the user which is used in the application, usually `givenName`.
* `OVERLEAF_LDAP_LAST_NAME_ATT`
  * The property name holding the family name of the user which is used in the application, usually `sn`.
* `OVERLEAF_LDAP_NAME_ATT`
  * The property name holding the full name of the user, usually `cn`. If either of the two previous variables is not defined, the first and/or last name of the user is extracted from this variable. Otherwise, it is not used.
* `OVERLEAF_LDAP_PLACEHOLDER`
  * The placeholder for the login form, defaults to `Username`.
* `OVERLEAF_LDAP_UPDATE_USER_DETAILS_ON_LOGIN`
  * If set to `true`, updates the LDAP user `first_name` and `last_name` field on login, and turn off the user details form on the `/user/settings` page for LDAP users. Otherwise, details will be fetched only on first login.
* `OVERLEAF_LDAP_BIND_DN`
  * The distinguished name of the LDAP user that should be used for the LDAP connection (this user should be able to search/list accounts on the LDAP server), e.g., `cn=ldap_reader,dc=example,dc=com`. If not defined, anonymous binding is used.
* `OVERLEAF_LDAP_BIND_CREDENTIALS`
  * Password for `OVERLEAF_LDAP_BIND_DN`.
* `OVERLEAF_LDAP_BIND_PROPERTY`
  * Property of the user to bind against the client, defaults to `dn`.
* `OVERLEAF_LDAP_SEARCH_BASE` **(required)**
  * The base DN from which to search for users. E.g., `ou=people,dc=example,dc=com`.
* `OVERLEAF_LDAP_SEARCH_FILTER`
  * LDAP search filter with which to find a user. Use the literal '\{{username\}}' to have the given username be interpolated in for the LDAP search.
    * Example: `(|(uid={{username}})(mail={{username}}))` (user can login with email or with login name).
    * Example: `(sAMAccountName={{username}})` (Active Directory).
* `OVERLEAF_LDAP_SEARCH_SCOPE`
  * The scope of the search can be `base`, `one`, or `sub` (default).
* `OVERLEAF_LDAP_SEARCH_ATTRIBUTES`
  * JSON array of attributes to fetch from the LDAP server, e.g., `["uid", "mail", "givenName", "sn"]`. By default, all attributes are fetched.
* `OVERLEAF_LDAP_STARTTLS`
  * If `true`, LDAP over TLS is used.
* `OVERLEAF_LDAP_TLS_OPTS_CA_PATH`
  * Path to the file containing the CA certificate used to verify the LDAP server's SSL/TLS certificate. If there are multiple certificates, then it can be a JSON array of paths to the certificates. The files must be accessible to the docker container.
    * Example (one certificate): `/var/lib/overleaf/certs/ldap_ca_cert.pem`
    * Example (multiple certificates): `["/var/lib/overleaf/certs/ldap_ca_cert1.pem", "/var/lib/overleaf/certs/ldap_ca_cert2.pem"]`
* `OVERLEAF_LDAP_TLS_OPTS_REJECT_UNAUTH`
  * If `true`, the server certificate is verified against the list of supplied CAs.
* `OVERLEAF_LDAP_CACHE`
  * If `true`, then up to 100 credentials at a time will be cached for 5 minutes.
* `OVERLEAF_LDAP_TIMEOUT`
  * How long the client should let operations live for before timing out, ms (Default: Infinity).
* `OVERLEAF_LDAP_CONNECT_TIMEOUT`
  * How long the client should wait before timing out on TCP connections, ms (Default: OS default).
* `OVERLEAF_LDAP_IS_ADMIN_ATT` and `OVERLEAF_LDAP_IS_ADMIN_ATT_VALUE`
  * When both environment variables are set, the login process updates `user.isAdmin = true` if the LDAP profile contains the attribute specified by `OVERLEAF_LDAP_IS_ADMIN_ATT` and its value either matches `OVERLEAF_LDAP_IS_ADMIN_ATT_VALUE` or is an array containing `OVERLEAF_LDAP_IS_ADMIN_ATT_VALUE`, otherwise `user.isAdmin` is set to `false`. If either of these variables is not set, then the admin status is only set to `true` during admin user creation in Launchpad.

The following five variables are used to configure how user contacts are retrieved from the LDAP server.

* `OVERLEAF_LDAP_CONTACTS_FILTER`
  * The filter used to search for users in the LDAP server to be loaded into contacts. The placeholder '\{{userProperty\}}' within the filter is replaced with the value of the property specified by `OVERLEAF_LDAP_CONTACTS_PROPERTY` from the LDAP user initiating the search. If not defined, no users are retrieved from the LDAP server into contacts.
* `OVERLEAF_LDAP_CONTACTS_SEARCH_BASE`
  * Specifies the base DN from which to start searching for the contacts. Defaults to `OVERLEAF_LDAP_SEARCH_BASE`.
* `OVERLEAF_LDAP_CONTACTS_SEARCH_SCOPE`
  * The scope of the search can be `base`, `one`, or `sub` (default).
* `OVERLEAF_LDAP_CONTACTS_PROPERTY`
  * Specifies the property of the user object that will replace the '\{{userProperty\}}' placeholder in the `OVERLEAF_LDAP_CONTACTS_FILTER`.
* `OVERLEAF_LDAP_CONTACTS_NON_LDAP_VALUE`
  * Specifies the value of the `OVERLEAF_LDAP_CONTACTS_PROPERTY` if the search is initiated by a non-LDAP user. If this variable is not defined, the resulting filter will match nothing. The value `*` can be used as a wildcard.

<details>

<summary><strong>Example</strong></summary>

```
OVERLEAF_LDAP_CONTACTS_FILTER=(gidNumber={{userProperty}})
OVERLEAF_LDAP_CONTACTS_PROPERTY=gidNumber
OVERLEAF_LDAP_CONTACTS_NON_LDAP_VALUE=1000
```

The above example results in loading into the contacts of the current LDAP user all LDAP users who have the same UNIX `gid`. Non-LDAP users will have all LDAP users with UNIX `gid=1000` in their contacts.

</details>

<details>

<summary><strong>Sample variables.env file</strong></summary>

```
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
## LDAP for CE ##
#################

EXTERNAL_AUTH=ldap
OVERLEAF_LDAP_URL=ldap://ldap.example.com:389
OVERLEAF_LDAP_STARTTLS=true
OVERLEAF_LDAP_TLS_OPTS_CA_PATH=/var/lib/overleaf/certs/ldap_ca_cert.pem
OVERLEAF_LDAP_SEARCH_BASE=ou=people,dc=example,dc=com
OVERLEAF_LDAP_SEARCH_FILTER=(|(uid={{username}})(mail={{username}}))
OVERLEAF_LDAP_BIND_DN=cn=ldap_reader,dc=example,dc=com
OVERLEAF_LDAP_BIND_CREDENTIALS=GoodNewsEveryone
OVERLEAF_LDAP_EMAIL_ATT=mail
OVERLEAF_LDAP_FIRST_NAME_ATT=givenName
OVERLEAF_LDAP_LAST_NAME_ATT=sn
# OVERLEAF_LDAP_NAME_ATT=cn
OVERLEAF_LDAP_SEARCH_ATTRIBUTES=["uid", "sn", "givenName", "mail"]

OVERLEAF_LDAP_UPDATE_USER_DETAILS_ON_LOGIN=true

OVERLEAF_LDAP_PLACEHOLDER='Username or email address'

OVERLEAF_LDAP_IS_ADMIN_ATT=mail
OVERLEAF_LDAP_IS_ADMIN_ATT_VALUE=admin@example.com

OVERLEAF_LDAP_CONTACTS_FILTER=(gidNumber={{userProperty}})
OVERLEAF_LDAP_CONTACTS_PROPERTY=gidNumber
OVERLEAF_LDAP_CONTACTS_NON_LDAP_VALUE='*'
```

</details>
