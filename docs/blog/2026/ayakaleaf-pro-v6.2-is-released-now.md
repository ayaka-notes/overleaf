---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: false
  outline:
    visible: true
  pagination:
    visible: false
  metadata:
    visible: false
  tags:
    visible: true
  actions:
    visible: true
tags:
  - latex
  - release
  - ayakaleaf
  - product-update
  - server-pro
  - overleaf
---

# Ayakaleaf Pro v6.2 is released now

We are proud to announce the release of Ayakaleaf Pro 6.2, the most powerful and feature-rich online LaTeX editor in the community. Special thanks to yu-i-i and davrot for their valuable contributions. They enhanced GitHub Sync and introduced Advanced Citation Search, and Zotero integration.

### Notes

* A new required `OVERLEAF_INVITE_TOKEN_SECRET` environment variable has been introduced, you must Generate it with: `openssl rand -base64 32` If it is not configured, your Overleaf instance will fail to start.
* If you enable GitHub Sync, you must configure the `GITHUB_TOKEN_CIPHER_PASSWORD` environment variable. This variable is required to securely encrypt GitHub access tokens. Without it, your Overleaf instance will fail to start.
* Added a new `DEFAULT_LATEX_COMPILER` environment variable to set the default compiler used by new projects (either pdflatex, latex, xelatex or lualatex).
* The redesigned editor is now the only available option.

### Changes

This release includes the following improvements and new features.

* `MAX_UPLOAD_SIZE` is now configurable instead of being limited to **50 MB**.
* Fixed a container restart loop when sandboxed compiles were disabled.
* Enforced owner-scoped PAT deletion for OAuth2.
* Fixed an LDAP import issue.

features include:

* Added a browser-based Python runner.
* Added Pandoc support for importing and exporting Markdown, DOCX, and other formats.
* Added GitHub Sync.
* Added complete Chinese translations.
* Added Zotero integration.
* Added `DEFAULT_LATEX_COMPILER`.

#### Feature01: GitHub Sync

Keep your LaTeX projects synchronized with GitHub repositories for a seamless development workflow. Push and pull changes directly from the editor, collaborate through pull requests, and integrate with existing CI/CD pipelines. Version control makes it easy to track revisions, review changes, and maintain reproducible academic or technical documents.

See: https://overleaf-pro.ayaka.space/on-premises/configuration/overleaf-toolkit/github-synchronisation

![](https://github.com/user-attachments/assets/5137e708-77cb-4fdf-b081-4aa04b4b762e)

#### Feature02: Pandoc Import/Export

Import Microsoft Word and Markdown documents into fully editable LaTeX projects, or export LaTeX projects back to Markdown and DOCX with a single click. Powered by Pandoc, this feature enables seamless interoperability between academic writing, collaborative editing, and publishing workflows while preserving document structure as much as possible.

See: https://overleaf-pro.ayaka.space/on-premises/configuration/overleaf-toolkit/pandoc-import-and-export

<img src="https://github.com/user-attachments/assets/085a94a0-c673-46fe-9da4-7a5a68e46589" alt="" width="563">

#### Feature03: Advanced Reference Search

Search and insert bibliographic references from multiple academic databases with intelligent filtering and instant citation support. Quickly discover papers, preview metadata, and build accurate BibTeX entries without switching between different research websites, significantly improving literature review efficiency.

![image](https://github.com/user-attachments/assets/42e45b73-af4b-4d1f-81f4-9e116ba5d043)

#### Feature04: Python Runner

Execute Python code directly inside your project without leaving the editor. Perfect for generating figures, processing datasets, automating document workflows, or running reproducible research scripts. Results can be integrated into your LaTeX documents, making scientific computing and writing part of a unified workflow.

![image](https://github.com/user-attachments/assets/a4c314b3-fdb5-4836-aea7-12eeece5cd2f)

#### Feature05: Zotero

Connect your Zotero library directly to your writing workflow and manage references without leaving the editor. Search your personal Zotero collections, insert citations with a single click, and automatically generate and synchronize BibTeX entries. This integration keeps your bibliography up to date, streamlining literature management for academic papers, theses, and technical documents.

See: https://overleaf-pro.ayaka.space/on-premises/configuration/overleaf-toolkit/zotero-integration

![截屏2026-07-10 00 01 22](https://github.com/user-attachments/assets/90d18615-69e7-409c-a9a8-a1a1d2ea0afc)

#### Docker Image

You can find docker image here: https://github.com/ayaka-notes/overleaf-pro/pkgs/container/overleaf-pro

```bash
docker pull ghcr.io/ayaka-notes/overleaf-pro:6.2.0
```

***

<details>

<summary><strong>Official Release Notes</strong></summary>

#### Breaking Changes

* A new required `OVERLEAF_INVITE_TOKEN_SECRET` environment variable has been introduced...
*   Generate it with:

    ```bash
    openssl rand -base64 32
    ```

> **Note** Minimum length: **16 characters**.

#### New Features

* The redesigned editor is now the only available option.
* Added `DEFAULT_LATEX_COMPILER`.

#### Bug Fixes

* Removed options for inserting images from another project or external URLs when disabled.

#### Other Changes

* Updated email styling.
* Updated base image, packages, and internal dependencies.

</details>
