// app/api/events/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  // Log events for debugging — you can expand this later
  console.log("[Resend webhook event]", event.type, event.data);

  if (event.type === 'email.received') {
    return NextResponse.json(event);
  }

  // Handle other event types as needed
  if (event.type === 'email.delivered') {
    console.log(`Email delivered to: ${event.data.to}`);
  }

  if (event.type === 'email.bounced') {
    console.log(`Email bounced: ${event.data.to}`);
  }

  return NextResponse.json({ received: true });
};