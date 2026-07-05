import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import socket from "../services/socket";

import useWebRTC from "../hooks/useWebRTC";
import useRecording from "../hooks/useRecording";

import VideoGrid from "../components/VideoGrid";
import ParticipantList from "../components/ParticipantList";
import MeetingControls from "../components/MeetingControls";
import ChatBox from "../components/ChatBox";
import ScreenShare from "../components/ScreenShare";

import {
  successToast,
  infoToast,
} from "../utils/toast";

function Meeting() {
  const { meetingId } = useParams();

  const navigate = useNavigate();

  const {
    localVideoRef,
    remoteVideoRef,
    localStream,
  } = useWebRTC();

  const {
    startRecording,
    stopRecording,
  } = useRecording();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {

    socket.emit("join-room", meetingId);

    successToast("Joined Meeting");

    socket.on("user-joined", (userId) => {

      infoToast("Participant Joined");

      setParticipants((prev) => {

        if (prev.includes(userId)) return prev;

        return [...prev, userId];

      });

    });

    socket.on("user-left", (userId) => {

      infoToast("Participant Left");

      setParticipants((prev) =>
        prev.filter((id) => id !== userId)
      );

    });

    return () => {

      socket.emit("leave-room", meetingId);

      socket.off("user-joined");
      socket.off("user-left");

    };

  }, [meetingId]);

  const endMeeting = () => {

    successToast("Meeting Ended");

    socket.emit("leave-room", meetingId);

    navigate("/dashboard");

  };

  return (

    <div
      style={{
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >

      <h1>🎥 IntellMeet</h1>

      <h3>
        Meeting ID : {meetingId}
      </h3>

      <VideoGrid
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        participants={participants}
      />

      <ParticipantList
        participants={participants}
      />

      <MeetingControls
        localStream={localStream}
        onEndMeeting={endMeeting}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "15px",
        }}
      >

        <button
          onClick={() =>
            startRecording(localStream)
          }
        >
          🎥 Start Recording
        </button>

        <button
          onClick={stopRecording}
        >
          🛑 Stop Recording
        </button>

        <ScreenShare
          localVideoRef={localVideoRef}
        />

      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >

        <ChatBox
          socket={socket}
          roomId={meetingId}
        />

      </div>

    </div>

  );
}

export default Meeting;