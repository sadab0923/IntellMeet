import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import useWebRTC from "../hooks/useWebRTC";

function Meeting() {

  const { meetingId } = useParams();

  const {
    localVideoRef,
    remoteVideoRef,
  } = useWebRTC();

  useEffect(() => {

    socket.emit("join-room", meetingId);

    socket.on("user-joined", (id) => {

      console.log("👤 User Joined:", id);

    });

    return () => {

      socket.off("user-joined");

    };

  }, [meetingId]);

  return (

    <div style={{ textAlign: "center" }}>

      <h1>🎥 IntellMeet Meeting Room</h1>

      <h2>Meeting ID : {meetingId}</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div>

          <h3>My Camera</h3>

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "400px",
              background: "black",
              borderRadius: "10px",
            }}
          />

        </div>

        <div>

          <h3>Remote User</h3>

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: "400px",
              background: "black",
              borderRadius: "10px",
            }}
          />

        </div>

      </div>

    </div>

  );

}

export default Meeting;