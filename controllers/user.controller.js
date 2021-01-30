const md5 = require("md5");
const User = require("../models/user");

module.exports = {
  getOne: (req, res) => {
    User.findById(req.params.userId, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result) {
          res.send("Successfully found user: " + result.email);
        }
      }
    });
  },

  getMany: (req, res) => {
    User.find((err, docs) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(docs);
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

  patchOne: (req, res) => {
    let user = User.findOne({ _id: req.params.userId }, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (result) {
        return result;
      } else {
        res.send("Could not find user");
      }
    });

    console.log(user);

    if (req.body.password) {
      console.log("Password request");
    }
  },

  deleteOne: (req, res) => {
    User.findById(req.params.userId, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (!result) {
        res.send("No users found matching that id.");
      } else {
        if (md5(result.password) === req.body.password) {
          User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
              console.error(err);
              res.send(err);
            } else {
              res.send("Successfully deleted User!");
            }
          });
        } else {
          res.send("Error. You must provide the correct password for this user.");
        }
      } 
    }) 
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
