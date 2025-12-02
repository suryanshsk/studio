'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li variants={itemVariants} className="flex items-start gap-3">
    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
    <span className="text-muted-foreground">{children}</span>
  </motion.li>
);

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 variants={itemVariants} className="text-center font-headline text-3xl md:text-4xl font-bold mb-12">
          About Me
        </motion.h2>

        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-md">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-foreground/90">
                  I'm an AI engineer and full-stack web developer passionate about building intelligent, agentic systems and beautiful, user-centric interfaces. My expertise lies at the intersection of generative AI and modern web technologies, where I focus on shipping practical, production-ready applications.
                </p>
                <p className="text-foreground/90">
                  As a content creator, I enjoy breaking down complex topics in AI, coding, and career growth for a growing audience on social media, sharing my learnings and projects along the way.
                </p>
                <p className="text-muted-foreground text-sm">
                  Highlights: AI automation, developer tools, and hackathon projects.
                </p>
              </motion.div>

              <div className="space-y-4">
                <h3 className="font-headline text-xl font-semibold text-primary">What I do</h3>
                <ul className="space-y-3">
                  <ListItem>Build agentic AI assistants for voice, legal, support, and coding.</ListItem>
                  <ListItem>Design and develop full-stack web applications with modern, clean UX.</ListItem>
                  <ListItem>Create engaging content (shorts, carousels, posts) on AI, development, and productivity.</ListItem>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
