const express = require("express");
const {
  getPublicGroups,
  getUserGroups,
  getGroupById,
  createGroup,
  joinGroup,
  unjoinGroup,
  deleteGroup,
  getGroupMessages,
  sendMessage,
} = require("../services/groupService");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/travelGroups", (req, res) => {
  const isPublic = req.query.isPublic;
  if (isPublic === "true") {
    return getPublicGroups(req, res);
  }
  const members_like = req.query.members_like;
  if (members_like) {
    return getUserGroups(req, res);
  }
  res.status(400).json({ error: "Invalid query parameters" });
});

router.post("/travelGroups", authenticate, createGroup);
router.get("/travelGroups/:groupId", getGroupById);
router.patch("/travelGroups/:groupId/join", authenticate, joinGroup);
router.patch("/travelGroups/:groupId/unjoin", authenticate, unjoinGroup);
router.delete("/travelGroups/:groupId", authenticate, deleteGroup);
router.get("/travelGroups/:groupId/messages", getGroupMessages);
router.patch("/travelGroups/:groupId/messages", authenticate, sendMessage);

module.exports = router;