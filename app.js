require("dotenv").config();
const path = require("path");
const express = require("express");
const settings = require(path.resolve(__dirname + "/config/settings"));
const log = require(path.resolve(__dirname + "/config/loggers"));

const app = express();

require(path.resolve(__dirname + "/config/database"))(settings);
require(path.resolve(__dirname + "/config/server"))(app);
require(path.resolve(__dirname + "/routes/routes"))(app);

app.listen(settings.port, log.listenerLog);