import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InteractiveTerminal from '../components/InteractiveTerminal';
import EngineeringPillars from '../components/EngineeringPillars';
import ArchitectureLab from '../components/ArchitectureLab';
import PrototypeAuditor from '../components/PrototypeAuditor';
import FeaturedSystems from '../components/FeaturedSystems';
import AboutManiRaja from '../components/AboutManiRaja';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <InteractiveTerminal />
        <EngineeringPillars />
        <ArchitectureLab />
        <PrototypeAuditor />
        <FeaturedSystems />
        <AboutManiRaja />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
