# LDAP

Add the following to `variables.env`:

```env
EXTERNAL_AUTH=ldap
OVERLEAF_LDAP_URL=ldap://ldap:389
OVERLEAF_LDAP_SEARCH_BASE=ou=people,dc=planetexpress,dc=com
OVERLEAF_LDAP_SEARCH_FILTER=(uid={{username}})
OVERLEAF_LDAP_BIND_DN=cn=admin,dc=planetexpress,dc=com
OVERLEAF_LDAP_BIND_CREDENTIALS=GoodNewsEveryone
OVERLEAF_LDAP_EMAIL_ATT=mail
OVERLEAF_LDAP_NAME_ATT=cn
OVERLEAF_LDAP_LAST_NAME_ATT=sn
OVERLEAF_LDAP_UPDATE_USER_DETAILS_ON_LOGIN=true
```

The `openldap` container must run in the same Docker network as the `sharelatex` container (by default this network is `overleaf_default`). Follow these steps to set it up:

{% stepper %}
{% step %}
### Create (or ensure) the Docker network

Run:

```bash
docker network create overleaf_default
```

Note: this command may fail with `network with name overleaf_default already exists`. That's OK — it just means the network already exists.
{% endstep %}

{% step %}
### Start the OpenLDAP container

Run:

```bash
docker run --network=overleaf_default --name=ldap rroemhild/test-openldap:1.1
```
{% endstep %}

{% step %}
### Edit variables.env

Add the LDAP environment variables (see the block above) to your `variables.env`.
{% endstep %}

{% step %}
### Start Overleaf

Run:

```bash
bin/up -d
```

You should then be able to log in using `fry` as both username and password.
{% endstep %}
{% endstepper %}

### Debugging

As LDAP is heavily configurable, it's useful to first verify connectivity and queries with `ldapsearch` or another LDAP-aware tool.

The following example command connects to the LDAP server at `ldap` on port `389`, binds using DN `admin@planetexpress.com` with password `password123`, searches under base DN `ou=people,dc=planetexpress,dc=com`, filters for entries whose Common Name (CN) contains `fry`, and returns the `mail` attribute:

```bash
ldapsearch -H ldap://ldap:389 -x -D admin@planetexpress.com -w password123 -b ou=people,dc=planetexpress,dc=com "CN=*fry*" mail
```

When running this against your own service, replace `fry`, `password123`, and `planetexpress.com` with your actual username, password, and domain. Ensure the LDAP server is reachable and credentials are correct.

For more details see the Overleaf docs: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/server-pro-only-configuration/ldap#debugging

Last updated 11 months ago
