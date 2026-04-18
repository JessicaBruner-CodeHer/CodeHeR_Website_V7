import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  blsApiKey: process.env.BLS_API_KEY,
};

export default env;
