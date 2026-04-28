import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import SkillsSection from "@/components/public/SkillsSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import ServicesSection from "@/components/public/ServicesSection";
import ExperienceSection from "@/components/public/ExperienceSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
}
