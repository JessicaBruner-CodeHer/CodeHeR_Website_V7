import mongoose from "mongoose";
import app from "./app.js";
import env from "./config/env.js";

const startServer = async () => {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
    console.log(`BLS API key: ${env.blsApiKey ? 'loaded' : 'MISSING — check server/.env'}`);
  });

  if (!env.mongodbUri) {
    console.error("MONGODB_URI is not defined — form submissions will not persist");
    return;
  }

  try {
    await mongoose.connect(env.mongodbUri, { dbName: "codeher" });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

startServer();
