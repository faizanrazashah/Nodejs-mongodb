const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Session = mongoose.model(
  "Session",
  new mongoose.Schema({
    user_id: String,
    token: String

  })
);

module.exports = Session;