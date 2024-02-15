# /bin/bash


export CURRENT_DIR=$(PWD)

docker-compose -f docker-compose.texlive.yml pull

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

# docker-compose up -d
docker-compose up -d

