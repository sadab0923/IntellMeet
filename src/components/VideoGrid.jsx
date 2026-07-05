import VideoPlayer from "./VideoPlayer";

function VideoGrid({
  localVideoRef,
  remoteVideoRef,
  participants = [],
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {/* Local User */}
      <div
        style={{
          background: "#1f2937",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>🟢 You</h3>

        <VideoPlayer
          videoRef={localVideoRef}
          muted={true}
        />
      </div>

      {/* Remote User */}
      <div
        style={{
          background: "#1f2937",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>👤 Remote User</h3>

        <VideoPlayer
          videoRef={remoteVideoRef}
        />
      </div>

      {/* Participants */}
      {participants.map((user) => (
        <div
          key={user}
          style={{
            background: "#1f2937",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h4>{user}</h4>

          <p>Connected</p>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;