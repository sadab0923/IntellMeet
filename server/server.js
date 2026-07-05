const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");

// =====================
// Load Environment Variables
// =====================
dotenv.config();

// =====================
// Database
// =====================
const connectDB = require("./config/db");

// =====================
// Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const aiRoutes = require("./routes/ai");
const profileRoutes = require("./routes/profile");

// =====================
// Socket
// =====================
const socketHandler = require("./sockets/socket");

// =====================
// Connect MongoDB
// =====================
connectDB();

const app = express();

const server = http.createServer(app);

// =====================
// Socket.io
// =====================
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

// =====================
// Middleware
// =====================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// Home
// =====================
app.get("/", (req, res) => {
  res.send("🚀 IntellMeet Backend Running...");
});

// =====================
// Health Check
// =====================
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "IntellMeet API Running",
  });
});

// =====================
// Routes
// =====================
app.use("/api/auth", authRoutes);

app.use("/api/meeting", meetingRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/profile", profileRoutes);

// =====================
// 404
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================
// Server
// =====================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});