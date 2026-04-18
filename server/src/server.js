import mongoose from "mongoose";
import app from "./app.js";
import env from "./config/env.js";

const startServer = async () => {
  try {
    if (!env.mongodbUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(env.mongodbUri);
    console.log("MongoDB connected");

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();
