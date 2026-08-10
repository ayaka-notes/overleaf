---
icon: map-location
---

# Introduction

Like the Overleaf Server Pro, our Ayakaleaf Pro comes as a Docker container and is a direct drop in replacement with additionally includes features such as SSO provided via LDAP and SAML2, improved security, tracked changes, comments, our optimized version of TeX Live, templates and administration panel.

* If you have never deployed any version of Overleaf before, please refer to [Setup Docker](setup-docker.md) to install Docker Engine first, and then install Overleaf [using the Toolkit](using-the-toolkit/).
* If you have already deployed the Community Edition of Overleaf, please refer to [Migrate from Existing](migrate-from-existing.md) to migrate to Ayakaleaf-Pro.
* If you are an existing Server Pro user, please open an issue to let us know before migrating to AyakaLeaf Pro, as the template data is stored in a slightly different format.
* Sometimes, if you ever get tired of our AyakaLeaf Pro and want to switch back to the official Overleaf Community Edition, that is fully supported. None of your data will be lost. For users of the official Overleaf Toolkit, simply remove your override YAML file. For users of the ayaka-notes toolkit, disable the `SERVER_PRO` option. Everything will then fall back to the standard Community Edition.

### Hardware requirements

* The minimum hardware requirements for installing AyakaLeaf Pro are a 2-core CPU and 3 GB of RAM.
* Due to the size of our TeX Live image, at least 40 GB of storage is required to enable sandboxed compilation.
* If you want to install the complete set of TeX Live images from 2020 through 2026, please make sure you have at least 150 GB of free disk space available.

Here are some recommended hardware configurations for different usage scenarios:

| Use Case                                             | Recommended Configuration                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Personal use, with occasional collaboration          | 2 CPU cores, 4 GB RAM                                                               |
| Small teams, up to 10 users with light collaboration | 2 CPU cores, 8 GB RAM                                                               |
| Medium-sized teams, up to 100 users                  | 4 CPU cores, 16 GB RAM                                                              |
| Large-scale or university deployments                | Distributed cluster deployment; please contact us if you need deployment assistance |

### Software requirements

For software requirements, we recommend using a recent version of Ubuntu together with the latest stable version of Docker.

We do not recommend deploying AyakaLeaf Pro on Windows or other unsupported operating systems, as you may encounter compatibility issues or unexpected problems during installation and operation.

### LaTeX Performance

LaTeX is a single threaded program, meaning it can only utilize one CPU core at a time. The CPU is also the main limitation when compiling a single document. Therefore the faster the single core performance of your CPU the faster you will be able to compile a document. More cores will only help if you are trying to compile more documents than you have free CPU cores.

Using the [ThuThesis template](https://www.overleaf.com/latex/templates/thuthesis-tsinghua-university-thesis-latex-template/cfwgcxtvkbsx) as an example, the compilation time is about 6 seconds on an Intel Core i9-14900K (5.6 Ghz), while it takes about 13 seconds on a Azure Standard D2as v5 instance (2 vCPUs, 8 GiB RAM) powered by an AMD EPYC 7763 (3.2Ghz).

Of course, actual compilation performance depends on your hardware configuration. Most server CPUs do not run at such high clock speeds as 14900K, so you will need to make a trade-off between cost and compilation speed.
