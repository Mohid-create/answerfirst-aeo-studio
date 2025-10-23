// src/app/blog/metadata.ts

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ✅ Add your real domain here
  metadataBase: new URL('https://yourdomain.com'),

  // 🔹 Main SEO settings
  title: 'Insights & SEO Tips – AEO Snippet Optimizer Blog',
  description:
    'Stay updated with the latest AEO, SEO, and content optimization tips. Learn how to improve your Answer Engine Optimization strategy effectively.',

  // 🔹 Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Insights & SEO Tips – AEO Snippet Optimizer Blog',
    description:
      'Stay updated with the latest AEO, SEO, and content optimization tips. Learn how to improve your Answer Engine Optimization strategy effectively.',
    url: 'https://yourdomain.com/blog',
    siteName: 'AEO Snippet Optimizer',
    images: [
      {
        url: '/images/blog-preview.jpg', // ✅ Make sure this image exists in /public/images/
        width: 1200,
        height: 630,
        alt: 'AEO Snippet Optimizer Blog Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 🔹 Twitter Card settings
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & SEO Tips – AEO Snippet Optimizer Blog',
    description:
      'Stay updated with the latest AEO, SEO, and content optimization tips. Learn how to improve your Answer Engine Optimization strategy effectively.',
    images: ['/images/blog-preview.jpg'],
    creator: '@your_twitter_handle', // optional
  },

  // 🔹 Keywords for SEO
  keywords: [
    'AEO',
    'SEO tips',
    'Google AI Overviews',
    'Featured Snippets',
    'Answer Engine Optimization',
    'Search ranking',
    'Content optimization',
  ],
};
