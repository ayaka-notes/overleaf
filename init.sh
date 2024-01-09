# /bin/bash

docker-compose -f docker-compose.image.yml pull

# 把每个形如 ghcr.io/ayaka-notes/overleaf/texlive:2023
# 的名字改成 ghcr.io/ayaka-notes/overleaf/texlive:2023.1

# 1. 获取所有的镜像名字
docker images --format "{{.Repository}}:{{.Tag}}" > images.txt

# 2. 用正则表达式匹配，如果匹配到了，就把名字改成 ghcr.io/ayaka-notes/overleaf/texlive:2023.1
grep -E "ghcr.io/ayaka-notes/overleaf/texlive:[0-9]{4}" images.txt | while read line; do
    echo $line
    new_name=$(echo $line | sed -E "s/ghcr.io\/ayaka-notes\/overleaf\/texlive:([0-9]{4})/ghcr.io\/ayaka-notes\/overleaf\/texlive:\1.1/")
    echo $new_name
    docker tag $line $new_name
done

# 3. 删除images.txt
rm images.txt

