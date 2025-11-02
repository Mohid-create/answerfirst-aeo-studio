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
import { fetchCompetitorData, CompetitorResult } from '@/lib/fetchCompetitorData';


// 2. DEFINE PROPS INTERFACE
interface MainLayoutProps {
    // This prop receives the initial live data fetched by the Server Component (DashboardPage)
    initialCompetitorData: CompetitorResult[];
}

const sections = [
  { id: 'preview', title: 'Preview' },
  { id: 'score', title: 'AEO Score' },
  { id: 'rewrites', title: 'Rewrites' },
  { id: 'schema', title: 'Schema' },
  { id: 'competitors', title: 'Competitors' },
];

// 3. UPDATE FUNCTION SIGNATURE TO ACCEPT PROPS
export function MainLayout({ initialCompetitorData }: MainLayoutProps) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const { toast } = useToast();
  
  // 4. ADD STATE FOR COMPETITOR RESULTS, INITIALIZED WITH THE PROP
  const [competitorResults, setCompetitorResults] = useState<CompetitorResult[]>(
    initialCompetitorData
  );

  const handleAnalysis = async (data: { query: string; content: string }) => {
    setIsLoading(true);
    // CRITICAL: Reset the previous analysis result immediately at the start of the process
    setAnalysisResult(null); 
    setCurrentContent(data.content);
    setCurrentQuery(data.query);
    
    // Reset competitor data state while loading, so old results don't flash
    setCompetitorResults([]);

    // 5a. Run the primary analysis action
    const result = await getAnalysis(data);
    
    // 5b. Fetch the NEW live competitor data for the user's specific query
    try {
        const liveCompetitors = await fetchCompetitorData(data.query);
        setCompetitorResults(liveCompetitors);
    } catch (e) {
        console.error("Failed to fetch live competitor data during analysis:", e);
        toast({
            variant: 'destructive',
            title: 'Competitor Data Error',
            description: 'Could not fetch live search results. Please check the SERP API key.',
        });
    }

    if (result.success) {
      // --- Success Path ---
      if (result.data) {
        setAnalysisResult(result.data);
      }
    } else {
      // --- Failure Path ---
      // 🔥 CRITICAL FIX: Explicitly set analysisResult to null on failure. 
      // This resolves the TypeScript error related to passing an unexpected type 
      // (like the return type of a failed action) to the state setter.
      setAnalysisResult(null); 

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
                  <CompetitorsPanel 
                    isLoading={isLoading}
                    competitors={competitorResults}
                  />
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
