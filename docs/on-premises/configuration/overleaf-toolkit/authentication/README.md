---
icon: address-card
---

# Authentication

This feature is developed by [yu-i-i/overleaf-cep](https://github.com/yu-i-i/overleaf-cep). There are 3 authentication methods supported. After configuration, you can login with the following options, as image below shows.

<figure><img src="../../../.gitbook/assets/image (13) (1).png" alt=""><figcaption></figcaption></figure>

We highly recommend you use OIDC, since this is the most general method.

{% columns %}
{% column width="50%" %}
{% content-ref url="oidc-authentication.md" %}
[oidc-authentication.md](oidc-authentication.md)
{% endcontent-ref %}

{% content-ref url="ldap-authentication.md" %}
[ldap-authentication.md](ldap-authentication.md)
{% endcontent-ref %}
{% endcolumn %}

{% column width="50%" %}
{% content-ref url="saml-authentication.md" %}
[saml-authentication.md](saml-authentication.md)
{% endcontent-ref %}




{% endcolumn %}
{% endcolumns %}

### Global Configuration

The environment variable `EXTERNAL_AUTH` is required to enable the specific authentication module. This environment variable specifies which external authentication methods are activated. Available options are (in lower case):

* saml
* ldap
* oidc

### Suggestions for SSO

I tested saml, ldap, oauth for overleaf. Both saml, oauth works well in overleaf, but ldap, it depends. It can't works well for [https://docs.goauthentik.io/](https://docs.goauthentik.io/), but it works well in openLDAP ([https://github.com/rroemhild/docker-test-openldap](https://github.com/rroemhild/docker-test-openldap)).

{% hint style="info" %}
We need to update passport-ldapauth, recently I am trying to test overleaf ldap with [https://goauthentik.io/](https://goauthentik.io/) , it failed. After I update "passport-ldapauth" to 3.0.0, everything works well.

```
"passport-ldapauth": "^3.0.0",
```

The origianlly one is 2.x.x, which is 6 years ago.
{% endhint %}

I am not sure what's the reason, because we all depends on an external package to do LDAP (also saml, oauth) auth. If not worked, the situtation can be the same for overleaf server pro, becase we just passed all environment var to internal package, if there are some bugs, we have no idea currently.

**So I highly recommend our user to setup development enviornment to test SSO with all source code**, which is available at [Setup Develop Environment (Local)](https://app.gitbook.com/s/I2qEfJyb19sFvDmuZcCm/environment/setup-develop-environment-local "mention"). In development environment, you can see all logs in terminal, which makes it convenient for debug usage.

\
<br>
