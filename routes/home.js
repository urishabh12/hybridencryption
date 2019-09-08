const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Doc = require("../models/doc");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

router.post("/preprocess", async (req, res) => {
  var keyy = Math.floor(Math.random() * 15);
  if (keyy === 0 || keyy == 1) {
    keyy = keyy + 2;
  }
  let generator = parseInt(req.body.generator);
  let prime = parseInt(req.body.prime);
  req.body.publicKey = parseInt(req.body.publicKey);
  let publicKey = generator ** keyy % prime;
  let privateKey = req.body.publicKey ** publicKey % prime;
  newKey = [];
  for (var i = 0; i < key.length; ++i) {
    var temp = key[i] * privateKey;
    newKey.push(temp);
  }

  return res.status(200).send({ key: newKey, publicKey: publicKey });
});

router.post("/adddoc", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));

  const doc = new Doc({
    user: id._id,
    heading: req.body.heading,
    content: req.body.content
  });

  await doc.save();

  res.status(200).send(doc);
});

router.get("/getdoc", async (req, res) => {
  const id = jwt.decode(req.get("auth-token"), config.get("jwtPrivateKey"));

  const result = await Doc.find({ user: id });

  return res.status(200).send(result);
});

router.get("/getonedoc/:id", async (req, res) => {
  const result = await Doc.find({ _id: id });

  return res.status(200).send(result);
});

module.exports = router;
