/* eslint-disable no-undef */
const User = require("../models/user");
const settings = require("./settings");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const path = require("path");
const fs = require("fs");
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: PUB_KEY,
    algorithms: ['RS256']
};
const googleOpts = {
    clientID: settings.googleClient,
    clientSecret: PUB_KEY,
    callbackURL: "http://localhost:3000/auth/google/simplewiki",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
};

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        })
    });
    passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
        User.findOne({ _id: payload.sub }, (err, user) => {
            return done(err, user);
        });
    }));
    passport.use(new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }));
};