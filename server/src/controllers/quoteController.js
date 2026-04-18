import Quote from "../models/Quote.js";
import { sendQuoteEmail } from "../services/email.js";

export const createQuote = async (req, res) => {
  console.log("[quote] POST /api/quotes — body:", JSON.stringify(req.body));

  try {
    const { name, email, organization, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      console.warn("[quote] Validation failed — missing required fields");
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    console.log("[quote] Validation passed — saving to database");
    const quote = await Quote.create({ name, email, organization, projectType, message });
    console.log("[quote] Saved to database, id:", quote._id);

    await sendQuoteEmail({ name, email, organization, projectType, message });

    return res.status(201).json({ success: true, message: "Quote submitted successfully", data: quote });
  } catch (error) {
    console.error("[quote] Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
