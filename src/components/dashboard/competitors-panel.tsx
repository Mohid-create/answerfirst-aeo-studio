'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

type Competitor = {
  rank: number;
  title: string;
  url: string;
  snippet: string;
  analysis: string;
};

const mockCompetitors: Competitor[] = [
  {
    rank: 1,
    title: 'Ahrefs Blog: What Is A Featured Snippet? (And How to Get One)',
    url: 'ahrefs.com',
    snippet:
      "A featured snippet is a brief summary of an answer to a user's query, which is displayed at the top of Google's search results. It's designed to provide a quick, direct answer.",
    analysis: "Uses a direct definition format, which is highly effective for 'what is' queries.",
  },
  {
    rank: 2,
    title: "Moz: The Beginner's Guide to SEO - Featured Snippets",
    url: 'moz.com',
    snippet:
      'To get a featured snippet, focus on answering questions. Use question-style headers (H2, H3) and provide a concise answer directly below the header. Using lists and tables also helps.',
    analysis: 'Structured with a clear question-answer pair and provides actionable steps.',
  },
  {
    rank: 3,
    title: 'Backlinko: We Analyzed 1.3 Million Google Search Results',
    url: 'backlinko.com',
    snippet:
      'Our data shows that content with a high word count and a clear, well-structured format tends to win featured snippets. Paragraph snippets have an average length of 45 words.',
    analysis: 'Data-backed analysis provides credibility and focuses on a key metric (length).',
  },
];

const cardBaseClass = "bg-card/70 transition-shadow duration-300 hover:shadow-lg rounded-xl";

export function CompetitorsPanel({ isLoading }: { isLoading: boolean }) {

  const renderLoading = () => (
     <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg dark:bg-slate-900/50">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
  )

  if (isLoading) {
    return renderLoading();
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Competitor Answer Snapshot</CardTitle>
        <CardDescription>An analysis of the top-ranking answers for your query. (Mock Data)</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {mockCompetitors.map(competitor => (
            <motion.div key={competitor.rank} variants={itemVariants}>
              <Card className={cardBaseClass}>
                <CardHeader className="flex-row items-start gap-4 space-y-0 pb-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{`Rank #${competitor.rank}: ${competitor.title}`}</CardTitle>
                    <p className="text-xs text-muted-foreground">{competitor.url}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pl-16">
                  <p className="border-l-4 border-accent pl-4 text-sm italic">"{competitor.snippet}"</p>
                  <p className="text-sm">
                    <span className="font-semibold">Analysis:</span> {competitor.analysis}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
