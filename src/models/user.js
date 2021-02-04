/* eslint-disable no-undef */
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  email: {
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
    required: true,
  },
  googleId: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.pre('save', async function(next) {
    // eslint-disable-next-line no-unused-vars
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);

