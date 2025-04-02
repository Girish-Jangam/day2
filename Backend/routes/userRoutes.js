const express = require("express");
const { getUserData } = require("../services/userService");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", authenticate, getUserData);

module.exports = router;