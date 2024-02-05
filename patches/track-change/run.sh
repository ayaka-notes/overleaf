# /bin/bash

mv ./track-changes ./services/web/modules/

# 导入的模块要加入track-changes
sed -i "/moduleImportSequence: \[/a \\\
'track-changes'," ./services/web/config/settings.defaults.js

# services/web/app/src/Features/Project/ProjectEditorHandler.js
# 对此文件进行修改，把 trackChangesAvailable: false, 替换为 trackChangesAvailable: true,
sed -i "s/trackChangesAvailable: false,/trackChangesAvailable: true,/" ./services/web/app/src/Features/Project/ProjectEditorHandler.js