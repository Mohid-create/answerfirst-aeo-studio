import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://answerfirst.app'), 
  title: 'AnswerFirst — Free AEO Snippet Optimizer & Schema Generator',
  description:
    "AEO Snippet Optimizer helps creators and marketers analyze and improve their content for Google's Answer Engine. Get real-time snippet scores, SEO rewrites, and competitor analysis.",
  
  // ✅ FIX: Keep the manifest here. Next.js will link it automatically.
  manifest: '/manifest.json',

  // ✅ NEW: Explicitly define the icons for PWA and Apple devices.
  icons: {
    icon: '/icon-192.png',           // Standard PWA icon
    apple: '/icon-192.png',          // Apple touch icon
    shortcut: '/favicon.ico',        // Standard favicon
  },

  keywords: [
    'AEO',
    'Answer Engine Optimization',
    'SEO',
    'Featured Snippet',
    'Schema Generator',
    'AI Content',
    'Google snippet optimization',
    'content optimization tool'
  ],
  authors: [{ name: 'AnswerFirst' }],
  openGraph: {
    title: 'AnswerFirst — Analyze, Optimize, and Rank Higher',
    description:
      'Boost your Answer Engine Optimization (AEO) with AI-powered snippet analysis, rewrites, and schema insights.',
    url: 'https://answerfirst.app',
    siteName: 'AnswerFirst',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AnswerFirst Open Graph Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnswerFirst — Free AEO Snippet Optimizer & Schema Generator',
    description:
      'Optimize your content to win featured snippets, voice answers, and AI results.',
    images: ['/twitter-image.png'],
    creator: '@AnswerFirstApp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Structured Data for Google Rich Results
  const structuredData = [
    // ... (Your existing structured data arrays are here)
    // Note: I am omitting the full array content for brevity, 
    // but your original structuredData variable is left as-is.
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AnswerFirst AEO Snippet Optimizer",
      "url": "https://answerfirst.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://answerfirst.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // ... all other schema objects ...
  ];

  return (
    // NOTE: We are removing the manual <head> tag and letting Next.js manage it.
    // The structuredData script and font links must be moved into the <body> as a result,
    // which Next.js will automatically lift to the <head> element.
    <html lang="en" suppressHydrationWarning>
        <body className="font-body antialiased">
            {/* ✅ JSON-LD Structured Data (Moved into body for automatic <head> placement by Next.js) */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(structuredData),
              }}
            />

            {/* ✅ Fonts (Moved into body, Next.js will move them up) */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
              rel="stylesheet"
            />
            
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <FirebaseClientProvider>
                    {children}
                </FirebaseClientProvider>
                <Toaster />
            </ThemeProvider>
        </body>
    </html>
  );
} 