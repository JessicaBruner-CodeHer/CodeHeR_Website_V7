import { Resend } from "resend";
import env from "../config/env.js";

function getClient() {
  console.log("[email] RESEND key present:", !!env.resendApiKey);

  if (!env.resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set — email will not be sent");
    return null;
  }

  return new Resend(env.resendApiKey);
}

export async function sendQuoteEmail({ name, email, organization, projectType, message }) {
  const resend = getClient();
  if (!resend) {
    console.warn("[email] Quote email skipped because Resend client was not created");
    return;
  }

  try {
    console.log("[email] Sending quote notification to info@codeherllc.com");

    const result = await resend.emails.send({
      from: "CodeHeR <onboarding@resend.dev>",
      to: ["info@codeherllc.com"],
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

    console.log("[email] Quote raw result:", JSON.stringify(result, null, 2));

    if (result?.error) {
      console.error("[email] Resend error (quote):", JSON.stringify(result.error, null, 2));
    } else {
      console.log("[email] Quote email sent, id:", result?.data?.id || "NO_ID_RETURNED");
    }
  } catch (error) {
    console.error("[email] Quote send threw exception:", error);
  }
}

export async function sendBadgeEmail({ companyName, firstName, lastName, email, intentType, badgeSelection }) {
  const resend = getClient();
  if (!resend) {
    console.warn("[email] Badge email skipped because Resend client was not created");
    return;
  }

  const isCommit = intentType === "commit";
  const subject = isCommit
    ? "New NoMoreLabels Badge Request"
    : "NoMoreLabels Interest — Follow Up Needed";

  try {
    console.log("[email] Sending badge notification to info@codeherllc.com");

    const result = await resend.emails.send({
      from: "CodeHeR <onboarding@resend.dev>",
      to: ["info@codeherllc.com"],
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

    console.log("[email] Badge raw result:", JSON.stringify(result, null, 2));

    if (result?.error) {
      console.error("[email] Resend error (badge):", JSON.stringify(result.error, null, 2));
    } else {
      console.log("[email] Badge email sent, id:", result?.data?.id || "NO_ID_RETURNED");
    }
  } catch (error) {
    console.error("[email] Badge send threw exception:", error);
  }
}