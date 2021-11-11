const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    category_title: String,
    category_meta_key: String,
    category_meta_value: String,
    category_published: Boolean


  })
);

module.exports = Category;