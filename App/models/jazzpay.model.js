const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Jazzpay = mongoose.model(
  "Jazzpay_codes",
  new mongoose.Schema({
    jazzapy_code: String,
    jazzpay_amount: Number

  })
);

module.exports = Jazzpay;