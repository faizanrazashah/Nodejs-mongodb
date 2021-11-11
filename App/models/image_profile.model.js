const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image_Profile",
  new mongoose.Schema({
    image_title: String,
    image_link_type: String,
    image_scale: String,
    image_quality: String,
    image_width: Number,
    image_height: Number


  })
);

module.exports = Image;