// src/app/api/competitors/route.ts
import { NextResponse } from "next/server";

// Simple test route — returns static competitor data immediately.
// This bypasses any external API so we can confirm routing works.
export async function GET(req: Request) {
  try {
    const testData = [
      {
        rank: 1,
        title: "Test — Moz: What is AEO?",
        link: "https://moz.com/test-aeo",
        snippet: "This is a static test snippet for AEO.",
        domain: "moz.com",
      },
      {
        rank: 2,
        title: "Test — Search Engine Journal: AEO explained",
        link: "https://searchenginejournal.com/test-aeo",
        snippet: "Another static test snippet for troubleshooting.",
        domain: "searchenginejournal.com",
      },
    ];

    console.log("[/api/competitors] returning test data"); // Will appear in terminal
    return NextResponse.json({ results: testData }, { status: 200 });
  } catch (err) {
    console.error("[/api/competitors] unexpected error", err);
    return NextResponse.json({ error: "internal test route error" }, { status: 500 });
  }
}
