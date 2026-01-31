---
description: >-
  This is where you'll find all the technical documentation for Overleaf Pro, an
  on-premises and enhanced versions of Overleaf based on Overleaf Community
  Edition.
icon: hand-wave
---

# Welcome

### Overview of Overleaf

Overleaf is a collaborative LaTeX editor loved by researchers and tech teams. Their cloud version is available at [overleaf.com](https://www.overleaf.com/). It provides a full-featured online LaTeX editor. Howevery, Overleaf Common (SaaS version) has numerous feature limitations, and you have to tolerate 10-second compilation times and expensive membership fees.

Over the past few years, we’ve watched Overleaf’s compile times drop from **one minute to twenty seconds, even ten seconds**, while the subscription fees keep climbing higher and higher. It’s hard not to sigh and say: **scholars have long suffered under Overleaf.**

In addition, Overleaf's pricing is almost uniform globally, with even the cheapest student membership starting at $10 a month, which is unaffordable for most students outside of Europe and America. Even more outrageous, there is a Pro plan that costs $399 per year, which can only be described as exorbitantly priced.

### Overview of Server Pro and Community Edition

To embody the spirit of open source, Overleaf provides an open-source community version available at [GitHub: Overleaf](https://github.com/overleaf/overleaf). However, in order to market their so-called [Server Pro](https://www.overleaf.com/for/enterprises/when-to-use-overleaf-on-premises-vs-in-the-cloud), Overleaf deliberately made many code-hiding changes to their open-sourced community version, they even sell the purely frontend mathematical _Symbol Palette_ as a **paid** feature.

Even in today’s age of advanced AI programming, the community edition of Overleaf still can’t even provide a basic admin panel, the Button (Project Lookup URL) is even in broken status for at least 3 years.

Regarding the price of Server Pro, Overleaf only provides information on its official website that you should contact support/sales, but does not specify a particular price.

But based on the information we have collected in the community, the **quota for Server Pro is**:&#x20;

* You need to purchase licenses for at least 10 people.
* A 10-person license costs about €3,477.61. (2024)
* For educations, 20 user 2640 Euro per year, 50 user 6050 Euro, 100 user 9963 Euro.

### We Need Changes

It’s fair to say that, whether for individual students or entire research institutions, everyone has been swept along by Overleaf’s ever-increasing prices over the years.

And in the age of AI, instead of bringing the promised transformation, Overleaf has continued to rely on its old technology while squeezing more and more out of end users.

Over the years, we have many community developers who have made significant efforts to improve the Overleaf Community Edition, they are:

* [https://github.com/ertuil/overleaf](https://github.com/ertuil/overleaf)
* [https://github.com/AllanChain/lcpu-overleaf](https://github.com/AllanChain/lcpu-overleaf)
* [https://github.com/yu-i-i/overleaf-cep/](https://github.com/yu-i-i/overleaf-cep/)
* [https://github.com/ayaka-notes/overleaf](https://github.com/ayaka-notes/overleaf)
* [https://github.com/davrot/overleaf\_with\_admin\_extension](https://github.com/davrot/overleaf_with_admin_extension)
* [https://github.com/overleaf/overleaf/pull/1447](https://github.com/overleaf/overleaf/pull/1447) (Git integration)
* [https://github.com/overleaf/overleaf/pull/1385](https://github.com/overleaf/overleaf/pull/1385) (Typst support)

Some of them initiated pull requests (PRs), but unfortunately, in the open-source community, these PRs are mostly ignored. Therefore, we often question what kind of open source Overleaf's so-called open source actually is.

In January 2026, openAI announced the release of [Prism](https://prism.openai.com/). On numerous communities, people have stated that Prism has killed Overleaf.&#x20;

_**This tells us that if a company relies only on repackaged APIs and layer upon layer of feature restrictions to keep users locked in, it will ultimately be overtaken by a growing number of competitors, in the AI era.**_

Back to the main topic, with all features together, we are happy to announce the release of Overleaf Pro Community Verson. These docs are specifically for people interested in setting up and maintaining Overleaf Pro.

Both Overleaf Pro and Community Edition run in Docker containers, isolating them from other applications on the same host. This provides an additional layer of security by preventing potential cross-application attacks.

They can run on air-gapped servers, which means they can be completely isolated from other networks, including the Internet. Docker provides tooling for transferring the application from an internet-connected to an air-gapped environment.

After the initial download, no internet connection is required, significantly reducing the risk of external threats.

### Limitations in Community Edition

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required because Sandbox Compiles are not available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles see: [sandboxed-compiles.md](configuration/overleaf-toolkit/sandboxed-compiles.md "mention")
{% endhint %}

Therefore, if you are deploying Overleaf in a large organization or team, please take safety and isolation measures seriously.

{% content-ref url="readme/cep-community-edition-vs.-server-pro.md" %}
[cep-community-edition-vs.-server-pro.md](readme/cep-community-edition-vs.-server-pro.md)
{% endcontent-ref %}



