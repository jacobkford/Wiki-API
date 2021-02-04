const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const settings = require("../config/settings");
const passport = require("passport");
require("../config/passport")(passport);

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */

function issueJWT (user) {
  const _id = user._id;
  const expiresIn = '1d';
  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, settings.privateKey, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

function wikiLogin(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }
    try {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !user) {
          res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }
        const jwt = issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires
        });
      });
    } catch (err) {
      next(err);
    }
    next();
  })(res, req, next);
}

function googleLogin(req, res, next) {
  passport.authenticate("google", { session: false, }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }
    try {
      const jwt = issueJWT(user)
      res.status(200).json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires
      });
    } catch (err) {
      next(err);
    }
    next();
  })(req, res, next);
}

function CheckAuth(req, res, next) {
  passport.authenticate('jwt', { session: false, }, async (error, token) => {
      if (error || !token) {
          res.status(401).json({ message: 'Unauthorized' });
      } 
      try {
          const user = await User.findById(token.id);
          req.user = user;
      } catch (error) {
        next(error);
      }
      next();
  })(req, res, next);   
}

module.exports.issueJWT = issueJWT;
module.exports.CheckAuth = CheckAuth;
module.exports.wikiLogin = wikiLogin;
module.exports.googleLogin = googleLogin;