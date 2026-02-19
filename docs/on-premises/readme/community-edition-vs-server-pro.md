---
description: >-
  Overleaf Pro and Community Edition are both on premises versions of Overleaf.
  But what are the differences?
icon: scale-balanced
---

# Overleaf Pro vs. Server Pro

{% hint style="info" %}
Overleaf Pro is an enhanced implementation of the Overleaf Community Edition, offering several _<mark style="color:$primary;">**free premium**</mark>_ features from server pro. Unlike Overleaf Common available at [https://www.overleaf.com/](https://www.overleaf.com/), we have no limitations on compilation time, no license requirements on the number of users, and you can fully self-host your own data, ensuring absolute security.

Overleaf Server Pro is a commercial, self-hosted deployment of Overleaf, with official support, For more information on Server Pro, visit [Server Pro](https://www.overleaf.com/for/enterprises/when-to-use-overleaf-on-premises-vs-in-the-cloud).
{% endhint %}

{% hint style="warning" %}
Overleaf Community Edition is intended for use in environments where **all** users are trusted. Community Edition is **not** appropriate for scenarios where isolation of users is required due to Sandbox Compiles not being available.

Without sandboxing, LaTeX compiles run with the same privileges as the container, allowing access to its filesystem, network, and environment variables. This creates a risk of data exposure or system compromise. Non-sandboxed compiles should only be used in fully trusted environments; for multi-user or production deployments, Sandbox Compiles are strongly recommended.

For more information on Sandbox Compiles check out our [documentation](../configuration/overleaf-toolkit/sandboxed-compiles.md).
{% endhint %}

### Benefits for users

| Feature                            | Community Edition | Overleaf Pro | Server Pro |
| ---------------------------------- | :---------------: | :----------: | :--------: |
| Powerful LaTeX editor              |         ✓         |       ✓      |      ✓     |
| Full project history               |         ✓         |       ✓      |      ✓     |
| Commenting                         |         X         |       ✓      |      ✓     |
| Real-time track changes            |         X         |       ✓      |      ✓     |
| Easy internal collaboration        |         X         |       ✓      |      ✓     |
| Private template management system |         X         |       ✓      |      ✓     |
| Git integration                    |         X         |       ✓      |      ✓     |
| Symbol Palette                     |         X         |       ✓      |      ✓     |

### Benefits for user admins <a href="#benefits-for-user-admins" id="benefits-for-user-admins"></a>

| Feature                              | Community Edition | Overleaf Pro | Server Pro |
| ------------------------------------ | :---------------: | :----------: | :--------: |
| Easy user management via Admin Panel |      Limited      |       ✓      |      ✓     |
| No manual upgrade of users required  |         X         |       ✓      |      ✓     |

### Benefits for system admins <a href="#benefits-for-system-admins" id="benefits-for-system-admins"></a>

<table><thead><tr><th>Feature</th><th width="172" align="center">Community Edition</th><th width="198.5" align="center" valign="middle">Overleaf Pro</th><th align="center">Server Pro</th></tr></thead><tbody><tr><td>Single sign-on (SSO) via SAML 2 and LDAP</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Direct access to all user projects</td><td align="center">✓</td><td align="center" valign="middle">X</td><td align="center">✓</td></tr><tr><td>Self-hosted</td><td align="center">✓</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Automatic user registration</td><td align="center">X</td><td align="center" valign="middle"><p>✓</p><p>(LDAP/SAML/OIDC)</p></td><td align="center"><p>✓</p><p>(LDAP or SAML)</p></td></tr><tr><td>Sandboxed Compiles</td><td align="center">X</td><td align="center" valign="middle">✓</td><td align="center">✓</td></tr><tr><td>Optimized version of TeX Live</td><td align="center">X</td><td align="center" valign="middle">Community</td><td align="center">✓</td></tr><tr><td>Early notification for security releases</td><td align="center">X</td><td align="center" valign="middle">Community</td><td align="center">✓</td></tr></tbody></table>

### Community Support

For people using a self-hosted Overleaf instance, support is provided by the community via GitHub [Issues](https://github.com/ayaka-notes/overleaf-pro/issues).

### Release status (Need Documents)

To remain on a supported track, you should be running one of the supported release numbers listed in the rightmost column.

| Release | Release Date |   Status  |                                               Latest Patch                                              |
| :-----: | :----------: | :-------: | :-----------------------------------------------------------------------------------------------------: |
|   6.0   |  2025-10-30  | Supported |      [6.0.1](/broken/pages/b3f25a266f7b2a8aba123e4372a5097359ed999b#server-pro-6.0.1) (2025-11-17)      |
|   5.5   |  2025-05-29  | Supported |      [5.5.7](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.5.7) (2025-11-17)      |
| ~~5.4~~ |  2025-04-11  |    EOL    |  [~~5.4.1~~](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.4.1) ~~(2025-04-30)~~  |
| ~~5.3~~ |  2025-01-29  |    EOL    |  [~~5.3.3~~](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.3.3) ~~(2025-03-21~~)  |
| ~~5.2~~ |  2024-10-24  |    EOL    |  [~~5.2.1~~](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.2.1) ~~(2024-10-24)~~  |
| ~~5.1~~ |  2024-07-17  |    EOL    |  [~~5.1.1~~](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.1.1) ~~(2024-08-13)~~  |
| ~~5.0~~ |       -      |    EOL    |  [~~5.0.7~~](/broken/pages/e634d866f140a771c7e14451c6e6312d53ea79ab#server-pro-5.0.7) ~~(2024-07-12)~~  |
| ~~4.2~~ |  2023-11-10  |    EOL    |  [~~4.2.9~~](/broken/pages/b63031c5487f8cfb24e76192e58b645292f155a9#server-pro-4.2.9) ~~(2025-03-21)~~  |
| ~~4.1~~ |  2023-08-24  |    EOL    |  [~~4.1.6~~](/broken/pages/b63031c5487f8cfb24e76192e58b645292f155a9#server-pro-4.1.6) ~~(2023-11-02)~~  |
| ~~4.0~~ |       -      |    EOL    |  [~~4.0.6~~](/broken/pages/b63031c5487f8cfb24e76192e58b645292f155a9#server-pro-4.0.6) ~~(2023-08-10)~~  |
| ~~3.5~~ |  2023-02-13  |    EOL    | [~~3.5.13~~](/broken/pages/226d07880dc8580908892f5243f02f139d7f41f2#server-pro-3.5.13) ~~(2023-10-06)~~ |
| ~~3.4~~ |  2023-01-11  |    EOL    |  [~~3.4.0~~](/broken/pages/226d07880dc8580908892f5243f02f139d7f41f2#server-pro-3.4.0) ~~(2023-01-11)~~  |
| ~~3.3~~ |  2022-10-13  |    EOL    |  [~~3.3.2~~](/broken/pages/226d07880dc8580908892f5243f02f139d7f41f2#server-pro-3.3.2) ~~(2022-11-15)~~  |
| ~~3.2~~ |  2022-08-26  |    EOL    |  [~~3.2.2~~](/broken/pages/226d07880dc8580908892f5243f02f139d7f41f2#server-pro-3.2.2) ~~(2022-09-19)~~  |
| ~~2.7~~ |  2021-07-12  |    EOL    |  [~~2.7.1~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.7.1) ~~(2021-09-16)~~  |
| ~~2.6~~ |  2021-04-23  |    EOL    |  [~~2.6.2~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.6.2) ~~(2021-05-20)~~  |
| ~~2.5~~ |  2020-11-20  |    EOL    |  [~~2.5.2~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.5.2) ~~(2021-01-26)~~  |
| ~~2.4~~ |  2020-08-20  |    EOL    |  [~~2.4.2~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.4.2) ~~(2020-10-05)~~  |
| ~~2.3~~ |  2020-06-11  |    EOL    |  [~~2.3.1~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.3.1) ~~(2020-06-30)~~  |
| ~~2.2~~ |  2020-02-10  |    EOL    |  [~~2.2.1~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.2.1) ~~(2020-03-10)~~  |
| ~~2.1~~ |  2020-01-14  |    EOL    |  [~~2.1.1~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.1.1) ~~(2020-01-21)~~  |
|  ~~2~~  |  2019-10-09  |    EOL    |  [~~2.0.3~~](/broken/pages/feb29583707671142ff031939bdd07535af5facc#server-pro-2.0.3) ~~(2019-12-06)~~  |
| ~~1.2~~ |       -      |    EOL    |           [~~1.2.1~~](/broken/pages/8fb14123d88463cfa9559d1a02ea564f4e5dad57#server-pro-1.2.1)          |
| ~~1.1~~ |       -      |    EOL    |           [~~1.1.0~~](/broken/pages/8fb14123d88463cfa9559d1a02ea564f4e5dad57#server-pro-1.1.0)          |
|  ~~1~~  |       -      |    EOL    |           [~~1.0.2~~](/broken/pages/8fb14123d88463cfa9559d1a02ea564f4e5dad57#server-pro-1.0.2)          |
| ~~0.6~~ |       -      |    EOL    |           [~~0.6.3~~](/broken/pages/a773165fd2a954a4cd1632a74234c537029adf5d#server-pro-0.6.3)          |
| ~~0.5~~ |       -      |    EOL    |          [~~0.5.11~~](/broken/pages/a773165fd2a954a4cd1632a74234c537029adf5d#server-pro-0.5.11)         |
| ~~0.3~~ |       -      |    EOL    |         [~~0.3.0~~](/broken/pages/a773165fd2a954a4cd1632a74234c537029adf5d#release-notes-0.3.0)         |
| ~~0.2~~ |       -      |    EOL    |         [~~0.2.0~~](/broken/pages/a773165fd2a954a4cd1632a74234c537029adf5d#release-notes-0.2.0)         |
| ~~0.1~~ |       -      |    EOL    |    [~~0.1.4~~](/broken/pages/a773165fd2a954a4cd1632a74234c537029adf5d#release-notes-0.1.3-and-0.1.4)    |

You can confirm what version of Overleaf you're running by comparing the output of the command below against the Image ID's published in the release notes.

```bash
docker inspect --format '{{.Image}}' sharelatex | awk -F: '{print substr($2, 1, 12)}'
```
