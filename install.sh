#!/bin/sh
echo 'Iniciando instalacion';
npm i -g concurrently
npm i -g live-server

cd web
echo 'Instalando web';
npm i --force
cd ../server
echo 'Instalando serve';
npm i
cd ../app
echo 'Instalando app';
npm i
echo 'Done !!!'