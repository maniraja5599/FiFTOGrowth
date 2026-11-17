import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  MessageSquare, 
  Menu, 
  X, 
  Activity,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Architecture Bento', href: '#bento' },
    { name: 'Pillars', href: '#pillars' },
    { name: '3D Auditor', href: '#auditor' },
    { name: 'Proven Systems', href: '#systems' },
    { name: 'Founder Manifesto', href: '#manifesto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled 
          ? 'bg-[#05080c]/85 backdrop-blur-2xl border-t border-l border-white/15 border-b border-black/80 shadow-[0_15px_35px_rgba(0,0,0,0.8)] py-2.5 px-5' 
          : 'bg-black/30 backdrop-blur-md border border-white/10 py-3.5 px-6'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 via-[#030508] to-rose-500/20 p-0.5 border border-white/20 shadow-md group-hover:border-emerald-400 transition-colors overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="FiFTO Logo" 
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#030508] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-wider text-2xl text-white font-black group-hover:text-emerald-400 transition-colors">
                  FIFTO
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  Studio
                </span>
              </div>
              <span className="text-[10px] font-outfit text-slate-400 font-medium tracking-tight">
                <span className="text-emerald-400 font-semibold">Your Trusted</span> <span className="text-rose-400 font-semibold">Growth Partner</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Namakkal · TN</span>
            </div>

            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20saw%20the%20FiFTO%20website%20and%20want%20to%20discuss%20an%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-t border-l border-white/30 border-b-2 border-emerald-950 shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-100" />
              <span>Talk to Mani</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/[0.05] hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20saw%20the%20FiFTO%20website%20and%20want%20to%20discuss%20an%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp (+91 83000 30123)</span>
            </a>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
