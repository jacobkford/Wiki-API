const Article = require("../models/article");

module.exports = {
  getOne: (req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, result) => {
      res.send(err ? err : result);
    });
  },

  getMany: (req, res) => {
    Article.find((err, result) => {
      res.send(err ? err : result);
    });
  },

  postOne: (req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err, result) => {
      res.send(err ? err : result);
    });
  },

  putOne: (req, res) => {
    const oldData = { title: req.params.articleTitle };
    const newData = { title: req.body.title, content: req.body.content }
    Article.replaceOne(oldData, newData, (err, result) => {
        res.send(err ? err : result);
      }
    );
  },

  patchOne: (req, res) => {
    const oldData = { title: req.params.articleTitle };
    const newData = { $set: req.body }
    Article.updateOne(oldData, newData, (err, result) => {
        res.send(err ? err : result);
      }
    );
  },

  deleteOne: (req, res) => {
    const article = { title: req.params.articleTitle };
    Article.deleteOne(article, (err, result) => {
      res.send(err ? err : result);
    });
  },

  deleteMany: (req, res) => {
    Article.deleteMany((err, result) => {
      res.send(err ? err : result);
    });
  },
};