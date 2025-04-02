const express = require("express");
const {
  searchDestinationGuides,
  getDestinationDetails,
  submitReview,
  getDestinationDetailsAll
} = require("../services/destinationService");
const router = express.Router();

router.get("/destinationGuides", searchDestinationGuides);
router.get("/destinationDetails/:id", getDestinationDetails);
router.put("/reviews/:id", submitReview);
router.get("/destinationDetails", getDestinationDetailsAll);

module.exports = router;