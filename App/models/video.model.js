const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video_Management",
  new mongoose.Schema({
    video_title: String,
    video_native_name: String,
    category_id: String,
    video_sales_strategy: String,
    series_id: String,
    video_description: String,
    video_type: String,
    video_browser_address: String,
    video_enable_comment: String,
    video_meta_key: String,
    video_meta_value: String,
    main_picture: String,
    pictures: String,
    mobile_banner: String,
    web_banner: String,
    main_video: String,
    trailer_video: String


  })
);

module.exports = Video;