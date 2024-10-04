#!/bin/bash
cd /home/krisose/T05-Project-2/frontend
git pull
npm install
npm run build
sudo rm -rf /var/www/html/project2/ 
sudo mv dist /var/www/html/project2/