const md5 = require("md5");
const User = require("../models/user");

module.exports = {
  getOne: (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        if (user) {
          res.send("Successfully found user: " + user);
        } else {
          res.status(404).send("Could not find user.");
        }
      }
    });
  },

  getMany: (req, res) => {
    User.find((err, users) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(users);
      }
    });
  },

  postOne: (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
    });

    newUser.save((err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send("User has been created!");
      }
    });
  },

  putOne: (req, res) => {
    User.updateOne(
      // Finds the User that wants updating.
      { _id: req.params.userId },
      // Updated User parameters
      {
        email: req.body.email,
        password: md5(req.body.password),
        name: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
      // Overwrites original data with the new data.
      { overwrite: true },
      (err) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send("Successfully updated user.");
        }
      }
    );
  },

  patchOne: async (req, res) => {
    let user = await User.findById(req.params.userId).exec();

    if (!user) {
      res.status(404).send("User not found.");
    }
    if (req.body.password) {
      if (req.body.password !== md5(user.password)) {
        res.send("Incorrect password provided.");
      } else {
        User.updateOne(
          { _id: req.params.userId },
          { password: md5(req.body.newPassword) },
          (err) => {
            if (err) {
              console.error(err);
              res.send(err);
            } else {
              res.send("Successfully updated user password.");
            }
          }
        );
      }
    } else {
      User.updateOne({ _id: req.params.userId }, { $set: req.body }, (err) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send("Successfully updated User.");
        }
      });
    }
  },

  deleteOne: (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (!user) {
        res.send("No users found matching that id.");
      } else {
        if (md5(user.password) === req.body.password) {
          User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
              console.error(err);
              res.send(err);
            } else {
              res.send("Successfully deleted User!");
            }
          });
        } else {
          res.send(
            "Error. You must provide the correct password for this user."
          );
        }
      }
    });
  },

  deleteMany: (req, res) => {
    User.deleteMany((err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.");
      }
    });
  },
};
