import { Resend } from "resend";
import env from "../config/env.js";

function getClient() {
  if (!env.resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set — email will not be sent");
    return null;
  }
  return new Resend(env.resendApiKey);
}

export async function sendQuoteEmail({ name, email, organization, projectType, message }) {
  const resend = getClient();
  if (!resend) return;

  console.log("[email] Sending quote notification to info@codeherllc.com");
  const { data, error } = await resend.emails.send({
    from: "CodeHeR <onboarding@resend.dev>",
    to:   ["info@codeherllc.com"],
    subject: "New Quote Request",
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Organization:</strong> ${organization || "N/A"}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (error) {
    console.error("[email] Resend error (quote):", error);
  } else {
    console.log("[email] Quote email sent, id:", data?.id);
  }
}

export async function sendBadgeEmail({ companyName, firstName, lastName, email, intentType, badgeSelection }) {
  const resend = getClient();
  if (!resend) return;

  const isCommit = intentType === "commit";
  const subject  = isCommit
    ? "New NoMoreLabels Badge Request"
    : "NoMoreLabels Interest — Follow Up Needed";

  console.log("[email] Sending badge notification to info@codeherllc.com");
  const { data, error } = await resend.emails.send({
    from: "CodeHeR <onboarding@resend.dev>",
    to:   ["info@codeherllc.com"],
    subject,
    html: `
      <h2>${isCommit ? "New NoMoreLabels Badge Request" : "NoMoreLabels Interest Submission"}</h2>
      <p><strong>Type:</strong> ${isCommit ? "Full Commitment (Badge Requested)" : "Interested in Becoming an Inclusive Employer"}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Contact Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${isCommit ? `<p><strong>Badge Selection:</strong> ${badgeSelection}</p><p><strong>Agreement Accepted:</strong> Yes</p>` : ""}
    `,
  });

  if (error) {
    console.error("[email] Resend error (badge):", error);
  } else {
    console.log("[email] Badge email sent, id:", data?.id);
  }
}
