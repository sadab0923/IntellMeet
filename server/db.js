const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log(conn.connection.host);
    console.log(conn.connection.name);
  } catch (err) {
    console.error("Connection Error:");
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;