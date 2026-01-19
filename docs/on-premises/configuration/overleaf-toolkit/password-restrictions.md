---
icon: key
---

# Password restrictions

It is possible to enforce password restrictions on user accounts when using the native Overleaf login system for authentication.

{% hint style="info" %}
It is **not** possible to enforce password restrictions for SSO (LDAP/SAML 2.0) logins. These must be configured in your Identity Provider (IdP).
{% endhint %}

To enable password restrictions, set the relevant environment variables in the Toolkits `config/variables.env` file.

| Name                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `OVERLEAF_PASSWORD_VALIDATION_MIN_LENGTH` | The **minimum** length required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     `8` |
| `OVERLEAF_PASSWORD_VALIDATION_MAX_LENGTH` | The **maximum** length allowed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |    `72` |
| `OVERLEAF_PASSWORD_VALIDATION_PATTERN`    | <p></p><p>Used to validate password <strong>strength</strong>:</p><ul><li><code>abc123</code> – password requires 3 letters and 3 numbers and be at least 6 characters long</li><li><code>aA</code> – password requires lower and uppercase letters and be 2 characters long</li><li><code>ab$3</code> – it must contain letters, digits and symbols and be 4 characters long</li><li>There are 4 groups of characters: letters, UPPERcase letters, digits, symbols. Everything that is neither letter, nor digit is considered to be a symbol.</li></ul> |       — |
