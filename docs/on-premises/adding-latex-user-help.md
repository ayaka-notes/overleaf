# Adding LaTeX user help

You can enable access to Overleaf's Learn pages within your Server Pro instance by adding the following to your Toolkit variables and restarting:

{% code title="config/variables.env" %}
```bash
OVERLEAF_PROXY_LEARN=true
```
{% endcode %}

Then run the Toolkit bring-up command:

{% code title="Toolkit" %}
```bash
bin/up
```
{% endcode %}

This allows users to access current documentation and learning resources by clicking the **Documentation** button in the navigation menu, without leaving your instance.

{% hint style="info" %}
For Docker Compose deployments, add the environment variable to the sharelatex service in your docker-compose.yml:

{% code title="docker-compose.yml (sharelatex service)" %}
```yaml
environment:
  - OVERLEAF_PROXY_LEARN=true
```
{% endcode %}
{% endhint %}

{% hint style="info" %}
Your Server Pro deployment must have internet access so it can perform external GET requests to https://learn.sharelatex.com
{% endhint %}

Relevant link: https://www.overleaf.com/learn

(Links and URLs preserved as in the original content.)
