import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile_picture');

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur-md">
          <div className="grid md:grid-cols-3 items-center">
            <div className="md:col-span-2 p-8 md:p-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate AI Engineer and Web Developer with a knack for turning complex problems into elegant, intelligent solutions. My journey in tech is driven by combining AI and full-stack web development to ship real, usable tools.
                </p>
                <p>
                  I specialize in building agentic, multimodal AI systems. My recent work includes AI business operations automation, legal contract analysis, voice-based customer support agents, and a Devin-like autonomous coding agent.
                </p>
                <p>
                  Whether I'm architecting an autonomous agent, training a neural network, or crafting a pixel-perfect UI, I bring a commitment to excellence and a creative spark to every project. Let's build something amazing together.
                </p>
              </div>
            </div>
            {profileImage && (
              <div className="relative h-64 md:h-full w-full">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  data-ai-hint={profileImage.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
