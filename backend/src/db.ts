import mongoose from "mongoose";

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/mydb";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDBXXX"))
  .catch((err) => console.error("MongoDB connection error:", err));
