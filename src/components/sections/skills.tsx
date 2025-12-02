'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Code, Server, Wand2, LucideProps } from 'lucide-react';
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
    title: 'AI / Agentic / Data',
    icon: BrainCircuit,
    skills: [
      { name: 'GenAI APIs (Gemini, GPT-like)' },
      { name: 'LangChain / Agent Workflows' },
      { name: 'AI Agents & Automation' },
      { name: 'TensorFlow, PyTorch (basic)' },
      { name: 'Scikit-learn, Pandas' },
    ],
  },
  {
    title: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React, Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS, Shadcn/ui' },
      { name: 'Framer Motion' },
      { name: 'HTML5, CSS3' },
    ],
  },
  {
    title: 'Backend & DevOps',
    icon: Server,
    skills: [
      { name: 'Node.js, Express' },
      { name: 'Python APIs' },
      { name: 'Firebase (Auth, Firestore)' },
      { name: 'PostgreSQL, MongoDB (basic)' },
      { name: 'CI/CD, Docker (basic)' },
    ],
  },
  {
    title: 'Tools & Content',
    icon: Wand2,
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Figma' },
      { name: 'Vercel, Netlify' },
      { name: 'Video Editing' },
      { name: 'Content Creation' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const SkillCard = ({ title, icon: Icon, skills }: SkillCategory) => (
  <motion.div variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
    <Card className="h-full bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="rounded-md bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill.name} variant="secondary" className="font-normal">
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={itemVariants} className="text-center font-headline text-3xl md:text-4xl font-bold mb-12">
          My Tech Arsenal
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillsData.map((category) => (
            <SkillCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
