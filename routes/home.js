const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Doc = require("../models/doc");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

module.exports = router;
