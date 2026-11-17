import React from 'react';
import { 
  Terminal, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Github, 
  Linkedin, 
  ArrowUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030508] border-t border-white/[0.08] text-slate-400 text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-black to-rose-500/20 p-0.5 border border-white/10 overflow-hidden shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="FiFTO Logo" 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-display tracking-wider text-2xl text-white font-black">
                  FIFTO
                </span>
                <span className="block text-xs font-outfit">
                  <span className="text-emerald-400 font-semibold">Your Trusted</span> <span className="text-rose-400 font-semibold">Growth Partner</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              High-performance engineering studio. We turn fragile vibe-coded prototypes into production-grade Next.js, FastAPI, and native Android systems in 7–14 days.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Namakkal, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
              Core Pillars
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">0→1 MVPs (7–14 Days)</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">Native Android Compose</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">Sub-10ms Quant Systems</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">Sub-100ms Cloud APIs</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">ContextPrune AI Engine</a></li>
            </ul>
          </div>

          {/* Systems Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
              Proven Systems
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="https://github.com/maniraja5599/contextprune" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">ContextPrune (MCP)</a></li>
              <li><a href="#systems" className="hover:text-emerald-400 transition-colors">Vetri TNPSC Android</a></li>
              <li><a href="https://drillrig.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">DrillRig CRM (drillrig.in)</a></li>
              <li><a href="#systems" className="hover:text-emerald-400 transition-colors">FiFTO Quant Terminal</a></li>
              <li><a href="#auditor" className="hover:text-emerald-400 transition-colors">Prototype Auditor</a></li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block">
              Direct Contact
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="https://wa.me/918300030123" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>+91 83000 30123</span>
                </a>
              </li>
              <li>
                <a href="mailto:manirajankg@gmail.com" className="text-slate-300 hover:text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>manirajankg@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/fifto/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn · FiFTO</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/maniraja5599" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub · maniraja5599</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FiFTO. All rights reserved.</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400/80 font-mono">Zero-AI Fluff Standard</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Founder: Mani Raja (Namakkal, TN)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
