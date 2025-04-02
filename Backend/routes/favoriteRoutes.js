const express = require("express");
const { getFavorites, addFavorite, removeFavorite } = require("../services/favoriteService");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/favorites", authenticate, getFavorites);
router.post("/favorites", authenticate, addFavorite);
router.delete("/favorites/:id", authenticate, removeFavorite);

module.exports = router;