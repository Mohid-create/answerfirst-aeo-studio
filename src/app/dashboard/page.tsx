import { MainLayout } from '@/components/dashboard/main-layout';
// 1. Import the live data fetching function
import { fetchCompetitorData, CompetitorResult } from '@/lib/fetchCompetitorData'; 

// This is a Server Component, so we can make async calls directly.
export default async function DashboardPage() {
  
  // 2. Fetch the initial competitor data here. 
  // We use a fixed query (e.g., "What is AEO?") for the initial load 
  // to populate the dashboard before the user enters their own query.
  // We wrap it in a try/catch block for robustness.
  let initialCompetitors: CompetitorResult[] = [];
  try {
    // Fetch data using a common initial query
    initialCompetitors = await fetchCompetitorData("What is Answer Engine Optimization?");
  } catch (error) {
    console.error("Failed to load initial competitor data on DashboardPage:", error);
    // If it fails, initialCompetitors remains an empty array ([]), 
    // which prevents the app from crashing and displays gracefully.
  }

  // 3. Pass the fetched data down as a prop
  return <MainLayout initialCompetitorData={initialCompetitors} />;
}
