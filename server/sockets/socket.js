module.exports = (io) => {

    io.on("connection", (socket) => {
  
      console.log("✅ User Connected:", socket.id);
  
      // ==========================
      // Join Meeting Room
      // ==========================
  
      socket.on("join-room", (roomId) => {
  
        socket.join(roomId);
  
        console.log(`${socket.id} joined room ${roomId}`);
  
        socket.to(roomId).emit("user-joined", socket.id);
  
      });
  
      // ==========================
      // WebRTC Offer
      // ==========================
  
      socket.on("offer", ({ roomId, offer }) => {
  
        socket.to(roomId).emit("offer", offer);
  
      });
  
      // ==========================
      // WebRTC Answer
      // ==========================
  
      socket.on("answer", ({ roomId, answer }) => {
  
        socket.to(roomId).emit("answer", answer);
  
      });
  
      // ==========================
      // ICE Candidate
      // ==========================
  
      socket.on("ice-candidate", ({ roomId, candidate }) => {
  
        socket.to(roomId).emit("ice-candidate", candidate);
  
      });
  
      // ==========================
      // Chat
      // ==========================
  
      socket.on("send-message", ({ roomId, message, sender }) => {
  
        io.to(roomId).emit("receive-message", {
  
          sender,
  
          message,
  
          time: new Date().toLocaleTimeString(),
  
        });
  
      });
  
      // ==========================
      // Screen Share
      // ==========================
  
      socket.on("screen-share-start", (roomId) => {
  
        socket.to(roomId).emit("screen-share-start");
  
      });
  
      socket.on("screen-share-stop", (roomId) => {
  
        socket.to(roomId).emit("screen-share-stop");
  
      });
  
      // ==========================
      // Disconnect
      // ==========================
  
      socket.on("disconnect", () => {
  
        console.log("❌ User Disconnected:", socket.id);
  
      });
  
    });
  
  };