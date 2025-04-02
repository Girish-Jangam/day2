const TravelGroup = require("../models/TravelGroup");

const getPublicGroups = async (req, res) => {
  try {
    const groups = await TravelGroup.find({ isPublic: true });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUserGroups = async (req, res) => {
  const { members_like: userId } = req.query;
  try {
    const groups = await TravelGroup.find({ members: userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getGroupById = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const createGroup = async (req, res) => {
  const { name, description, isPublic } = req.body;
  const { userId } = req.user;
  try {
    const newGroup = new TravelGroup({
      name,
      description,
      isPublic,
      creatorId: userId,
      members: [userId],
      messages: [],
    });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.user;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (group.members.includes(userId)) {
      return res.status(400).json({ error: "Already a member of the group" });
    }
    group.members.push(userId);
    await group.save();
    res.status(200).json({ message: "Joined group successfully", group });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const unjoinGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.user;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (!group.members.includes(userId)) {
      return res.status(400).json({ error: "Not a member of the group" });
    }
    group.members = group.members.filter(member => member !== userId);
    await group.save();
    res.status(200).json({ message: "Left group successfully", group });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.user;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (group.creatorId !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await group.deleteOne();
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group.messages || []);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const sendMessage = async (req, res) => {
  const { groupId } = req.params;
  console.log(groupId)
  const content = req.body.messages[0].content;
  const { userId } = req.user;
  try {
    const group = await TravelGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    group.messages.push({ userId, content, timestamp: new Date() });
    await group.save();
    res.status(200).json({ message: "Message sent successfully", group });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPublicGroups,
  getUserGroups,
  getGroupById,
  createGroup,
  joinGroup,
  unjoinGroup,
  deleteGroup,
  getGroupMessages,
  sendMessage,
};