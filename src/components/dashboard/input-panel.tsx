'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(2, 'Query must be at least 2 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
});

type InputPanelProps = {
  onAnalyze: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

const defaultValues = {
  query: 'what is answer engine optimization',
  content:
    "Answer Engine Optimization (AEO) is the process of optimizing content to appear in the answer box or featured snippet in search engine results pages. It focuses on creating concise, accurate, and well-structured answers to common user questions. This is different from traditional SEO because it targets the specific 'answer' algorithms used by Google, Bing, and voice assistants like Alexa and Siri. AEO involves techniques like using question-based headings, providing direct answers upfront, structuring content with lists and tables, and implementing schema markup like FAQPage and HowTo. By doing so, you increase the chances of your content being selected as the canonical answer, driving highly qualified traffic and establishing authority.",
};

export function InputPanel({ onAnalyze, isLoading }: InputPanelProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-card/50 p-6 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50"
    >
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Content Input</h2>
        <p className="text-sm text-muted-foreground">Paste your content and target query to get an AEO analysis.</p>
      </header>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAnalyze)} className="space-y-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Query / Question</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., how to make a sourdough starter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Content or URL</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your article content or a URL to analyze."
                    className="min-h-[250px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
            Analyze
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
