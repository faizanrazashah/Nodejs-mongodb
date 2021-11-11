const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    status: String
  })
);

module.exports = Role;