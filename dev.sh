# /bin/bash

git clone https://github.com/overleaf/overleaf 

cp ./docker-compose.dev.yml ./overleaf/develop/docker-compose.yml

cd overleaf/develop

docker compose pull

bin/build

bin/init

bin/up

echo "Now you can visit http://localhost:80/launchpad to create your admin account."

echo "Only After creating your admin account, can you continue to develop Overleaf."

echo "Then, to see real-time changes, run 'bin/down' and 'bin/up' again."


