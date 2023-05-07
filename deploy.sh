#!/bin/bash

# Перейти в директорию с вашим проектом
cd /var/www/example.com

# Получить изменения из вашего репозитория на Github
git pull origin master

# Запустить скрипт установки зависимостей (если это необходимо)
composer install --no-dev --prefer-dist
npm install --production

# Перезапустить ваш сервер HTTP (если это необходимо)
sudo service apache2 restart
