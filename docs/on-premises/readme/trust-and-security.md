---
description: Understand data handling, build delivery, and security responsibilities.
icon: expeditedssl
---

# Trust and Security

Ayakaleaf Pro runs in your infrastructure. You control its data, access, and network boundaries. This page explains the default security model. It also identifies your operational responsibilities.

### Is Ayakaleaf Pro reliable and secure?

Ayakaleaf Pro is a self-hosted Overleaf Pro enhancement, and our source code is available at [ayaka-notes/ayakaleaf](https://github.com/ayaka-notes/ayakaleaf-pro). Your deployment controls where services run and data resides.

Security depends on your configuration and operations. Protect administrator access, enable HTTPS, and maintain backups.

Thanks to OpenAI for their kind support. We will regularly use [Codex Security](https://chatgpt.com/codex/cloud/security/findings) to scan our repository for security issues and publicly share the results of vulnerability fixes.

### Where does my data go?

By default, application data remains within your deployment:

* MongoDB stores user and project data.
* Redis stores cache and real-time collaboration data.
* Local volumes or S3-compatible storage hold project files.

Only the web service is exposed by default. Internal services communicate through the Docker network.

### Will my data be sent to or retrieved from any third parties?

Nothing leaves your deployment unless you enable a feature that requires it. Ayakaleaf Pro sends _no telemetry, no usage analytics, and no crash reports_. Error reporting and analytics are disabled in the default configuration.

Several features never make external requests at all. Templates are stored and served from your own deployment. The Python script runner executes in the user's browser through WebAssembly, and its runtime is served from your own web service rather than a public CDN, so script code and output never reach the network. Git Bridge is reachable only on the internal Docker network. Full project search, symbol palette, track changes, project history, and the admin panel are entirely local. Sandbox compile containers are created with networking disabled.

The remaining feature requests reach the following destinations. Each request originates from the web service:

<details>

<summary><strong>GitHub integration</strong></summary>

**GitHub integration** contacts `github.com` and `api.github.com`. It is enabled per user by linking a GitHub account, and the authorization requests the `read:org`, `repo`, and `workflow` scopes. Pushing uploads full project file contents as Git blobs, which are then assembled into trees and commits. It also performs branch, reference, compare, and merge operations, and reads the linked account's profile, organization memberships, and repository list. Project content leaves your deployment in both directions — treat a linked GitHub account as an export path for every project attached to it.

</details>

<details>

<summary><strong>Zotero integration</strong></summary>

**Zotero integration** contacts `www.zotero.org` for authorization and `api.zotero.org` for library data. It is enabled per user by linking a Zotero account. The OAuth handshake and the user's API key are sent. Reads are one-directional: reference libraries are pulled in as BibTeX, and no project content is uploaded.

</details>

<details>

<summary><strong>Mendeley integration</strong></summary>

**Mendeley integration** contacts `api.mendeley.com` for both authorization and library data. It is enabled per user by linking a Mendeley account. The OAuth handshake requests Mendeley's `all` scope — the only scope its API offers — but Ayakaleaf only ever performs reads: reference libraries and group libraries are pulled in as BibTeX, and no project content is uploaded. Access tokens are refreshed automatically; when Mendeley revokes a grant, the stored credential is discarded and the user is asked to link the account again.

</details>

<details>

<summary><strong>Documentation pages</strong></summary>

**Documentation pages** are retrieved from `https://learnwiki.overleaf.com`, configurable with `WIKI_URL`. Requests are made by the web service, not by the user's browser, so the upstream wiki sees your server and never your users' addresses. Only the requested page title is sent, and responses are cached on disk. Point `WIKI_URL` at your own mirror, or block the destination, if outbound documentation traffic is not acceptable.

</details>

<details>

<summary><strong>Email delivery</strong></summary>

**Email delivery** contacts whatever SMTP server or mail API you configure; there is no default. Recipient addresses and message contents leave your deployment, including password reset and invitation links.

</details>

<details>

<summary><strong>Two optional checks (PWD/reCAPTCHA)</strong></summary>

**Two optional checks are disabled by default.** The compromised password check is inactive unless `HAVE_I_BEEN_PWNED_ENABLED` is set; when enabled it sends the first characters of a SHA-1 hash of the password to `api.pwnedpasswords.com`, never the password itself. CAPTCHA verification is inactive unless a reCAPTCHA site key is configured, and contacts `www.google.com` when active.

</details>

<details>

<summary><strong>Single sign-on (OAuth/LDAP/SAML)</strong></summary>

**Single sign-on** reaches only the identity provider you supply, and what travels there depends on the protocol. With LDAP the web service connects to your directory directly: it binds with the service account you configure, searches under the base, filter, and attribute list you define, and verifies the password entered on the login form against your directory, so that the username and password reach the directory server. Enabling directory-backed contacts causes an additional search to populate the contact list. With OIDC the web service exchanges the authorization code at your token endpoint and then calls your user-info endpoint, requesting the `openid profile email` scopes by default; this is configurable with `OVERLEAF_OIDC_SCOPE`. With SAML the authentication request travels through the user's browser to the identity provider rather than over a direct server connection. In all three cases the user's name and email address arrive from the provider rather than being sent to it, and are then stored on the local user record.

</details>

<details>

<summary><strong>Third-party credentials</strong></summary>

**Third-party credentials** — OAuth tokens and API keys — are held in MongoDB on the user record, encrypted with AES-256-CTR under a per-record salt and initialization vector. They are never stored in plaintext and never written to logs. The encryption key comes from `${PROVIDER}_CIPHER_PASSWORD` if set (like Zotero and Mendey); otherwise one is generated on first use and persisted inside your data volume with owner-only permissions. Back up that key together with your data volume: if it is lost, stored credentials cannot be decrypted and every user must link their accounts again.

</details>

<details>

<summary><strong>Files linked from a URL</strong></summary>

**Files linked from a URL** are fetched by your deployment on the user's behalf, so the destination is whatever address the user supplies. This is the one feature whose outbound targets are not a fixed list. It is disabled unless you add `url` to `ENABLED_LINKED_FILE_TYPES`, and the default configuration does not include it. When enabled, requests do not leave the web service directly: they pass through a dedicated proxy component that runs inside your own deployment, which restricts the protocols allowed, resolves the target hostname, and refuses addresses in private ranges. You can narrow it further to an explicit set of permitted resources. Only the target URL is sent; no project data accompanies the request.

</details>

If your policy requires an outbound allow-list, permit only the hosts whose features you have enabled — `github.com` and `api.github.com` for GitHub, `www.zotero.org` and `api.zotero.org` for Zotero, `api.mendeley.com` for Mendeley, `learnwiki.overleaf.com` or your own `WIKI_URL` for documentation, `api.pwnedpasswords.com` for the password check, `www.google.com` for CAPTCHA, plus your own mail server and identity provider. Deny the rest. No other feature requires outbound access. Where egress must be inspected or logged centrally, the GitHub, Zotero and Mendeley integrations can each be routed through an HTTP proxy by setting `GITHUB_SYNC_PROXY_URL` , `MENDELEY_PROXY_URL` and `ZOTERO_PROXY_URL`. Files linked from a URL cannot be constrained to a host list, since the destination is chosen by the user at the time of the request; restrict that feature through the proxy component's own allowed-resource setting, or leave it disabled.

### Are project compiles isolated?

Ayakaleaf Pro supports sandboxed compiles. Each compile runs in a separate container. Sandbox containers have no network access by default. This reduces exposure to internal network resources.

Sandboxed compiles require access to the host Docker socket. Restrict host administration to trusted operators.

### Can I trust CI builds and container images?

GitHub Actions builds and publishes Ayakaleaf Pro container images. Images are available from the public GitHub Container Registry.

Images support `amd64` and `arm64`. Docker selects the matching architecture when pulling an image.

Do not use the `latest` tag in production. Pin an explicit version, preferably an image digest.

Test every upgrade in a non-production environment. Verify the image, configuration, and integrations before rollout.

### Is the code open source?

Ayakaleaf Pro and related feature repositories are publicly available. This allows users to review changes and trace upstream sources.

Public source code supports independent review. It does not, by itself, guarantee reproducible release builds.

Before upgrading, review:

* The release tag or commit.
* The image version or digest.
* Third-party dependencies and license requirements.
