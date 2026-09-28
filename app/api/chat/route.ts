import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET() {
  try {
    await fetch(`${process.env.RAG_API_URL}/health`, { cache: "no-store" });
  } catch {
    // warm-up only; ignore failures
  }
  return new Response(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const RAG_API_URL = process.env.RAG_API_URL;

    const { question } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55_000);
    try {
      const res = await fetch(`${RAG_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.RAG_API_KEY ? { "X-Api-Key": process.env.RAG_API_KEY } : {}),
        },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("[RAG API error]", res.status, error);
        return NextResponse.json(
          { error: "The AI is waking up. Please try again in a few seconds." },
          { status: 503 }
        );
      }

      const data = await res.json();
      return NextResponse.json(data, { status: 200 });

    } catch {
      return NextResponse.json(
        { error: "The AI is waking up. Please try again in a few seconds." },
        { status: 503 }
      );
    } finally {
      clearTimeout(timer);
    }

  } catch (err) {
    console.error("[Chat API error]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
