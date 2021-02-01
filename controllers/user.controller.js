/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
require("../config/passport")(passport);

module.exports = {
  /**
   * Get request for one user.
   */
  getOne: (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) res.send(err);

      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Could not find user.");
      }
    });
  },

  getLogout: (req, res) => {
    console.log(req.session);
    req.logout();
  },

  /**
   * Get request for all users.
   */
  getMany: (req, res) => {
    User.find((err, users) => {
      res.send(err ? err : users);
    });
  },

  /**
   * Post request for one user.
   */
  postRegister: (req, res) => {
    User.register({ email: req.body.email }, req.body.password, (err, user) => {
      if (err) {
        console.error(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("Successfully created user.");
        });
      }
    });
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

  /**
   * Put request for one user. (UPDATES ALL OF THE USERS DATA)
   */
  putOne: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) res.send(err);

      User.updateOne(
        // Finds the User that wants updating.
        { _id: req.params.userId },
        // Updated User parameters
        {
          email: req.body.email,
          password: hash,
          name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
        },
        // Overwrites original data with the new data.
        { overwrite: true },
        (err) => {
          res.send(err ? err : "Successfully updated user.");
        }
      );
    });
  },

  /**
   * Patch request for one user. (UPDATES ONLY ONE PIECE OF THE USERS DATA)
   */
  patchOne: async (req, res) => {
    let user = await User.findById(req.params.userId).exec();
    if (!user) res.status(404).send("User not found.");

    // If patch is a password.
    if (req.body.password) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) res.send(err);

        if (result) {
          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) res.send(err);

            User.updateOne(
              { _id: req.params.userId },
              { password: hash },
              (err) => {
                res.send(err ? err : "Successfully updated user password.");
              }
            );
          });
        } else {
          res.send("You must provide the correct password for this user.");
        }
      });
      // If patch isn't a password.
    } else {
      User.updateOne({ _id: req.params.userId }, { $set: req.body }, (err) => {
        res.send(err ? err : "Successfully updated User.");
      });
    }
  },

  /**
   * Delete request for one user.
   */
  deleteOne: async (req, res) => {
    if (req.isAuthenticated()) {
      User.deleteOne({ _id: req.params.userId }, (err) => {
        res.send(err ? err : "Successfully deleted User!");
      });
    } else {
      res.status(404).send("Authorization denied.");
    }
  },

  /**
   * Delete request for all users.
   */
  deleteMany: (req, res) => {
    User.deleteMany((err) => {
      res.send(err ? err : "Successfully deleted all Users.");
    });
  },
};
