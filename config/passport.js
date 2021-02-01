const User = require("../models/user");
//const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
    // use static authenticate method of model in LocalStrategy
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}