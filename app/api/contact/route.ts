// app/api/contact/route.ts — Contact form API route using Resend
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function validateInput(name: string, email: string, message: string): string | null {
  if (!name || name.trim().length < 2) return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";
  if (!message || message.trim().length < 10) return "Message must be at least 10 characters.";
  if (message.length > 5000) return "Message is too long.";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    const error = validateInput(name, email, message);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const { data, error: resendError } = await resend.emails.send({
      from:    "Portfolio Contact <contact@joshuario.dev>",
      to:      "riojoshuadev@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (resendError) {
      console.error("[Resend error]", resendError);
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
