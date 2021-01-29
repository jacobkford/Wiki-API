const mongoose = require("mongoose");

module.exports = (settings) => {
    mongoose.connect(settings.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log(`[ DATABASE]: We are ${mongoose.STATES[mongoose.connection.readyState]}.`);
    });
}