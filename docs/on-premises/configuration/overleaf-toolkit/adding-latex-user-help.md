---
icon: graduation-cap
---

# Adding LaTeX user help

You can enable access to Overleaf's [Learn](https://www.overleaf.com/learn) pages within your Overleaf Pro instance by simply adding `OVERLEAF_PROXY_LEARN=true` to your `config/variables.env` file in the Toolkit and running the `bin/up` command.

This allows users to access current documentation and learning resources by clicking the **Documentation** button in the navigation menu, all without leaving your instance.

{% hint style="info" %}
For Docker Compose deployments, you'll need to add the environment variable `OVERLEAF_PROXY_LEARN: true` to the **environment** section of the `sharelatex` service in to your `docker-compose.yml` file.
{% endhint %}

{% hint style="info" %}
Your Server Pro deployment will require access to the internet so it can perform external `GET` requests to [https://learn.sharelatex.com](https://docs.overleaf.com/on-premises/welcome).
{% endhint %}

{% hint style="danger" %}
When you firstly enable this option and reboot your Overleaf docker, the system needs to download the relevant Wiki, which may take up to 5 minutes or more. Only after the download is complete will you be able to successfully see your Overleaf login page.
{% endhint %}
