const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
    console.log(`[ DATABASE]: We are ${mongoose.STATES[mongoose.connection.readyState]}.`);
});

require(path.resolve(__dirname + "/routes/routes"))(app);

app.listen(port, () => {
  console.log("-----------");
  console.log(`[   SERVER]: Express is ready!`);
  console.log(`[     PORT]: Listening on port ${port}.`);
  console.log(`[      CWD]: ${process.cwd()}`);
  console.log(`[BOOT TIME]: ${process.uptime() * 1000}ms`);
});