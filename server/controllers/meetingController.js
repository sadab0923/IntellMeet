const Meeting = require("../models/Meeting");
const { v4: uuidv4 } = require("uuid");

// Create Meeting
const createMeeting = async (req, res) => {
  try {
    const { title, description } = req.body;

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      title,
      description,
      host: req.user.id,
      participants: [req.user.id],
      status: "scheduled",
    });

    res.status(201).json({
      success: true,
      message: "Meeting Created Successfully",
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Join Meeting
const joinMeeting = async (req, res) => {
  try {
    const { meetingId } = req.body;

    const meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting Not Found",
      });
    }

    if (!meeting.participants.includes(req.user.id)) {
      meeting.participants.push(req.user.id);
      await meeting.save();
    }

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Meetings
const getAllMeetings = async (req, res) => {
  const meetings = await Meeting.find().populate("host", "name email");

  res.json({
    success: true,
    meetings,
  });
};

// Get Single Meeting
const getMeetingById = async (req, res) => {
  const meeting = await Meeting.findById(req.params.id)
    .populate("host")
    .populate("participants");

  if (!meeting) {
    return res.status(404).json({
      success: false,
      message: "Meeting Not Found",
    });
  }

  res.json({
    success: true,
    meeting,
  });
};

// Delete Meeting
const deleteMeeting = async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Meeting Deleted Successfully",
  });
};

module.exports = {
  createMeeting,
  joinMeeting,
  getAllMeetings,
  getMeetingById,
  deleteMeeting,
};