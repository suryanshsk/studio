'use client';

import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-read';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

export default function ContentSection() {
  return (
    <motion.section
      id="content"
      className="py-16 md:py-24 bg-secondary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 variants={itemVariants} className="text-center font-headline text-3xl md:text-4xl font-bold mb-4">
          Content &amp; Community
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I create content on Instagram and other platforms about AI, coding, dev tools, and student/early-career growth.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8">
                <h3 className="font-headline text-xl font-semibold mb-4">Types of Content I Create</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">Tutorials &amp; Mini Case-Studies</li>
                  <li className="flex items-center gap-2">Engaging Reels &amp; Coding Tips</li>
                  <li className="flex items-center gap-2">Business &amp; AI Breakdowns</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-6">
                  Interested in collaborating? I'm open to working with brands, startups, and communities.
                </p>
              </div>
              <div className="p-8 border-t md:border-t-0 md:border-l border-border/50">
                 <Card className="bg-background/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Instagram className="w-6 h-6 text-primary" />
                            Follow Me on Instagram
                        </CardTitle>
                        <CardDescription>
                            Follow my builds &amp; behind-the-scenes content on my journey as an AI Engineer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="https://www.instagram.com/suryanshsk/" target="_blank" rel="noopener noreferrer">
                                @suryanshsk <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                 </Card>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
