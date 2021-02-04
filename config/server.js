const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const hpp = require("hpp");
//const csurf = require("csurf");

module.exports = (express, app, passport) => {
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
        //origin: "http://localhost:3000",
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    //app.use(csurf());
    app.use(express.static("public"));
};