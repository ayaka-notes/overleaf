---
description: >-
  Answers to common questions about Ayakaleaf Pro features, licensing, security,
  pricing, and maintenance.
icon: comment-question
---

# Q\&A

Here, we’ve compiled answers to some frequently asked questions about Ayakaleaf Pro.

### Basic Question

<details>

<summary>Q01: Is Ayakaleaf Pro a free trial? Does it require a license?</summary>

No. Ayakaleaf Pro is completely free to use. It is not a trial and requires no license.

</details>

<details>

<summary>Q02: Do you (ayakaleaf pro) include all Overleaf Server Pro features?</summary>

Yes. Ayakaleaf Pro includes all Overleaf Server Pro features, including Git-Bridge integration. It also includes selected features from the Overleaf SaaS platform. We continue to develop and improve Ayakaleaf Pro.

</details>

<details>

<summary>Q03: How much does Overleaf Server Pro cost?</summary>

Overleaf Server Pro costs around $300 per user each year. It requires at least 10 licenses, so deployments start at roughly $3,000 annually. Smaller public U.S. contracts show annual costs of about $320–$370 per user. This makes Server Pro expensive, especially for smaller teams. See [#information-and-price-about-overleaf-server-pro](../#information-and-price-about-overleaf-server-pro "mention") for documented purchases and pricing.

</details>

<details>

<summary>Q04: Why does Overleaf Server Pro not include GitHub Sync or AI features?</summary>

Overleaf Server Pro is commonly used by government organizations. They deploy it on private networks and strictly control access. To protect sensitive data, its included features avoid exchanging data with third-party services. If you need GitHub Sync, AI, or similar connected features, Overleaf recommends a subscription to its SaaS platform.

</details>

<details>

<summary>Q05: Is Ayakaleaf Pro secure and reliable?</summary>

Ayakaleaf Pro is open source. We review the code with tools such as Codex Security to strengthen its security and reliability. If you do not enable third-party data synchronization, your data stays on your server. Ayakaleaf Pro contains no telemetry that sends your data elsewhere.

</details>

<details>

<summary>Q06: Will Ayakaleaf Pro be maintained long term?</summary>

We will make every effort to maintain this project over the long term.

</details>

<details>

<summary>Q07: Is Ayakaleaf Pro compliant?</summary>

Ayakaleaf Pro is a community fork. Its code and integrated features come from community contributions. It is licensed under AGPL v3. Deployments can comply with this license when they meet its requirements.

</details>

<details>

<summary>Q08: Why is the project called Ayakaleaf Pro?</summary>

The project was originally named Overleaf Pro in 2024. Development paused for a time, then restarted in late 2025. In the first quarter of 2026, Overleaf renamed its AI-enabled subscription plan to Pro. Community feedback also noted that the Overleaf Pro name could create trademark and impersonation risks. It could make users think the project was official.

We renamed the project Ayakaleaf Pro to avoid that confusion. The name can be read as “Ayaka-notes Overleaf Pro.” The maintainer has contributed to Overleaf community development since their student years, over five years ago. This experience supports our long-term maintenance commitment.

</details>

<details>

<summary>Q09: What distinguishes Ayakaleaf Pro from newer AI-built LaTeX editors?</summary>

Since 2026, the open-source community has released many AI-built LaTeX editors, including OpenAI Prism. Ayakaleaf Pro keeps your data and services on your own server. This gives you direct control over your deployment and data.

Many experimental community editors have no established long-term maintenance plan. Third-party LaTeX compilation platforms can also stop operating when their user base or revenue is insufficient. Ayakaleaf Pro delivers all source code and lets you self-host every service. Even if maintenance stopped, your existing self-hosted service could continue to run.

</details>

### LaTeX

<details>

<summary>Q01: Are users’ LaTeX project compilations isolated? Is Shell Escape enabled?</summary>

When you enable Sandbox Compiles, each user’s compilation runs in a separate Docker container and is isolated from other users’ compilations. Shell Escape is enabled by default for Sandbox Compiles.

</details>

<details>

<summary>Q02: Is the Sandbox Compiles image reliable? Can compilation fail?</summary>

We have improved our TeX Live Full image for Sandbox Compiles over the past three years. In most cases, projects that compile on overleaf.com also compile correctly with Ayakaleaf Pro. If a required font is unavailable, upload that font to your project manually.

</details>

