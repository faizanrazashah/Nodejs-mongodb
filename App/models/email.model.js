const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Email = mongoose.model(
  "Special_Email_List",
  new mongoose.Schema({
    email: String,

  })
);

module.exports = Email;