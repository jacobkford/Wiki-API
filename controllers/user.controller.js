/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const User = require("../models/user");
const passport = require("passport");
require("../config/passport")(passport);
const { issueJWT } = require("../config/auth");
const bcrypt = require("bcrypt");

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
    newUser.save((err, user) => {
      if (err) res.send(err);
      const jwt = issueJWT(user)
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires
      });
    });
  },

  postLogin: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) res.send(err);
      if (!user) {
          res.status(401).json({ success: false, msg: "could not find user" });
      }    
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) res.send(err);
        if (result) {
          const tokenObject = issueJWT(user);
          res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires
          });
        } else {
          res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }
      });
    });
  },

  putOne: (req, res) => {
    const user = { _id: req.params.userId };
    const newData = {
      email: req.body.email,
      password: req.body.password
    };
    User.replaceOne(user, newData, (err, result) => {
      res.send(err ? err : result);
    });
  },

  patchOne: async (req, res) => {
    const user = { _id: req.params.userId };
    const newData = { $set: req.body };
    User.updateOne(user, newData, (err, result) => {
      res.send(err ? err : result);
    });
  },

  deleteOne: async (req, res) => {
    User.deleteOne({ _id: req.params.userId }, (err, result) => {
      res.send(err ? err : result);
    });
  },

  deleteMany: (req, res) => {
    User.deleteMany((err, result) => {
      res.send(err ? err : result);
    });
  },
};
