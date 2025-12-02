import { BrainCircuit, Code, Database, Hammer, LucideProps } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Skill = { name: string };
type SkillCategory = {
  title: string;
  icon: React.ElementType<LucideProps>;
  skills: Skill[];
};

const skillsData: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Vue.js' },
      { name: 'HTML5 & CSS3' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    skills: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Express' },
      { name: 'Firebase' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
    ],
  },
  {
    title: 'AI/ML/Data',
    icon: BrainCircuit,
    skills: [
      { name: 'TensorFlow' },
      { name: 'PyTorch' },
      { name: 'Scikit-learn' },
      { name: 'Pandas' },
      { name: 'GenAI APIs' },
      { name: 'LangChain' },
    ],
  },
  {
    title: 'Other Tools',
    icon: Hammer,
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Figma' },
      { name: 'Vercel' },
      { name: 'AWS' },
    ],
  },
];

const SkillCard = ({ title, icon: Icon, skills }: SkillCategory) => (
  <Card className="bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="p-3 rounded-md bg-primary/10">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.name} variant="secondary" className="font-normal">{skill.name}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">My Tech Arsenal</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A collection of tools and technologies I use to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category) => (
            <SkillCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
