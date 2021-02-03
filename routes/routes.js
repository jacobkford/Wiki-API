const controllers = require("../controllers/controllers");

module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app.get("/articles", controllers.articleController.getMany);
  app.post("/articles", controllers.articleController.postOne);
  app.delete("/articles", controllers.articleController.deleteMany);

  /**
   * Requests Targeting a specific Article.
   */
  app.get("/articles/:articleTitle", controllers.articleController.getOne);
  app.put("/articles/:articleTitle", controllers.articleController.putOne);
  app.patch("/articles/:articleTitle", controllers.articleController.patchOne);
  app.delete("/articles/:articleTitle", controllers.articleController.deleteOne);

  /**
   * Requests Targeting the all Users.
   */
  app.get("/users", controllers.userController.getMany);
  app.get("/logout", controllers.userController.getLogout);
  app.post("/register", controllers.userController.postRegister);
  app.post("/login", controllers.userController.postLogin);
  app.delete("/users", controllers.userController.deleteMany);

  /**
   * Requests Targeting a specific User.
   */
  app.get("/users/:userId", controllers.userController.getOne);
  app.put("/users/:userId", controllers.userController.putOne);
  app.patch("/users/:userId", controllers.userController.patchOne);
  app.delete("/users/:userId", controllers.userController.deleteMany);

  /**
   * Handling error page.
   */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};