//const User = require("../models/user");
const passport = require("passport");
require("../config/passport")(passport);
const { issueJWT } = require("../config/auth");

module.exports = {
    googleCallbackGet: (req, res) => {
        const jwt = issueJWT(req.user)
        res.json({
            success: true,
            user: req.user,
            token: jwt.token,
            expiresIn: jwt.expires
        });
    },  
};