require('module-alias/register');
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const settings = require("@settings/settings");
const log = require("@helpers/loggers");

const app = express();

require("@db/database")(settings);
require("@auth/passport")(passport);
require("@config/server")(express, app, passport);
require("@routes/routes")(app);

app.listen(settings.port, log.listener);