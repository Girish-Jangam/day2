const mongoose = require("mongoose");

const destinationGuideSchema = new mongoose.Schema({
  id: String,
  title: String,
  summary: String,
  photos: [String],
  history: String,
  culture: String,
  attractions: [String],
  lodgingRecommendations: [String],
  diningRecommendations: [String],
  activitiesRecommendations: [String],
});

module.exports = mongoose.model("DestinationGuide", destinationGuideSchema);