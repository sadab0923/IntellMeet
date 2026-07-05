import { useState } from "react";

function ChatBox({ socket, roomId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() === "") return;

    const chatMessage = {
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("chat-message", {
      roomId,
      message: chatMessage,
    });

    setMessages((prev) => [...prev, { ...chatMessage, self: true }]);

    setMessage("");
  };

  useState(() => {
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, { ...data.message, self: false }]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  return (
    <div
      style={{
        width: "320px",
        height: "450px",
        background: "#1f2937",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#111827",
          color: "#fff",
          padding: "15px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        💬 Live Chat
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.self ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: msg.self ? "#2563eb" : "#374151",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "10px",
              }}
            >
              {msg.text}
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "#9ca3af",
              }}
            >
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #374151",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;