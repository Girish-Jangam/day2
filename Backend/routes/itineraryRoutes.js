const express = require("express");
const {
  getTripItineraries,
  getDestinationGuides,
  getUserLogin,
  addUserItinerary,
  getDestinationDetails,
} = require("../services/itineraryService");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/tripItineraries", getTripItineraries);
router.get("/destinationGuides", getDestinationGuides);
router.get("/userLogin", getUserLogin);
router.post("/userItenarary", authenticate, addUserItinerary);
router.get("/destinationDetails/:id", getDestinationDetails);

module.exports = router;