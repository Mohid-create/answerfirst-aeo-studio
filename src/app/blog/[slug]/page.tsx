'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Header } from '@/components/dashboard/header';
import { Footer } from '@/components/landing/footer';
import { mockBlogs, type Blog } from '@/lib/blog-data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';

// This is a mock data fetching function.
// In a real app, you would fetch this from a database like Firestore.
const getPostBySlug = (slug: string): Blog | undefined => {
  return mockBlogs.find(post => post.slug === slug);
};

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null | undefined>(undefined);

  useEffect(() => {
    if (params.slug) {
      const foundPost = getPostBySlug(params.slug);
      setPost(foundPost);
    }
  }, [params.slug]);

  if (post === undefined) {
    // Still loading
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 animate-pulse">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="h-12 w-3/4 rounded-md bg-muted"></div>
            <div className="mt-8 h-96 w-full rounded-lg bg-muted"></div>
            <div className="prose prose-lg mx-auto mt-12 max-w-none dark:prose-invert">
              <div className="space-y-4">
                <div className="h-6 rounded-md bg-muted"></div>
                <div className="h-6 w-5/6 rounded-md bg-muted"></div>
                <div className="h-6 w-3/4 rounded-md bg-muted"></div>
                <div className="h-6 w-5/6 rounded-md bg-muted"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (post === null) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <motion.article
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {post.title}
              </h1>
            </header>

            <motion.div
              className="relative mt-8 h-96 w-full overflow-hidden rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                loading="lazy"
              />
            </motion.div>

            <div
              className="prose prose-lg mx-auto mt-12 max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
}