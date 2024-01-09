# /bin/bash

# services/web/config/settings.defaults.js文件末尾追加./setting-patch.js的内容
cat setting-patch.js >> services/web/config/settings.defaults.js

rm -rf setting-patch.js

