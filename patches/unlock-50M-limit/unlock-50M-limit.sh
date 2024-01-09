# /bin/bash
# This script removes the 50M limit on the file size that can be uploaded to the overleaf.
# run this script after at the root of the overleaf repository (not in the Docker container)
# 本脚本用于解除overleaf上传文件大小限制
# 在overleaf根目录下运行本脚本(不要在Docker容器中运行)

# 文件目录：server-ce/nginx/nginx.conf.template
# 文件内容中有一行：client_max_body_size 50m;
# 将50m改为500m
sed -i 's/client_max_body_size 50m;/client_max_body_size 500m;/g' server-ce/nginx/nginx.conf.template

# 文件目录：services/web/config/settings.defaults.js
# 文件内容中有一行：maxUploadSize: 50 * 1024 * 1024, // 50 MB

# 将50 * 1024 * 1024改为500 * 1024 * 1024
sed -i 's/maxUploadSize: 50 \* 1024 \* 1024,/maxUploadSize: 500 \* 1024 \* 1024,/g' services/web/config/settings.defaults.js

