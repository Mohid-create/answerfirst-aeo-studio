'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Monitor, Mic } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

type PreviewPanelProps = {
  suggestedAnswer?: string;
  query: string;
  isLoading: boolean;
};

function VoicePreview({ answerText, isLoading }: { answerText?: string; isLoading: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = () => {
    if (!answerText || !isSupported) return;
    const utterance = new SpeechSynthesisUtterance(answerText);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stop = () => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        speechSynthesis.cancel();
      }
    };
  }, [isSupported]);
  
  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!answerText) return null;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-900/30 via-slate-800/30 to-blue-700/20 border border-blue-500/20 rounded-2xl p-6 text-center shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.1, 1] : 1,
          opacity: isPlaying ? [0.8, 1, 0.8] : 1,
        }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.2 }}
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30"
      >
        <Mic className="text-blue-400 h-8 w-8" />
      </motion.div>

      <p className="text-lg font-medium text-foreground mb-4 italic">
        “{answerText}”
      </p>
      
      {isSupported && (
        <div className="flex justify-center space-x-4">
          {!isPlaying ? (
            <button
              onClick={speak}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:scale-105 transition-all"
            >
              ▶️ Play Voice
            </button>
          ) : (
            <button
              onClick={stop}
              className="px-5 py-2 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition-all"
            >
              ⏹ Stop
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}


export function PreviewPanel({ suggestedAnswer, query, isLoading }: PreviewPanelProps) {
  const url = 'https://your-website.com/your-page';
  const title = query.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      );
    }
    if (!suggestedAnswer) {
      return null;
    }
    return (
      <motion.div
        key="content"
        {...animationProps}
        className="space-y-1"
      >
        <p className="text-sm text-green-700 dark:text-green-400">{url}</p>
        <h3 className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400">{title}</h3>
        <p className="text-foreground/90">{suggestedAnswer}</p>
      </motion.div>
    );
  };

  return (
    <Card className="rounded-2xl border border-white/10 bg-card/50 shadow-xl backdrop-blur-lg hover:border-blue-500/30 transition-all duration-300 dark:bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">SERP & Answer Preview</CardTitle>
        <CardDescription>✨ How your optimized content may appear on Google’s answer box.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="desktop">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="desktop">
              <Monitor className="mr-2 h-4 w-4" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="mr-2 h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="voice">
              <Mic className="mr-2 h-4 w-4" />
              Voice
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 rounded-lg border bg-background/50 p-4 shadow-inner">
            <AnimatePresence mode="wait">
              <TabsContent value="desktop" className="m-0" key="desktop-tab">
                {renderContent()}
              </TabsContent>
              <TabsContent value="mobile" className="m-0" key="mobile-tab">
                <div className="mx-auto max-w-sm">{renderContent()}</div>
              </TabsContent>
              <TabsContent value="voice" className="m-0" key="voice-tab">
                 <VoicePreview answerText={suggestedAnswer} isLoading={isLoading} />
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
