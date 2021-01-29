const path = require("path");
const express = require("express");
const settings = require(path.resolve(__dirname + "/config/settings"));

const app = express();
const port = process.env.PORT || 3000;

require(path.resolve(__dirname + "/config/database"))(settings);
require(path.resolve(__dirname + "/config/server"))(app);
require(path.resolve(__dirname + "/routes/routes"))(app);

app.listen(port, () => {
  console.log("-----------");
  console.log(`[   SERVER]: Express is ready!`);
  console.log(`[     PORT]: Listening on port ${port}.`);
  console.log(`[      CWD]: ${process.cwd()}`);
  console.log(`[BOOT TIME]: ${process.uptime() * 1000}ms`);
});