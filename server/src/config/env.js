import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";


dotenv.config(); // <-- THIS IS THE FIX
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const env = {
  port:         process.env.PORT || 5000,
  mongodbUri:   process.env.MONGODB_URI,
  blsApiKey:    process.env.BLS_API_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
};

export default env;
