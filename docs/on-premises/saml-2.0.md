# SAML 2.0

Server Pro provides SAML 2.0 server integration for user authentication. For Toolkit deployments, the SAML 2.0 integration is configured via the `config/variables.env` file.

### Overview

Internally, the Overleaf SAML 2.0 integration uses the [passport-SAMLarrow-up-right](https://github.com/vesse/passport-saml) library. Most configuration options are passed through to the `server` configuration object which is used to configure `passport-SAML`.

If you are having issues configuring SAML 2.0, it is worth reading the [READMEarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md) for `passport-SAML` to get a feel for the configuration it expects.

To enable the SAML 2.0 module, the `EXTERNAL_AUTH` variable must be set to `saml`:

```
EXTERNAL_AUTH=saml
```

{% hint style="info" %}
To preserve backward compatibility with older configuration files, if `EXTERNAL_AUTH` is not set, but `OVERLEAF_SAML_ENTRYPOINT` is set, then the SAML 2.0 module will be activated. We still recommend setting `EXTERNAL_AUTH` explicitly.
{% endhint %}

### Configuration

Below are the environment variables used to configure SAML 2.0.

#### OVERLEAF\_SAML\_IDENTITY\_SERVICE\_NAME

Display name for the Identity Provider, used on the login page.

#### OVERLEAF\_SAML\_EMAIL\_FIELD

Name of the Email field in user profile, defaults to `nameID`.\
Alias: `OVERLEAF_SAML_EMAIL_FIELD_NAME`

#### OVERLEAF\_SAML\_FIRST\_NAME\_FIELD

Name of the `firstName` field in user profile, defaults to `givenName`.

#### OVERLEAF\_SAML\_LAST\_NAME\_FIELD

Name of the `lastName` field in user profile, defaults to `lastName`.

#### OVERLEAF\_SAML\_UPDATE\_USER\_DETAILS\_ON\_LOGIN

If set to `true`, will update the users `firstName` and `lastName` fields on each login, and turn off the user-details form on `/user/settings` page.

#### OVERLEAF\_SAML\_ENTRYPOINT

Entrypoint URL for the SAML Identity Service.\
Example: `https://idp.example.com/simplesaml/saml2/idp/SSOService.php`\
Azure example: `https://login.microsoftonline.com/8b26b46a-6dd3-45c7-a104-f883f4db1f6b/saml2`

#### OVERLEAF\_SAML\_CALLBACK\_URL

Callback URL for Overleaf service. Should be the full URL of the `/saml/callback` path.\
Example: `https://sharelatex.example.com/saml/callback`

#### OVERLEAF\_SAML\_ISSUER

The issuer name.

#### OVERLEAF\_SAML\_CERT

(required since `2.7.0`) Identity Provider's public signing certificate, used to validate incoming SAML messages, in single-line format.\
Example: `MIICizCCAfQCCQCY8tKaMc0BMjANBgkqh...W==`

* See [more information about passing keys and certificates](environment-variables.md).
* See [full documentationarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md#security-and-signatures) for more information.
* An array of certificates can be provided to support certificate rotation as of 5.1.0.

#### OVERLEAF\_SAML\_PRIVATE\_CERT

Optional, path to a file containing a PEM-formatted private key used to sign auth requests sent by passport-saml.\
Note: This would be better called `PRIVATE_KEY_FILE`, but `PRIVATE_CERT` is the current name.

See [more information about passing keys and certificates](environment-variables.md).\
See [full documentationarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md#security-and-signatures) for more information.

#### OVERLEAF\_SAML\_DECRYPTION\_CERT

Optional, public certificate matching the `OVERLEAF_SAML_DECRYPTION_PVK`, used for the [metadata endpoint](environment-variables.md).

* See [more information about passing keys and certificates](environment-variables.md) for how to pass the certificate.
* See [full documentationarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md#security-and-signatures) for more information.

#### OVERLEAF\_SAML\_SIGNING\_CERT

Optional, public certificate matching `OVERLEAF_SAML_PRIVATE_CERT`. It's required when setting up the [metadata endpoint](environment-variables.md) if the strategy is configured with a `OVERLEAF_SAML_PRIVATE_CERT`.

* An array of certificates can be provided to support certificate rotation. When supplying an array of certificates, the first entry in the array should match the current `OVERLEAF_SAML_PRIVATE_CERT`.
* See [more information about passing keys and certificates](environment-variables.md) for how to pass the certificate.
* See [full documentationarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md#security-and-signatures) for more information.

#### OVERLEAF\_SAML\_DECRYPTION\_PVK

Optional, private key that will be used to attempt to decrypt any encrypted assertions that are received, in PEM (multi-line) format.

* See [more information about passing keys and certificates](environment-variables.md) for how to pass the key in PEM format.
* See [full documentationarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md#security-and-signatures) for more information.

#### OVERLEAF\_SAML\_SIGNATURE\_ALGORITHM

Optionally set the signature algorithm for signing requests, valid values are `sha1` (default) or `sha256`.

#### OVERLEAF\_SAML\_ADDITIONAL\_PARAMS

JSON dictionary of additional query params to add to all requests.

#### OVERLEAF\_SAML\_ADDITIONAL\_AUTHORIZE\_PARAMS

JSON dictionary of additional query params to add to 'authorize' requests.\
Example: `{"some_key": "some_value"}`

#### OVERLEAF\_SAML\_IDENTIFIER\_FORMAT

If present, name identifier format to request from identity provider (Default: `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`).

#### OVERLEAF\_SAML\_ACCEPTED\_CLOCK\_SKEW\_MS

Time in milliseconds of skew that is acceptable between client and server when checking OnBefore and NotOnOrAfter assertion condition validity timestamps. Setting to `-1` will disable checking these conditions entirely. Default is `0`.

#### OVERLEAF\_SAML\_ATTRIBUTE\_CONSUMING\_SERVICE\_INDEX

Optional, `AttributeConsumingServiceIndex` attribute to add to AuthnRequest to instruct the IdP which attribute set to attach to the response (http://blog.aniljohn.com/2014/01/data-minimization-front-channel-saml-attribute-requests.html).

#### OVERLEAF\_SAML\_AUTHN\_CONTEXT

If present, name identifier format to request auth context (Default: `urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport`).

#### OVERLEAF\_SAML\_FORCE\_AUTHN

If `true`, the initial SAML request from the service provider specifies that the IdP should force re-authentication of the user, even if they possess a valid session.

#### OVERLEAF\_SAML\_DISABLE\_REQUESTED\_AUTHN\_CONTEXT

If `true`, do not request a specific auth context. For example, you can set this to `true` to allow additional contexts such as password-less logins (`urn:oasis:names:tc:SAML:2.0:ac:classes:X509`). Support for additional contexts is dependant on your IdP.

#### OVERLEAF\_SAML\_SKIP\_REQUEST\_COMPRESSION

If set to `true`, the SAML request from the service provider won't be compressed.

#### OVERLEAF\_SAML\_AUTHN\_REQUEST\_BINDING

If set to `HTTP-POST`, will request authentication from IDP via HTTP POST binding, otherwise defaults to HTTP Redirect.

Note: If `OVERLEAF_SAML_AUTHN_REQUEST_BINDING` is set to `HTTP-POST`, then `OVERLEAF_SAML_SKIP_REQUEST_COMPRESSION` must also be set to `true`.

#### OVERLEAF\_SAML\_VALIDATE\_IN\_RESPONSE\_TO

If truthy, then `InResponseTo` will be validated from incoming SAML responses.

#### OVERLEAF\_SAML\_REQUEST\_ID\_EXPIRATION\_PERIOD\_MS

Defines the expiration time when a Request ID generated for a SAML request will not be valid if seen in a SAML response in the `InResponseTo` field. Default is `8` hours.

#### OVERLEAF\_SAML\_CACHE\_PROVIDER

Defines the implementation for a cache provider used to store request Ids generated in SAML requests as part of `InResponseTo` validation. Default is a built-in in-memory cache provider.

See [linkarrow-up-right](https://github.com/node-saml/passport-saml/blob/master/README.md) for more information.

#### OVERLEAF\_SAML\_LOGOUT\_URL

Base address to call with logout requests. Default: `entryPoint`.

#### OVERLEAF\_SAML\_LOGOUT\_CALLBACK\_URL

The value with which to populate the `Location` attribute in the `SingleLogoutService` elements in the generated service provider metadata.

#### OVERLEAF\_SAML\_ADDITIONAL\_LOGOUT\_PARAMS

JSON dictionary of additional query params to add to 'logout' requests.

#### OVERLEAF\_SAML\_IS\_ADMIN\_FIELD and OVERLEAF\_SAML\_IS\_ADMIN\_FIELD\_VALUE

When both environment variables are set, the login process updates `user.isAdmin = true` when the profile returned by the SAML IdP contains `OVERLEAF_SAML_IS_ADMIN_FIELD`, and its value either equals `OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE`, or is an array containing `OVERLEAF_SAML_IS_ADMIN_FIELD_VALUE`.

* Introduced: `5.2.0`

#### OVERLEAF\_SAML\_AUDIENCE

Used to set the value for the Audience used in the Server Pro metadata (`/saml/meta`).\
Default: when not set, defaults to using `OVERLEAF_SAML_ISSUER`.

### Passing keys and certificates

As of Server Pro `2.7.0`:

* The value of the `OVERLEAF_SAML_CERT` environment variable cannot be empty if SAML 2.0 is enabled (with `EXTERNAL_AUTH=saml`, or if `OVERLEAF_SAML_ENTRYPOINT` is set).

As of Server Pro `2.5.0`:

* The value of the `OVERLEAF_SAML_CERT` environment variable must be passed in single-line format (without the begin and end lines from the PEM format; see below for more information).
* The value of the `OVERLEAF_SAML_PRIVATE_CERT` environment variable should be a full path to a file which contains the private key in PEM format.
* The value of the `OVERLEAF_SAML_DECRYPTION_PVK` environment variable must be passed in PEM format (multi-line). (But single-line may be [supported soonarrow-up-right](https://github.com/node-saml/passport-saml/issues/524).)

Example single-line cert environment variable:

```
OVERLEAF_SAML_CERT=MIIEowIBAAKCAQEAxmJWY0eJcuV2uBtLnQ4004fuknbODo5xIyRhkYNkls5n9OrBq4Lok6cjv7G2Q8mxAdlIUmzhTSyuNkrMMKZrPaMsAkNKE/aNpeWuSLXqcMs8T/8gYCDcEmC5KYEJakNtKb3ZX2FKwT4yHHpsNomLDzJD5DyJKbRpNBm2no7ggIy7TQRJ2H00mogQIQu8/fUANXVeGPshvLJU8MXEy/eiXkHJIT3DDA4VSr/C/tfP0tGJSNTM874urc4zej+4INuTuMPtesZS47J0AsPxQuxengS4M76cVt5cH+Iqd1nKe5UqiSKvLCXacPYg/T/Kdx0tBnwHIjKo/cbzZ+r+XynsCwIDAQABAoIBAFPWWwu5v6x+rJ1Ba8MDre93Eqty6cHdEJL5XQJRtMDGmcg3LYF94SwFBmaMg6pCIjvVx2qN+OjUaQsosQIeUlPKEV8jcLrfBx2E4xJ3Tow8V1C3UMdPG7Hojler4H633/oz8RkN1Lm1vxep5PFnTw0tAOQDcTPeulb6RuLbHqU0FEnf/jVOMhtPLcMAwJ3fkAJQ+ljFW2VKCQ83d+ci1p+NHY/dbGLSR4lK58mVghcRMO3zhe5scrbECHJMfT6fCb2TXdjaueFUGC6+fqUXvDj8HRfUilzTegNq8ZhwgMSw1HeX/PuiczSKc3aHYSsohMBugTErnkW+qF4ZkE+kxgECgYEA/sm7umcyFuZME+RWYL8Gsp8agH1OGEgsmIiMi1z6RTlTmdR8fN18ItzXyW+363VZln/1b5wCaPdLIxgASxybLAaxnKAXfmL7QvyVAaMwxj7N0ogvMQoNx2VuSGZSam2+LFVIMWHq1C+3fvVnCDLm6oHvIMK/zvEsPBBtz+L6rlECgYEAx1PrKogaGHCi1XgsrNv9aFaayRvmhzZbmiigF0iWKAd3KKww94BdyyGSVfMfyL23LAbMQDCrDNGpYAnpNZo/cL+OcGPYzlPsWDBrJub1HOA/H3WQlP4oEcfdbmJZhIkEwTGFHaCHynEu4ekiCrWz9+XVNCquTyqnmaVDEzAfEZsCgYA8jQbfUt0Vkh+sboyUq3FVC/jJZn4jyStICNOV3z/fKbOTkGsRZbW1t1RVHAbSn23uFXTn1GTCO1sQ+QhA0YiTGvgk5+sNb0qVbd+fpv/VbWGO0iyc8+24YIOoEyEtB+21LYNdsQ6U5M4wDvQwf6BfRQfmekIJVUmU8LaYPDIlMQKBgDSRiT/aTSeM7STnYMDl89sEnCXV2eJnD5mEhVQerJs5/M8ZOoDLtfDQlctdJ1DF1/0gfdWgADyNPuI5OuwMFhciLequKoufzoEjo97KonJPIdamJs9kiCTIVTm7bmhpyns5GCZMJAPb/cVOus+gRCpozuXHK9ltIm5/C0WQN2FpAoGBAOss6RN2krieqbn1mG8e2v5mMUd0CJkiJu2y5MnF3dYHXSQ3/ePAh/YgJOthpgYgBh+mV0DLqJhx/1DLS/xiqcoHDlndQDmYbtvvY7RlMo00+nGzkRVOfrqyhC+1KsYHGPbSQixNQXtvFbAAVMSo+RRBkVGINYGDFnlQUpkppYRk
```

To pass a key or certificate in multi-line format, wrap the entire value in double quotes and use new line characters (`\n`) as usual:

```
OVERLEAF_SAML_DECRYPTION_PVK="-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAxmJWY0eJcuV2uBtLnQ4004fuknbODo5xIyRhkYNkls5n9OrB
q4Lok6cjv7G2Q8mxAdlIUmzhTSyuNkrMMKZrPaMsAkNKE/aNpeWuSLXqcMs8T/8g
YCDcEmC5KYEJakNtKb3ZX2FKwT4yHHpsNomLDzJD5DyJKbRpNBm2no7ggIy7TQRJ
2H00mogQIQu8/fUANXVeGPshvLJU8MXEy/eiXkHJIT3DDA4VSr/C/tfP0tGJSNTM
874urc4zej+4INuTuMPtesZS47J0AsPxQuxengS4M76cVt5cH+Iqd1nKe5UqiSKv
LCXacPYg/T/Kdx0tBnwHIjKo/cbzZ+r+XynsCwIDAQABAoIBAFPWWwu5v6x+rJ1B
a8MDre93Eqty6cHdEJL5XQJRtMDGmcg3LYF94SwFBmaMg6pCIjvVx2qN+OjUaQso
sQIeUlPKEV8jcLrfBx2E4xJ3Tow8V1C3UMdPG7Hojler4H633/oz8RkN1Lm1vxep
5PFnTw0tAOQDcTPeulb6RuLbHqU0FEnf/jVOMhtPLcMAwJ3fkAJQ+ljFW2VKCQ83
d+ci1p+NHY/dbGLSR4lK58mVghcRMO3zhe5scrbECHJMfT6fCb2TXdjaueFUGC6+
fqUXvDj8HRfUilzTegNq8ZhwgMSw1HeX/PuiczSKc3aHYSsohMBugTErnkW+qF4Z
kE+kxgECgYEA/sm7umcyFuZME+RWYL8Gsp8agH1OGEgsmIiMi1z6RTlTmdR8fN18
ItzXyW+363VZln/1b5wCaPdLIxgASxybLAaxnKAXfmL7QvyVAaMwxj7N0ogvMQoN
x2VuSGZSam2+LFVIMWHq1C+3fvVnCDLm6oHvIMK/zvEsPBBtz+L6rlECgYEAx1Pr
KogaGHCi1XgsrNv9aFaayRvmhzZbmiigF0iWKAd3KKww94BdyyGSVfMfyL23LAbM
QDCrDNGpYAnpNZo/cL+OcGPYzlPsWDBrJub1HOA/H3WQlP4oEcfdbmJZhIkEwTGF
HaCHynEu4ekiCrWz9+XVNCquTyqnmaVDEzAfEZsCgYA8jQbfUt0Vkh+sboyUq3FV
C/jJZn4jyStICNOV3z/fKbOTkGsRZbW1t1RVHAbSn23uFXTn1GTCO1sQ+QhA0YiT
Gvgk5+sNb0qVbd+fpv/VbWGO0iyc8+24YIOoEyEtB+21LYNdsQ6U5M4wDvQwf6Bf
RQfmekIJVUmU8LaYPDIlMQKBgDSRiT/aTSeM7STnYMDl89sEnCXV2eJnD5mEhVQe
rJs5/M8ZOoDLtfDQlctdJ1DF1/0gfdWgADyNPuI5OuwMFhciLequKoufzoEjo97K
onJPIdamJs9kiCTIVTm7bmhpyns5GCZMJAPb/cVOus+gRCpozuXHK9ltIm5/C0WQ
N2FpAoGBAOss6RN2krieqbn1mG8e2v5mMUd0CJkiJu2y5MnF3dYHXSQ3/ePAh/Yg
JOthpgYgBh+mV0DLqJhx/1DLS/xiqcoHDlndQDmYbtvvY7RlMo00+nGzkRVOfrqy
hC+1KsYHGPbSQixNQXtvFbAAVMSo+RRBkVGINYGDFnlQUpkppYRk
-----END RSA PRIVATE KEY-----"
```

{% hint style="warning" %}
The above private key is an example key from the [`xml-encryption`arrow-up-right](https://github.com/auth0/node-xml-encryption/blob/435b1d0f01b1f218c51f07b01fb90df4a4e108de/test/test-auth0.key) library's test suite. Do not use this key.
{% endhint %}

### Metadata for the Identity Provider

Your Identity Provider (IdP) will need to be configured to recognize your Server Pro instance as a Service Provider (SP). How this is done will vary between different IdP's — consult the documentation for your SAML 2.0 server for instructions.

As of version `2.6.0`, Server Pro includes a metadata endpoint which can be used to retrieve Service Provider Metadata, for example: `https://my-overleaf-instance.com/saml/meta`

Example Service Provider (SP) metadata — note the `AssertionConsumerService.Location`, `EntityDescriptor.entityID` and `EntityDescriptor.ID` properties; set as appropriate:

```
<?xml version="1.0"?>
<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata"
                  xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
                  entityID="sharelatex-saml"
                  ID="OVERLEAF_saml">
  <SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>
    <AssertionConsumerService index="1"
                              isDefault="true"
                              Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
                              Location="https://sharelatex.example.com/saml/callback" />
  </SPSSODescriptor>
</EntityDescriptor>
```
