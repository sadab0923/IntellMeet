import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

// Generate AI Meeting Summary
export const generateSummary = async (meetingId, transcript) => {
  try {
    const response = await axios.post(`${API_URL}/summary`, {
      meetingId,
      transcript,
    });

    return response.data;
  } catch (error) {
    console.error("Generate Summary Error:", error);

    throw error;
  }
};

// Get All Meetings
export const getMeetings = async () => {
  try {
    const response = await axios.get(`${API_URL}/meetings`);

    return response.data;
  } catch (error) {
    console.error("Get Meetings Error:", error);

    throw error;
  }
};

// Get Single Meeting
export const getMeetingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/meetings/${id}`);

    return response.data;
  } catch (error) {
    console.error("Get Meeting Error:", error);

    throw error;
  }
};

// Delete Meeting
export const deleteMeeting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/meetings/${id}`);

    return response.data;
  } catch (error) {
    console.error("Delete Meeting Error:", error);

    throw error;
  }
};