const express = require('express');
const routes = require('../routes');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorHandling = require('../utils/errorHandling');

server.use(morgan('dev'))
server.use(cors());

server.use(express.static(path.resolve(__dirname, './uploads')))
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use('/', routes);
server.use(errorHandling);
module.exports = server;