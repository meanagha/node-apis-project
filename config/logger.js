const morgan = require('morgan');
const logger = require('./winston');
const express = require("express");

const app = express();


app.use(morgan("combined", { stream: logger.stream.write }));
app.use(function(err, req, res, next) {
    logger.error(`${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
    next(err)
}) 
module.exports = logger;
