import { useEffect, useState } from "react";
import {
  getMeetings,
  deleteMeeting,
} from "../services/ai";

function History() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const response = await getMeetings();

      if (response.success) {
        setMeetings(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this meeting?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMeeting(id);

      setMeetings((prev) =>
        prev.filter((meeting) => meeting._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#111827",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h1>📜 Meeting History</h1>

      {meetings.length === 0 ? (
        <p>No Meetings Found.</p>
      ) : (
        meetings.map((meeting) => (
          <div
            key={meeting._id}
            style={{
              background: "#1f2937",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>Meeting ID</h2>

            <p>{meeting.meetingId}</p>

            <h2>Transcript</h2>

            <p>{meeting.transcript}</p>

            <h2>AI Summary</h2>

            <p>{meeting.summary}</p>

            <h2>Date</h2>

            <p>
              {new Date(
                meeting.createdAt
              ).toLocaleString()}
            </p>

            <button
              onClick={() =>
                handleDelete(meeting._id)
              }
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default History;