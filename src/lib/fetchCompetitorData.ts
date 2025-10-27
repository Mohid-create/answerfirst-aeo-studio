// src/lib/fetchCompetitorData.ts

export async function fetchCompetitorData(query: string) {
    try {
      const apiKey = process.env.SERPER_API_KEY;
      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: query,
          num: 5, // number of top results
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch competitor data");
      }
  
      const data = await response.json();
  
      // Transform response data for easy use in UI
      const results = data.organic?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        domain: new URL(item.link).hostname,
      })) || [];
  
      return results;
    } catch (error) {
      console.error("Error fetching competitor data:", error);
      return [];
    }
  }
  