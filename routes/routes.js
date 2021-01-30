const controllers = require("../controllers/controllers");

module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app
    .route("/articles")
    .get(controllers.articleController.getMany)
    .post(controllers.articleController.postOne)
    .delete(controllers.articleController.deleteMany);

  /**
   * Requests Targeting a specific Article.
   */
  app
    .route("/articles/:articleTitle")
    .get(controllers.articleController.getOne)
    .put(controllers.articleController.putOne)
    .patch(controllers.articleController.patchOne)
    .delete(controllers.articleController.deleteOne);

  /**
   * Requests Targeting the all Users.
   */
  app
    .route("/users")
    .get(controllers.userController.getMany)
    .post(controllers.userController.postOne)
    .delete(controllers.userController.deleteMany);

  /**
   * Requests Targeting a specific User.
   */
  app
    .route("/users/:userId")
    .get(controllers.userController.getOne)
    .put(controllers.userController.putOne)
    .patch(controllers.userController.patchOne)
    .delete(controllers.userController.deleteMany);

  /**
   * Handling error page.
   */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};