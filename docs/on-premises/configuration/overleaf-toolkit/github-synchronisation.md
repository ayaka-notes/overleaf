---
icon: github
---

# GitHub Synchronisation

The GitHub integration is only available at [ayaka-notes/overleaf](https://github.com/ayaka-notes/overleaf) currently. We are very proud to bring this feature for everyone to use, which used to be only available at Overleaf SaaS.

{% hint style="info" %}
This feature is developed by [ayaka-notes/overleaf-pro](https://github.com/ayaka-notes/overleaf-pro), will be introduced from v6.2.0 and later. It's still in beta status. We need your feedback if you have any problem.
{% endhint %}

{% columns %}
{% column %}
<figure><img src="../../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>
{% endcolumn %}

{% column %}
<figure><img src="../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (29).png" alt=""><figcaption></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

### Setup GitHub Synchronisation

{% hint style="warning" %}
You need to enable [git-bridge](git-integration.md) first before using GitHub Synchronisation.

{% code title="config/overleaf.rc" %}
```dotenv
GIT_BRIDGE_ENABLED=true
```
{% endcode %}
{% endhint %}

Visit [developers settings](https://github.com/settings/developers) to create your GitHub OAuth application, and copy your `CLIENT_ID` and `SECRET`.

Then, add the following settings to your overleaf env var files.

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
# used to encrypt the user's GitHub access token.
CIPHER_PASSWORD=0123456789ABCDEFG # changed to yours

# Github Sync Settings
GITHUB_SYNC_ENABLED=true
GITHUB_SYNC_CLIENT_ID=
GITHUB_SYNC_CLIENT_SECRET=
GITHUB_SYNC_CALLBACK_URL==http://your.overleaf.com/github-sync/completeRegistration
GITHUB_SYNC_HOST=github-sync
# (Optional) GITHUB_SYNC_PROXY_URL=http://10.0.0.1:8888
```
{% endcode %}

