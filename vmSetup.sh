#!/bin/bash
cd /home/krisose/T05-Project-2/
git pull

# preprocessing
cd /home/krisose/T05-Project-2/preprocessing
python3 preprocessing.py
python3 upload_json_to_mongo.py

# backend
cd /home/krisose/T05-Project-2/backend
npm install
pkill -f node
npm start &

# frontend
cd /home/krisose/T05-Project-2/frontend
npm install
npm run build
sudo rm -rf /var/www/html/project2/ 
sudo mv dist /var/www/html/project2/