#!/usr/bin/env bash

set -eux

echo "-------------------------"
echo "Delete container"
echo "-------------------------"

# 获取所有已停止的容器的ID
stopped_containers=$(docker ps -q -f "status=exited" --filter "status=created" --filter "status=dead")

# 循环遍历每个停止的容器
for container_id in $stopped_containers; do
    # 获取容器名称
    container_name=$(docker inspect --format '{{.Name}}' $container_id)
    
    # 移除名称以"project-"开头的容器
    if [[ $container_name == "/project-"* ]]; then
        echo "Removing container: $container_name"
        docker rm -f $container_id
    fi
done

# 
# 最后记得在cron.d中添加，让他每分钟执行一次删除不用的容器
# * * * * *    root  /overleaf/cron/delete-docker.sh >> /var/log/sharelatex/cron-delete-projects.log 2>&1