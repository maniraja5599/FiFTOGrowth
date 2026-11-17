import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Terminal, 
  ArrowUpRight,
  Code2,
  Cpu,
  Flame
} from 'lucide-react';

const AboutManiRaja = () => {
  return (
    <section id="founder" className="py-24 relative bg-[#05070c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="fifto-glass p-8 sm:p-12 lg:p-16 rounded-3xl relative overflow-hidden border-white/10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Bio & Ethos (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Namakkal, Tamil Nadu, India</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Built by Builders, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-rose-400">
                  Not Slide Presenters.
                </span>
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I'm <strong className="text-white font-bold">Mani Raja</strong>, Founder of FiFTO. We build software that holds up when real users hit it.
                </p>
                <p>
                  Too many startups pay big agencies tens of thousands of dollars only to receive fragile templates wrapped in corporate buzzwords. When their WebSocket chokes under 500 ticks/sec or un-cached PostgreSQL queries bring down their server, they get excuses.
                </p>
                <p className="border-l-2 border-emerald-400 pl-4 italic text-slate-200 py-1">
                  "At FiFTO, we measure everything in deterministic numbers: sub-10ms quant execution, sub-100ms API latency, 82.6% token bill reduction, and 100% offline-first native mobile sync. If it doesn't withstand production load, it doesn't leave our desk."
                </p>
              </div>

              {/* Direct Founder Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400 block">7–14 Day Delivery</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">0→1 MVPs Shipped</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400 block">Direct Founder Call</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">Zero Middlemen</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400 block">Tamil & English</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">Kongu-TN · Global</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20want%20to%20discuss%20a%20project%20directly%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: +91 83000 30123</span>
                </a>

                <a
                  href="mailto:manirajankg@gmail.com"
                  className="px-5 py-3 rounded-xl font-bold text-xs text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>manirajankg@gmail.com</span>
                </a>
              </div>

            </div>

            {/* Right Card (5 Columns) */}
            <div className="lg:col-span-5 fifto-glass p-6 sm:p-8 rounded-2xl border-white/10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-rose-600 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-[#070b12] rounded-2xl flex items-center justify-center font-display text-white text-2xl font-black">
                    MR
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Mani Raja</h3>
                  <span className="text-xs font-mono text-emerald-400 font-semibold block">Founder & Systems Architect @ FiFTO</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Namakkal, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Specialization:</span>
                  <span className="text-white font-mono font-medium">Full-Stack & Quant Systems</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Primary Languages:</span>
                  <span className="text-white font-mono font-medium">TypeScript · Python · Kotlin</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Core Frameworks:</span>
                  <span className="text-white font-mono font-medium">Next.js · FastAPI · Compose</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Open-Source:</span>
                  <span className="text-emerald-400 font-mono font-medium">contextprune (MCP)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Official Channels:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <a
                    href="https://www.linkedin.com/company/fifto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn (FiFTO)</span>
                  </a>
                  <a
                    href="https://github.com/maniraja5599"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-200" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutManiRaja;
