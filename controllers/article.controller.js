const Article = require("../models/article");

module.exports = {
  getOne: (req, res) => {
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

  getMany: (req, res) => {
    Article.find((err, docs) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
  },

  postMany: (req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send("Successfully added a new article.");
      }
    });
  },

  putOne: (req, res) => {
    Article.updateOne(
      // Finds the Article that wants updating.
      { title: req.params.articleTitle },
      // Updated Article data parameters.
      { title: req.body.title, content: req.body.content },
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

  patchOne: (req, res) => {
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

  deleteOne: (req, res) => {
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

  deleteMany: (req, res) => {
    Article.deleteMany((err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.");
      }
    });
  },
};