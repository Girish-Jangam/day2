require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const groupRoutes = require("./routes/groupRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", destinationRoutes);
app.use("/api/v1", favoriteRoutes);
app.use("/api/v1", groupRoutes);
app.use("/api/v1", itineraryRoutes);
app.use("/api/v1", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🌍 Welcome to Traveltrove API!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});