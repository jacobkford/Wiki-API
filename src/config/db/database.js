const mongoose = require("mongoose");
const log = require("../helpers/loggers");

module.exports = (settings) => {
    mongoose.connect(settings.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, log.database);
}