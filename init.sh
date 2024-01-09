# /bin/bash

docker-compose -f docker-compose.image.yml pull

docker-compose up -d


docker exec -it mongo mongo --eval "rs.initiate({ _id: \"overleaf\", members: [ { _id: 0, host: \"mongo:27017\" } ] })" > /dev/null
