import { useEffect, useRef, useState } from "react";

function useWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnection = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  // =============================
  // Start Camera & Microphone
  // =============================

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      createPeerConnection(stream);
    } catch (err) {
      console.log("Camera Error:", err);
    }
  };

  // =============================
  // Peer Connection
  // =============================

  const createPeerConnection = (stream) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    peer.ontrack = (event) => {
      const remote = event.streams[0];

      setRemoteStream(remote);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remote;
      }
    };

    peerConnection.current = peer;
  };

  // =============================
  // Offer
  // =============================

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    return offer;
  };

  // =============================
  // Answer
  // =============================

  const createAnswer = async (offer) => {
    await peerConnection.current.setRemoteDescription(offer);

    const answer = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(answer);

    return answer;
  };

  // =============================
  // Remote Answer
  // =============================

  const setRemoteAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(answer);
  };

  // =============================
  // ICE Candidate
  // =============================

  const addIceCandidate = async (candidate) => {
    if (!candidate) return;

    try {
      await peerConnection.current.addIceCandidate(candidate);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // Toggle Camera
  // =============================

  const toggleCamera = () => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];

    videoTrack.enabled = !videoTrack.enabled;
  };

  // =============================
  // Toggle Microphone
  // =============================

  const toggleMic = () => {
    if (!localStream) return;

    const audioTrack = localStream.getAudioTracks()[0];

    audioTrack.enabled = !audioTrack.enabled;
  };

  // =============================
  // Screen Share
  // =============================

  const startScreenShare = async () => {
    try {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

      const screenTrack = screenStream.getVideoTracks()[0];

      const sender = peerConnection.current
        .getSenders()
        .find((s) => s.track.kind === "video");

      if (sender) {
        sender.replaceTrack(screenTrack);
      }

      screenTrack.onended = () => {
        const cameraTrack = localStream.getVideoTracks()[0];

        sender.replaceTrack(cameraTrack);
      };
    } catch (err) {
      console.log(err);
    }
  };

  return {
    localVideoRef,
    remoteVideoRef,

    localStream,
    remoteStream,

    peerConnection,

    createOffer,
    createAnswer,

    setRemoteAnswer,

    addIceCandidate,

    toggleCamera,
    toggleMic,

    startScreenShare,
  };
}

export default useWebRTC;