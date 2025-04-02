const TripItinerary = require("../models/TripItinerary");
const DestinationGuide = require("../models/DestinationGuide");
const UserLogin = require("../models/UserLogin");
const DestinationDetail = require("../models/DestinationDetail");
const UserItinerary = require("../models/UserItinerary");

const getTripItineraries = async (req, res) => {
  try {
    const itineraries = await TripItinerary.find();
    res.status(200).json(itineraries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getDestinationGuides = async (req, res) => {
  try {
    const destinationGuides = await DestinationGuide.find();
    res.status(200).json(destinationGuides);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUserLogin = async (req, res) => {
  try {
    const userLogins = await UserLogin.find();
    res.status(200).json(userLogins);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const addUserItinerary = async (req, res) => {
  const itineraryData = req.body;
  try {
    const newItinerary = new UserItinerary(itineraryData);
    await newItinerary.save();
    res.status(201).json({ message: "Itinerary added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getDestinationDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const destinationDetail = await DestinationDetail.findById(id);
    if (!destinationDetail) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json(destinationDetail);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getTripItineraries,
  getDestinationGuides,
  getUserLogin,
  addUserItinerary,
  getDestinationDetails,
};