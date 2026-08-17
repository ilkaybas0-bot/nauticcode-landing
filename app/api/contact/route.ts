import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  project: string;
  website?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Bots that
  // auto-fill every input do. Pretend success without sending anything.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const project = body.project?.trim();

  if (!name || !email || !company || !project) {
    return NextResponse.json(
      { error: "name, email, company, and project are all required." },
      { status: 400 }
    );
  }

  if (name.length > 200 || company.length > 200 || project.length > 2000) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const toAddress = process.env.CONTACT_EMAIL_TO || "ilkaybas0@gmail.com";
  const fromAddress = process.env.CONTACT_EMAIL_FROM || "Mogens Software Audit Bot <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `Software audit request — ${company}`,
      html: `
        <div style="font-family: monospace; font-size: 14px; line-height: 1.6;">
          <p><strong>New audit request via Mogens Software.com</strong></p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>What they want to build:</strong><br />${escapeHtml(project)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  // Best-effort confirmation to the submitter. Doesn't fail the request if
  // it errors — Resend's sandbox mode only allows sending to the account's
  // own address until a domain is verified, so this silently no-ops until
  // then. The internal notification above is the part that matters.
  try {
    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "We received your request — Mogens Software",
      html: `
        <div style="font-family: monospace; font-size: 14px; line-height: 1.6;">
          <p>Hi ${escapeHtml(name.split(" ")[0])},</p>
          <p>Thanks for reaching out to Mogens Software. We've received your
          audit request for <strong>${escapeHtml(company)}</strong>
          and a senior developer will reply within one business day.</p>
          <p>— Mogens Software</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Confirmation email failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}

