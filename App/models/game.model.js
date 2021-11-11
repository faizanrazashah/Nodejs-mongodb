const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    game_title: String,
    game_native_name: String,
    category_id: String,
    game_sales_strategy: String,
    game_description: String,
    game_type: String,
    game_browser_address: String,
    game_enable_comment: String,
    game_meta_key: String,
    game_meta_value: String,
    game_main_picture: String,
    game_pictures: String,
    game_mobile_banner: String,
    game_web_banner: String,
    game_link: String,
    game_preview_html_link: String


  })
);

module.exports = Game;