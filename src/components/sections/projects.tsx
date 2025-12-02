'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const agenticProjectsData = [
  {
    id: 'ops-agent',
    title: 'AI Business Operations Agent',
    description: 'Agent workflow that reads invoices and business files, summarizes daily operations, highlights overdue payments, and drafts client follow-up emails automatically.',
    tags: ['Python', 'Gemini / GenAI', 'Pandas', 'pdfplumber', 'Gradio', 'Agentic Workflow'],
    link: 'https://colab.research.google.com/drive/1QlVivsBq1UcaKmsUFC8hW62CqGs50pW1?usp=sharing',
    external: true,
  },
  {
    id: 'support-agent',
    title: 'AI Customer Support Voice Agent',
    description: 'Multimodal support agent that listens to voice, reads images/screenshots, matches FAQs, answers queries, and auto-creates prioritized support tickets with TTS responses.',
    tags: ['Python', 'GenAI', 'Gradio', 'STT/TTS', 'FAQ RAG', 'Ticketing'],
    link: 'https://colab.research.google.com/drive/1k1UfH_8rTT5EcHXFU32hBvzzOsD39Tmu?usp=sharing',
    external: true,
  },
  {
    id: 'legal-agent',
    title: 'AI Legal Document Understanding Agent',
    description: 'Legal AI assistant that analyzes contracts, extracts key clauses, highlights risk, suggests revisions, flags missing protections, and supports interactive Q&A.',
    tags: ['Python', 'GenAI', 'pdfplumber', 'python-docx', 'Gradio', 'Legal AI'],
    link: 'https://colab.research.google.com/drive/1aHfB5eFww3oHlHOItC1THw44LZNx7FHA?usp=sharing',
    external: true,
  },
  {
    id: 'devin-agent',
    title: 'Devin-like Agentic Engineer (Lite)',
    description: 'Mini autonomous coding agent that plans a project, writes code files, runs tests, auto-fixes simple errors, and packages a deploy-ready bundle for Netlify.',
    tags: ['Python', 'GenAI', 'Gradio', 'Code Generation', 'Agentic Workflow'],
    link: 'https://colab.research.google.com/drive/13Neo3MqZX5rF221EdZsh8R2kMOn72b7h?usp=sharing',
    external: true,
  },
];

const webProjectsData = [
  {
    id: 'cognova',
    title: 'Cognova – AI Voice Assistant',
    description: 'A web-based AI voice assistant that uses generative AI, speech recognition, and real-time responses to answer questions and perform tasks in the browser.',
    tags: ['GenAI', 'Next.js', 'Firebase', 'MediaRecorder API'],
    link: '/cognova',
    external: false,
  },
  {
    id: 'code-assistant',
    title: 'AI Code Assistant',
    description: 'An AI-powered tool that analyzes GitHub repositories and suggests context-aware code snippets to assist developers.',
    tags: ['GenAI', 'Next.js', 'GitHub API', 'Server Actions'],
    link: '/code-assistant',
    external: false,
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'This very website, designed and built with Next.js, TypeScript, Tailwind CSS, and Framer Motion to showcase my work as an AI engineer and creator.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/suryanshsk/personal-portfolio',
    external: true,
  },
];

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  external: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const ProjectCard = ({ project, isAdvanced }: { project: Project; isAdvanced?: boolean }) => (
  <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }}>
    <Card
      className={cn(
        'group flex h-full flex-col overflow-hidden bg-card/50 transition-all duration-300',
        isAdvanced
          ? 'premium-card-border shadow-lg shadow-primary/10 hover:shadow-primary/20'
          : 'border-border/50 hover:border-accent/80 hover:shadow-lg hover:shadow-accent/10'
      )}
    >
      <CardHeader>
        <CardTitle className="font-headline group-hover:text-primary">{project.title}</CardTitle>
        {isAdvanced && <Badge className="absolute right-4 top-4 w-fit" variant="default">Advanced · Agentic AI</Badge>}
        <CardDescription className="pt-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant={isAdvanced ? 'default' : 'secondary'} className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className={cn('p-0 text-sm', isAdvanced ? 'text-primary' : 'text-accent')}>
          <Link href={project.link} target={project.external ? '_blank' : '_self'} rel={project.external ? 'noopener noreferrer' : ''}>
            {project.external ? (project.id === 'portfolio' ? 'View Source Code' : 'Open Colab Notebook') : 'View Live Demo'}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h3
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="mb-8 font-headline text-2xl font-bold md:text-3xl"
  >
    {children}
  </motion.h3>
);

export default function ProjectsSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.section
      id="projects"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mb-12 text-center font-headline text-3xl font-bold md:text-4xl"
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-16">
          <div>
            <SectionHeading>Agentic AI Systems</SectionHeading>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {agenticProjectsData.map((project) => (
                <ProjectCard key={project.id} project={project} isAdvanced />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading>Web &amp; Product Builds</SectionHeading>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {webProjectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
