'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/theme-toggle';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#content', label: 'Content' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-sm font-medium transition-colors text-foreground/70 hover:text-foreground/90"
    >
      {label}
    </Link>
  );

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? 'hsl(var(--background) / 0.8)'
          : 'hsl(var(--background) / 0)',
        borderColor: isScrolled
          ? 'hsl(var(--border))'
          : 'hsl(var(--border) / 0)',
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="#home" className="text-xl font-bold text-primary">
          Avanish.AI
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <nav className="flex flex-col items-center gap-4 border-t border-border bg-background/95 p-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  {...link}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
              <ThemeToggle />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
