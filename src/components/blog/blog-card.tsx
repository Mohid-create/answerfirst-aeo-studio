'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { type Blog } from '@/lib/blog-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type BlogCardProps = {
  post: Blog;
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function BlogCard({ post }: BlogCardProps) {
  const placeholderImage = PlaceHolderImages.find(img => img.imageUrl === post.imageUrl);

  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
    >
      <Card className="flex h-full transform flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholderImage?.imageHint}
              loading="lazy"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <CardTitle className="text-xl">
            <Link href={`/blog/${post.slug}`} className="hover:text-primary">
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">{post.excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-end p-6 pt-0 text-sm text-muted-foreground">
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary hover:underline">
            Read More <ArrowUpRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
