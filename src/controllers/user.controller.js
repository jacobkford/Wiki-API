const User = require("@models/user");
const passport = require("passport");
require("@auth/passport")(passport);
const { IssueJWT } = require("@auth/auth");

module.exports = {

  getOne: (req, res) => {
    User.findById(req.params.userId, (err, result) => {
      res.send(err ? err : result);
    });
  },

  getMany: (req, res) => {
    User.find((err, result) => {
      res.send(err ? err : result);
    });
  },

  postOne: (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err, user) => {
      if (err) res.send(err);
      const jwt = IssueJWT(user)
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires
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
