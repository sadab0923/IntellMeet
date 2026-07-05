module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("✅ User Connected:", socket.id);
  
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
  
        console.log(`${socket.id} joined ${roomId}`);
  
        socket.to(roomId).emit("user-joined", socket.id);
      });
  
      socket.on("offer", ({ roomId, offer }) => {
        socket.to(roomId).emit("offer", offer);
      });
  
      socket.on("answer", ({ roomId, answer }) => {
        socket.to(roomId).emit("answer", answer);
      });
  
      socket.on("ice-candidate", ({ roomId, candidate }) => {
        socket.to(roomId).emit("ice-candidate", candidate);
      });
  
      socket.on("disconnect", () => {
        console.log("❌ User Disconnected:", socket.id);
      });
    });
  };