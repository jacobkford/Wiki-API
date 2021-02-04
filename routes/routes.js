const controllers = require("../controllers/controllers");
const { authorized } = require("../config/auth");
const passport = require("passport");
require("../config/passport")(passport);


module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app.get("/articles", controllers.article.getMany);
  app.post("/articles", authorized, controllers.article.postOne);
  app.delete("/articles", authorized, controllers.article.deleteMany);

  /**
   * Requests Targeting a specific Article.
   */
  app.get("/articles/:articleTitle", controllers.article.getOne);
  app.put("/articles/:articleTitle", authorized, controllers.article.putOne);
  app.patch("/articles/:articleTitle", authorized, controllers.article.patchOne);
  app.delete("/articles/:articleTitle", authorized, controllers.article.deleteOne);

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
  app.get("/users/:userId", authorized, controllers.user.getOne);
  app.put("/users/:userId", authorized, controllers.user.putOne);
  app.patch("/users/:userId", authorized, controllers.user.patchOne);
  app.delete("/users/:userId", authorized, controllers.user.deleteMany);

  app.get("/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ['profile']
    })
  );

  app.get("/auth/google/simplewiki",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login"
    }),
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