import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialLink = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
    <Icon className="h-6 w-6" />
  </Link>
);

export default function HeroSection() {
  return (
    <section id="home" className="relative h-dvh min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline tracking-tighter">
          Avanish
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-shine bg-[length:200%_auto]">.AI</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Agentic AI Engineer &middot; Web Developer &middot; Content Creator
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
          I design and build agentic, AI-first systems — from voice assistants and legal AI to autonomous coding agents — along with beautiful, production-ready web experiences.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <SocialLink href="https://github.com" icon={Github} />
          <SocialLink href="https://linkedin.com" icon={Linkedin} />
          <SocialLink href="https://twitter.com" icon={Twitter} />
        </div>
      </div>
    </section>
  );
}
