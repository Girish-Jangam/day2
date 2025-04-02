const mongoose = require("mongoose");

const travelGroupSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  isPublic: Boolean,
  creatorId: String,
  members: [String],
  messages: [
    {
      userId: String,
      content: String,
      timestamp: Date,
    },
  ],
});

module.exports = mongoose.model("TravelGroup", travelGroupSchema);