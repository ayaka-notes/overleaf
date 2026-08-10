---
icon: u-turn-up-right
---

# Migrate from Existing Instance

If you are using official overleaf toolkit, just add a file named `docker-compose.override.yml` with the following or similar content into the `overleaf-toolkit/config` directory:

{% code title="docker-compose.override.yml" %}
```yml
---
services:
    sharelatex:
        image: ghcr.io/ayaka-notes/overleaf-pro:latest # or X.x.x
```
{% endcode %}

To start your instance run:

```
bin/up
```

That's it! You're all set.
