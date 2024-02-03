# /bin/bash

# services/web/app/views/project/editor/meta.pug
# 替换该文件里面的一行代码：if (settings.overleaf != null) 为 if (true)
sed -i 's/if (settings.overleaf != null)/if (true)/g' services/web/app/views/project/editor/meta.pug

# services/web/app/src/infrastructure/ExpressLocals.js
# 同理替换该文件里面的一行代码：if (Settings.overleaf != null) 为 if (true)
sed -i 's/if (Settings.overleaf != null)/if (true)/g' services/web/app/src/infrastructure/ExpressLocals.js