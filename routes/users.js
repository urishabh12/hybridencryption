const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

router.post("/registration", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User Already Exists");

  user = new User(_.pick(req.body, ["username", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Wrong ID or Password");

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send("Wrong ID or Password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  return res
    .status(200)
    .header("auth-token", token)
    .send({ message: "Success" });
});

module.exports = router;
