---
description: >-
  This is where you'll find all the technical documentation for Overleaf CEP,
  our on-premises versions of Overleaf Pro based on Overleaf Community Edition.
icon: hand-wave
---

# Welcome

Overleaf is a collaborative LaTeX editor loved by researchers and tech teams. Their cloud version is available at [overleaf.com](https://www.overleaf.com/). It provides a full-featured online LaTeX editor. These docs are specifically for people interested in setting up and maintaining Overleaf CEP.

## Overview of CEP and Community Edition

Both CEP and Community Edition run in Docker containers, isolating them from other applications on the same host. This provides an additional layer of security by preventing potential cross-application attacks.

They can run on air-gapped servers, which means they can be completely isolated from other networks, including the Internet. Docker provides tooling for transferring the application from an internet-connected to an air-gapped environment.

After the initial download, no internet connection is required, significantly reducing the risk of external threats.

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required because Sandbox Compiles are not available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles see: [sandboxed-compiles.md](configuration/overleaf-toolkit/sandboxed-compiles.md "mention")
{% endhint %}

Therefore, if you are deploying Overleaf in a large organization or team, please carefully consider whether to use the Overleaf Community Edition.

{% content-ref url="welcome/cep-community-edition-vs.-server-pro.md" %}
[cep-community-edition-vs.-server-pro.md](welcome/cep-community-edition-vs.-server-pro.md)
{% endcontent-ref %}



