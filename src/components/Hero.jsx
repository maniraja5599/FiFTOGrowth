import React, { useState } from 'react';
import { 
  Terminal, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code2, 
  Cpu, 
  Sparkles,
  Smartphone,
  Gauge,
  ArrowUpRight
} from 'lucide-react';

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npx contextprune');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = [
    { label: '0→1 MVP Launch', value: '7–14 Days', sub: 'Vibe Code → Production' },
    { label: 'Quant Execution Latency', value: '< 10ms', sub: 'Binary Protobuf Stream' },
    { label: 'AI Token Reduction', value: '82.6%', sub: 'Via ContextPrune MCP' },
    { label: 'Native Android Sync', value: '100% Offline', sub: 'Kotlin · Compose · Room' },
    { label: 'Cloud API Latency', value: '< 100ms', sub: 'PgBouncer + Redis L2' },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-rose-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-rose-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Operational Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner text-xs font-mono text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide uppercase">FiFTO Systems Lab</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Zero-AI Fluff · Pure Deterministic Systems</span>
          </div>
        </div>

        {/* Main Punchy Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            We Don't Just Write Code. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-rose-400">
              We Engineer Scalable, High-Dwell Production Systems.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Bridging the fatal gap between vibe-coded prototypes (Cursor, Lovable, v0) and deterministic production reality. Delivering full-stack web platforms, native Android apps, sub-10ms quant pipelines, and autonomous AI infrastructure in 7–14 days.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20have%20an%20MVP%2FSystem%20to%20build%20with%20FiFTO.%20Let%27s%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-emerald-400/40"
            >
              <Zap className="w-5 h-5 text-emerald-200" />
              <span>Start Your Build in 7–14 Days</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#auditor"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-base text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span>Audit Your Prototype Stack</span>
            </a>
          </div>

          {/* Interactive Open-Source MCP Quick Tag */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-300 shadow-lg">
              <span className="text-emerald-400 font-semibold">Open-Source Engine:</span>
              <span className="text-slate-100">$ npx contextprune</span>
              <button
                onClick={copyCommand}
                className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors"
                title="Copy terminal command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[11px] text-slate-400 border-l border-white/10 pl-3 hidden sm:inline">
                Cuts AST LLM context bills by 82.6%
              </span>
            </div>
          </div>
        </div>

        {/* Hard Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
          {metrics.map((m, idx) => (
            <div 
              key={m.label} 
              className={`fifto-glass p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1">
                {m.label}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {m.value}
              </div>
              <span className="text-xs text-slate-400 mt-2 font-medium">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
