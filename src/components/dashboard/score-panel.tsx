'use client';

import { TrendingUp, PenTool } from 'lucide-react';
import { Bar, BarChart, LabelList, RadialBar, RadialBarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import type { AeoScore } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

const chartConfig: ChartConfig = {
  score: { label: 'Score' },
  lengthScore: { label: 'Length', color: 'hsl(var(--chart-1))' },
  structureScore: { label: 'Structure', color: 'hsl(var(--chart-2))' },
  schemaScore: { label: 'Schema', color: 'hsl(var(--chart-3))' },
  intentMatchScore: { label: 'Intent', color: 'hsl(var(--chart-4))' },
  readabilityScore: { label: 'Readability', color: 'hsl(var(--chart-5))' },
};

type ScorePanelProps = {
  scoreData: AeoScore | null | undefined;
  isLoading: boolean;
};

export function ScorePanel({ scoreData, isLoading }: ScorePanelProps) {
  if (isLoading || !scoreData) {
    return <ScorePanelSkeleton />;
  }

  const { aeoScore, breakdown, suggestions } = scoreData;
  const breakdownData = Object.entries(breakdown).map(([key, value]) => ({
    name: chartConfig[key as keyof typeof chartConfig]?.label,
    value: value,
    fill: chartConfig[key as keyof typeof chartConfig]?.color,
  }));

  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">AEO Score</CardTitle>
        <CardDescription>A prediction of how likely your content is to be used as an answer.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column: Score and Breakdown */}
        <div className="flex flex-col gap-6">
          <Card className="rounded-xl bg-card/70">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Overall Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <div className="relative h-48 w-48">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <RadialBarChart
                      data={[{ name: 'score', value: aeoScore, fill: 'hsl(var(--primary))' }]}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="75%"
                      outerRadius="100%"
                      barSize={20}
                    >
                      <RadialBar dataKey="value" background={{ fill: 'hsl(var(--muted))' }} cornerRadius={10} />
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold">{aeoScore}</p>
                    <p className="text-sm text-muted-foreground">out of 100</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">Analysis complete.</div>
            </CardFooter>
          </Card>

          <Card className="rounded-xl bg-card/70">
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart accessibilityLayer data={breakdownData} layout="vertical" margin={{ left: 10, right: 40 }}>
                  <XAxis type="number" dataKey="value" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={80}
                    className="fill-muted-foreground"
                  />
                  <Bar dataKey="value" radius={5}>
                    <LabelList dataKey="value" position="right" offset={8} className="fill-foreground" fontSize={12} />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Suggestions */}
        <Card className="rounded-xl bg-card/70">
          <CardHeader>
            <CardTitle>Suggestions for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <PenTool className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

function ScorePanelSkeleton() {
  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg dark:bg-slate-900/50">
       <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column Skeleton */}
        <div className="flex flex-col gap-6">
          <Card className="rounded-xl">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <Skeleton className="h-48 w-48 rounded-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/2" />
            </CardFooter>
          </Card>
          <Card className="rounded-xl">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        </div>
        {/* Right Column Skeleton */}
        <Card className="rounded-xl">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
