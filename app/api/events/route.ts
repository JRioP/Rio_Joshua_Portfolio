// app/api/events/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const event = await request.json();

    if (event.type === 'email.received') {
      return NextResponse.json(event);
    }

    return NextResponse.json({});
  } catch (error) {
    console.error("[Events API Error]", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
};