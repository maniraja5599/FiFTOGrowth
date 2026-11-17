import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Smartphone, 
  TrendingUp, 
  Server, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Zap,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  Icon3DCursor,
  Icon3DFastAPI,
  Icon3DServerRack1k,
  Icon3DPgBouncer,
  Icon3DCluster10k,
  Icon3DShieldBolt,
  Icon3DWarningPrism
} from './Isometric3DIcons';

const EngineeringPillars = () => {
  const pillars = [
    {
      id: 'mvp',
      number: '01',
      title: '0→1 MVPs Shipped in 7–14 Days',
      tagline: 'The Anti-Vibe-Code Rescue Engine',
      icon3D: Icon3DCursor,
      accentColor: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      problem: 'Founders vibe-code to 80% on Cursor, Lovable or v0, then hit the day-2 production wall: state desync, unindexed database queries, memory leaks, and broken authentication.',
      solution: 'We take your vibe-coded prototype and transform it into a battle-tested, secure, production-grade architecture delivered in 7 to 14 days flat.',
      deliverables: [
        'Deterministic Next.js / FastAPI full-stack architecture',
        'PostgreSQL with strict migrations & PgBouncer pooling',
        'Production Auth (OAuth, JWT, RBAC) & rate-limiting',
        'Docker containerization & Netlify/Vercel/Cloudflare CI/CD'
      ],
      techBadge: 'Next.js 15 · FastAPI · PostgreSQL · Redis · Docker'
    },
    {
      id: 'android',
      number: '02',
      title: 'High-Performance Native Android Apps',
      tagline: 'Zero-Jank Offline-First Mobile Systems',
      icon3D: Icon3DServerRack1k,
      accentColor: 'from-teal-500 to-cyan-500',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      problem: 'Cross-platform webview wrappers (React Native/Flutter web) suffer from 400ms micro-stutters, bloated APK sizes, and heavy battery consumption during background sync.',
      solution: 'We build 100% native Android applications with Jetpack Compose and local SQLite Room databases that function seamlessly even in zero-network environments.',
      deliverables: [
        'Modern declarative UI with Jetpack Compose & Material 3',
        'Room Database with offline-first bi-directional sync',
        'WorkManager background tasks with battery conservation',
        'Google Play Store compliance, release signing & ASO'
      ],
      techBadge: 'Kotlin · Jetpack Compose · Room SQLite · WorkManager'
    },
    {
      id: 'quant',
      number: '03',
      title: 'Low-Latency Quant & Algo Execution',
      tagline: 'Deterministic Sub-10ms Trade Infrastructure',
      icon3D: Icon3DFastAPI,
      accentColor: 'from-amber-500 to-rose-500',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      problem: 'Retail order routers and slow REST polling create 300–800ms slippage during breakout candle moves, destroying strategy expectancy.',
      solution: 'Custom high-throughput order execution pipelines processing live binary Protobuf market ticks with deterministic risk circuit-breakers and automated OCO GTT routing.',
      deliverables: [
        'Multi-broker routing (Zerodha Kite Connect & FYERS API v3)',
        'Binary Protobuf WebSocket tick parsers (< 5ms tick-to-signal)',
        'Hard risk circuit-breakers (Max daily loss, trailing stop-loss)',
        'Automated paper-trading & backtesting validation engines'
      ],
      techBadge: 'Python Asyncio · Binary Protobuf · Kite Connect · FYERS v3'
    },
    {
      id: 'backend',
      number: '04',
      title: 'Sub-100ms APIs & Resilient Backends',
      tagline: 'Engineered for Scale, Zero Cold-Start Lag',
      icon3D: Icon3DPgBouncer,
      accentColor: 'from-blue-500 to-indigo-500',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      problem: 'Naive serverless monoliths suffer from cold starts exceeding 1.5s, unindexed N+1 SQL joins, and connection exhaustion during sudden traffic spikes.',
      solution: 'Ultra-lean asynchronous APIs powered by FastAPI/Fastify, PgBouncer connection pooling, and multi-tier Redis caching to guarantee sub-100ms p99 response times.',
      deliverables: [
        'FastAPI / Fastify high-concurrency micro-services',
        'PgBouncer connection pooling preventing PostgreSQL stalls',
        'Redis L2 caching for frequent reads (< 2ms access)',
        'Cloudflare Edge CDN caching & distributed WAF protection'
      ],
      techBadge: 'FastAPI · Fastify · PostgreSQL · Redis L2 · Cloudflare'
    },
    {
      id: 'ai',
      number: '05',
      title: 'Autonomous AI Infrastructure & Tooling',
      tagline: 'AST Context Optimization & Autonomous Loops',
      icon3D: Icon3DCluster10k,
      accentColor: 'from-rose-500 to-purple-500',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      problem: 'Teams burn thousands of dollars monthly sending redundant codebase context into LLMs while fragile AI agent loops break on trivial edge cases.',
      solution: 'Creators of ContextPrune MCP: AST-driven context optimizer cutting token bills by 82.6%. We engineer robust agent workflows and WhatsApp conversational engines.',
      deliverables: [
        'ContextPrune MCP: AST syntax-tree pruning for coding agents',
        'Multi-agent orchestration loops with human-in-the-loop checks',
        'Enterprise WhatsApp conversational AI with instant CRM sync',
        'Local & cloud inference routing (vLLM, Ollama, Claude, Gemini)'
      ],
      techBadge: 'ContextPrune MCP · AST Parsers · vLLM · WhatsApp Business API'
    }
  ];

  return (
    <section id="pillars" className="py-24 relative bg-[#060A09] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border-t border-l border-white/20 border-b-2 border-emerald-900 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest shadow-md">
            Spatial Engineering Spectrum
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The 5 Engineering Pillars of FiFTO
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We are not just a trading desk or a generic dev shop. We are a specialized systems engineering laboratory building mission-critical software across five high-impact verticals.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon3D = pillar.icon3D;
            const isFullWidth = idx === 4;

            return (
              <div 
                key={pillar.id}
                className={`fifto-glass p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300 border-t border-l border-white/15 border-b-4 border-black/80 shadow-2xl ${isFullWidth ? 'lg:col-span-2' : ''}`}
              >
                {/* Accent Top Border */}
                <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${pillar.accentColor}`} />

                {/* Pillar Header with 3D Pill and 3D Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-2xl bg-black/50 border-t border-l border-white/20 border-b-2 border-black shadow-inner group-hover:scale-110 transition-transform">
                      <Icon3D className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gradient-to-b from-white/20 to-white/5 border-t border-l border-white/30 border-b border-black font-mono text-[10px] font-black text-emerald-400">
                          {pillar.number}
                        </span>
                        <span className={`text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md border ${pillar.badgeColor}`}>
                          {pillar.tagline}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mt-1.5 group-hover:text-emerald-300 transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-4xl font-display font-black text-slate-700/40 group-hover:text-emerald-500/30 transition-colors">
                    {pillar.number}
                  </span>
                </div>

                {/* Problem vs Solution Split */}
                <div className="space-y-4 text-sm mb-6">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border-t border-l border-rose-500/20 border-b-2 border-black text-slate-300">
                    <span className="font-bold text-rose-400 flex items-center gap-2 mb-1 text-xs uppercase font-mono">
                      <Icon3DWarningPrism className="w-4 h-4" />
                      <span>The Reality Check:</span>
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300 pl-6">
                      {pillar.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border-t border-l border-emerald-500/20 border-b-2 border-black text-slate-300">
                    <span className="font-bold text-emerald-400 flex items-center gap-2 mb-1 text-xs uppercase font-mono">
                      <Icon3DShieldBolt className="w-4 h-4" />
                      <span>The FiFTO Standard:</span>
                    </span>
                    <p className="text-xs leading-relaxed text-slate-200 pl-6">
                      {pillar.solution}
                    </p>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                    Production Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pillar.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges Footer */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Stack: </span>
                    <span className="text-slate-300 font-medium">{pillar.techBadge}</span>
                  </div>
                  <a
                    href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20am%20interested%20in%20your%20Pillar%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors group/link"
                  >
                    <span>Request Architecture Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPillars;
