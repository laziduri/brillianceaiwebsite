import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "info@brilliancetech.ai";
// Use Resend's default sender until you verify your own domain in Resend.
// After verifying brilliancetech.ai in the Resend dashboard, change to: "BrillianceAI <noreply@brilliancetech.ai>"
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "BrillianceAI <onboarding@resend.dev>";

type ContactPayload = {
  name?: string;
  email?: string;
  companySize?: string;
  message?: string;
  // Honeypot — bots fill this, humans don't
  website?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently pretend to succeed if filled
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const companySize = (body.companySize ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Basic email shape check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing — email not sent.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured yet. Please reach us on WhatsApp or email info@brilliancetech.ai directly.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; color:#111;">
      <h2 style="margin:0 0 16px;">New BrillianceAI sales enquiry</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        ${companySize ? `<tr><td><strong>Company size</strong></td><td>${escapeHtml(companySize)}</td></tr>` : ""}
      </table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap; line-height:1.5;">${escapeHtml(message)}</p>
      <hr style="margin:24px 0; border:none; border-top:1px solid #eee;" />
      <p style="font-size:12px; color:#666;">Sent from brilliancetech.ai contact form.</p>
    </div>
  `;

  const text = [
    "New BrillianceAI sales enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    companySize && `Company size: ${companySize}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Sales enquiry — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please try WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error. Please try WhatsApp." },
      { status: 500 },
    );
  }
}
