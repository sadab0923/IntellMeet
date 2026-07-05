import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "55px", marginBottom: "15px" }}>
          🎥 IntellMeet
        </h1>

        <h2>Professional Video Meeting Platform</h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "20px auto",
            color: "#cbd5e1",
            lineHeight: "30px",
          }}
        >
          Create secure meetings, join instantly, chat with participants,
          share your screen, record meetings, and generate AI meeting
          summaries.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </Link>

          <Link to="/dashboard">
            <button
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Dashboard
            </button>
          </Link>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>🎥 HD Video Call</div>
          <div>💬 Live Chat</div>
          <div>🖥 Screen Share</div>
          <div>🎙 Meeting Recording</div>
          <div>🤖 AI Meeting Summary</div>
        </div>
      </div>
    </div>
  );
}

export default Home;