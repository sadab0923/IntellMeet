import { useState } from "react";

function ScreenShare({ localVideoRef }) {
  const [sharing, setSharing] = useState(false);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setSharing(true);

      const videoTrack = screenStream.getVideoTracks()[0];

      videoTrack.onended = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = cameraStream;
        }

        setSharing(false);
      };
    } catch (error) {
      console.error("Screen Share Error:", error);
    }
  };

  return (
    <button
      onClick={startScreenShare}
      style={{
        padding: "10px 20px",
        background: sharing ? "#16a34a" : "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {sharing ? "🟢 Sharing Screen" : "🖥 Share Screen"}
    </button>
  );
}

export default ScreenShare;
