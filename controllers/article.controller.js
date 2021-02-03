const Article = require("../models/article");

module.exports = {
  getOne: (req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, article) => {
      if (err) res.send(err);
      res.send(article ? article : "Could not find article.");
    });
  },

  getMany: (req, res) => {
    Article.find((err, article) => {
      if (err) res.send(err);
      res.send(article ? article : "Could not find any articles.")
    });
  },

  postOne: (req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      res.send(err ? err : "Successfully added a new article.");
    });
  },

  putOne: (req, res) => {
    Article.updateOne(
      // Finds the Article that wants updating.
      { title: req.params.articleTitle },
      // Updated Article data parameters.
      {
        $set: { 
          title: req.body.title,
          content: req.body.content
        },
      },
      // Overwrites original data with the new data.
      { overwrite: true },
      (err, article) => {
        res.send(err ? err : article);
      }
    );
  },

  patchOne: (req, res) => {
    Article.updateOne(
      // Finds the Article that wants updating.
      { title: req.params.articleTitle },
      // Selects the requested parameter, and updates it with the new value.
      { $set: req.body },
      (err) => {
        res.send(err ? err : "Successfully updated article.");
      }
    );
  },

  deleteOne: (req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err, article) => {
      if (err) res.send(err);
      res.send(article ? article : "Article not found.");
    });
  },

  deleteMany: (req, res) => {
    Article.deleteMany((err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "success",
          removed: "all",
          newLength: 0,
        });
      }
    });

  },
};