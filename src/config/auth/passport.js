const User = require("@models/user");
const settings = require("@settings/settings");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.publicKey,
    algorithms: ['RS256']
};
const googleOpts = {
    clientID: settings.googleClient,
    clientSecret: settings.publicKey,
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
        User.findById(payload.sub , (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
    passport.use(new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }));
};