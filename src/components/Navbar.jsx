import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare, 
  ArrowUpRight,
  Menu,
  X,
  Layers,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Core Pillars', href: '#pillars' },
    { name: 'Architecture Lab', href: '#architecture' },
    { name: 'Prototype Auditor', href: '#auditor' },
    { name: 'Proven Systems', href: '#systems' },
    { name: 'Founder & Ethos', href: '#founder' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#05070c]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Tagline */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-black to-rose-500/20 p-0.5 border border-white/10 group-hover:border-emerald-500/50 transition-colors shadow-lg shadow-black/50 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="FiFTO Logo" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-emerald-950 items-center justify-center font-display text-white text-lg font-bold">
                  F
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#05070c] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-wider text-2xl text-white font-black group-hover:text-emerald-400 transition-colors">
                  FIFTO
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Systems Studio
                </span>
              </div>
              <span className="text-[11px] font-outfit text-slate-400 font-medium tracking-tight">
                <span className="text-emerald-400">Your Trusted</span> <span className="text-rose-400">Growth Partner</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-emerald-400 after:to-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Namakkal · Tamil Nadu</span>
            </div>

            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20saw%20the%20FiFTO%20website%20and%20want%20to%20discuss%20an%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 border border-emerald-400/30"
            >
              <MessageSquare className="w-4 h-4 text-emerald-100" />
              <span>Talk to Mani</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e17] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/[0.05] hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20saw%20the%20FiFTO%20website%20and%20want%20to%20discuss%20an%20engineering%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp (+91 83000 30123)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
