const express = require("express");
const {
  searchDestinationGuides,
  getDestinationDetails,
  submitReview,
} = require("../services/destinationService");
const router = express.Router();

router.get("/destinationGuides", searchDestinationGuides);
router.get("/destinationDetails/:id", getDestinationDetails);
router.post("/destinationDetails/:id/reviews", submitReview);

module.exports = router;