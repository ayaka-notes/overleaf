---
icon: key
---

# SAML Authentication

Available in Overleaf Extended CE is the ability to use a SAML server to manage users. The information in this page is valid for both Overleaf Toolkit Users and legacy `docker-compose.yml` users.

### Configuration

Internally, Overleaf SAML module uses the [passport-saml](https://github.com/node-saml/passport-saml) library, most of the following configuration options are passed through to `passport-saml`. If you are having issues configuring SAML, it is worth reading the README for `passport-saml` to get a feel for the configuration it expects.

The environment variable `EXTERNAL_AUTH` is required to enable the SAML authentication module. This environment variable specifies which external authentication methods are activated. The value of this variable is a list. If the list includes `saml` then SAML authentication will be activated.

For example: `EXTERNAL_AUTH=ldap saml`

When using the SAML authentication method, a user is redirected to the Identity Provider (IdP) authentication site. If the IdP successfully authenticates the user, the Overleaf users database is checked for a record containing a `samlIdentifiers` field structured as follows:

```json
samlIdentifiers: [
  {
    externalUserId: "...",
    providerId: "1",
    userIdAttribute: "..."
  }
]
```

The `externalUserId` must match the value of the property specified by `userIdAttribute` in the user profile returned by the IdP server.

If no matching record is found, the database is searched for a user with the primary email address matching the email in the IdP user profile:

* If such a user is found, the `hashedPassword` field is deleted to disable local authentication, and the `samlIdentifiers` field is added.
* If no matching user is found, a new user is created with the email address and `samlIdentifiers` from the IdP profile.

**Note:** Currently, only one SAML IdP is supported. The `providerId` field in `samlIdentifiers` is fixed to `'1'`.

#### Environment Variables

* `OVERLEAF_SAML_IDENTITY_SERVICE_NAME`
  * Display name for the identity service, used on the login page (default: `Log in with SAML IdP`).
* `OVERLEAF_SAML_USER_ID_FIELD`
  * The value of this attribute will be used by Overleaf as the external user ID, defaults to `nameID`.
* `OVERLEAF_SAML_EMAIL_FIELD`
  * Name of the Email field in user profile, defaults to `nameID`.
* `OVERLEAF_SAML_FIRST_NAME_FIELD`
  * Name of the firstName field in user profile, defaults to `givenName`.
* `OVERLEAF_SAML_LAST_NAME_FIELD`
  * Name of the lastName field in user profile, defaults to `lastName`
* `OVERLEAF_SAML_UPDATE_USER_DETAILS_ON_LOGIN`
  * If set to `true`, updates the user `first_name` and `last_name` field on login, and turn off the user details form on `/user/settings` page.
* `OVERLEAF_SAML_ENTRYPOINT` **(required)**
  * Entrypoint URL for the SAML identity service.
    * Example: `https://idp.example.com/simplesaml/saml2/idp/SSOService.php`
    * Azure Example: `https://login.microsoftonline.com/8b26b46a-6dd3-45c7-a104-f883f4db1f6b/saml2`
* `OVERLEAF_SAML_ISSUER` **(required)**
  * The Issuer name.
* `OVERLEAF_SAML_AUDIENCE`
  * Expected saml response Audience, defaults to value of `OVERLEAF_SAML_ISSUER`.
* `OVERLEAF_SAML_IDP_CERT` **(required)**
  * Path to a file containing the Identity Provider's public certificate, used to validate the signatures of incoming SAML responses. If the Identity Provider has multiple valid signing certificates, then it can be a JSON array of paths to the certificates.
    * Example (one certificate): `/var/lib/overleaf/certs/idp_cert.pem`
    * Example (multiple certificates): `["var/lib/overleaf/certs/idp_cert.pem", "/var/lib/overleaf/certs/idp_cert_old.pem"]`
* `OVERLEAF_SAML_PUBLIC_CERT`
  * Path to a file containing public signing certificate used to embed in auth requests in order for the IdP to validate the signatures of the incoming SAML Request. It's required when setting up the [metadata endpoint](https://github.com/yu-i-i/overleaf-cep/wiki/Extended-CE:-SAML-Authentication#metadata-for-the-identity-provider) when the strategy is configured with a `OVERLEAF_SAML_PRIVATE_KEY`. A JSON array of paths to certificates can be provided to support certificate rotation. When supplying an array of certificates, the first entry in the array should match the current `OVERLEAF_SAML_PRIVATE_KEY`. Additional entries in the array can be used to publish upcoming certificates to IdPs before changing the `OVERLEAF_SAML_PRIVATE_KEY`.
* `OVERLEAF_SAML_PRIVATE_KEY`
  * Path to a file containing a PEM-formatted private key matching the `OVERLEAF_SAML_PUBLIC_CERT` used to sign auth requests sent by passport-saml.
* `OVERLEAF_SAML_DECRYPTION_CERT`
  * Path to a file containing public certificate, used for the [metadata endpoint](https://github.com/yu-i-i/overleaf-cep/wiki/Extended-CE:-SAML-Authentication#metadata-for-the-identity-provider).
* `OVERLEAF_SAML_DECRYPTION_PVK`
  * Path to a file containing private key matching the `OVERLEAF_SAML_DECRYPTION_CERT` that will be used to attempt to decrypt any encrypted assertions that are received.
* `OVERLEAF_SAML_SIGNATURE_ALGORITHM`
  * Optionally set the signature algorithm for signing requests, valid values are 'sha1' (default), 'sha256' (prefered), 'sha512' (most secure, check if your IdP supports it).
* `OVERLEAF_SAML_ADDITIONAL_PARAMS`
  * JSON dictionary of additional query params to add to all requests.
* `OVERLEAF_SAML_ADDITIONAL_AUTHORIZE_PARAMS`
  * JSON dictionary of additional query params to add to 'authorize' requests.
    * Example: `{"some_key": "some_value"}`
* `OVERLEAF_SAML_IDENTIFIER_FORMAT`
  * Name identifier format to request from the identity provider (default: `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`). If using `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`, ensure the `OVERLEAF_SAML_EMAIL_FIELD` envirionment variable is defined. If `urn:oasis:names:tc:SAML:2.0:nameid-format:transient` is required, you must also define the `OVERLEAF_SAML_ID_FIELD` environment variable, which can, for example, be set to the user's email address.
* `OVERLEAF_SAML_ACCEPTED_CLOCK_SKEW_MS`
  * Time in milliseconds of skew that is acceptable between client and server when checking OnBefore and NotOnOrAfter assertion condition validity timestamps. Setting to -1 will disable checking these conditions entirely. Default is 0.
* `OVERLEAF_SAML_ATTRIBUTE_CONSUMING_SERVICE_INDEX`
  * `AttributeConsumingServiceIndex` attribute to add to AuthnRequest to instruct the IdP which attribute set to attach to the response ([link](http://blog.aniljohn.com/2014/01/data-minimization-front-channel-saml-attribute-requests.html)).
* `OVERLEAF_SAML_AUTHN_CONTEXT`
  * JSON array of name identifier format values to request auth context. Default: `["urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"]`.
* `OVERLEAF_SAML_FORCE_AUTHN`
  * If `true`, the initial SAML request from the service provider specifies that the IdP should force re-authentication of the user, even if they possess a valid session.
* `OVERLEAF_SAML_DISABLE_REQUESTED_AUTHN_CONTEXT`
  * If `true`, do not request a specific auth context. For example, you can this this to `true` to allow additional contexts such as password-less logins (`urn:oasis:names:tc:SAML:2.0:ac:classes:X509`). Support for additional contexts is dependant on your IdP.
* `OVERLEAF_SAML_AUTHN_REQUEST_BINDING`
  * If set to `HTTP-POST`, will request authentication from IdP via HTTP POST binding, otherwise defaults to HTTP-Redirect.
* `OVERLEAF_SAML_VALIDATE_IN_RESPONSE_TO`
  * If `always`, then InResponseTo will be validated from incoming SAML responses.
  * If `never`, then InResponseTo won't be validated (default).
  * If `ifPresent`, then InResponseTo will only be validated if present in the incoming SAML response.
* `OVERLEAF_SAML_WANT_ASSERTIONS_SIGNED` and `OVERLEAF_SAML_WANT_AUTHN_RESPONSE_SIGNED`
  * When set to `true` (default), Overleaf expects the SAML Assertions, respectively the entire SAML Authentication Response, to be signed by the IdP. When both options are `false`, at least one of the assertions or the response must be signed.
* `OVERLEAF_SAML_REQUEST_ID_EXPIRATION_PERIOD_MS`
  * Defines the expiration time when a Request ID generated for a SAML request will not be valid if seen in a SAML response in the `InResponseTo` field. Default: 28800000 (8 hours).
* `OVERLEAF_SAML_LOGOUT_URL`
  * base address to call with logout requests (default: `entryPoint`).
    * Example: `https://idp.example.com/simplesaml/saml2/idp/SingleLogoutService.php`
* `OVERLEAF_SAML_ADDITIONAL_LOGOUT_PARAMS`
  * JSON dictionary of additional query params to add to 'logout' requests.
* `OVERLEAF_SAML_IS_ADMIN_FIELD` and `OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE`
  * When both environment variables are set, the login process updates `user.isAdmin = true` if the profile returned by the SAML IdP contains the attribute specified by `OVERLEAF_SAML_IS_ADMIN_FIELD` and its value either matches `OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE` or is an array containing `OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE`, otherwise `user.isAdmin` is set to `false`. If either of these variables is not set, then the admin status is only set to `true` during admin user creation in Launchpad.

**Metadata for the Identity Provider**

The current version of Overleaf CE includes and endpoint to retrieve Service Provider Metadata: `http://my-overleaf-instance.com/saml/meta`

The Identity Provider will need to be configured to recognize the Overleaf server as a "Service Provider". Consult the documentation for your SAML server for instructions on how to do this.

Below is an example of appropriate Service Provider metadata:

<details>

<summary><strong>ol-meta.xml</strong></summary>

```
<?xml version="1.0"?>
<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata"
                  xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
                  entityID="MyOverleaf"
                  ID="_b508c83b7dda452f5b269383fb391107116f8f57">
  <SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol" AuthnRequestsSigned="true" WantAssertionsSigned="true">
    <KeyDescriptor use="signing">
      <ds:KeyInfo>
        <ds:X509Data>
          <ds:X509Certificate>MII...
[skipped]
</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </KeyDescriptor>
    <KeyDescriptor use="encryption">
      <ds:KeyInfo>
        <ds:X509Data>
          <ds:X509Certificate>MII...
[skipped]
</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
      <EncryptionMethod Algorithm="http://www.w3.org/2009/xmlenc11#aes256-gcm"/>
      <EncryptionMethod Algorithm="http://www.w3.org/2009/xmlenc11#aes128-gcm"/>
      <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes256-cbc"/>
      <EncryptionMethod Algorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc"/>
    </KeyDescriptor>
    <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
                         Location="https://my-overleaf-instance.com/saml/logout/callback"/>
    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>
    <AssertionConsumerService index="1"
                              isDefault="true"
                              Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
                              Location="https://my-overleaf-instance.com/saml/login/callback"/>
  </SPSSODescriptor>
</EntityDescriptor>

```

</details>

Note the certificates, `AssertionConsumerService.Location`, `SingleLogoutService.Location` and `EntityDescriptor.entityID` and set as appropriate in your IdP configuration, or send the metadata file to the IdP admin.

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
## SAML for CE ##
#################

EXTERNAL_AUTH=saml
OVERLEAF_SAML_IDENTITY_SERVICE_NAME='Log in with My IdP'
OVERLEAF_SAML_EMAIL_FIELD=mail
OVERLEAF_SAML_FIRST_NAME_FIELD=givenName
OVERLEAF_SAML_LAST_NAME_FIELD=sn
OVERLEAF_SAML_ENTRYPOINT=https://idp.example.com/simplesamlphp/saml2/idp/SSOService.php
OVERLEAF_SAML_CALLBACK_URL=https://my-overleaf-instance.com/saml/login/callback
OVERLEAF_SAML_LOGOUT_URL=https://idp.example.com/simplesamlphp/saml2/idp/SingleLogoutService.php
OVERLEAF_SAML_LOGOUT_CALLBACK_URL=https://my-overleaf-instance.com/saml/logout/callback
OVERLEAF_SAML_ISSUER=MyOverleaf
OVERLEAF_SAML_IDP_CERT=/var/lib/overleaf/certs/idp_cert.pem
OVERLEAF_SAML_PUBLIC_CERT=/var/lib/overleaf/certs/myol_cert.pem
OVERLEAF_SAML_PRIVATE_KEY=/var/lib/overleaf/certs/myol_key.pem
OVERLEAF_SAML_DECRYPTION_CERT=/var/lib/overleaf/certs/myol_decr_cert.pem
OVERLEAF_SAML_DECRYPTION_PVK=/var/lib/overleaf/certs/myol_decr_key.pem
OVERLEAF_SAML_IS_ADMIN_FIELD=mail
OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE=overleaf.admin@example.com
```

</details>
