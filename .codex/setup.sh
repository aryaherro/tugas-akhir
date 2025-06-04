#!/bin/bash
apt-get update
apt-get install -y php composer

composer install
npm install
