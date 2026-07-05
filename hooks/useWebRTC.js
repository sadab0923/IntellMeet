import { useEffect, useRef, useState } from "react";

function useWebRTC() {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(mediaStream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Camera Error:", error);
      }
    };

    startCamera();
  }, []);

  return {
    localVideoRef,
    stream,
  };
}

export default useWebRTC;