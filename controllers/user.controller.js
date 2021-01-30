const md5 = require("md5");
const User = require("../models/user");

module.exports = {
  getOne: (req, res) => {
    User.findOne({ email: req.body.username }, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result) {
          if (result.password === md5(req.body.password)) {
            res.send("Successfully found user: " + result);
          }
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
    })
  },
  
  putOne: (req, res) => { },
  
  patchOne: (req, res) => { },
  
  deleteOne: (req, res) => { },
  
  deleteMany: (req, res) => { },
  
};