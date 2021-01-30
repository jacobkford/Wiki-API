const compression = require("compression");

module.exports = (express, app) => {
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(express.static("public"));
}