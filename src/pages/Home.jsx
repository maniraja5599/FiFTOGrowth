import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InteractiveTerminal from '../components/InteractiveTerminal';
import InteractiveBentoGrid from '../components/InteractiveBentoGrid';
import EngineeringPillars from '../components/EngineeringPillars';
import ArchitectureLab from '../components/ArchitectureLab';
import PrototypeAuditor from '../components/PrototypeAuditor';
import FeaturedSystems from '../components/FeaturedSystems';
import AboutManiRaja from '../components/AboutManiRaja';
import SprintConfigurator from '../components/SprintConfigurator';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <Hero />
        <InteractiveTerminal />
        <InteractiveBentoGrid />
        <EngineeringPillars />
        <ArchitectureLab />
        <PrototypeAuditor />
        <FeaturedSystems />
        <AboutManiRaja />
        <SprintConfigurator />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
