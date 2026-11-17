import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Terminal, 
  Copy, 
  Check, 
  Smartphone, 
  TrendingUp, 
  Cpu, 
  Server,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  Icon3DCursor, 
  Icon3DFastAPI, 
  Icon3DPgBouncer, 
  Icon3DServerRack1k, 
  Icon3DCluster10k,
  Icon3DWhatsApp 
} from './Isometric3DIcons';

const Hero = () => {
  const [activeCockpit, setActiveCockpit] = useState('mvp');
  const [copied, setCopied] = useState(false);
  const [tickPrice, setTickPrice] = useState(24380.50);
  const [tickPoints, setTickPoints] = useState([40, 48, 45, 60, 58, 75, 70, 85, 92, 88, 105, 110]);

  // Live quant simulation ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 4.5;
      setTickPrice((prev) => +(prev + delta).toFixed(2));
      setTickPoints((prev) => {
        const next = [...prev.slice(1), Math.max(30, Math.min(130, prev[prev.length - 1] + (Math.random() - 0.45) * 12))];
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText('npx contextprune');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cockpitTabs = [
    { id: 'mvp', label: '0→1 MVP Engine', icon: Zap, speed: '7–14 Days', sub: 'Cursor → Prod' },
    { id: 'android', label: 'Native Android', icon: Smartphone, speed: '120 FPS', sub: 'Kotlin · Room' },
    { id: 'quant', label: 'Quant Terminal', icon: TrendingUp, speed: '< 10ms', sub: 'Binary Stream' },
    { id: 'ai', label: 'ContextPrune AST', icon: Cpu, speed: '-82.6%', sub: 'Token Optimizer' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#030508] bg-noise">
      {/* Cinematic Specular Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Status Capsule */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-950/40 border-t border-l border-white/20 border-b-2 border-emerald-900 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-xs font-mono text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-bold text-white tracking-wide uppercase">FiFTO Systems Studio</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold">Namakkal · Kongu TN</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 hidden sm:inline">Zero-AI Fluff Standard</span>
          </div>
        </div>

        {/* High-Fashion Awwwards Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
            We Don't Just Write Code. <br />
            <span className="font-serif italic font-normal text-emerald-400">We Architect </span>
            <span className="font-black tracking-tight text-white">Production Reality.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Rescuing fragile vibe-coded prototypes (Cursor, Lovable, v0) before they crash under load. Delivering production-grade Next.js, FastAPI backends, 100% native Android mobile apps, and sub-10ms quant execution pipelines in 7–14 days.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20want%20to%20discuss%20an%20engineering%20project%20with%20FiFTO."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-t border-l border-white/30 border-b-4 border-emerald-950 active:translate-y-0.5 shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3"
            >
              <Zap className="w-4 h-4 text-emerald-100" />
              <span>Launch 7–14 Day Sprint on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#auditor"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-slate-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border-t border-l border-white/15 border-b-4 border-black/80 shadow-lg transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Audit Your Prototype Stack</span>
            </a>
          </div>

          {/* Open-Source Command Pill */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-300 shadow-xl">
              <span className="text-emerald-400 font-bold">Featured Tool:</span>
              <span className="text-white">$ npx contextprune</span>
              <button
                onClick={copyCommand}
                className="p-1 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[11px] text-slate-400 border-l border-white/10 pl-3 hidden sm:inline">
                Cuts AST LLM context bills by 82.6%
              </span>
            </div>
          </div>
        </div>

        {/* Cinematic Live Studio Cockpit */}
        <div className="mt-16 max-w-5xl mx-auto awwwards-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Cockpit Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                Live Studio Cockpit · Active Telemetry
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cockpitTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeCockpit === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCockpit(tab.id)}
                    className={`px-3 py-2 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-emerald-950/50 border-t border-l border-emerald-400/50 border-b-2 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] font-bold truncate">{tab.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block mt-0.5">
                      {tab.speed}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Interactive Screen */}
          <div className="pt-6">
            <AnimatePresence mode="wait">
              {activeCockpit === 'mvp' && (
                <motion.div
                  key="mvp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                      Vibe Code Prototype Trap
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      80% Fast in Cursor, Lovable or v0 — <br />
                      <span className="text-rose-400">100% Broken on Day 2.</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Unpooled database connections crash under 50 simultaneous users. Server action roundtrips create 1.2s cold start stalls. Local state desync causes silent data corruption.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-rose-400 font-bold block">Latency: 1,420ms</span>
                        <span>Waterfall Cold Start</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-rose-400 font-bold block">DB Pool: Direct</span>
                        <span>Connection Exhaustion</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3 shadow-inner">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      FiFTO 7–14 Day Production Architecture
                    </span>
                    <ul className="space-y-2 text-xs text-slate-200">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>PgBouncer transaction pooling (50 safe max server conns)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>FastAPI async workers with Pydantic v2 strict schemas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Redis L2 read-caching (&lt; 2ms instantaneous hit time)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>p99 API Latency: Reduced to &lt; 35ms deterministic</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeCockpit === 'android' && (
                <motion.div
                  key="android"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                      100% Native Android Ecosystem
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Zero Webviews. Zero Stutter. <br />
                      <span className="text-cyan-400">Pure Kotlin & Compose at 120Hz.</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Powering the <strong>Vetri TNPSC</strong> learning ecosystem for civil services aspirants across Tamil Nadu. Offline-first SQLite Room database ensures students take full 200-question timed mock exams even in zero-network villages.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-cyan-400 font-bold block text-sm">120 FPS</span>
                        <span className="text-slate-400 text-[10px]">Render Rate</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-cyan-400 font-bold block text-sm">100%</span>
                        <span className="text-slate-400 text-[10px]">Offline Tests</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                        <span className="text-cyan-400 font-bold block text-sm">&lt; 12MB</span>
                        <span className="text-slate-400 text-[10px]">Lean APK</span>
                      </div>
                    </div>
                  </div>

                  {/* Smartphone Simulator Preview */}
                  <div className="flex justify-center">
                    <div className="w-56 h-80 rounded-[32px] bg-[#0c1218] p-3 border-4 border-slate-700 shadow-2xl relative flex flex-col justify-between">
                      <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />
                      <div className="flex-1 bg-[#05090e] rounded-2xl p-3 flex flex-col justify-between border border-white/10">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                            <span>Vetri TNPSC Mock</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <div className="p-2 rounded-lg bg-white/5 text-[9px] text-slate-300">
                            Q. 42: Directive Principles of State Policy Article?
                          </div>
                          <div className="space-y-1">
                            {['Part IV (Article 36-51)', 'Part III (Article 12-35)'].map((opt, i) => (
                              <div key={i} className={`p-1.5 rounded text-[8px] ${i === 0 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' : 'bg-white/5 text-slate-400'}`}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/80 text-[8px] font-mono text-emerald-400 flex justify-between">
                          <span>Room DB: Cached</span>
                          <span>Network: Offline</span>
                        </div>
                      </div>
                      <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCockpit === 'quant' && (
                <motion.div
                  key="quant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                      Low-Latency Quant Execution
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      524 Ticks/Sec Ingestion. <br />
                      <span className="text-emerald-400">&lt; 8.12ms Tick-to-Order Dispatch.</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Custom algorithmic trading pipeline ingesting live binary Protobuf market ticks from Zerodha Kite Connect & FYERS API v3 with automated OCO GTT limit execution and hardware circuit-breaker loss limits.
                    </p>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">NIFTY50 Spot:</span>
                      <span className="text-emerald-400 font-bold text-sm">₹{tickPrice.toLocaleString()}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">STREAMING</span>
                    </div>
                  </div>

                  {/* Real-time sparkline graph */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Binary Protobuf Parser</span>
                      <span className="text-emerald-400">Latency: 0.42ms</span>
                    </div>
                    {/* SVG Sparkline */}
                    <div className="h-28 w-full flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={tickPoints.map((val, idx) => `${idx * (200 / (tickPoints.length - 1))},${100 - (val / 140) * 100}`).join(' ')}
                        />
                      </svg>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                      <span>Broker: Zerodha Kite + FYERS</span>
                      <span className="text-emerald-400 font-bold">Risk Guardrails: LOCKED</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeCockpit === 'ai' && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                      Open-Source AI Infrastructure
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      ContextPrune (MCP) <br />
                      <span className="text-emerald-400">82.6% Token Bill Reduction.</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      AI coding agents burn thousands of dollars reading verbose function implementations. ContextPrune uses Tree-Sitter Abstract Syntax Trees (AST) to extract clean signatures, types, and schema boundaries before prompting LLMs.
                    </p>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Terminal Command:</span>
                      <span className="text-white font-bold">$ npx contextprune</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/5">
                      <span className="text-slate-400">AST Parser Metric</span>
                      <span className="text-emerald-400">Tree-Sitter v0.22</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Original Token Ingestion:</span>
                        <span className="text-rose-400 line-through">124,500 tokens</span>
                      </div>
                      <div className="flex justify-between text-white font-bold">
                        <span>Pruned Context Vector:</span>
                        <span className="text-emerald-400">21,660 tokens</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Monthly API Cost:</span>
                        <span className="text-emerald-300 font-bold">$324 vs $1,860 (-82.6%)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
