const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Promo = mongoose.model(
  "Promo_Code",
  new mongoose.Schema({
    promo_end_date: Date,
    promo_usage_number: Number,
    promo_percent: Number


  })
);

module.exports = Promo;