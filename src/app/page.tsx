import { LandingPage } from '@/components/landing/landing-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AEO Snippet Optimizer — Boost Your Google Snippet Rankings',
  description: 'AEO Snippet Optimizer helps creators and marketers analyze and improve their content for Google\'s Answer Engine. Get real-time snippet scores, SEO rewrites, and competitor analysis.',
};

export default function Home() {
  return <LandingPage />;
}
