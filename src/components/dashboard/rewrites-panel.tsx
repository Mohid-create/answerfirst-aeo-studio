'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Clipboard, Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getRewrites } from '@/app/actions';
import type { RewriteContentInput } from '@/ai/flows/rewrite-content';
import { Label } from '../ui/label';

type RewritesPanelProps = {
  suggestedAnswer?: string;
  originalContent: string;
  query: string;
  isLoading: boolean;
};

const cardBaseClass = "rounded-xl bg-card/70";

export function RewritesPanel({ suggestedAnswer, originalContent, isLoading }: RewritesPanelProps) {
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenText, setRewrittenText] = useState('');
  const [style, setStyle] = useState<RewriteContentInput['style']>('concise');

  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleRewrite = async () => {
    if (!originalContent) return;
    setIsRewriting(true);
    setRewrittenText('');
    const result = await getRewrites({ text: originalContent, style, maxLength: 500 });
    if (result.success) {
      setRewrittenText(result.data.rewrittenText);
    } else {
      toast({ variant: 'destructive', title: 'Rewrite Failed', description: result.error });
    }
    setIsRewriting(false);
  };
  
  const renderLoading = () => (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg dark:bg-slate-900/50">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="grid gap-6">
        <Card className={cardBaseClass}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
        <Card className={cardBaseClass}>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return renderLoading();
  }

  if (!suggestedAnswer) {
    return null;
  }

  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">AI Rewriter</CardTitle>
        <CardDescription>Generate optimized answers and experiment with different styles.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Card className={cardBaseClass}>
          <CardHeader>
            <CardTitle>Suggested Canonical Answer</CardTitle>
            <CardDescription>A concise, auto-generated answer optimized for search engines.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={suggestedAnswer} readOnly className="min-h-[120px] resize-none bg-background/50" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => handleCopy(suggestedAnswer)}>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy Answer
            </Button>
          </CardFooter>
        </Card>
  
        <Card className={cardBaseClass}>
          <CardHeader>
            <CardTitle>Rewriting Assistant</CardTitle>
            <CardDescription>Experiment with different styles for your content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rewrite-style" className="mb-2 block">Style</Label>
              <Select value={style} onValueChange={v => setStyle(v as RewriteContentInput['style'])}>
                <SelectTrigger id="rewrite-style">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="voice-search friendly">Voice-Search Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
  
            <Button onClick={handleRewrite} disabled={isRewriting || !originalContent} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/50">
              {isRewriting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Rewrite
            </Button>
  
            {(isRewriting || rewrittenText) && (
              <div className="space-y-2 pt-4">
                <Label>Rewritten Content</Label>
                {isRewriting ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <Textarea value={rewrittenText} readOnly className="min-h-[120px] resize-none bg-background/50" />
                )}
              </div>
            )}
          </CardContent>
          {rewrittenText && (
            <CardFooter>
              <Button variant="outline" size="sm" onClick={() => handleCopy(rewrittenText)}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy Rewrite
              </Button>
            </CardFooter>
          )}
        </Card>
      </CardContent>
    </Card>
  );
}
