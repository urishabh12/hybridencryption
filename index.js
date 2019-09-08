const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const db = "mongodb://localhost/ecommerce";
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const users = require("./routes/users");
const home = require("./routes/home");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Could not connect MongoDB", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/home", home);
