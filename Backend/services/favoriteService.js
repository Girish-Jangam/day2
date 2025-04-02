const Favorite = require("../models/Favorite");

const getFavorites = async (req, res) => {
  const { userId } = req.user;
  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const addFavorite = async (req, res) => {
  const { id, title, summary, photos } = req.body;
  const { userId } = req.user;
  try {
    const existingFavorite = await Favorite.findOne({ userId, id });
    if (existingFavorite) {
      return res.status(400).json({ error: "Destination already favorited" });
    }

    const newFavorite = new Favorite({ id, title, summary, photos, userId });
    await newFavorite.save();
    res.status(201).json({ message: "Favorite added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.findOneAndDelete({ id: id, userId: req.user.userId });

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = { getFavorites, addFavorite, removeFavorite };