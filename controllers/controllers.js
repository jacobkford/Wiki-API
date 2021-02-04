const article = require("./article.controller");
const user = require("./user.controller");
const auth = require("./auth.controller");

module.exports = {
  article: article,
  user: user,
  auth: auth,
};