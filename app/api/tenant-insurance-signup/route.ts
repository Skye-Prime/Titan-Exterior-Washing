import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  step1?: {
    date?: string;
    time?: string;
    location?: string;
    first?: string;
    middle?: string;
    last?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    email?: string;
  };
  step2?: {
    insuranceRequirement?: string;
    coverageLevel?: string;
    signatureSafestor?: string;
    signatureLiability?: string;
  };
};

const requiredStep1 = [
  "date",
  "time",
  "location",
  "first",
  "last",
  "address1",
  "city",
  "state",
  "zip",
  "phone",
  "email",
] as const;

const requiredStep2 = [
  "insuranceRequirement",
  "coverageLevel",
  "signatureSafestor",
  "signatureLiability",
] as const;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  const body = (await req.json()) as Payload;
  const step1 = body.step1 || {};
  const step2 = body.step2 || {};

  const missingStep1 = requiredStep1.filter(
    (key) => !step1[key] || !step1[key]?.trim()
  );
  const missingStep2 = requiredStep2.filter(
    (key) => !step2[key] || !step2[key]?.trim()
  );

  if (missingStep1.length || missingStep2.length) {
    return NextResponse.json(
      {
        error: `Missing required fields: ${[...missingStep1, ...missingStep2].join(
          ", "
        )}`,
      },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const to = process.env.RBM360INFO_EMAIL || process.env.EMAIL_TO;

  if (!host || !port || !user || !pass || !from || !to) {
    return NextResponse.json(
      {
        error:
          "Email service is not configured. Please set SMTP_* and RBM360INFO_EMAIL.",
      },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });

  const fullName = `${step1.first} ${step1.middle ? `${step1.middle} ` : ""}${
    step1.last
  }`.trim();

  const html = `
    <h2>Tenant Insurance Signup</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(new Date().toLocaleString())}</p>
    <h3>Step 1 - Contact Details</h3>
    <ul>
      <li><strong>Date:</strong> ${escapeHtml(step1.date || "")}</li>
      <li><strong>Time:</strong> ${escapeHtml(step1.time || "")}</li>
      <li><strong>Location:</strong> ${escapeHtml(step1.location || "")}</li>
      <li><strong>Name:</strong> ${escapeHtml(fullName)}</li>
      <li><strong>Mailing Address:</strong> ${escapeHtml(
        `${step1.address1}${step1.address2 ? `, ${step1.address2}` : ""}, ${
          step1.city
        }, ${step1.state} ${step1.zip}`
      )}</li>
      <li><strong>Phone:</strong> ${escapeHtml(step1.phone || "")}</li>
      <li><strong>Email:</strong> ${escapeHtml(step1.email || "")}</li>
    </ul>
    <h3>Step 2 - Coverage Selection</h3>
    <ul>
      <li><strong>Insurance Requirement:</strong> ${escapeHtml(
        step2.insuranceRequirement || ""
      )}</li>
      <li><strong>Coverage Level:</strong> ${escapeHtml(
        step2.coverageLevel || ""
      )}</li>
      <li><strong>SafeStor Signature:</strong> ${escapeHtml(
        step2.signatureSafestor || ""
      )}</li>
      <li><strong>Liability Signature:</strong> ${escapeHtml(
        step2.signatureLiability || ""
      )}</li>
    </ul>
  `;

  const text = `Tenant Insurance Signup
Submitted: ${new Date().toLocaleString()}

Step 1 - Contact Details
- Date: ${step1.date}
- Time: ${step1.time}
- Location: ${step1.location}
- Name: ${fullName}
- Mailing Address: ${step1.address1}${step1.address2 ? `, ${step1.address2}` : ""}, ${step1.city}, ${step1.state} ${step1.zip}
- Phone: ${step1.phone}
- Email: ${step1.email}

Step 2 - Coverage Selection
- Insurance Requirement: ${step2.insuranceRequirement}
- Coverage Level: ${step2.coverageLevel}
- SafeStor Signature: ${step2.signatureSafestor}
- Liability Signature: ${step2.signatureLiability}
`;

  await transporter.sendMail({
    from,
    to,
    subject: `Tenant Insurance Signup - ${fullName || "New Submission"}`,
    html,
    text,
  });

  return NextResponse.json({ ok: true });
}
