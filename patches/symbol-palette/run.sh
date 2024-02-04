# /bin/bash

mv ./front-js-feature/symbol-palette ./services/web/frontend/js/features/
mv ./modules/symbol-palette ./services/web/modules/


# 插入到 overleaf/services/web/frontend/js/ide/editor/EditorManager.js 最前面
# import '../../features/symbol-palette/controllers/symbol-palette-controller'
sed -i "1i import '../../features/symbol-palette/controllers/symbol-palette-controller'" ./services/web/frontend/js/ide/editor/EditorManager.js

# overleaf/services/web/config/settings.defaults.js
# moduleImportSequence: 
# 'symbol-palette' 加上这个模块
sed -i "/moduleImportSequence: \[/a \\\
'symbol-palette'," ./services/web/config/settings.defaults.js