const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Voucher = mongoose.model(
  "Vouchers",
  new mongoose.Schema({
    number_of_voucher: Number,
    voucher_subscription: String

  })
);

module.exports = Voucher;