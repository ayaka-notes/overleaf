# Overleaf

Overleaf Pro Version, Include Git-Bridge.(Based on Overleaf CEP From yu-i-i)

For documents, visit https://overleaf-pro.ayaka.space/

Repo: https://github.com/ayaka-notes/overleaf-pro

QQ Group: 点击链接加入群聊【Overleaf Pro】：https://qm.qq.com/q/a7SJH0fDzi


<img width="256" alt="qrcode_1771606392195" src="https://github.com/user-attachments/assets/0d406482-39c5-4c5f-be01-d175a3656736" />


[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ayaka-notes/overleaf)

## Git Bridge Features

<img width="3112" height="1986" alt="image" src="https://github.com/user-attachments/assets/1ccc979e-ecda-416f-86af-2e128554124b" />

https://github.com/user-attachments/assets/7a0a4e84-a873-4dfa-afe9-f76a2e7ef0ef

The present "extended" version of Overleaf CE includes:

- Git Bridge
- Template Gallery
- Sandboxed Compiles with TeX Live image selection
- LDAP authentication
- SAML authentication
- OpenID Connect authentication
- Real-time track changes and comments
- Autocomplete of reference keys
- Symbol Palette
- "From External URL" feature

## Quick Setup 
Run the following command to start in Github codespace.
```bash
# use test-codespace for github codespace!
# 2core 8G is enouth, you need to wait for at least 3 mins. 
./run.sh
```

After opening the codespace, run:
```bash
./run.sh
```

Github Codespaces version will only download TeXLive image latest version.(Due to 32 GB storage limit of Codespaces)

**Note:** Download TeXLive image need some time. After that, the Overleaf server will start. You should go `http://localhost/launchpad` to set your admin account.



## TeXLive

We use [texlive-full@ayaka-notes](https://github.com/ayaka-notes/texlive-full), to provice support for overleaf Pro version, related image has been adjusted the same as overleaf SaaS.

## Reference

Some features comes from https://github.com/yu-i-i/overleaf-cep
