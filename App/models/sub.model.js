const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Subs = mongoose.model(
  "Subscription",
  new mongoose.Schema({
    subs_title: String,
    subs_duration: Number,
    subs_duration_unit: String,
    subs_currency: String,
    subs_price: Number,
    subs_image: String


  })
);

module.exports = Subs;