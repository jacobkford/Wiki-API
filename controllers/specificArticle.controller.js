const article = require("../models/article");

module.exports = {
  articleGet: (req, res) => {
    article.findOne({ title: req.params.articleTitle }, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (result) {
        res.send(result);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  },

  articlePut: (req, res) => {},

  articlePatch: (req, res) => {},

  articleDelete: (req, res) => {
    article.deleteOne({ title: req.params.articleTitle }, (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (result) {
        res.send(result);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  },
};
