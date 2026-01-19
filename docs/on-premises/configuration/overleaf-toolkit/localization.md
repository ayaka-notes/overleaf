---
icon: globe-pointer
---

# Localization

### Overleaf i18 Configuration

{% hint style="info" %}
This document describes how to configure internationalization (i18n) for a self-hosted **Overleaf** instance.
{% endhint %}

Overleaf has been translated into multiple languages. With the appropriate configuration, you can:

* Run your Overleaf instance in **a single fixed language**, or
* Enable **multiple languages**, allowing users to switch languages dynamically, similar to `www.overleaf.com`.

***

#### Single Language Configuration

The site language is configured using the environment variable `OVERLEAF_SITE_LANGUAGE`(or `SHARELATEX_SITE_LANGUAGE` for Overleaf versions **4.x and earlier**).

Supported language codes include:

* `en` - English (default)
* `es` - Spanish
* `pt` - Portuguese
* `de` - German
* `fr` - French
* `cs` - Czech
* `nl` - Dutch
* `sv` - Swedish
* `it` - Italian
* `tr` - Turkish
* `zh-CN` - Chinese (simplified)
* `no` - Norwegian
* `da` - Danish
* `ru` - Russian
* `ko` - Korean
* `ja` - Japanese
* `pl` - Polish
* `fi` - Finnish

English is the default language. To change the interface language (for example, to Simplified Chinese), add the following line to `config/variables.env`:

{% code title="config/variables.env" %}
```bash
OVERLEAF_SITE_LANGUAGE=zh-CN
```
{% endcode %}

Then apply the configuration:

```bash
bin/up
```

After the services restart, the interface language in the web UI menus should reflect the new setting.

#### Multiple Language Configuration

To allow users to **switch languages without logging out**, your Overleaf instance must be configured to serve different languages based on domain names.

This section assumes:

* Your primary domain is `overleaftest.com`
* You have a **wildcard TLS certificate** (e.g. `*.overleaftest.com`)
* You are **not using `localhost`** (since it cannot support subdomain-based language routing)

For local testing, you may use a domain such as `dev-overleaf.com`.

{% stepper %}
{% step %}
### TLS Proxy Configuration (Nginx)

Your TLS reverse proxy must forward the original `Host` header so that Overleaf can determine which language domain the user accessed.

Make sure the following directive is present:&#x20;

```nginx
proxy_set_header Host $host;
```

Here is an example Nginx configuration:&#x20;

<pre class="language-nginx"><code class="lang-nginx">server {
    listen 443 ssl;
    server_name    _; # Catch all, see http://nginx.org/en/docs/http/server_names.html
    server_name *.overleaftest.com;
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;
    ssl_protocols               TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;
    # used cloudflares ciphers https://github.com/cloudflare/sslconfig/blob/master/conf
    ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;

    # config to enable HSTS(HTTP Strict Transport Security) https://developer.mozilla.org/en-US/docs/Security/HTTP_Strict_Transport_Security
    # to avoid ssl stripping https://en.wikipedia.org/wiki/SSL_stripping#SSL_stripping	
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;";
    server_tokens off;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5000; # change to whatever host/port the docker container is listening on.
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 3m;
        proxy_send_timeout 3m;
        
        # add this to your nginx conf
<strong>        proxy_set_header Host $host;
</strong>    }
}
</code></pre>
{% endstep %}

{% step %}
### Configure Cookie Domain

To prevent users from being logged out when switching languages, cookies must be shared across language subdomains.

Add the following line to `config/variables.env`:

{% code title="config/variables.env" %}
```env
# Note the leading dot
COOKIE_DOMAIN=.overleaftest.com
```
{% endcode %}

This ensures that authentication cookies are valid for all subdomains under `overleaftest.com`.
{% endstep %}

{% step %}
### Language–Domain Mapping

Next, define how language codes map to subdomains using\
`OVERLEAF_LANG_DOMAIN_MAPPING`.

#### Example Configuration

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
OVERLEAF_LANG_DOMAIN_MAPPING='{"www": {"lngCode": "en","url": "https:\/\/www.overleaftest.com"},"cn": {"lngCode": "zh-CN","url": "https:\/\/cn.overleaftest.com"}}'
```
{% endcode %}

With this configuration:

* `https://www.overleaftest.com` → English interface
* `https://cn.overleaftest.com` → Simplified Chinese interface

You can extend this mapping with additional languages and subdomains as needed.
{% endstep %}

{% step %}
### Redirect the Apex Domain

Finally, redirect the apex domain (`overleaftest.com`) to the default language domain (`www.overleaftest.com`).

<pre class="language-nginx"><code class="lang-nginx">server{
    listen 80;
    server_name overleaftest.com;
<strong>    return 301 https://www.overleaftest.com$request_uri;
</strong>}

server {
    listen 443 ssl http2;
    server_name overleaftest.com;
    ssl_certificate     /<a data-footnote-ref href="#user-content-fn-1">p</a>ath/to/fullchain.cer;
    ssl_certificate_key /path/to/overleaftest.com.key;
<strong>    return 301 https://www.overleaftest.com$request_uri;
</strong>}
</code></pre>


{% endstep %}
{% endstepper %}





[^1]: 
