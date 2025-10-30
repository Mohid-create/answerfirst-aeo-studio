import { MainLayout } from '@/components/dashboard/main-layout';
import { fetchCompetitorData, CompetitorResult } from '@/lib/fetchCompetitorData'; 
import type { Metadata } from 'next';

// ----------------------------------------------------
// 🔥 CRITICAL FIX: FORCE DYNAMIC RENDERING 🔥
// This prevents Next.js from attempting to run the external SERP API call 
// during the static build phase, which was causing the DYNAMIC_SERVER_USAGE error
// and preventing your environment variables from loading correctly on Vercel.
export const dynamic = 'force-dynamic'; 
// ----------------------------------------------------

// 1. Define Metadata for SEO (Best Practice)
export const metadata: Metadata = {
    title: 'Dashboard | AnswerFirst AEO Optimizer',
    description: 'Analyze and optimize your content for Answer Engine Optimization (AEO) and featured snippets.',
};

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
    // This console log will now correctly appear during runtime if the API fails, 
    // rather than causing the build to fail.
    console.error("Failed to load initial competitor data on DashboardPage:", error);
    // If it fails, initialCompetitors remains an empty array ([]), 
    // which prevents the app from crashing and displays gracefully.
  }

  // 3. Pass the fetched data down as a prop
  return <MainLayout initialCompetitorData={initialCompetitors} />;
}
