# /bin/bash

cp -r ./patches/config-clsi-match/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/config-web-setting/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/cron-setting/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/unlock-50M-limit/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/nginx-learn-config/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/short-key-title/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/symbol-palette/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

cp -r ./patches/track-change/* ./overleaf
cd ./overleaf && ./run.sh && cd ..

# cp -r ./patches/references/* ./overleaf
# cd ./overleaf && ./run.sh && cd ..

cp ./patches/more-theme/* ./overleaf
cd ./overleaf && ./run.sh && rm -rf ./run.sh && cd ..

# cd ./overleaf && npm install --package-lock-only --ignore-scripts
