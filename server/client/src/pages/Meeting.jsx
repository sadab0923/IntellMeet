import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import useWebRTC from "../hooks/useWebRTC";

function Meeting() {
  const { meetingId } = useParams();

  const {
    localVideoRef,
    remoteVideoRef,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    addIceCandidate,
    peerConnection,
  } = useWebRTC();

  useEffect(() => {
    // Join Room
    socket.emit("join-room", meetingId);

    // New User Joined
    socket.on("user-joined", async () => {
      console.log("👤 User Joined");

      const offer = await createOffer();

      socket.emit("offer", {
        roomId: meetingId,
        offer,
      });
    });

    // Receive Offer
    socket.on("offer", async (offer) => {
      console.log("📨 Offer Received");

      const answer = await createAnswer(offer);

      socket.emit("answer", {
        roomId: meetingId,
        answer,
      });
    });

    // Receive Answer
    socket.on("answer", async (answer) => {
      console.log("✅ Answer Received");

      await setRemoteAnswer(answer);
    });

    // ICE Candidate
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId: meetingId,
          candidate: event.candidate,
        });
      }
    };

    socket.on("ice-candidate", async (candidate) => {
      await addIceCandidate(candidate);
    });

    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>🎥 IntellMeet Meeting Room</h1>

      <h3>Meeting ID: {meetingId}</h3>

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
            playsInline
            muted
            style={{
              width: "420px",
              background: "#000",
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
              width: "420px",
              background: "#000",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Meeting;