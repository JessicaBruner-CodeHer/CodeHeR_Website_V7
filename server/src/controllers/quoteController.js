import Quote from "../models/Quote.js";

export const createQuote = async (req, res) => {
  try {
    const { name, email, organization, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const quote = await Quote.create({ name, email, organization, projectType, message });

    return res.status(201).json({ success: true, message: "Quote submitted successfully", data: quote });
  } catch (error) {
    console.error("Create quote error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
