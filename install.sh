#!/bin/sh
echo 'Iniciando instalacion';

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