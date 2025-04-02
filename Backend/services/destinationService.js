const DestinationGuide = require("../models/DestinationGuide");
const DestinationDetail = require("../models/DestinationDetail");

const searchDestinationGuides = async (req, res) => {
  try {
    const destinationGuides = await DestinationGuide.find();
    res.status(200).json(destinationGuides);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getDestinationDetails = async (req, res) => {
  const { id } = req.params;
  
  
  try {
    const destinationDetail = await DestinationDetail.findOne({id:id});
    // console.log(destinationDetail);
    if (!destinationDetail) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json(destinationDetail);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const getDestinationDetailsAll = async (req, res) => {
  
  
  try {
    const destinationDetail = await DestinationDetail.find({},{_id:0,reviews:1});
    console.log(destinationDetail);
    if (!destinationDetail) {
      return res.status(404).json({ error: "Destination not found" });
    }
    const reviews=destinationDetail.map(d=>d.reviews);
    //console.log(reviews);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


const submitReview = async (req, res) => {
  const { id } = req.params;
  const { user, rating, comment } = req.body;
  try {
    const destination = await DestinationDetail.find({id:id});
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    destination.reviews.push({ user, rating, comment });
    await destination.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { searchDestinationGuides, getDestinationDetails, submitReview , getDestinationDetailsAll};