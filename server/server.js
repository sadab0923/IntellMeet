const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Config
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Routes
// ======================

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 IntellMeet Backend Running...");
});

// API Health Check
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "IntellMeet API is Working",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Meeting Routes
app.use("/api/meeting", meetingRoutes);

// ======================
// 404 Route
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});