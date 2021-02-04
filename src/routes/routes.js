const { user, article } = require("../controllers/controllers");
const { CheckAuth, GoogleLogin, WikiLogin } = require("../config/auth/auth");
const passport = require("passport");
require("../config/auth/passport")(passport);

module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app.get("/articles", article.getMany);
  app.post("/articles", CheckAuth, article.postOne);
  app.delete("/articles", CheckAuth, article.deleteMany);
  /**
   * Requests Targeting a specific Article.
   */
  app.get("/articles/:articleTitle", article.getOne);
  app.put("/articles/:articleTitle", CheckAuth, article.putOne);
  app.patch("/articles/:articleTitle", CheckAuth, article.patchOne);
  app.delete("/articles/:articleTitle", CheckAuth, article.deleteOne);
  /**
   * Requests Targeting the all Users.
   */
  app.get("/users", CheckAuth, user.getMany);
  app.post("/users", user.postOne);
  app.delete("/users", CheckAuth, user.deleteMany);
  /**
   * Requests Targeting a specific User.
   */
  app.get("/users/:userId", CheckAuth, user.getOne);
  app.put("/users/:userId", CheckAuth, user.putOne);
  app.patch("/users/:userId", CheckAuth, user.patchOne);
  app.delete("/users/:userId", CheckAuth, user.deleteMany);
  /**
   * Websites login auth.
   */
  app.get("/auth/samplewiki/login", WikiLogin);
  /**
   * Googles login auth.
   */
  app.get("/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ['profile']
    })
  );
  app.get("/auth/google/simplewiki", GoogleLogin);

  /**
   * Handling error page.
   */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};