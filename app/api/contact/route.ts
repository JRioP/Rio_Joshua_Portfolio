// app/api/contact/route.ts — Contact form API route using Resend
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function validateInput(name: string, email: string, message: string): string | null {
  if (!name || name.trim().length < 2) return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";
  if (!message || message.trim().length < 10) return "Message must be at least 10 characters.";
  if (message.length > 5000) return "Message is too long.";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = await req.json();
    
    const error = validateInput(name, email, message);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const { data, error: resendError } = await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      "riojoshuadev@gmail.com",
      reply_to: email,
      subject: `New message from ${name} — Portfolio`,
      text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (resendError) {
      console.error("[Resend error]", resendError);
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    const { error: confirmError } = await resend.emails.send({
      from:    "<No Reply> Joshua Rio <onboarding@resend.dev>",
      to:      email,
      subject: `Got your message, ${name}!`,
      text:    `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nHere's a copy of what you sent:\n\n"${message}"\n\nBest,\nJoshua Rio\nhttps://joshuario.vercel.app`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h1 style="font-size:24px;font-weight:700;margin-bottom:4px">Got your message, ${name}! 👋</h1>
          <p style="color:#666;margin-top:0">Thanks for reaching out — I'll get back to you within 24 hours.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="color:#444;font-size:14px;margin-bottom:8px">Here's a copy of your message:</p>
          <div style="background:#f9f9f9;border-left:3px solid #3b82f6;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px">
            <p style="margin:0;color:#555;font-size:14px;white-space:pre-wrap">${message}</p>
          </div>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="color:#444;font-size:14px">Best,</p>
          <p style="font-weight:700;margin-top:4px">Joshua Rio</p>
          <a href="https://joshuario.vercel.app" style="color:#3b82f6;font-size:12px">joshuario.vercel.app</a>
        </div>
      `,
    });

    if (confirmError) {
      // Log but don't fail — you still got notified
      console.error("[Resend confirmation error]", confirmError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
