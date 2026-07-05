const Meeting = require("../models/Meeting");
const { generateSummary } = require("../services/geminiService");

// ===============================
// Generate AI Summary
// POST /api/ai/summary
// ===============================
const generateMeetingSummary = async (req, res) => {
  try {
    const { transcript, title } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    // Generate summary using Gemini
    const summary = await generateSummary(transcript);

    // Save meeting
    const meeting = await Meeting.create({
      title: title || "Untitled Meeting",
      transcript,
      summary,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Summary generated successfully",
      meeting,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get All Meetings
// GET /api/ai/meetings
// ===============================
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      meetings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get Single Meeting
// GET /api/ai/meetings/:id
// ===============================
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Delete Meeting
// DELETE /api/ai/meetings/:id
// ===============================
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    await Meeting.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  generateMeetingSummary,
  getMeetings,
  getMeetingById,
  deleteMeeting,
};