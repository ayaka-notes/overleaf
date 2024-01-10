FROM phusion/baseimage:focal-1.2.0

LABEL \
    org.opencontainers.image.title="Docker Image of TeXLive" \
    org.opencontainers.image.authors="ayaka-notes <public@ayaka.space>" \
    org.opencontainers.image.source="https://github.com/ayaka-notes/overleaf" \
    org.opencontainers.image.licenses="MIT"

# 参数-年份
ARG TEXLIVE_Version=2022
ARG TEXLIVE_MIRROR=http://ftp.math.utah.edu/pub/tex/historic/systems/texlive/${TEXLIVE_Version}/tlnet-final
# https://ftp.math.utah.edu/pub/tex/historic/systems/texlive/${TEXLIVE_Version}/tlnet-final

# 安装依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    fontconfig inkscape pandoc python3-pygments wget python3 \
    gnupg gnuplot perl-modules perl ca-certificates


# 感谢Overleaf的Dockerfile
# 安装 texlive
RUN mkdir /install-tl-unx \
&&  wget --quiet https://tug.org/texlive/files/texlive.asc \
&&  gpg --import texlive.asc \
&&  rm texlive.asc \
&&  wget --quiet ${TEXLIVE_MIRROR}/install-tl-unx.tar.gz \
&&  wget --quiet ${TEXLIVE_MIRROR}/install-tl-unx.tar.gz.sha512 \
&&  wget --quiet ${TEXLIVE_MIRROR}/install-tl-unx.tar.gz.sha512.asc \
&&  gpg --verify install-tl-unx.tar.gz.sha512.asc \
&&  sha512sum -c install-tl-unx.tar.gz.sha512 \
&&  tar -xz -C /install-tl-unx --strip-components=1 -f install-tl-unx.tar.gz \
&&  rm install-tl-unx.tar.gz* \
&&  echo "tlpdbopt_autobackup 0" >> /install-tl-unx/texlive.profile \
&&  echo "tlpdbopt_install_docfiles 0" >> /install-tl-unx/texlive.profile \
&&  echo "tlpdbopt_install_srcfiles 0" >> /install-tl-unx/texlive.profile \
&&  echo "selected_scheme scheme-full" >> /install-tl-unx/texlive.profile \
    \
&&  /install-tl-unx/install-tl \
      -profile /install-tl-unx/texlive.profile \
      -repository ${TEXLIVE_MIRROR} \
    \
&&  $(find /usr/local/texlive -name tlmgr) path add \
&&  tlmgr install --repository ${TEXLIVE_MIRROR} \
      latexmk \
      texcount \
      synctex \
      etoolbox \
      xetex \
&&  tlmgr path add \
&&  rm -rf /install-tl-unx

# 配置 /usr/local/texlive/${TEXLIVE_Version}/texmf.cnf, 使得LaTeX可以使用shell-escape
RUN echo "shell_escape = t" >> /usr/local/texlive/${TEXLIVE_Version}/texmf.cnf && \
    echo "openout_any = a" >> /usr/local/texlive/${TEXLIVE_Version}/texmf.cnf && \
    echo "openin_any = a" >> /usr/local/texlive/${TEXLIVE_Version}/texmf.cnf

# 设置环境变量
ENV PATH="/usr/local/texlive/${TEXLIVE_Version}/bin/x86_64-linux:${PATH}"
