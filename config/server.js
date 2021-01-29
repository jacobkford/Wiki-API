const express = require("express");

module.exports = (app) => {
    app.engine("ejs", require("ejs").renderFile);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
}