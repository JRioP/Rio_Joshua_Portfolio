import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const RAG_API_URL = process.env.RAG_API_URL;
    const { question } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const res = await fetch(`${RAG_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("[RAG API error]", res.status, error);
      return NextResponse.json({ error: "RAG API failed." }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    console.error("[Chat API error]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}