---
description: >-
  This is where you'll find all the technical documentation for Ayakaleaf Pro,
  an on-premises and enhanced versions of Overleaf based on Overleaf Community
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

### Information and Price about Overleaf Server Pro

The Overleaf website only provides an entrance to contact support for Server Pro, so information about Server Pro is very limited. But based on the information we have collected in the community, the **quota for Server Pro is**:

* You need to purchase licenses for _at least_ 10 people.
* A 10-person license costs about €3,477.61. (2024)
* For educations, 20 user 2640 Euro per year, 50 user 6050 Euro, 100 user 9963 Euro.
* Server Pro is only available in select regions (e.g., excluding mainland China).

Based on the information currently available, Overleaf Server Pro appears to cost around $300 per user per year, with a minimum purchase of 10 licenses, making it a very expensive option. Moreover, Server Pro offers significantly fewer features than Ayakaleaf Pro. We are deeply grateful to the community developers whose contributions over the years have made it possible for us to build Ayakaleaf Pro and ultimately surpass Overleaf Server Pro in both functionality and capabilities.

<details>

<summary>Publicly Documented Overleaf Server Pro Purchases and Price</summary>

| Institution                              | Period / Contract         |    Users |       Cost | Evidence                                                                                                                         |
| ---------------------------------------- | ------------------------- | -------: | ---------: | -------------------------------------------------------------------------------------------------------------------------------- |
| 🇺🇸 NASA                                | `80NSSC25FA108`, 2024     | Up to 70 | $24,569.35 | [Source](https://govtribe.com/award/federal-contract-award/delivery-order-nng15sd22b-80nssc25fa108)                              |
| 🇺🇸 NASA                                | `80NSSC25FA471`, 2025–26  |        — | $36,183.91 | [Source](https://govtribe.com/award/federal-contract-award/delivery-order-nng15sd22b-80nssc25fa471)                              |
| 🇺🇸 NIH                                 | FY2024                    | Up to 25 |  $9,235.05 | [Source](https://nitaac.nih.gov/sites/default/files/2025-01/hhs-all-delivery-task-orders-january-2025.pdf)                       |
| 🇺🇸 Naval Research Laboratory           | `N0017323P5005`, 2023–24  |       37 |  \~$11,900 | [Source](https://www.federalcompass.com/fed-contract-award/N0017323P5005)                                                        |
| 🇺🇸 NSWC Philadelphia                   | `N6449821P5224`, 2021–24  |        — |  \~$24,800 | [Source](https://www.federalcompass.com/fed-contract-award/N6449821P5224)                                                        |
| 🇺🇸 U.S. Treasury OFR                   | `20341524P00017`, 2024–25 |        — |  \~$19,400 | [Source](https://www.cleat.ai/government/contracts/intent-to-sole-source-overleaf-server-pro-c97o)                               |
| 🇩🇪 Max Planck Society / MPDL           | `42823`, 2026–29          |    3,600 |   €553,672 | [Source](https://files.auftrag-select.com/file/auftrag-select-public/pdfs/7179931/bekanntmachung.pdf)                            |
| 🇩🇪 University of Rostock               | Since 2023                |        — |          — | [Source](https://www.itmz.uni-rostock.de/en/anwendungen/dienste-fuer-forschung/lehre/kollaboration/overleaf/)                    |
| 🇩🇪 Technical University of Munich      | Current                   |        — |          — | [Source](https://collab.dvb.bayern/spaces/TUMShareLaTeX/pages/67817359/ShareLaTeX%2BTUM)                                         |
| 🇩🇪 University of Konstanz              | Current                   |        — |          — | [Source](https://www.uni-konstanz.de/informatik/inf-system/Sharelatex-de.pdf)                                                    |
| 🇩🇪 GWDG                                | Since at least 2021       |        — |          — | [Source](https://info.gwdg.de/news/service-sharelatex-overleaf-degraded-maintenance-on-tue-4pm-2/)                               |
| 🇩🇪 Johannes Gutenberg University Mainz | Until May 2025            |        — |          — | [Source](https://www.en-zdv.uni-mainz.de/2025/04/08/change-at-overleaf-centrally-funded-licence-ends-in-may/)                    |
| 🇧🇪 von Karman Institute                | Since 2020                |     290+ |          — | [Source](https://www.overleaf.com/blog/welcome-to-our-new-customer-von-karman-institute-for-fluid-dynamics-vki)                  |
| 🇺🇸 Brookhaven National Laboratory      | 2021 trial                |        — |          — | [Source](https://indico.bnl.gov/event/11459/contributions/48931/attachments/35597/57768/SDCC%20Staff%20Meeting%202021-04-22.pdf) |

</details>

### Why Ayakaleaf Pro?

{% hint style="info" %}
Ayakaleaf Pro is _**not**_ affiliated with Overleaf, Inc. or its parent company, Digital Science. It is also _not Server Pro_ Edition, which is a commercial product offered by Overleaf, Inc. Overleaf Pro is an independent project developed and maintained by the [ayaka-notes](https://github.com/ayaka-notes).
{% endhint %}

Ayakaleaf Pro is an enhanced implementation of the Overleaf Community Edition, offering _<mark style="color:green;">**all**</mark>_ _<mark style="color:green;">**free premium**</mark>_ features from server pro. Unlike Overleaf Common available at [https://www.overleaf.com/](https://www.overleaf.com/), or commercial edition server pro, we have

* _**no limitations**_ on compilation time
* _**no license**_ requirements on the number of users
* _**all features**_ unlocked from server pro

And you can fully self-host your own data, ensuring absolute security! To find out more, see:

{% content-ref url="readme/features-and-copyright.md" %}
[features-and-copyright.md](readme/features-and-copyright.md)
{% endcontent-ref %}
