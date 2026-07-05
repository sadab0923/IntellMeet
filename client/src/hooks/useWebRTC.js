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
        localStream.getTracks().forEach(track => track.stop());
      }

      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

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

    } catch (err) {
      console.log(err);
    }
  };

  const createPeer = (stream) => {

    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    stream.getTracks().forEach(track => {
      peer.addTrack(track, stream);
    });

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection.current = peer;
  };

  const createOffer = async () => {
    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    return offer;
  };

  const createAnswer = async (offer) => {

    await peerConnection.current.setRemoteDescription(offer);

    const answer = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(answer);

    return answer;
  };

  const setRemoteAnswer = async (answer) => {

    await peerConnection.current.setRemoteDescription(answer);

  };

  const addIceCandidate = async (candidate) => {

    if (!candidate) return;

    try {

      await peerConnection.current.addIceCandidate(candidate);

    } catch (err) {

      console.log(err);

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