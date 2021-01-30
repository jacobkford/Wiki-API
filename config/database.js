const mongoose = require("mongoose");
const log = require("./loggers");

module.exports = (settings) => {
    mongoose.connect(settings.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, log.databaseLog);
}