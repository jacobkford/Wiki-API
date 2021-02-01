/* eslint-disable no-undef */
module.exports = {
  db: process.env.DB,
  port: parseInt(process.env.PORT) || 3000,
  cookieSecret: process.env.COOKIE_SECRET,
};