const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");
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


function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false, }, async (error, token) => {
      if (error || !token) {
          response.status(401).json({ message: 'Unauthorized' });
      } 
      try {
          const user = await User.findById(token.id);
          request.user = user;
      } catch (error) {
          next(error);
      }
      next();
  })(request, response, next);   
}

module.exports.issueJWT = issueJWT;
module.exports.authorized = authorized;