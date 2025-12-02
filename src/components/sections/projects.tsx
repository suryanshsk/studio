import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const projectsData = [
  {
    id: 'cognova',
    title: 'Cognova - AI Voice Assistant',
    description: 'An intelligent voice assistant capable of understanding and responding to complex queries in natural language.',
    image: PlaceHolderImages.find(p => p.id === 'project_cognova'),
    tags: ['GenAI', 'Next.js', 'Firebase', 'MediaRecorder API'],
    link: '#cognova',
  },
  {
    id: 'code-assistant',
    title: 'AI Code Assistant',
    description: 'A tool that leverages generative AI to analyze GitHub repositories and suggest relevant code snippets.',
    image: PlaceHolderImages.find(p => p.id === 'project_code_assistant'),
    tags: ['GenAI', 'Next.js', 'GitHub API', 'Server Actions'],
    link: '#code-assistant',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'A responsive and performant personal website built with Next.js and Tailwind CSS, showcasing my skills and projects.',
    image: PlaceHolderImages.find(p => p.id === 'project_portfolio_site'),
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'],
    link: '#',
  },
];

const ProjectCard = ({ project }: { project: typeof projectsData[0] }) => (
  <Card className="group overflow-hidden flex flex-col bg-card/50 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
    {project.image && (
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image.imageUrl}
          alt={project.image.description}
          data-ai-hint={project.image.imageHint}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <CardHeader>
      <CardTitle className="font-headline">{project.title}</CardTitle>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="link" className="text-accent p-0 hover:text-accent/80">
        <Link href={project.link}>
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A glimpse into my passion for building and creating.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
