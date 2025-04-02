const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  id: String,
  title: String,
  summary: String,
  photos: [String],
  userId: String, // ID of the user who favorited it
});

module.exports = mongoose.model("Favorite", favoriteSchema);