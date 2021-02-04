const controllers = require("../controllers/controllers");
const passport = require("passport");
require("../config/passport")(passport);


module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app.get("/articles", controllers.article.getMany);
  app.post("/articles", controllers.article.postOne);
  app.delete("/articles", controllers.article.deleteMany);

  /**
   * Requests Targeting a specific Article.
   */
  app.get("/articles/:articleTitle", controllers.article.getOne);
  app.put("/articles/:articleTitle", controllers.article.putOne);
  app.patch("/articles/:articleTitle", controllers.article.patchOne);
  app.delete("/articles/:articleTitle", controllers.article.deleteOne);

  /**
   * Requests Targeting the all Users.
   */
  app.get("/users", controllers.user.getMany);
  app.get("/logout", controllers.user.getLogout);
  app.post("/register", controllers.user.postRegister);
  app.post("/login", controllers.user.postLogin);
  app.delete("/users", controllers.user.deleteMany);

  /**
   * Requests Targeting a specific User.
   */
  app.get("/users/:userId", controllers.user.getOne);
  app.put("/users/:userId", controllers.user.putOne);
  app.patch("/users/:userId", controllers.user.patchOne);
  app.delete("/users/:userId", controllers.user.deleteMany);

  app.get("/auth/google",
    passport.authenticate("google", { scope: ['profile'] })
  );

  app.get("/auth/google/simplewiki",
    passport.authenticate("google", { failureRedirect: "/login" }),
    controllers.auth.googleCallbackGet
  );

  /**
   * Handling error page.
   */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};