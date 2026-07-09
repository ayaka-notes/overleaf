---
icon: book-bookmark
---

# Zotero Integration

{% hint style="info" %}
This feature is initially developed by [davrot](https://github.com/davrot) and [yu-i-i/overleaf-cep](https://github.com/yu-i-i/overleaf-cep), modified by [ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro) with OAuth. It is introduced from v6.2.0 and later. It's still in beta status. We need your feedback if you have any problem.
{% endhint %}

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/截屏2026-07-01 22.47.53.png" alt=""><figcaption></figcaption></figure></div>

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure></div>

### Setup Zotero Integration

1. Open [this link](https://www.zotero.org/oauth/apps) to create a Zotero OAuth client (as image shows)
2. Choose **Application Type**: **Browser**
3. Setup Callback URL with your `${OVERLEAF_SITE_URL}/user/zotero/oauth/callback`&#x20;
4. Configure your `config/variables.env`&#x20;

<figure><img src="../../.gitbook/assets/image (31).png" alt="" width="375"><figcaption></figcaption></figure>

{% code title="config/variables.env" %}
```dotenv
#################
#    Zotero     #
#################
# 'zotero' must be in ENABLED_LINKED_FILE_TYPES (set in develop/docker-compose.yml)
ENABLED_LINKED_FILE_TYPES=project_file,project_output_file,url,zotero

# From a Zotero OAuth client (register at https://www.zotero.org/oauth/apps)
# Application Type: Browser 
# Callback URL -> ${OVERLEAF_SITE_URL}/user/zotero/oauth/callback
ZOTERO_CLIENT_ID=
ZOTERO_CLIENT_SECRET=
# Encrypts the Zotero API key in mongo (set in dev to avoid writing a key file
# to /var/lib/overleaf/data, which the dev web container can't create)
# How to generate: `openssl rand -hex 32`
ZOTERO_CIPHER_PASSWORD=dev-zotero-cipher-password
# Optional: route the module's server-side Zotero requests (OAuth + API) through
# an HTTP proxy (must be reachable from the web container; same as github-sync)
# http://10.0.0.1:10808
# (Optional) ZOTERO_PROXY_URL=
```
{% endcode %}
