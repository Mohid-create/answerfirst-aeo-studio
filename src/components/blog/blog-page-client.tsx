'use client';

import { motion } from 'framer-motion';
import { mockBlogs } from '@/lib/blog-data';
import { BlogCard } from '@/components/blog/blog-card';

export function BlogPageClient() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    The AnswerFirst Blog
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Insights on AEO, SEO, and creating content that gets answered.
                </p>
            </motion.div>

            <motion.div
                className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {mockBlogs.map(post => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </motion.div>
        </div>
    );
}
