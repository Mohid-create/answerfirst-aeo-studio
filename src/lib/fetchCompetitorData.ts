// Use a type definition for the expected output structure
export interface CompetitorResult {
  title: string;
  link: string;
  snippet: string;
  domain: string;
  // Note: If you need to include the 'analysis' field used in competitors-panel.tsx, 
  // you must add it here or in your global types file.
  // analysis?: string; 
}

// --- 1. GET API KEY AND ENDPOINT ---
// Ensure you have set the SERPER_API_KEY in your .env.local (for local development)
// and in your Hosting Environment Variables (e.g., Vercel Dashboard) for production.
const SERPER_API_KEY = process.env.SERPER_API_KEY;
const SERPER_ENDPOINT = 'https://google.serper.dev/search';

async function fetchMockCompetitorData(): Promise<CompetitorResult[]> {
    console.log("🟡 SERPER_API_KEY not found. Falling back to mock data.");
    // This is the absolute URL for the mock API route, which is needed for server-side fetching.
    // We assume the app is running on localhost:9002 during local development.
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://' + (process.env.NEXT_PUBLIC_VERCEL_URL || 'your-production-domain.com')
      : 'http://localhost:9002';
      
    try {
        const response = await fetch(`${baseUrl}/api/competitors`, { cache: 'no-store' });
        if (!response.ok) {
            console.error("❌ Failed to fetch mock competitor data.");
            return [];
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("❌ Error fetching mock data:", error);
        return [];
    }
}


export async function fetchCompetitorData(query: string): Promise<CompetitorResult[]> {
  // --- 2. CHECK FOR API KEY AND DECIDE FETCH STRATEGY ---
  if (!SERPER_API_KEY) {
    // If no API key, use the mock data function as a fallback.
    return fetchMockCompetitorData();
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
      }));

    return results;

  } catch (error) {
    console.error("❌ An unexpected error occurred during live SERP fetch:", error);
    // On failure, return an empty array to prevent crashing the UI.
    return []; 
  }
}
