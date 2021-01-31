const bcrypt = require("bcrypt"); 
const User = require("../models/user");

module.exports = {
  /*
   *  Get request for one user.
   */
  getOne: (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) res.send(err);
      
      if (user) {
        res.send("Successfully found user: " + user);
      } else {
        res.status(404).send("Could not find user.");
      }
    });
  },

  /*
   *  Get request for all users.
   */
  getMany: (req, res) => {
    User.find((err, users) => {
      res.send(err ? err : users);
    });
  },

  /*
   *  Post request for one user.
   */
  postOne: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) res.send(err);

      const newUser = new User({
        email: req.body.email,
        password: hash,
      });

      newUser.save((err) => {
        res.send(err ? err : "User has been created!");
      });
    });
  },

  /*
   *Put request for one user. (UPDATES ALL OF THE USERS DATA)
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

  /*
   *Patch request for one user. (UPDATES ONLY ONE PIECE OF THE USERS DATA)
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

  /*
   *Delete request for one user.
   */
  deleteOne: async (req, res) => {
    let user = await User.findById(req.params.userId).exec();
    if (!user) res.status(404).send("User not found.");
    
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) res.send(err);
      
      if (result) {
        User.deleteOne({ _id: req.params.userId }, (err) => {
          res.send(err ? err : "Successfully deleted User!");
        });
      } else {
        res.send("You must provide the correct password for this user.");
      }
    });
  },

  /*
   *Delete request for all users.
   */
  deleteMany: (req, res) => {
    User.deleteMany((err) => {
      res.send(err ? err : "Successfully deleted all Users.");
    });
  },
};