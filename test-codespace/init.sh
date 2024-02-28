# /bin/bash

export CURRENT_DIR=$(pwd)

docker-compose -f docker-compose.image.yml pull

docker-compose -f docker-compose.yml pull

# docker-compose 启动mongo服务
docker-compose up -d mongo

docker-compose exec -T mongo sh -c '
    while ! mongo --eval "db.version()" > /dev/null; do
      echo "Waiting for Mongo..."
      sleep 1
    done
    mongo --eval "rs.initiate({ _id: \"overleaf\", members: [ { _id: 0, host: \"mongo:27017\" } ] })" > /dev/null'

# 或者手动执行下面的命令
# docker exec -it mongo mongo --eval "rs.initiate({ _id: \"overleaf\", members: [ { _id: 0, host: \"mongo:27017\" } ] })" > /dev/null


docker-compose up -d minio

echo "Waiting for Minio... (10s)"
sleep 10

# 使用环境变量
# MINIO_ROOT_USER
# MINIO_ROOT_PASSWORD
docker-compose exec -T minio sh -c '
    mc alias set s3 http://minio:9000 minioadmin minioadmin;
    mc mb --ignore-existing s3/overleaf-user-files;
    mc mb --ignore-existing s3/overleaf-template-files;
    mc mb --ignore-existing s3/overleaf-project-blobs;
    mc mb --ignore-existing s3/overleaf-chunks
    '

# docker-compose up -d
docker-compose up -d
