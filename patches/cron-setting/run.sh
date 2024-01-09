# /bin/bash

# 移动文件把delete-unused-container.sh移动到server-ce/cron目录下
mv ./delete-unused-container.sh ./server-ce/cron/delete-unused-container.sh

# server-ce/config/crontab-deletion
echo "* * * * *    root  /overleaf/cron/delete-unused-container.sh >> /var/log/sharelatex/cron-delete-projects.log 2>&1" >> ./server-ce/config/crontab-deletion

