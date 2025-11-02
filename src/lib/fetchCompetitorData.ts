// Use a type definition for the expected output structure
export interface CompetitorResult {
  title: string;
  link: string;
  snippet: string;
  domain: string;
  // CRITICAL FIX: The analysis property is necessary for the dashboard components.
  analysis?: string; 
}

// --- 1. GET API KEY AND ENDPOINT ---
// Ensure you have set the SERPER_API_KEY in your .env.local (for local development)
// and in your Hosting Environment Variables (e.g., Vercel Dashboard) for production.
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const SERPER_ENDPOINT = 'https://google.serper.dev/search';

// The fetchMockCompetitorData function has been removed to simplify debugging.

export async function fetchCompetitorData(query: string): Promise<CompetitorResult[]> {
  // --- 2. CRITICAL API KEY CHECK (Safety First) ---
  if (!SERPER_API_KEY) {
    // If no API key, log a clean error and return an empty array.
    console.error(
      "❌ FATAL ERROR: SERPER_API_KEY is missing in environment variables. Live fetching is disabled."
    );
    // On failure, return an empty array.
    return []; 
  }

  // --- Proceed with live data fetching if API key is present ---
  console.log("🟢 SERPER_API_KEY found. Attempting live fetch for query:", query);

  const searchParams = new URLSearchParams({
    q: query,
    num: '5', // Fetch top 5 results
    gl: 'us', 
    hl: 'en', 
  });

  try {
    const response = await fetch(`${SERPER_ENDPOINT}?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': SERPER_API_KEY, 
        'Content-Type': 'application/json',
      },
      // --- 3. CACHE BUSTER ---
      // This is crucial to prevent Next.js from serving old/mock data.
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ SERP API Request Failed: Status ${response.status}. Response Body: ${errorText.substring(0, 100)}...`
      );
      // Depending on the status code, this might indicate an invalid key, but we'll re-throw for now.
      throw new Error(`Failed to fetch SERP data: HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Live SERP data received successfully.");

    // --- 4. MAP AND TRANSFORM DATA ---
    const results: CompetitorResult[] = data.organic
      .filter((result: any) => result.title && result.link && result.snippet)
      .slice(0, 3)
      .map((result: any) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
        domain: new URL(result.link).hostname.replace('www.', ''),
        // analysis field is correctly omitted here, as it is added by the AI action later.
      }));

    return results;

  } catch (error) {
    console.error("❌ An unexpected error occurred during live SERP fetch:", error);
    // On failure, return an empty array to prevent crashing the UI.
    return []; 
  }
}
