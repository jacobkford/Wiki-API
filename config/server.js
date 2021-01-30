const compression = require("compression");

module.exports = (express, app) => {
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(compression());
}