const express = require('express');
const routes = require('../routes');
const server = express();
const morgan = require('morgan')
const bodyParser= require('body-parser')

server.use(morgan('dev'));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use('/', routes);

module.exports = server