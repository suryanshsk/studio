'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialLink = ({ href, icon: Icon, 'aria-label': ariaLabel }: { href: string; icon: React.ElementType; 'aria-label': string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-muted-foreground transition-colors hover:text-primary"
    whileHover={{ scale: 1.2, rotate: -15 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="h-7 w-7" />
  </motion.a>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="home" className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 flex flex-col-reverse items-center gap-12 px-4 py-20 text-center md:flex-row md:text-left"
      >
        <div className="flex-1">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Avanish Singh
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-3 text-lg font-medium text-primary">
            Agentic &amp; Multimodal AI Engineer · Full Stack Web Developer · Content Creator
          </motion.p>
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg text-muted-foreground">
            I build intelligent AI systems and craft beautiful, high-performance web experiences from concept to production.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <Button asChild size="lg">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Let's Collaborate</Link>
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-8 md:justify-start">
            <SocialLink href="https://www.linkedin.com/in/avanishsinghengineer/" icon={Linkedin} aria-label="LinkedIn" />
            <SocialLink href="https://github.com/suryanshsk" icon={Github} aria-label="GitHub" />
            <SocialLink href="https://www.instagram.com/suryanshsk/" icon={Instagram} aria-label="Instagram" />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative flex-shrink-0">
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative h-48 w-48 md:h-64 md:w-64"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-xl animate-pulse" />
            <Image
              src="https://instagram.fdel3-4.fna.fbcdn.net/v/t51.2885-19/499791407_18356727838194438_4860837939287100456_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel3-4.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QFjv8I--X8XK1X-fafYE7RNaKOXRVnbReeXo1DOqykepCQPVzDsqf40RZPBi8daxr1ZHjPAO-iDj1aI9iGxpKc_&_nc_ohc=zW9U4qSpvWYQ7kNvwEnJ_ds&_nc_gid=8urt1d8Xev56-4iMf1GKVw&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AfmwyZPDZKdfF7_Xp1Bcv__fqWmUrEps-qWowsoNm-B2GA&oe=69355721&_nc_sid=22de04"
              alt="Avanish Singh"
              width={256}
              height={256}
              className="relative rounded-full border-4 border-background/50 object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
