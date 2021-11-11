 const mongoose = require("mongoose");
  const Tutorial = mongoose.model(
      "tutorial",
      new mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
        
      })
  );
  module.exports = Tutorial;