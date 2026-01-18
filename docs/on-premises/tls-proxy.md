# TLS proxy

```bash
# TLS proxy configuration (optional)
NGINX_ENABLED=false
NGINX_CONFIG_PATH=config/nginx/nginx.conf
NGINX_HTTP_PORT=80

# Replace these IP addresses with the external IP address of your host
NGINX_HTTP_LISTEN_IP=127.0.1.1
NGINX_TLS_LISTEN_IP=127.0.1.1
TLS_PRIVATE_KEY_PATH=config/nginx/certs/overleaf_key.pem
TLS_CERTIFICATE_PATH=config/nginx/certs/overleaf_certificate.pem
TLS_PORT=443
```

{% hint style="warning" %}
If you are using an external TLS proxy (i.e. not managed by the Overleaf Toolkit), ensure that the OVERLEAF\_TRUSTED\_PROXY\_IPS environment variable includes both `loopback` and the IP of your TLS proxy. Example:

`OVERLEAF_TRUSTED_PROXY_IPS=loopback,192.168.13.37`

This should be set in `config/variables.env`.
{% endhint %}

{% hint style="warning" %}
If your local network subnet is from `172.16.0.0/12` (the default subnet range for Docker networks), set `OVERLEAF_TRUSTED_PROXY_IPS` to include your Docker network subnet. Use the `IPAM -> Config -> Subnet` value found in `docker inspect overleaf_default`. Example:

`OVERLEAF_TRUSTED_PROXY_IPS=loopback,172.19.0.0/16`

This prevents spoofing of `X-Forwarded` headers.
{% endhint %}

{% hint style="info" %}
If `OVERLEAF_TRUSTED_PROXY_IPS` is not set manually it defaults to `loopback`. If you set it manually, you must include one of `loopback`, `localhost` or `127.0.0.1` to trust the nginx instance running inside the `sharelatex` container.
{% endhint %}

{% stepper %}
{% step %}
### Enable and run the proxy

1. In `config/overleaf.rc`, change:

```
NGINX_ENABLED=false
```

to:

```
NGINX_ENABLED=true
```

2. Re-run the toolkit:

```
bin/up
```
{% endstep %}

{% step %}
### Defaults & how to change them

* By default, the HTTPS web interface is available at: `https://127.0.1.1:443`.
* HTTP (`http://127.0.1.1:80`) is redirected to HTTPS.
* To change the IPs NGINX listens on, set:
  * `NGINX_HTTP_LISTEN_IP`
  * `NGINX_TLS_LISTEN_IP`
* To change the ports, set:
  * `NGINX_HTTP_PORT`
  * `TLS_PORT`
{% endstep %}
{% endstepper %}

{% hint style="danger" %}
If NGINX fails to start with the error message:

```
Error starting userland proxy: listen tcp4 ... bind: address already in use
```

ensure that `OVERLEAF_LISTEN_IP:OVERLEAF_PORT` does not overlap with `NGINX_HTTP_LISTEN_IP:NGINX_HTTP_PORT`.
{% endhint %}

If you need to reference the Overleaf privacy policy: https://www.overleaf.com/legal
