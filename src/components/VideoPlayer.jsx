import React from "react";

function VideoPlayer({
  videoRef,
  muted = false,
  name = "Participant",
}) {
  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        borderRadius: "12px",
        padding: "10px",
        width: "420px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          color: "#ffffff",
          marginBottom: "10px",
        }}
      >
        {name}
      </h3>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          backgroundColor: "#000",
        }}
      />

      <p
        style={{
          marginTop: "10px",
          color: "#d1d5db",
          fontSize: "14px",
        }}
      >
        {muted ? "🎤 You" : "👤 Participant"}
      </p>
    </div>
  );
}

export default VideoPlayer;