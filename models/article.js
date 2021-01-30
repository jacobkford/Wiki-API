const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Article", articleSchema);