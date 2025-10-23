'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

type SchemaPanelProps = {
  query: string;
  suggestedAnswer?: string;
  isLoading: boolean;
};

type SchemaType = 'Article' | 'FAQPage' | 'QAPage' | 'HowTo';

export function SchemaPanel({ query, suggestedAnswer, isLoading }: SchemaPanelProps) {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');
  const { toast } = useToast();

  const generatedSchema = useMemo(() => {
    if (!query || !suggestedAnswer) return null;

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
    };
    
    const headline = query.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    switch (schemaType) {
      case 'Article':
        return {
          ...baseSchema,
          headline: headline,
          description: suggestedAnswer.substring(0, 150) + '...',
          author: {
            '@type': 'Person',
            name: 'Author Name',
          },
          datePublished: new Date().toISOString().split('T')[0],
          mainEntityOfPage: 'https://your-website.com/your-page',
        };
      case 'FAQPage':
        return {
          ...baseSchema,
          mainEntity: [
            {
              '@type': 'Question',
              name: headline,
              acceptedAnswer: {
                '@type': 'Answer',
                text: suggestedAnswer,
              },
            },
          ],
        };
      case 'QAPage':
        return {
          ...baseSchema,
          mainEntity: {
            '@type': 'Question',
            name: headline,
            answerCount: 1,
            acceptedAnswer: {
              '@type': 'Answer',
              text: suggestedAnswer,
            },
          },
        };
      case 'HowTo':
        return {
          ...baseSchema,
          name: headline,
          step: [
            { '@type': 'HowToStep', text: 'Step 1 description...' },
            { '@type': 'HowToStep', text: 'Step 2 description...' },
            { '@type': 'HowToStep', text: 'Step 3 description...' },
          ],
        };
      default:
        return baseSchema;
    }
  }, [schemaType, query, suggestedAnswer]);

  const handleCopy = () => {
    if (generatedSchema) {
      navigator.clipboard.writeText(JSON.stringify(generatedSchema, null, 2));
      toast({ title: 'Schema JSON-LD copied!' });
    }
  };

  const renderLoading = () => (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg dark:bg-slate-900/50">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-96 w-full" />
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
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Schema Generator</CardTitle>
        <CardDescription>
          Create JSON-LD structured data to help search engines understand your content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={schemaType} onValueChange={v => setSchemaType(v as SchemaType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select schema type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="FAQPage">FAQ Page</SelectItem>
            <SelectItem value="QAPage">QA Page</SelectItem>
            <SelectItem value="HowTo">How-To</SelectItem>
          </SelectContent>
        </Select>

        <div className="max-h-96 overflow-y-auto rounded-md bg-secondary/50 p-4 shadow-inner">
          <pre className="text-sm text-foreground/80">
            <code>{JSON.stringify(generatedSchema, null, 2)}</code>
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Clipboard className="mr-2 h-4 w-4" />
          Copy JSON-LD
        </Button>
      </CardFooter>
    </Card>
  );
}
