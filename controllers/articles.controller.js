const Article = require("../models/article");

module.exports = {
  articlesGet: (req, res) => {
    Article.find((err, docs) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
  },

  articlesPost: (req, res) => {
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

  articlesDelete: (req, res) => {
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
