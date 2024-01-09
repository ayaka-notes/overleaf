# /bin/bash

# services/clsi/app/js/DockerRunner.js文件中，修改
# 以const match = image.match(/:([0-9]+)\.[0-9]+/) 替换为
# const match = image.match(/:([0-9]+)\.[0-9]*/)
sed -i 's/.*const match =.*/\t\tconst match = image.match(\/:([0-9]+)\\.[0-9]*\/)/' services/clsi/app/js/DockerRunner.js