
'use client';

import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">AnswerFirst</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/dashboard" className="hover:text-primary">Tool</Link>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AnswerFirst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
