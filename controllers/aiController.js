const Meeting = require("../models/Meeting");
const {
  generateMeetingSummary,
} = require("../services/geminiService");

// Generate AI Summary
const generateSummary = async (req, res) => {
  try {
    const { meetingId, transcript } = req.body;

    if (!meetingId || !transcript) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID and transcript are required.",
      });
    }

    // Generate summary from Gemini
    const summary = await generateMeetingSummary(transcript);

    // Save to MongoDB
    const meeting = await Meeting.create({
      meetingId,
      transcript,
      summary,
    });

    return res.status(200).json({
      success: true,
      message: "AI Meeting Summary Generated Successfully",
      data: meeting,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI summary",
      error: error.message,
    });
  }
};

// Get All Meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch meetings",
    });
  }
};

// Get Meeting by ID
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch meeting",
    });
  }
};

// Delete Meeting
const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete meeting",
    });
  }
};

module.exports = {
  generateSummary,
  getMeetings,
  getMeetingById,
  deleteMeeting,
};