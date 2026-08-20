---
description: Connect an AI coding agent to the documentation and deploy Ayakaleaf Pro.
icon: claude
---

# Using Claude or Codex

Use Claude Code or Codex to plan and run an Ayakaleaf Pro deployment. The agent can search this documentation through MCP while it works.

The agent assists with the deployment. You remain responsible for reviewing commands and protecting credentials.

### Before you start

Prepare a supported Linux server with SSH access. Review [requirements](../getting-started/requirements/ "mention") before continuing.

{% hint style="warning" %}
Do not paste passwords, private keys, tokens, or license keys into agent prompts. Review every command before running it, especially commands that modify files, networks, or containers.
{% endhint %}

### Connect the documentation

Add the documentation MCP endpoint to your local agent.

{% tabs %}
{% tab title="Claude Code" %}
{% code overflow="wrap" %}
```bash
claude mcp add ayakaleaf-pro --scope user --transport http https://ayakaleaf-pro.ayaka.space/~gitbook/mcp
```
{% endcode %}
{% endtab %}

{% tab title="Codex" %}
{% code overflow="wrap" %}
```bash
codex mcp add ayakaleaf-pro --url https://ayakaleaf-pro.ayaka.space/~gitbook/mcp
```
{% endcode %}
{% endtab %}
{% endtabs %}

Start a new session after adding the server. Ask the agent to confirm it can search the Ayakaleaf Pro documentation.

### Deploy Ayakaleaf Pro

Open a terminal on your deployment server. Start Claude Code or Codex there. Then send this prompt:

{% code overflow="wrap" %}
```
Use the Ayakaleaf Pro documentation MCP server to guide this deployment.
First, inspect the requirements and installation guides.
Ask me for missing deployment details before making changes.
Use the Ayakaleaf Toolkit unless the documentation requires another approach.
Before configuring the instance, summarize relevant optional features.
Ask which features and integrations I want to enable.
Include TLS, sandboxed compiles, Git integration, external MongoDB or Redis,
SSO (OIDC, SAML, or LDAP), GitHub Synchronisation, Zotero, S3 storage,
email delivery, branding, and localization when relevant.
Explain each selected option's prerequisites, security impact, and configuration steps.
Keep unselected optional features disabled.
Show each command before running it.
Do not expose, store, or request secrets in chat.
After deployment, verify that the service is healthy and summarize the changes.
```
{% endcode %}

The agent should guide you through Docker setup, Toolkit configuration, image retrieval, and startup. Follow the [using-the-toolkit](using-the-toolkit/ "mention") for the canonical workflow.

### Choose optional features

Ask the agent to recommend only features that fit your environment. Typical choices include:

* **Access and security:** TLS, sandboxed compiles, and OIDC, SAML, or LDAP SSO.
* **External services:** MongoDB, Redis, S3 storage, and email delivery.
* **Collaboration:** Git integration, GitHub Synchronisation, and Zotero.

The agent should explain dependencies before editing configuration. Review [toolkit-settings.md](../configuration/overleaf-toolkit/toolkit-settings.md "mention") and [authentication](../configuration/overleaf-toolkit/authentication/ "mention") before enabling production integrations.

### Verify the deployment

After the agent completes the steps:

1. Confirm every command completed without errors.
2. Open the configured Ayakaleaf Pro URL in your browser.
3. Complete the [6.-post-installation-tasks.md](using-the-toolkit/6.-post-installation-tasks.md "mention").

For an existing Community Edition installation, use the [migrate-from-existing.md](migrate-from-existing.md "mention") instead of a fresh deployment.
