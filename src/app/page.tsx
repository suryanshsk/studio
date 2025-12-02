import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import ContentSection from '@/components/sections/content';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import CustomCursor from '@/components/ui/custom-cursor';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ContentSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
