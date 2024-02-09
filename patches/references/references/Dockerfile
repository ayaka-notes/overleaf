# This file was auto-generated, do not edit it directly.
# Instead run bin/update_build_scripts from
# https://github.com/overleaf/internal/

FROM node:18.18.2 as base
USER node
WORKDIR /overleaf/services/references

# Google Cloud Storage needs a writable $HOME/.config for resumable uploads
# (see https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream)
RUN mkdir /home/node/.config && chown node:node /home/node/.config

FROM base as app

COPY package.json package-lock.json /overleaf/
COPY services/references/package.json /overleaf/services/references/
COPY libraries/ /overleaf/libraries/
COPY patches/ /overleaf/patches/

USER root
RUN chown -R node:node /overleaf

USER node
RUN  cd /overleaf && npm install --quiet

COPY services/references/ /overleaf/services/references/

FROM app
USER root

CMD ["node", "--expose-gc", "app.js"]
