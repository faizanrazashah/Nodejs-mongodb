const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Special_list = mongoose.model(
  "Special_list",
  new mongoose.Schema({
    special_list_name: String

  })
);

module.exports = Special_list;