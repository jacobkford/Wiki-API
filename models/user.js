const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: () => Date.now(),
  },
  name: {
    firstName: {
      type: String,
      index: true,
    },
    lastName: {
      type: String,
      index: true,
    },
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

