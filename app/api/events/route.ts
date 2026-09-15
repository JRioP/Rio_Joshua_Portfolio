// app/api/events/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const event = await request.json();

    // 1. Resend sends an "email.received" event when someone emails contact@joshuario.com
    if (event.type === "email.received") {
      const emailId = event.data.email_id;

      const { data, error } = await resend.emails.receiving.get(emailId);

      if (error) {
        console.error("Failed to retrieve received email:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log("From:", data?.from);
      console.log("Subject:", data?.subject);
      console.log("Plain text body:", data?.text);
      console.log("HTML body:", data?.html);
      console.log("Attachments:", data?.attachments);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[Events API Error]", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}