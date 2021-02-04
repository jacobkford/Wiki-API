/* eslint-disable no-undef */
const path = require("path");
const fs = require("fs");
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');
const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

module.exports = {
  db: process.env.DB,
  port: parseInt(process.env.PORT) || 3000,
  secret: process.env.COOKIE_SECRET,
  googleClient: process.env.GOOGLE_CLIENT,
  googleSecret: process.env.GOOGLE_SECRET,
  publicKey: PUB_KEY,
  privateKey: PRIV_KEY,
};