import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    projectType:  { type: String, required: true, trim: true },
    message:      { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
