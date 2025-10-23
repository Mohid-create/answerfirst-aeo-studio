import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="text-lg">AnswerFirst</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/blog">Blog</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact">Contact</Link>
        </Button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
