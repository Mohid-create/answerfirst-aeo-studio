'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

type Competitor = {
  rank: number;
  title: string;
  url: string;
  snippet: string;
  analysis?: string;
};

const fallbackCompetitors: Competitor[] = [
  {
    rank: 1,
    title: 'Ahrefs Blog: What Is A Featured Snippet? (And How to Get One)',
    url: 'ahrefs.com',
    snippet: "A featured snippet is a brief summary of an answer to a user's query...",
    analysis: "Uses a definition-style answer that’s effective for 'what is' queries.",
  },
  {
    rank: 2,
    title: "Moz: The Beginner's Guide to SEO - Featured Snippets",
    url: 'moz.com',
    snippet: 'To get a featured snippet, focus on answering questions directly below H2/H3 headers...',
    analysis: 'Structured and easy to scan.',
  },
];

const cardBaseClass = "bg-card/70 transition-shadow duration-300 hover:shadow-lg rounded-xl";

export function CompetitorsPanel({
  isLoading,
  query,
}: {
  isLoading: boolean;
  query: string;
}) {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!query) {
        setCompetitors(fallbackCompetitors);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/competitors?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json?.error || 'Failed to fetch');
        }
        const json = await res.json();
        const items = json.results || [];
        if (!items.length) {
          setCompetitors(fallbackCompetitors);
        } else {
          setCompetitors(
            items.map((it: any, i: number) => ({
              rank: i + 1,
              title: it.title || 'No title',
              url: it.domain || it.link || '',
              snippet: it.snippet || '',
              analysis: 'Live SERP result — analyze for snippet intent',
            }))
          );
        }
      } catch (err: any) {
        console.error('Competitors fetch error', err);
        setError(err?.message || 'Unknown error');
        setCompetitors(fallbackCompetitors);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [query]);

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
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading || loading) return renderLoading();

  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Competitor Answer Snapshot
        </CardTitle>
        <CardDescription>An analysis of the top-ranking answers for your query.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="text-sm text-red-400 mb-4">Error loading competitors: {error}</p>
        )}
        <motion.div initial="hidden" animate="visible" className="space-y-6">
          {competitors.map((comp) => (
            <motion.div key={comp.rank} className="space-y-2">
              <Card className={cardBaseClass}>
                <CardHeader className="flex-row items-start gap-4 space-y-0 pb-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{`Rank #${comp.rank}: ${comp.title}`}</CardTitle>
                    <p className="text-xs text-muted-foreground">{comp.url}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pl-16">
                  <p className="border-l-4 border-accent pl-4 text-sm italic">"{comp.snippet}"</p>
                  <p className="text-sm">
                    <span className="font-semibold">Analysis:</span> {comp.analysis}
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
