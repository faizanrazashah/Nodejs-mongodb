const { Int32 } = require("bson");
const mongoose = require("mongoose");

const News = mongoose.model(
  "News_Letter",
  new mongoose.Schema({
    news_title: String,
    news_description: String

  })
);

module.exports = News;