import { useState } from "react";

function MeetingControls({
  localStream,
  onScreenShare,
  onEndMeeting,
}) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  // Toggle Microphone
  const toggleMic = () => {
    if (!localStream) return;

    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    });
  };

  // Toggle Camera
  const toggleCamera = () => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setCameraOn(track.enabled);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "25px",
        flexWrap: "wrap",
      }}
    >
      <button onClick={toggleMic}>
        {micOn ? "🎤 Mic ON" : "🔇 Mic OFF"}
      </button>

      <button onClick={toggleCamera}>
        {cameraOn ? "📷 Camera ON" : "🚫 Camera OFF"}
      </button>

      <button onClick={onScreenShare}>
        🖥 Share Screen
      </button>

      <button
        onClick={onEndMeeting}
        style={{
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ❌ End Meeting
      </button>
    </div>
  );
}

export default MeetingControls;