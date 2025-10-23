'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="bg-secondary/50 py-20 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start Optimizing for Free Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No credit card, no login required. Just pure optimization.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="relative overflow-hidden">
              <Link href="/dashboard">
                <Sparkles className="mr-2 h-5 w-5" />
                Launch the Optimizer
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
