import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const SocialLink = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
    <Icon className="h-6 w-6" />
  </Link>
);

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-headline font-semibold text-primary">Avanish.AI</h3>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Avanish.AI. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <SocialLink href="https://github.com" icon={Github} />
            <SocialLink href="https://linkedin.com" icon={Linkedin} />
            <SocialLink href="https://twitter.com" icon={Twitter} />
          </div>
        </div>
      </div>
    </footer>
  );
}
