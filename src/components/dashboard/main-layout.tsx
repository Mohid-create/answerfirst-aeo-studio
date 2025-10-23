'use client';

import { useState } from 'react';
import { Header } from './header';
import { InputPanel } from './input-panel';
import type { AnalysisResult } from '@/lib/types';
import { getAnalysis } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '../landing/footer';
import { PreviewPanel } from './preview-panel';
import { ScorePanel } from './score-panel';
import { RewritesPanel } from './rewrites-panel';
import { SchemaPanel } from './schema-panel';
import { CompetitorsPanel } from './competitors-panel';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const sections = [
  { id: 'preview', title: 'Preview' },
  { id: 'score', title: 'AEO Score' },
  { id: 'rewrites', title: 'Rewrites' },
  { id: 'schema', title: 'Schema' },
  { id: 'competitors', title: 'Competitors' },
];

export function MainLayout() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const { toast } = useToast();

  const handleAnalysis = async (data: { query: string; content: string }) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setCurrentContent(data.content);
    setCurrentQuery(data.query);

    const result = await getAnalysis(data);

    if (result.success) {
      setAnalysisResult(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: result.error,
      });
    }
    setIsLoading(false);
  };

  const showResults = !isLoading && analysisResult;

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-background via-secondary/50 to-background dark:from-[#0f172a] dark:to-[#1e293b]">
      <Header />
      <AnimatePresence>
        {showResults && (
          <motion.nav
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 flex justify-center space-x-2 overflow-x-auto border-b border-white/10 bg-card/80 py-3 shadow-md backdrop-blur-lg sm:space-x-6"
          >
            {sections.map(item => (
              <ScrollLink
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-120}
                duration={500}
                className="cursor-pointer whitespace-nowrap rounded-md px-3 py-1 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                activeClass="bg-primary text-primary-foreground"
              >
                {item.title}
              </ScrollLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <InputPanel onAnalyze={handleAnalysis} isLoading={isLoading} />
          
          <AnimatePresence>
            {(isLoading || showResults) && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="mt-10 space-y-10"
              >
                <div id="preview">
                  <PreviewPanel
                    isLoading={isLoading}
                    suggestedAnswer={analysisResult?.conciseAnswer.answer}
                    query={currentQuery}
                  />
                </div>
                <div id="score">
                  <ScorePanel isLoading={isLoading} scoreData={analysisResult?.aeoScore} />
                </div>
                <div id="rewrites">
                  <RewritesPanel
                    isLoading={isLoading}
                    suggestedAnswer={analysisResult?.conciseAnswer.answer}
                    originalContent={currentContent}
                    query={currentQuery}
                  />
                </div>
                <div id="schema">
                  <SchemaPanel
                    isLoading={isLoading}
                    query={currentQuery}
                    suggestedAnswer={analysisResult?.conciseAnswer.answer}
                  />
                </div>
                <div id="competitors">
                  <CompetitorsPanel isLoading={isLoading} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
