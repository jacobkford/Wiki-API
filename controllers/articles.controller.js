const article = require("../models/article");

module.exports = {
  articlesGet: (req, res) => {
    article.find((err, docs) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
  },

  articlesPost: (req, res) => {
    const newArticle = new article({
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
    article.deleteMany((err) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.");
      }
    });
  },
};
