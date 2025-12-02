'use client';

import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

const SocialLink = ({ href, icon: Icon, 'aria-label': ariaLabel }: { href: string; icon: React.ElementType; 'aria-label': string }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-muted-foreground transition-colors hover:text-primary">
    <Icon className="h-6 w-6" />
  </Link>
);

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Avanish.AI. Built with love, AI, and way too much chai.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <SocialLink href="https://www.linkedin.com/in/avanishsinghengineer/" icon={Linkedin} aria-label="LinkedIn" />
            <SocialLink href="https://github.com/suryanshsk" icon={Github} aria-label="GitHub" />
            <SocialLink href="https://www.instagram.com/suryanshsk/" icon={Instagram} aria-label="Instagram" />
            <SocialLink href="mailto:suryanshskcontact@gmail.com" icon={Mail} aria-label="Email" />
          </div>
        </div>
      </div>
    </footer>
  );
}
