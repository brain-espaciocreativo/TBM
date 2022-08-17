const express = require('express');
const routes = require('../routes');
const server = express();
const morgan = require('morgan')

server.use(morgan('dev'));

server.use('/', routes);

module.exports = server