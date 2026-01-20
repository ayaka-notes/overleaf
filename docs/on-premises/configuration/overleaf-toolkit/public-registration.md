---
icon: lock-open
---

# Public Registration

Public Registration is only available at [ayaka-notes/overleaf](https://github.com/ayaka-notes/overleaf) currently.

{% hint style="danger" %}
Please note that once you enable public registration, **anyone** with access to your Overleaf instance can register as a user.&#x20;

The registration process does not verify email addresses, so please only use it on an intranet or in a trusted environment, or disable it when you no longer need registration.
{% endhint %}

By default, neither the Community Edition nor CEP allows public user registration. To allow Public Registration, add this to your `variables.env`

{% code title="variables.env" %}
```dotenv
OVERLEAF_ALLOW_PUBLIC_REGISTRATION=true
```
{% endcode %}

Then, it is necessary that you re-create the Docker containers after changing by running `bin/up`.

Now you should see registration page if you click **Sign up** visit router `/register`.

<figure><img src="../../.gitbook/assets/截屏2026-01-19 11.14.29.png" alt=""><figcaption></figcaption></figure>

