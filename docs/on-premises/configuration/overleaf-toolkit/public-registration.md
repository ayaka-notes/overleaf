---
icon: lock-open
---

# Public Registration

Public Registration is only available at [ayaka-notes/overleaf](https://github.com/ayaka-notes/overleaf) currently.

By default, neither the Community Edition nor CEP allows public user registration. To allow Public Registration, add this to your `variables.env`

{% code title="variables.env" %}
```dotenv
OVERLEAF_ALLOW_PUBLIC_REGISTRATION=true
```
{% endcode %}

Then, it is necessary that you re-create the Docker containers after changing by running `bin/up`.

Now you should see registration page if you visit router `/register`  &#x20;

<figure><img src="../../.gitbook/assets/截屏2026-01-19 11.14.29.png" alt=""><figcaption></figcaption></figure>

