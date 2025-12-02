import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ProjectsSection from '@/components/sections/projects';
import CognovaSection from '@/components/sections/cognova';
import CodeAssistantSection from '@/components/sections/code-assistant';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CognovaSection />
        <CodeAssistantSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
