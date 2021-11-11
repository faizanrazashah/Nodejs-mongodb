const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Cardless = mongoose.model(
  "Go_Cardless",
  new mongoose.Schema({
    cardless_title: String,
    cardless_amount: Number,
    cardless_link: String,
    cardless_link_type: String


  })
);

module.exports = Cardless;