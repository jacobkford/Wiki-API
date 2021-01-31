const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const compression = require("compression");

module.exports = (express, app) => {
    app.set("view engine", "ejs");
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(compression());
    app.use(session({
        secret: "abcdefg1234567",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}