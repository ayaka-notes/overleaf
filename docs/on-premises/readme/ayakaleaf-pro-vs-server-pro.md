---
description: >-
  Overleaf Server Pro and Ayakaleaf Pro Edition are both on premises versions of
  Overleaf. But what are the differences?
icon: scale-balanced
---

# Overleaf Server Pro vs. Ayakaleaf Pro

{% hint style="info" %}
Ayakaleaf Pro is an enhanced implementation of the Overleaf Community Edition, offering all _<mark style="color:$primary;">**free premium**</mark>_ features from server pro. Unlike Overleaf Common available at [https://www.overleaf.com/](https://www.overleaf.com/), we have no limitations on compilation time, no license requirements on the number of users, and you can fully self-host your own data, ensuring absolute security.

Overleaf Server Pro is a commercial, self-hosted deployment of Overleaf, with official support. For more information on Server Pro, visit [Server Pro](https://www.overleaf.com/for/enterprises/when-to-use-overleaf-on-premises-vs-in-the-cloud).
{% endhint %}

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required due to Sandbox Compiles not being available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles check out our [documentation](/broken/pages/7f495e34c7e239040c704060deafb9c9858aca72).
{% endhint %}

### Benefits for users

| Feature                            | Community Edition | Overleaf Server Pro | Ayakaleaf Pro (ours) |
| ---------------------------------- | :---------------: | :-----------------: | :------------------: |
| Powerful LaTeX editor              |         ✓         |          ✓          |           ✓          |
| Full project history               |         ✓         |          ✓          |           ✓          |
| Commenting                         |         X         |          ✓          |           ✓          |
| Real-time track changes            |         X         |          ✓          |           ✓          |
| Easy internal collaboration        |         X         |          ✓          |           ✓          |
| Private template management system |         X         |          ✓          |           ✓          |
| Git integration                    |         X         |          ✓          |           ✓          |
| Symbol Palette                     |         X         |          ✓          |           ✓          |
| GitHub integration                 |         X         |          X          |           ✓          |
| Zotero integration                 |         X         |          X          |           ✓          |
| Pandoc Import/Export               |         X         |          X          |           ✓          |
| Python Script Runner               |         X         |          X          |           ✓          |

### Benefits for user admins <a href="#benefits-for-user-admins" id="benefits-for-user-admins"></a>

| Feature                              | Community Edition | Overleaf Server Pro | Ayakaleaf Pro (ours) |
| ------------------------------------ | :---------------: | :-----------------: | :------------------: |
| Easy user management via Admin Panel |      Limited      |          ✓          |           ✓          |
| No manual upgrade of users required  |         X         |          ✓          |           ✓          |

### Benefits for system admins <a href="#benefits-for-system-admins" id="benefits-for-system-admins"></a>

<table><thead><tr><th>Feature</th><th width="172" align="center">Community Edition</th><th width="198.5" align="center" valign="middle">Overleaf Server Pro</th><th align="center">Ayakaleaf Pro (ours)</th></tr></thead><tbody><tr><td>Single sign-on (SSO) via SAML 2 and LDAP</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Single sign-on (SSO) via OAuth 2.0</td><td align="center">X</td><td align="center" valign="middle">X</td><td align="center">✓</td></tr><tr><td>Direct access to all user projects</td><td align="center">✓</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Self-hosted</td><td align="center">✓</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Automatic user registration</td><td align="center">X</td><td align="center" valign="middle"><p>✓</p><p>(LDAP/SAML)</p></td><td align="center"><p>✓</p><p>(LDAP/SAML/OIDC)</p></td></tr><tr><td>Sandboxed Compiles</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Optimized version of TeX Live</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center"><a href="https://github.com/ayaka-notes/texlive-full/">Texlive-full</a></td></tr><tr><td>Early notification for security releases</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center">Community</td></tr></tbody></table>

Notes: Over the past three years, we have continuously worked to optimize our [Texlive-full](https://github.com/ayaka-notes/texlive-full/) image. We have tested it against tens of thousands of LaTeX projects to ensure reliable, high-quality compilation results that closely match those produced by the official Overleaf platform.

### Community Support

For people using a self-hosted Overleaf instance, support is provided by the community via GitHub [Issues](https://github.com/ayaka-notes/overleaf-pro/issues).

To remain on a supported track, you can confirm what version of Overleaf you're running by comparing the output of the command below against the Image ID's published in the release notes.

```bash
docker inspect --format '{{.Image}}' sharelatex | awk -F: '{print substr($2, 1, 12)}'
```
