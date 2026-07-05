import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meetingId, setMeetingId] = useState("");

  // Create Meeting
  const createMeeting = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/meeting/create",
        {
          title: "New Meeting",
          description: "Instant Meeting",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Meeting Created Successfully");

      navigate(`/meeting/${res.data.meeting.meetingId}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to Create Meeting"
      );
    }
  };

  // Join Meeting
  const joinMeeting = () => {
    if (!meetingId) {
      return alert("Please Enter Meeting ID");
    }

    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h1>🎥 IntellMeet Dashboard</h1>

      <h2>Welcome, {user?.name || "User"} 👋</h2>

      <hr />

      <button
        onClick={createMeeting}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        ➕ Create Meeting
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
        }}
      />

      <button
        onClick={joinMeeting}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
        }}
      >
        🔗 Join Meeting
      </button>

      <hr />

      <h3>📅 Recent Meetings</h3>

      <p>No Meetings Yet</p>

      <hr />

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;