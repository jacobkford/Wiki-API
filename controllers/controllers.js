const md5 = require("md5");

const articleController = require("./article.controller");
const userController = require("./user.controller");

module.exports = {
  articleController: articleController,
  userController: userController,
};