const controllers = require("../controllers/controllers");
const { CheckAuth, googleLogin, wikiLogin } = require("../config/auth");
const passport = require("passport");
require("../config/passport")(passport);


module.exports = (app) => {
  /**
   * Requests Targeting all Articles.
   */
  app.get("/articles", controllers.article.getMany);
  app.post("/articles", CheckAuth, controllers.article.postOne);
  app.delete("/articles", CheckAuth, controllers.article.deleteMany);

  /**
   * Requests Targeting a specific Article.
   */
  app.get("/articles/:articleTitle", controllers.article.getOne);
  app.put("/articles/:articleTitle", CheckAuth, controllers.article.putOne);
  app.patch("/articles/:articleTitle", CheckAuth, controllers.article.patchOne);
  app.delete("/articles/:articleTitle", CheckAuth, controllers.article.deleteOne);

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
  app.get("/users/:userId", CheckAuth, controllers.user.getOne);
  app.put("/users/:userId", CheckAuth, controllers.user.putOne);
  app.patch("/users/:userId", CheckAuth, controllers.user.patchOne);
  app.delete("/users/:userId", CheckAuth, controllers.user.deleteMany);

  app.get("/auth/samplewiki/login", wikiLogin);


  app.get("/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ['profile']
    })
  );

  app.get("/auth/google/simplewiki", googleLogin);

  /**
   * Handling error page.
   */
  app.all("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found!");
    res.end();
  });
};