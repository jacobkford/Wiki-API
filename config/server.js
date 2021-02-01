const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const compression = require("compression");
const hpp = require("hpp");
//const csurf = require("csurf");
const settings = require("./settings");

module.exports = (express, app, passport) => {
    app.set("view engine", "ejs");
    app.use(compression());
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(helmet());
    // Make sure this is below bodyParser
    app.use(hpp());
    app.use(cors({
        // Location of frontend app
        origin: "http://localhost:3000",
    }));
    app.use(session({
        secret: settings.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
        },
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(csurf());
    app.use(express.static("public"));
};