---
description: How to invite guests to join your Overleaf instance?
icon: lock-open
---

# Public Access

You can offer access to your Overleaf instance in two ways:

* Share a project link with guests
* Allow users to self-register (only available in [ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro))

### Guest Access

{% hint style="info" %}
By default, even if a user obtains a project sharing link, they must **log in** before they can join a collaborative project editing session.
{% endhint %}

To allow anonymous access for link-shared projects, set both variables below:

{% code title="config/variables.env" %}
```dotenv
OVERLEAF_ALLOW_ANONYMOUS_READ_AND_WRITE_SHARING=true
OVERLEAF_ALLOW_PUBLIC_ACCESS=true
```
{% endcode %}

`OVERLEAF_ALLOW_ANONYMOUS_READ_AND_WRITE_SHARING` enables anonymous read/write on link-shared projects.

`OVERLEAF_ALLOW_PUBLIC_ACCESS` prevents non-authenticated users being redirected to the login page.

Recreate containers with `bin/up`. Then open a link-sharing URL in a private window.

### Public Registration

Public registration is only available in [ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro).

{% hint style="danger" %}
Please note that once you enable public registration, **anyone** with access to your Overleaf instance can register as a user.

The registration process does not verify email addresses, so please only use it on an intranet or in a trusted environment, or disable it when you no longer need registration.
{% endhint %}

By default, neither the Community Edition nor Overleaf Pro allows public registration.

To enable it, add this to `config/variables.env`:

{% code title="config/variables.env" %}
```dotenv
OVERLEAF_ALLOW_PUBLIC_REGISTRATION=true
```
{% endcode %}

Recreate containers with `bin/up`.

Then click **Sign up** or visit `/register`.

<figure><img src="../../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>

### Registration With Limited Domain

Limited-domain public registration is only available in [ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro).

Before enabling this, configure email delivery so users can receive invites and notifications. See [Email delivery](email-delivery.md).

Then add the following line to `config/variables.env`:

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
OVERLEAF_ALLOW_PUBLIC_REGISTRATION=@example.domain
```
{% endcode %}

`OVERLEAF_ALLOW_PUBLIC_REGISTRATION` can be set to:

* `true` to allow anyone who can reach the site to register
* `@example.domain` to restrict registration to emails in that domain
