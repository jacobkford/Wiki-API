const controllers = require("../controllers/controllers");

module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app
    .route("/articles")
    .get(controllers.articlesController.articlesGet)
    .post(controllers.articlesController.articlesPost)
    .delete(controllers.articlesController.articlesDelete);

  /**
   * Requests Targeting a specific Article.
   */
  app
    .route("/articles/:articleTitle")
    .get(controllers.specificController.articleGet)
    .put(controllers.specificController.articlePut)
    .patch(controllers.specificController.articlePatch)
    .delete(controllers.specificController.articleDelete);

  /**
   * Handling error page.
  */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};