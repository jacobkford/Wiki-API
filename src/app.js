/* eslint-disable no-undef */
require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");
const settings = require(path.resolve(__dirname + "/config/settings/settings"));
const log = require(path.resolve(__dirname + "/config/helpers/loggers"));

const app = express();

require(path.resolve(__dirname + "/config/db/database"))(settings);
require(path.resolve(__dirname + "/config/auth/passport"))(passport);
require(path.resolve(__dirname + "/config/server"))(express, app, passport);
require(path.resolve(__dirname + "/routes/routes"))(app);

app.listen(settings.port, log.listener);