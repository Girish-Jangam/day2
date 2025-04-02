const mongoose = require("mongoose");

const destinationDetailSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("DestinationDetail", destinationDetailSchema);