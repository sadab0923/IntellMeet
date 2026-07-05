const express = require("express");

const router = express.Router();

const {
  generateSummary,
  getMeetings,
  getMeetingById,
  deleteMeeting,
} = require("../controllers/aiController");

// Generate AI Meeting Summary
router.post("/summary", generateSummary);

// Get All Meetings
router.get("/meetings", getMeetings);

// Get Single Meeting
router.get("/meetings/:id", getMeetingById);

// Delete Meeting
router.delete("/meetings/:id", deleteMeeting);

module.exports = router;