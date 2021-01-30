const Article = require("../models/article");

module.exports = {
  articleGet: (req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, result) => {
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

  articlePut: (req, res) => {
    Article.updateOne(
      // Finds the Article that wants updating.
      { title: req.params.articleTitle },
      // Updated Article data parameters.
      { title: req.body.title, content: req.body.content,},
      // Overwrites original data with the new data.
      { overwrite: true },
      (err) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  },

  articlePatch: (req, res) => {
    Article.updateOne(
      // Finds the Article that wants updating.
      { title: req.params.articleTitle },
      // Selects the requested parameter, and updates it with the new value.
      { $set: req.body },
      (err) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  },

  articleDelete: (req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err, result) => {
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
