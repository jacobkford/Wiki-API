const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
    // use static authenticate method of model in LocalStrategy
    passport.use(new LocalStrategy(User.authenticate()));
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}