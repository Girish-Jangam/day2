const express = require("express");
const {
  getTripItineraries,
  getDestinationGuides,
  getUserLogin,
  addUserItinerary,
  getDestinationDetails,
  getUserItineraries,
  deleteUserItinerary, // Ensure this function is defined
} = require("../services/itineraryService");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/tripItineraries", getTripItineraries);
router.get("/destinationGuides", getDestinationGuides);
router.get("/userLogin", getUserLogin);
router.post("/userItineraries", authenticate, addUserItinerary);
router.get("/destinationDetails/:id", getDestinationDetails);
router.get("/userItineraries/:id", authenticate, getUserItineraries); // Ensure this route is protected
router.delete("/userItineraries/:id", authenticate, deleteUserItinerary); // Add this route

module.exports = router;