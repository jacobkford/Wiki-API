const controllers = require("../controllers/controllers");

module.exports = (app) => {
  app
    .route("/articles")
    .get(controllers.articlesController.articlesGet)
    .post(controllers.articlesController.articlesPost)
    .delete(controllers.articlesController.articlesDelete);

  // Handling error page.
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};
