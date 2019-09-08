const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  user: {
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
