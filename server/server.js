/**
 * server.js - Set up a server
 * @type {Parsers|*}
 */

/*
 * Provides a way of working with directories and file paths
 * https://www.npmjs.com/package/path
 */
const path = require('path');

/*
 * This is an express server
 * https://www.npmjs.com/package/express
 */
const cors = require('cors');
const express = require('express');
const server = express();
// server.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Access-Token');
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//   res.header('X-Powered-By', ' 3.2.1');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

/*
 * Middleware for parsing the request body
 * https://www.npmjs.com/package/body-parser
 */
const bodyParser = require('body-parser');
server.use(bodyParser.json());

/*
 * Set various HTTP headers to help secure the server
 * https://www.npmjs.com/package/helmet
 */
const helmet = require('helmet');
server.use(helmet());

/*
 * Ruby-like logger for logging messages
 * https://www.npmjs.com/package/logger
 */
const logger = require('morgan');
server.use(logger('dev'));

/*
 * Database object modelling
 * https://www.npmjs.com/package/mongoose
 */
const mongoose = require('mongoose');
const { connectionStr } = require('./config');

// Connect to the Mongo database
mongoose.Promise = global.Promise;
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB Connect Success!');
});

// Set up the routes
// -----------------

const apiRoutes = require('./src/routes/api-routes');

server.use('/api', apiRoutes);

// Handle errors
// -------------

const errorHandlers = require('./src/middleware/error-handlers');

// Catch all invalid routes
server.use(errorHandlers.invalidRoute);

// Handle mongoose errors
server.use(errorHandlers.validationErrors);

// Export the server object
module.exports = server;
