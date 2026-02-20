---
description: >-
  This is where you'll find all the technical documentation for Overleaf Pro, an
  on-premises and enhanced versions of Overleaf based on Overleaf Community
  Edition.
icon: hand-wave
---

# Welcome

### Overview of Overleaf

Overleaf is a collaborative LaTeX editor loved by researchers and tech teams. Their cloud version is available at [overleaf.com](https://www.overleaf.com/). It provides a full-featured online LaTeX editor. Howevery, Overleaf Common (SaaS version) has numerous feature limitations, and you have to tolerate _<mark style="color:red;">**10-second compilation times limit**</mark>_ and expensive membership fees.

Although Overleaf offers an open-source community version (available on [GitHub: Overleaf](https://github.com/overleaf/overleaf)), it also has many limitations, for example:

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required because Sandbox Compiles are not available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles see: [sandboxed-compiles.md](configuration/overleaf-toolkit/sandboxed-compiles.md "mention")
{% endhint %}

### Information about Server Pro

The Overleaf website only provides an entrance to contact support for Server Pro, so information about Server Pro is very limited. But based on the information we have collected in the community, the **quota for Server Pro is**:&#x20;

* You need to purchase licenses for _at least_ 10 people.
* A 10-person license costs about €3,477.61. (2024)
* For educations, 20 user 2640 Euro per year, 50 user 6050 Euro, 100 user 9963 Euro.
* Server Pro is only available in select regions (e.g., excluding mainland China).

### Why Overleaf Pro?

Overleaf Pro is an enhanced implementation of the Overleaf Community Edition, offering _<mark style="color:green;">**all**</mark>**&#x20;**<mark style="color:green;">**free premium**</mark>_ features from server pro. Unlike Overleaf Common available at [https://www.overleaf.com/](https://www.overleaf.com/), or commercial edition server pro, we have

* _**no limitations**_ on compilation time
* _**no license**_ requirements on the number of users
* _**all features**_ unlocked from server pro

And you can fully self-host your own data, ensuring absolute security! To find out more, see:

{% content-ref url="readme/features-and-copyright.md" %}
[features-and-copyright.md](readme/features-and-copyright.md)
{% endcontent-ref %}

{% content-ref url="readme/community-edition-vs-server-pro.md" %}
[community-edition-vs-server-pro.md](readme/community-edition-vs-server-pro.md)
{% endcontent-ref %}
