import BadgeRequest from "../models/BadgeRequest.js";

export const createBadgeRequest = async (req, res) => {
  try {
    const { companyName, firstName, lastName, email, agreementAccepted, intentType, badgeSelection } = req.body;

    if (!companyName || !firstName || !lastName || !email || !intentType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const badgeRequest = await BadgeRequest.create({
      companyName,
      firstName,
      lastName,
      email,
      agreementAccepted: !!agreementAccepted,
      intentType,
      badgeSelection: badgeSelection || null,
    });

    return res.status(201).json({ success: true, message: "Badge request submitted successfully", data: badgeRequest });
  } catch (error) {
    console.error("Create badge request error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
