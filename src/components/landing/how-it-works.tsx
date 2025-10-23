'use client';

import { motion } from 'framer-motion';
import { ClipboardPaste, Gauge, Copy } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardPaste className="h-10 w-10 text-primary" />,
    title: '1. Paste Your Content',
    description: 'Provide your article content or URL and the target query you want to rank for.',
  },
  {
    icon: <Gauge className="h-10 w-10 text-primary" />,
    title: '2. Get Instant Analysis',
    description: 'Receive an AEO Score, a rewritten canonical answer, and a SERP preview.',
  },
  {
    icon: <Copy className="h-10 w-10 text-primary" />,
    title: '3. Optimize and Implement',
    description: 'Copy your optimized snippet and schema markup to implement on your website.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works in 3 Simple Steps</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Go from content to canonical answer in seconds.
          </p>
        </div>
        <motion.div
          className="relative mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="absolute left-1/2 top-10 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative flex flex-col items-center text-center md:flex-row md:text-left"
                variants={itemVariants}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:order-2'}`}
                >
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
                <div className="my-4 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-secondary shadow-md md:my-0">
                  {step.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
