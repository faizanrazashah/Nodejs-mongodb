const mongoose = require("mongoose");
const Slider = mongoose.model(
    "Home_Slider",
    new mongoose.Schema({
      category_id: String,
      slider_title: String,
      slider_description: String,
      slider_app_image: String,
      slider_web_image: String
      
    })
);
module.exports = Slider;