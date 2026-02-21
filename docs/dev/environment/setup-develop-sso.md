---
hidden: true
icon: user-key
---

# Setup Develop SSO

In our develop environment, we use [goauthentik](https://goauthentik.io/) as an example for test LDAP, SAML, OIDC for overleaf, because it offers the most comprehensive authentication methods.

### Installation

Here is a toturial for you to setup up [goauthentik](https://goauthentik.io/), you can visit [this page](https://docs.goauthentik.io/install-config/install/docker-compose/). We highly recommend that you setup a new directory for [goauthentik](https://goauthentik.io/).

{% code title="bash" overflow="wrap" %}
```bash
# (Optional) mkdir ~/authentik && cd ~/authentik
wget https://docs.goauthentik.io/docker-compose.yml
echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> .env
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> .env
echo "AUTHENTIK_ERROR_REPORTING__ENABLED=true" >> .env
```
{% endcode %}

Then, attach the following service to overleaf develop network, please note the code block in the gray section.

<pre data-title="authentik/docker-compose.yml" data-overflow="wrap" data-line-numbers data-expandable="true"><code>services:
  postgresql:
    env_file:
    - .env
    environment:
      POSTGRES_DB: ${PG_DB:-authentik}
      POSTGRES_PASSWORD: ${PG_PASS:?database password required}
      POSTGRES_USER: ${PG_USER:-authentik}
    healthcheck:
      interval: 30s
      retries: 5
      start_period: 20s
      test:
      - CMD-SHELL
      - pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}
      timeout: 5s
    image: docker.io/library/postgres:16-alpine
    restart: unless-stopped
    volumes:
    - database:/var/lib/postgresql/data
<strong>    networks:
</strong><strong>      - overleaf
</strong>  server:
    command: server
    depends_on:
      postgresql:
        condition: service_healthy
    env_file:
    - .env
    environment:
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__NAME: ${PG_DB:-authentik}
      AUTHENTIK_POSTGRESQL__PASSWORD: ${PG_PASS}
      AUTHENTIK_POSTGRESQL__USER: ${PG_USER:-authentik}
      AUTHENTIK_SECRET_KEY: ${AUTHENTIK_SECRET_KEY:?secret key required}
    image: ${AUTHENTIK_IMAGE:-ghcr.io/goauthentik/server}:${AUTHENTIK_TAG:-2025.12.4}
    ports:
    - ${COMPOSE_PORT_HTTP:-9000}:9000
    - ${COMPOSE_PORT_HTTPS:-9443}:9443
    restart: unless-stopped
    volumes:
    - ./data:/data
    - ./custom-templates:/templates
<strong>    networks:
</strong><strong>      - overleaf
</strong>  worker:
    command: worker
    depends_on:
      postgresql:
        condition: service_healthy
    env_file:
    - .env
    environment:
      AUTHENTIK_POSTGRESQL__HOST: postgresql
      AUTHENTIK_POSTGRESQL__NAME: ${PG_DB:-authentik}
      AUTHENTIK_POSTGRESQL__PASSWORD: ${PG_PASS}
      AUTHENTIK_POSTGRESQL__USER: ${PG_USER:-authentik}
      AUTHENTIK_SECRET_KEY: ${AUTHENTIK_SECRET_KEY:?secret key required}
    image: ${AUTHENTIK_IMAGE:-ghcr.io/goauthentik/server}:${AUTHENTIK_TAG:-2025.12.4}
    restart: unless-stopped
    user: root
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock
    - ./data:/data
    - ./certs:/certs
    - ./custom-templates:/templates
<strong>    networks:
</strong><strong>      - overleaf
</strong>volumes:
  database:
    driver: local
<strong>networks:
</strong><strong>  overleaf:
</strong><strong>    external: true
</strong><strong>    name: develop_default
</strong></code></pre>

Now, you can run `docker compose up -d` to launch up all the containers. To verify if you have attached your authentik to overleaf successfully, you can enter a overleaf develop container, and run

```
zzq ➜ ~/overleaf-pro (server-pro) $ cd develop/ && bin/shell web
node@1ed855be997c:/overleaf/services/web$ curl http://server:9000/login  
<!DOCTYPE html>
```

Then, everything should be ok. Open your brower and use the complete url (`http://<your server's IP or hostname>:9000/if/flow/initial-setup/`) including the trailing forward slash. There you are prompted to set a password for the `akadmin` user (the default user).

<br>
