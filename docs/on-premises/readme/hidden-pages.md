---
hidden: true
---

# Hidden Pages

To embody the spirit of open source, Overleaf provides an open-source community version available at [GitHub: Overleaf](https://github.com/overleaf/overleaf). However, in order to market their so-called [Server Pro](https://www.overleaf.com/for/enterprises/when-to-use-overleaf-on-premises-vs-in-the-cloud), Overleaf deliberately made many code-hiding changes to their open-sourced community version, they even sell the purely frontend mathematical _Symbol Palette_ as a **paid** feature.

Over the past few years, we’ve watched Overleaf’s compile times drop from **one minute to twenty seconds, even ten seconds**, while the subscription fees keep climbing higher and higher. It’s hard not to sigh and say: **scholars have long suffered under Overleaf.**

In addition, Overleaf's pricing is almost uniform globally, with even the cheapest student membership starting at $10 a month, which is unaffordable for most students outside of Europe and America. Even more outrageous, there is a Pro plan that costs $399 per year, which can only be described as exorbitantly priced.

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

Back to the main topic, with all features together, we are happy to announce the release of Overleaf Pro. These docs are specifically for people interested in setting up and maintaining Overleaf Pro.

Both Overleaf Pro and Community Edition run in Docker containers, isolating them from other applications on the same host. This provides an additional layer of security by preventing potential cross-application attacks.

They can run on air-gapped servers, which means they can be completely isolated from other networks, including the Internet. Docker provides tooling for transferring the application from an internet-connected to an air-gapped environment.

After the initial download, no internet connection is required, significantly reducing the risk of external threats.
