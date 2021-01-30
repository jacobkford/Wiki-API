const settings = require("./settings");
const mongoose = require("mongoose");

module.exports = {

    listener: () => {
        console.log("%c-----------", 'color: blue; font-weight: bold;');
        console.log(`%c[   SERVER]: Express is ready!`, 'color: blue; font-weight: bold;');
        console.log(`%c[     PORT]: Listening on port ${settings.port}.`, 'color: blue; font-weight: bold;');
        console.log(`%c[      CWD]: ${process.cwd()}`, 'color: blue; font-weight: bold;');
        console.log(`%c[BOOT TIME]: ${process.uptime() * 1000}ms`, 'color: blue; font-weight: bold;');
    },

    database: () => {
        console.log(`%c[ DATABASE]: We are ${mongoose.STATES[mongoose.connection.readyState]}.`, 'color: blue; font-weight: bold;');
    }
};