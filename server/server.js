/**
 * server.js - Set up a server
 * @type {Parsers|*}
 */

/*
 * Provides a way of working with directories and file paths
 * https://www.npmjs.com/package/path
 */
const path = require("path");

/*
 * This is an express server
 * https://www.npmjs.com/package/express
 */
const cors = require("cors");
const express = require("express");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));

/*
 * Middleware for parsing the request body
 * https://www.npmjs.com/package/body-parser
 */
const bodyParser = require("body-parser");
server.use(bodyParser.json());

/*
 * Set various HTTP headers to help secure the server
 * https://www.npmjs.com/package/helmet
 */
const helmet = require("helmet");
server.use(helmet());

/*
 * Ruby-like logger for logging messages
 * https://www.npmjs.com/package/logger
 */

const logger = require("morgan");
const Log = require('./../server/src/models/log')
const logDAO = require('./../server/src/models/logDAO')
var writeToDB = {
  write: function (line) {
    var ele = new Log({
       line: line
    })
    ele.save(err => {
      if (err) {
        console.log('err', err)
      }
    })
  }
}
server.use(logger("combined", {stream: writeToDB}))
//这是在终端打印日志。
server.use(logger("dev"));
//这是把日志写入文件以供参阅。
// const fs = require("fs");
// var accessLog = fs.createWriteStream("./access.csv", { flags: "a" });
// server.use(logger("combined", { stream: accessLog }));
 
let method = '';
server.use(logger(function (tokens, req, res) {
  var request_time = new Date();
  var request_method = tokens.method(req, res);
  var request_url = tokens.url(req, res);
  var status = tokens.status(req, res);
  var remote_addr = tokens['remote-addr'](req, res);
  logDAO.userlog([request_time,request_method,request_url,status,remote_addr], function (success) {
    console.log('成功保存！');
  })
}))
/*
 * Database object modelling
 * https://www.npmjs.com/package/mongoose
 */
const mongoose = require("mongoose");
const { connectionStr } = require("./config");

// Connect to the Mongo database
mongoose.Promise = global.Promise;
mongoose.connect(
  connectionStr,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connect Success!");
  }
);

// Set up the routes
// -----------------

const apiRoutes = require("./src/routes/api-routes");

server.use("/api", apiRoutes);

// Handle errors
// -------------

const errorHandlers = require("./src/middleware/error-handlers");

// Catch all invalid routes
server.use(errorHandlers.invalidRoute);

// Handle mongoose errors
server.use(errorHandlers.validationErrors);

// Export the server object
module.exports = server;
