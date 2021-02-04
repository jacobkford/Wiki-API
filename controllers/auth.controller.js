//const User = require("../models/user");
const passport = require("passport");
require("../config/passport")(passport);

module.exports = {

    googleCallbackGet: (req, res) => {
        res.redirect("/");
    }
};