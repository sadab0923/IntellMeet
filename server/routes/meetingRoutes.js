const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createMeeting,
  joinMeeting,
  getAllMeetings,
  getMeetingById,
  deleteMeeting,
} = require("../controllers/meetingController");

router.post("/create", protect, createMeeting);
router.post("/join", protect, joinMeeting);
router.get("/all", protect, getAllMeetings);
router.get("/:id", protect, getMeetingById);
router.delete("/:id", protect, deleteMeeting);

module.exports = router;