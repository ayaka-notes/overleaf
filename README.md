# Overleaf
Overleaf CE Patch Version, Include more functions.

## Quick Setup 
You need **8 core, 32GB Ram, 64GB storage Github Codespace** to run this APP. Run the following command to start.
```bash
./init.sh
```

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ayaka-notes/overleaf)

<img width="1222" alt="截屏2024-01-11 09 32 07" src="https://github.com/ayaka-notes/overleaf/assets/84625273/8ce1894d-764f-4337-b67f-1794eafc856d">

Github Codespace Version include the following texlive:
- `ghcr.io/ayaka-notes/overleaf/texlive:2023` (Also `latest` tag)
- `ghcr.io/ayaka-notes/overleaf/texlive:2022`
- `ghcr.io/ayaka-notes/overleaf/texlive:2021`

By the way, you can't use **Text Sync** if you use direct Codespace Port Forwarding. I suggest that you use your local vscode, use local Port Forwarding with URL like `127.0.0.1`.

## Texlive Image
Overleaf CE can be run with Texlive Image, For more infomation, check [this doc](./texlive). The following images are supported.(You can also use it as your own tex-writing)
- `ghcr.io/ayaka-notes/overleaf/texlive:2023` (Also `latest` tag)
- `ghcr.io/ayaka-notes/overleaf/texlive:2022`
- `ghcr.io/ayaka-notes/overleaf/texlive:2021`
- `ghcr.io/ayaka-notes/overleaf/texlive:2020`
- `ghcr.io/ayaka-notes/overleaf/texlive:2019`
- `ghcr.io/ayaka-notes/overleaf/texlive:2018`
- `ghcr.io/ayaka-notes/overleaf/texlive:2017`
- `ghcr.io/ayaka-notes/overleaf/texlive:2016`
- `ghcr.io/ayaka-notes/overleaf/texlive:2015`
- `ghcr.io/ayaka-notes/overleaf/texlive:2014`
- `ghcr.io/ayaka-notes/overleaf/texlive:2013`
- `ghcr.io/ayaka-notes/overleaf/texlive:2012`
- `ghcr.io/ayaka-notes/overleaf/texlive:2011`
- `ghcr.io/ayaka-notes/overleaf/texlive:2010`

## Some Patches

> To finish the Patches of overleaf, 

- Unlock The Limit of `50M`
- Use docker to compile Project
- Use Any texlive you want

## How To Enable Docker Compile?
- modify `docker-compose.yml` file
- Pay attention to `/workspaces/overleaf/`, this is an **Absolute PATH**, which shoule be where your repo(ayaka-notes/overleaf) is located.
- Here I provide 3 texlive images, for more images, find at [Packages](https://github.com/orgs/ayaka-notes/packages/container/package/overleaf%2Ftexlive) of the repo

> Want to use your own Tex Live Image?
>
> Don't use your own image, since you should manage to set `www-data` user's GID/UID to 33, so that it can works with sharelatex container.

```yaml
      # 注意：COMPILE_TIMEOUT必须在所有数据初始化之前生效
      # 因为编译时间是和用户强相关的，每个用户有自己的编译时间限制
      # 如果你服务器运行很久了，需要手动写脚本，更新mongo数据库中的用户编译时间限制
      COMPILE_TIMEOUT: "600"
      DOCKER_RUNNER: "true"
      SANDBOXED_COMPILES: "true"
      SANDBOXED_COMPILES_SIBLING_CONTAINERS: "true"
      # 记得改/workspaces/overleaf为你的克隆下来的仓库的路径
      SANDBOXED_COMPILES_HOST_DIR: "/workspaces/overleaf/data/sharelatex_data/data/compiles"
      SYNCTEX_BIN_HOST_PATH: "/workspaces/overleaf/data/sharelatex_data/bin" 
      TEX_LIVE_DOCKER_IMAGE: "ghcr.io/ayaka-notes/overleaf/texlive:2023"
      ALL_TEX_LIVE_DOCKER_IMAGES: "ghcr.io/ayaka-notes/overleaf/texlive:2023,ghcr.io/ayaka-notes/overleaf/texlive:2022,ghcr.io/ayaka-notes/overleaf/texlive:2021"

```
