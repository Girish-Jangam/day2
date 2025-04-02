const mongoose = require("mongoose");

const userItinerarySchema = new mongoose.Schema({
  id: String,
  itineraryId: String,
  startDate: Date,
  endDate: Date,
  duration: String, // Ensure duration is a string
  activities: [String],
  lodging: [String],
  dining: [String],
});

module.exports = mongoose.model("UserItinerary", userItinerarySchema);