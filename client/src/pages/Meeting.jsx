import { useEffect, useRef, useState } from "react";

function useWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnection = useRef(null);

  const [localStream, setLocalStream] = useState(null);

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

  // Start Camera & Microphone
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

      createPeer(stream);
    } catch (error) {
      console.error("Camera Error:", error);
    }
  };

  // Create Peer Connection
  const createPeer = (stream) => {
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
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection.current = peer;
  };

  // Create Offer
  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    return offer;
  };

  // Create Answer
  const createAnswer = async (offer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(answer);

    return answer;
  };

  // Set Remote Answer
  const setRemoteAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  // ICE Candidate
  const addIceCandidate = async (candidate) => {
    if (!candidate) return;

    try {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (error) {
      console.error("ICE Error:", error);
    }
  };

  return {
    localVideoRef,
    remoteVideoRef,
    peerConnection,
    localStream,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    addIceCandidate,
  };
}

export default useWebRTC;