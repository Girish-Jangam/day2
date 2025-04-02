const mongoose = require("mongoose");

const tripItinerarySchema = new mongoose.Schema({
  id: String,
  destination: String,
  duration: String,
  activities: [String],
  lodging: [String],
  dining: [String],
});

module.exports = mongoose.model("TripItinerary", tripItinerarySchema);