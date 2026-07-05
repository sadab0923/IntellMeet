import { useRef, useState } from "react";

function useRecording() {
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = (stream) => {
    if (!stream) {
      alert("No media stream found!");
      return;
    }

    recordedChunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstart = () => {
      console.log("🎥 Recording Started");
      setIsRecording(true);
    };

    mediaRecorder.onstop = () => {
      console.log("🛑 Recording Stopped");
      setIsRecording(false);

      const blob = new Blob(recordedChunksRef.current, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `meeting-${Date.now()}.webm`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
}

export default useRecording;