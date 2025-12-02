import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const agenticProjectsData = [
  {
    id: 'ops-agent',
    title: 'AI Business Operations Agent',
    description: 'An AI agent that reads business documents, analyzes invoices, generates daily ops reports, and drafts client follow-up emails.',
    image: PlaceHolderImages.find(p => p.id === 'project_ops_agent'),
    tags: ['Python', 'Gemini / GenAI APIs', 'Pandas', 'pdfplumber', 'Gradio', 'Agentic Workflow'],
    link: 'https://colab.research.google.com/drive/1QlVivsBq1UcaKmsUFC8hW62CqGs50pW1?usp=sharing',
    external: true,
  },
  {
    id: 'support-agent',
    title: 'AI Customer Support Voice Agent',
    description: 'A multimodal voice-first support agent that listens, understands, answers, and creates support tickets automatically.',
    image: PlaceHolderImages.find(p => p.id === 'project_support_agent'),
    tags: ['Python', 'Gemini / GenAI', 'Gradio', 'STT / TTS', 'FAQ RAG', 'Ticketing Logic'],
    link: 'https://colab.research.google.com/drive/1k1UfH_8rTT5EcHXFU32hBvzzOsD39Tmu?usp=sharing',
    external: true,
  },
  {
    id: 'legal-agent',
    title: 'AI Legal Document Understanding Agent',
    description: 'An AI assistant that reviews contracts, highlights risks, suggests revisions, and answers legal-style questions.',
    image: PlaceHolderImages.find(p => p.id === 'project_legal_agent'),
    tags: ['Python', 'Gemini / GenAI', 'pdfplumber', 'python-docx', 'Gradio', 'Legal AI', 'Structured JSON'],
    link: 'https://colab.research.google.com/drive/1aHfB5eFww3oHlHOItC1THw44LZNx7FHA?usp=sharing',
    external: true,
  },
  {
    id: 'devin-agent',
    title: 'Devin-like Agentic Engineer (Lite)',
    description: 'A mini autonomous software engineer that plans, writes, runs, and fixes code, then packages it for deployment.',
    image: PlaceHolderImages.find(p => p.id === 'project_devin_agent'),
    tags: ['Python', 'Gemini / GenAI', 'Gradio', 'Agentic Workflow', 'Code Generation', 'Automation'],
    link: 'https://colab.research.google.com/drive/13Neo3MqZX5rF221EdZsh8R2kMOn72b7h?usp=sharing',
    external: true,
  },
];

const webProjectsData = [
  {
    id: 'cognova',
    title: 'Cognova - AI Voice Assistant',
    description: 'A web-based voice assistant using Next.js and GenAI, supporting real-time transcription and intelligent responses.',
    image: PlaceHolderImages.find(p => p.id === 'project_cognova'),
    tags: ['GenAI', 'Next.js', 'Firebase', 'MediaRecorder API'],
    link: '#cognova',
    external: false,
  },
  {
    id: 'code-assistant',
    title: 'AI Code Assistant',
    description: 'Connects to GitHub repos to analyze code context and suggest relevant snippets using generative AI.',
    image: PlaceHolderImages.find(p => p.id === 'project_code_assistant'),
    tags: ['GenAI', 'Next.js', 'GitHub API', 'Server Actions'],
    link: '#code-assistant',
    external: false,
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'The site you are on right now, built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.',
    image: PlaceHolderImages.find(p => p.id === 'project_portfolio_site'),
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'],
    link: '#',
    external: false,
  },
];

type Project = {
  id: string;
  title: string;
  description: string;
  image: (typeof PlaceHolderImages)[0] | undefined;
  tags: string[];
  link: string;
  external: boolean;
};


const ProjectCard = ({ project, isAdvanced }: { project: Project; isAdvanced?: boolean }) => (
  <Card className={cn(
    "group overflow-hidden flex flex-col bg-card/50 transition-all duration-300 hover:shadow-xl",
    isAdvanced 
      ? "border-primary/50 hover:border-primary hover:shadow-primary/20"
      : "hover:border-accent/50 hover:shadow-accent/10"
  )}>
    {project.image && (
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image.imageUrl}
          alt={project.image.description}
          data-ai-hint={project.image.imageHint}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
         {isAdvanced && <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />}
      </div>
    )}
    <CardHeader>
      <CardTitle className="font-headline">{project.title}</CardTitle>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant={isAdvanced ? "default" : "secondary"} className="font-normal">{tag}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="link" className={cn("p-0", isAdvanced ? "text-primary hover:text-primary/80" : "text-accent hover:text-accent/80")}>
        <Link href={project.link} target={project.external ? "_blank" : "_self"} rel={project.external ? "noopener noreferrer" : ""}>
          {project.external ? 'View Notebook' : 'View Details'} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const SectionSubheading = ({ title, badgeText }: { title: string, badgeText?: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <h3 className="font-headline text-2xl md:text-3xl font-bold">{title}</h3>
    {badgeText && <Badge className="bg-primary text-primary-foreground text-sm">{badgeText}</Badge>}
  </div>
)

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A glimpse into my passion for building and creating.</p>
        </div>

        <div className="space-y-16">
          <div>
            <SectionSubheading title="Agentic AI Systems" badgeText="Advanced" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agenticProjectsData.map((project) => (
                <ProjectCard key={project.id} project={project} isAdvanced />
              ))}
            </div>
          </div>

          <div>
             <SectionSubheading title="Web &amp; Product Builds" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webProjectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
