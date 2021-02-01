const User = require("../models/user");
//const bcrypt = require("bcrypt");

module.exports = (passport) => {
    // use static authenticate method of model in LocalStrategy
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}