import BadgeRequest from "../models/BadgeRequest.js";
import { sendBadgeEmail } from "../services/email.js";

export const createBadgeRequest = async (req, res) => {
  console.log("[badge] POST /api/badge-requests — body:", JSON.stringify(req.body));

  try {
    const { companyName, firstName, lastName, email, agreementAccepted, intentType, badgeSelection } = req.body;

    if (!companyName || !firstName || !lastName || !email || !intentType) {
      console.warn("[badge] Validation failed — missing required fields");
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    console.log("[badge] Validation passed — saving to database");
    const badgeRequest = await BadgeRequest.create({
      companyName,
      firstName,
      lastName,
      email,
      agreementAccepted: !!agreementAccepted,
      intentType,
      badgeSelection: badgeSelection || null,
    });
    console.log("[badge] Saved to database, id:", badgeRequest._id);

    await sendBadgeEmail({ companyName, firstName, lastName, email, intentType, badgeSelection });

    return res.status(201).json({ success: true, message: "Badge request submitted successfully", data: badgeRequest });
  } catch (error) {
    console.error("[badge] Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
