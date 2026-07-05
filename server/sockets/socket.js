module.exports = (io) => {

    io.on("connection", (socket) => {
  
      console.log("✅ User Connected:", socket.id);
  
      socket.on("join-room", (roomId) => {
  
        socket.join(roomId);
  
        console.log(`${socket.id} joined room ${roomId}`);
  
        socket.to(roomId).emit("user-joined", socket.id);
  
      });
  
      socket.on("disconnect", () => {
  
        console.log("❌ User Disconnected:", socket.id);
  
      });
  
    });
  
  };