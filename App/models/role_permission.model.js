const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Role_permission = mongoose.model(
  "Role_permission",
  new mongoose.Schema({
    role_id: String,
    mainmenu_id: String,
    submenue_id: String,
    status: Number

  })
);

module.exports = Role_permission;