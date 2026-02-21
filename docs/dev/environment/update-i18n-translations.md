---
icon: language
---

# Update i18n Translations

There is a file in `services/web/frontend/extracted-translations.json`, overleaf web will only use extracted translations in this file.

Run the folloing command to update extracted translations if you have added some contents.

```bash
user ➜ ~/overleaf-pro/develop (server-pro) $ bin/shell webpack
root@432836260f8a:/overleaf/services/web# npm run extract-translations
```

Generally, please don't edit translations text files, use existing one first, since all of those files are updated from overleaf upstream or third party translation site.
