import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET() {
  try {
    const url = process.env.RAG_API_URL;
    if (url) {
      await fetch(`${url}/health`, { cache: "no-store" });
    }
  } catch {
    // warm-up only; ignore failures
  }
  return new Response(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const RAG_API_URL = process.env.RAG_API_URL;

    if (!RAG_API_URL) {
      console.error("[Chat API error] Missing RAG_API_URL environment variable");
      return NextResponse.json(
        { error: "Backend URL is not configured. Please set RAG_API_URL." },
        { status: 500 }
      );
    }

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
        const errorText = await res.text();
        console.error("[RAG API error]", res.status, errorText);

        if (res.status === 401) {
          return NextResponse.json(
            { error: "Unauthorized: RAG_API_KEY is missing or does not match the Render API_KEY." },
            { status: 401 }
          );
        }
        if (res.status === 404) {
          return NextResponse.json(
            { error: "Backend service returned 404 Not Found. Please check RAG_API_URL." },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { error: "The AI is waking up. Please try again in a few seconds." },
          { status: 503 }
        );
      }

      const data = await res.json();
      return NextResponse.json(data, { status: 200 });

    } catch (fetchErr: unknown) {
      console.error("[Chat fetch error]", fetchErr);
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
