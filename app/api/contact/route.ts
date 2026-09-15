// app/api/contact/route.ts — Contact form API route using Resend
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 7.4 — Rate limit: 3 submissions per 10 minutes per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
});

// 7.2 — Max lengths, kept close to your original but centralized
const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
};

// 7.3 — Escape HTML-sensitive characters before interpolating into email HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateInput(name: string, email: string, message: string, company: string): string | null {
  // 7.1 — Honeypot: bots fill every field, real users never see this one
  if (company && company.trim().length > 0) return "Invalid submission.";

  if (!name || name.trim().length < 2) return "Name must be at least 2 characters.";
  if (name.length > LIMITS.name) return "Name is too long.";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address.";
  if (email.length > LIMITS.email) return "Email is too long.";

  if (!message || message.trim().length < 10) return "Message must be at least 10 characters.";
  if (message.length > LIMITS.message) return "Message is too long.";

  return null;
}

export async function POST(req: NextRequest) {
  try {
    // 7.4 — Rate limit by IP before doing any real work
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    // 7.2 — Reject oversized bodies before parsing (defense against giant payloads)
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > 20_000) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message, company } = await req.json();

    const error = validateInput(name, email, message, company ?? "");
    if (error) return NextResponse.json({ error }, { status: 400 });

    // 7.3 — Escaped versions for HTML-context interpolation only.
    // Plain-text emails (text: fields) don't need escaping — they're not parsed as markup.
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);

    const { data, error: resendError } = await resend.emails.send({
      from:    "Joshua Rio Portfolio <contact@joshuario.com>",
      to:      "riojoshuadev@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (resendError) {
      console.error("[Resend error]", resendError);
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    const { error: confirmError } = await resend.emails.send({
      from:    "Joshua Alnie Rio <contact@joshuario.com>",
      to:      email,
      replyTo: "riojoshuadev@gmail.com",
      subject: `Got your message, ${name}!`,
      text:    `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nHere's a copy of what you sent:\n\n"${message}"\n\nBest regards,\nJoshua Alnie Rio\nJunior Full-Stack Developer · Batangas, Philippines\nEmail: riojoshuadev@gmail.com\nMobile: 09270849508\nLinkedIn: https://linkedin.com/in/japrdev\nPortfolio: https://joshuario.com`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;padding:24px;color:#1e293b;line-height:1.6">
          <h1 style="font-size:22px;font-weight:700;margin-bottom:6px;color:#0f172a">Got your message, ${safeName}!</h1>
          <p style="color:#64748b;margin:0 0 18px 0;font-size:14px">Thanks for reaching out — I've received your note and will get back to you within 24 hours.</p>
          
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #3b82f6;padding:16px;border-radius:6px;margin:20px 0">
            <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b">Your Message</p>
            <p style="margin:0;color:#334155;font-size:14px;white-space:pre-wrap">${safeMessage}</p>
          </div>

          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 20px 0"/>
          
          <div style="margin-top:16px">
            <p style="color:#64748b;font-size:13px;margin:0 0 4px 0">Best regards,</p>
            <p style="font-size:16px;font-weight:700;margin:0;color:#0f172a">Joshua Alnie Rio</p>
            <p style="font-size:13px;color:#64748b;margin:2px 0 12px 0">Junior Full-Stack Developer · Batangas, Philippines</p>
            
            <div style="font-size:13px;color:#475569;line-height:1.8">
              <div>Email: <a href="mailto:riojoshuadev@gmail.com" style="color:#3b82f6;text-decoration:none">riojoshuadev@gmail.com</a></div>
              <div>Mobile: <a href="tel:09270849508" style="color:#3b82f6;text-decoration:none">0927-084-9508</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/in/japrdev" target="_blank" style="color:#3b82f6;text-decoration:none">linkedin.com/in/japrdev</a></div>
              <div>Portfolio: <a href="https://joshuario.com" target="_blank" style="color:#3b82f6;text-decoration:none">joshuario.com</a></div>
            </div>
          </div>
        </div>
      `,
    });

    if (confirmError) {
      console.error("[Resend confirmation error]", confirmError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}