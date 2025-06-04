#!/bin/bash
apt-get update
apt-get install -y php composer php-xml php-dom

composer install
npm install
