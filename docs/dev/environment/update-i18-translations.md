---
icon: language
---

# Update i18 Translations

There is a file in `services/web/frontend/extracted-translations.json`, overleaf web will only use extracted translations in this file.

Run the folloing command to update i18n translations if you have added some contents.

<pre class="language-bash"><code class="lang-bash"><strong>user ➜ ~/overleaf-pro/develop (server-pro) $ bin/shell webpack
</strong>root@432836260f8a:/overleaf/services/web# npm run extract-translations
</code></pre>

