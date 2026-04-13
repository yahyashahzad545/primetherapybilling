import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, practice, phone, message } = body;

    // ✅ validation
    if (!name || !email || !practice || !phone || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ USA phone validation (basic)
    const usPhoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
    if (!usPhoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid US phone number" }, { status: 400 });
    }

    // ✅ transporter (HOSTINGER SMTP CORRECT CONFIG)
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ send email
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New AR Follow-Up Lead",

      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Practice:</b> ${practice}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,

      replyTo: email,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.log("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}