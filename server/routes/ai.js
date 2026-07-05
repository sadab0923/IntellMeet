const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateMeetingSummary,
  getMeetings,
  getMeetingById,
  deleteMeeting,
} = require("../controllers/aiController");

// ==========================
// Generate AI Summary
// ==========================
router.post(
  "/summary",
  authMiddleware,
  generateMeetingSummary
);

// ==========================
// Get All Meetings
// ==========================
router.get(
  "/meetings",
  authMiddleware,
  getMeetings
);

// ==========================
// Get Single Meeting
// ==========================
router.get(
  "/meetings/:id",
  authMiddleware,
  getMeetingById
);

// ==========================
// Delete Meeting
// ==========================
router.delete(
  "/meetings/:id",
  authMiddleware,
  deleteMeeting
);

module.exports = router;