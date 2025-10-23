import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://answerfirst.app'), // ✅ Required for SEO images & links
  title: 'AnswerFirst — Free AEO Snippet Optimizer & Schema Generator',
  description:
    "AEO Snippet Optimizer helps creators and marketers analyze and improve their content for Google's Answer Engine. Get real-time snippet scores, SEO rewrites, and competitor analysis.",
  manifest: '/manifest.json',
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
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AnswerFirst — Free AEO Snippet Optimizer",
      "description":
        "Optimize your content for Answer Engine Optimization (AEO) to win featured snippets, voice answers, and AI search visibility.",
      "url": "https://answerfirst.app",
      "publisher": {
        "@type": "Organization",
        "name": "AnswerFirst",
        "logo": {
          "@type": "ImageObject",
          "url": "https://answerfirst.app/logo.png"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://answerfirst.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://answerfirst.app/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": "https://answerfirst.app/contact"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AnswerFirst AEO Snippet Optimizer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AnswerFirst AEO Snippet Optimizer is a free web app that helps content creators and marketers improve their Answer Engine Optimization (AEO) by analyzing snippet readiness, providing AI rewrites, and generating SEO-friendly schemas."
          }
        },
        {
          "@type": "Question",
          "name": "Is AnswerFirst completely free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes! AnswerFirst is 100% free to use. You can analyze unlimited content, generate schemas, and get AEO suggestions without any hidden fees."
          }
        },
        {
          "@type": "Question",
          "name": "How can AnswerFirst improve my SEO ranking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "By optimizing your content for AEO and featured snippets, AnswerFirst helps Google and AI systems better understand and surface your content in top search results."
          }
        }
      ]
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className="font-body antialiased">
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
