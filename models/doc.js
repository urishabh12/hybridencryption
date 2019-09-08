const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  username: {
    type: String
  },
  content: {
    type: String
  },
  heading: {
    type: String
  }
});

module.exports = mongoose.model("Doc", docSchema);
