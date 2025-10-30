'use client';

// Removed: useEffect, useState (data fetching logic moved to MainLayout/DashboardPage)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { CompetitorResult } from '@/lib/fetchCompetitorData'; 

// --- FIX: Extend the imported type to include 'analysis' ---
// This creates a safe type for this component to consume, assuming 
// 'analysis' might be null or undefined when passed down.
type CompetitorDisplayResult = CompetitorResult & {
    analysis?: string;
};

interface CompetitorsPanelProps {
    isLoading: boolean;
    // Use the extended type here
    competitors: CompetitorDisplayResult[]; 
}

const cardBaseClass = "bg-card/70 transition-shadow duration-300 hover:shadow-lg rounded-xl";

export function CompetitorsPanel({
    isLoading,
    competitors,
}: CompetitorsPanelProps) {

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

    if (isLoading) return renderLoading();
    
    if (!competitors || competitors.length === 0) {
        return (
            <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg dark:bg-slate-900/50">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Competitor Answer Snapshot
                    </CardTitle>
                    <CardDescription>An analysis of the top-ranking answers for your query.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-yellow-400">
                        No competitor data available. Please check your query or API key setup.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
            <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Competitor Answer Snapshot
                </CardTitle>
                <CardDescription>An analysis of the top-ranking answers for your query.</CardDescription>
            </CardHeader>
            <CardContent>
                <motion.div initial="hidden" animate="visible" className="space-y-6">
                    {competitors.map((comp, index) => (
                        <motion.div key={comp.link || index} className="space-y-2">
                            <Card className={cardBaseClass}>
                                <CardHeader className="flex-row items-start gap-4 space-y-0 pb-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Trophy className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{`Rank #${index + 1}: ${comp.title}`}</CardTitle>
                                        <p className="text-xs text-muted-foreground">{comp.domain}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pl-16">
                                    <p className="border-l-4 border-accent pl-4 text-sm italic">"{comp.snippet}"</p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Analysis:</span> 
                                        {/* Now 'analysis' is correctly typed as optional */}
                                        {comp.analysis || 'Live SERP result - analyze for snippet intent.'}
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
