const { Int32 } = require("bson");
const mongoose = require("mongoose");

const App = mongoose.model(
  "App",
  new mongoose.Schema({
    app_title: String,
    app_native_name: String,
    app_package_name: String,
    category_id: String,
    app_description: String,
    app_sales_strategy: String,
    app_type: String,
    app_browser_address: String,
    app_enable_comment: String,
    app_meta_key: String,
    app_meta_value: String,
    app_main_picture: String,
    app_pictures: String,
    app_mobile_banner: String,
    app_web_banner: String,
    app_main_file: String

  })
);

module.exports = App;