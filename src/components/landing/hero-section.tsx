'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-100/30 via-purple-100/30 to-sky-100/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-sky-900/20"></div>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Optimize Your Content to Be the Answer
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
            Free AEO Snippet Optimizer that helps you win featured snippets, voice answers, and AI results — instantly.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <Button asChild size="lg">
            <Link href="/dashboard">
              Start Optimizing Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">
              See How It Works
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
