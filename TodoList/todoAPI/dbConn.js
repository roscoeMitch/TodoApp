const mongoose = require("mongoose");

// Connecting to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.TODO_DB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
