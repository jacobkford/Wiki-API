/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const User = require("../models/user");
const passport = require("passport");
require("../config/passport")(passport);
const { issueJWT } = require("../config/auth");

module.exports = {

  getOne: (req, res) => {
    User.findById(req.params.userId, (err, result) => {
      res.send(err ? err : result);
    });
  },

  getLogout: (req, res) => {
    console.log(req.session);
    req.logout();
  },

  getMany: (req, res) => {
    User.find((err, result) => {
      res.send(err ? err : result);
    });
  },

  postRegister: (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    newUser.save().then((user) => {
        const jwt = issueJWT(user)
        res.json({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires
        });
      }).catch(err => next(err));
  },

  postLogin: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    req.login(user, (err) => {
      if (err) {
        console.error(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("Success.");
        });
      }
    });
  },

  putOne: (req, res) => {
    const user = { _id: req.params.userId };
    const newData = {
      email: req.body.email,
      password: req.body.password
    };
    if (req.isAuthenticated()) {
      User.replaceOne(user, newData, (err, result) => {
        res.send(err ? err : result);
      });
    } else {
      res.status(404).send("Authorization denied.");
    }
  },

  patchOne: async (req, res) => {
    const user = { _id: req.params.userId };
    const newData = { $set: req.body };
    if (req.isAuthenticated()) {
      User.updateOne(user, newData, (err, result) => {
        res.send(err ? err : result);
      });
    } else {
      res.status(404).send("Authorization denied.");
    }
  },

  deleteOne: async (req, res) => {
    if (req.isAuthenticated()) {
      User.deleteOne({ _id: req.params.userId }, (err, result) => {
        res.send(err ? err : result);
      });
    } else {
      res.status(404).send("Authorization denied.");
    }
  },

  deleteMany: (req, res) => {
    User.deleteMany((err, result) => {
      res.send(err ? err : result);
    });
  },
};
