---
description: >-
  This is where you'll find all the technical documentation for Overleaf CEP, an
  on-premises and enhanced versions of Overleaf based on Overleaf Community
  Edition.
icon: hand-wave
---

# Welcome

Overleaf is a collaborative LaTeX editor loved by researchers and tech teams. Their cloud version is available at [overleaf.com](https://www.overleaf.com/). It provides a full-featured online LaTeX editor. Howevery, Overleaf Common (SaaS version) has numerous feature limitations, and you have to tolerate 10-second compilation times and expensive membership fees.

Overleaf CEP is an enhanced implementation of the Overleaf Community Edition, developed by [yu-i-i](https://github.com/yu-i-i/overleaf-cep). It offering several _<mark style="color:$primary;">**free premium**</mark>_ features from server pro. Unlike Overleaf Common available at [overleaf.com](https://www.overleaf.com/).  We have no limitations on compilation time, no license requirements on the number of users, and you can fully self-host your own data, ensuring absolute security.

Based on Overleaf CEP, [ayaka-notes](https://github.com/ayaka-notes/) introduced the most native git-bridge code implementation (using official git-bridge), which is available at [ayaka-notes/overleaf](https://github.com/ayaka-notes/overleaf), if you want to use latest feature, you can try this docker image.

With all features together, we are happy to announce the release of Overleaf Pro Community Verson. These docs are specifically for people interested in setting up and maintaining Overleaf CEP.

## Overview of CEP and Community Edition

Both CEP and Community Edition run in Docker containers, isolating them from other applications on the same host. This provides an additional layer of security by preventing potential cross-application attacks.

They can run on air-gapped servers, which means they can be completely isolated from other networks, including the Internet. Docker provides tooling for transferring the application from an internet-connected to an air-gapped environment.

After the initial download, no internet connection is required, significantly reducing the risk of external threats.

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required because Sandbox Compiles are not available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles see: [sandboxed-compiles.md](configuration/overleaf-toolkit/sandboxed-compiles.md "mention")
{% endhint %}

Therefore, if you are deploying Overleaf in a large organization or team, please take safety and isolation measures seriously.

{% content-ref url="welcome/cep-community-edition-vs.-server-pro.md" %}
[cep-community-edition-vs.-server-pro.md](welcome/cep-community-edition-vs.-server-pro.md)
{% endcontent-ref %}



