'use client';

import { motion } from 'framer-motion';
import { SearchCheck, Bot, Code, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <SearchCheck className="h-8 w-8 text-primary" />,
    title: 'AEO Scoring System',
    description: 'Predict your snippet’s AI-readiness score with our in-depth analysis.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Smart Rewrite Engine',
    description: 'Generate concise, AI-friendly answers instantly to improve your chances.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Schema Generator',
    description: 'Auto-create JSON-LD for FAQ, HowTo, and QAPage to improve SERP appearance.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Competitor Insights',
    description: 'Compare your snippet against top-ranking results and find optimization gaps.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export function FeaturesSection() {
  return (
    <section id="features" className="bg-secondary/50 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Win the Answer Box
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our tool gives you the data and insights to craft content that AI and search engines love to feature.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
