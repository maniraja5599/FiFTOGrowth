import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Smartphone, 
  TrendingUp, 
  Cpu, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';
import {
  Icon3DCursor,
  Icon3DFastAPI,
  Icon3DPgBouncer,
  Icon3DServerRack1k,
  Icon3DCluster10k,
  Icon3DShieldBolt,
  Icon3DWarningPrism
} from './Isometric3DIcons';

const InteractiveBentoGrid = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedEdgeRegion, setSelectedEdgeRegion] = useState('chennai');

  const edgeNodes = {
    chennai: { name: 'Chennai (IN-MAA)', p99: '6.4ms', status: 'Optimal', throughput: '12.4k req/s' },
    mumbai: { name: 'Mumbai (IN-BOM)', p99: '11.2ms', status: 'Optimal', throughput: '18.1k req/s' },
    singapore: { name: 'Singapore (SG-SIN)', p99: '28.5ms', status: 'Optimal', throughput: '24.6k req/s' },
    frankfurt: { name: 'Frankfurt (EU-FRA)', p99: '78.1ms', status: 'Routed', throughput: '9.2k req/s' },
    usEast: { name: 'N. Virginia (US-IAD)', p99: '114ms', status: 'Edge-Cached', throughput: '31.5k req/s' },
  };

  return (
    <section id="bento" className="py-24 relative bg-[#040609] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border-t border-l border-white/20 border-b-2 border-emerald-900 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest shadow-md">
            Architectural Bento Grid
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            How FiFTO Re-Engineers Scale
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A high-density inspection of our engineering primitives: from interactive vibe-code refactoring to sub-10ms quant execution.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* TILE 1: Interactive Before/After Split (2 Columns) */}
          <div className="md:col-span-2 awwwards-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Primitive 01 · 7–14 Day Transformation
                </span>
                <span className="text-xs font-mono text-slate-400">Interactive Split Slider</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                The Vibe-Code vs. Production Architecture Split
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Drag the interactive slider below to inspect how we dismantle fragile prototype spaghetti into hardened Next.js / FastAPI systems.
              </p>

              {/* Interactive Split View */}
              <div className="relative rounded-2xl bg-black/80 border border-white/10 p-5 overflow-hidden font-mono text-xs select-none">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left: Vibe Code Prototype */}
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-rose-400 block">
                      ⚠ Vibe Code (Cursor / Lovable / v0)
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      <li className="text-rose-300">• Unpooled Postgres: Max 50 direct conns crash DB</li>
                      <li className="text-rose-300">• Client-side secrets exposed in bundle</li>
                      <li className="text-rose-300">• Unindexed SQL: 1,420ms full table scans</li>
                      <li className="text-rose-300">• Zero offline capability on mobile</li>
                    </ul>
                  </div>

                  {/* Right: FiFTO Production */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                      ✔ FiFTO Production Standard
                    </span>
                    <ul className="space-y-1 text-slate-200 text-[11px]">
                      <li className="text-emerald-300">• PgBouncer transaction pool: 5,000+ safe users</li>
                      <li className="text-emerald-300">• FastAPI async layer + strict JWT RBAC</li>
                      <li className="text-emerald-300">• Redis L2 cache: sub-2ms hit latency</li>
                      <li className="text-emerald-300">• 100% offline-first native Room SQLite</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] mt-6">
              <span>Delivery Timeframe: <strong>7–14 Days Flat</strong></span>
              <a href="#auditor" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                <span>Run Diagnostic Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* TILE 2: Native Android Simulator (1 Column) */}
          <div className="awwwards-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  Primitive 02 · 120Hz Native
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Android Jetpack Compose
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                No webviews, zero jank. Full offline Room database sync built for <strong>Vetri TNPSC</strong> civil services learning ecosystem.
              </p>

              {/* Mini Simulated Phone Screen */}
              <div className="p-3.5 rounded-2xl bg-[#060a0f] border border-white/10 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-cyan-400">
                  <span>ROOM SQLITE SYNC</span>
                  <span className="text-emerald-400 font-bold">120 FPS</span>
                </div>
                <div className="p-2 rounded-lg bg-black/60 border border-white/5 text-[11px] text-slate-200">
                  ✓ 200 Questions Cached
                </div>
                <div className="p-2 rounded-lg bg-black/60 border border-white/5 text-[11px] text-slate-200">
                  ✓ Background WorkManager Sync
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300">
                  ✓ Zero Battery Drain Guard
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 text-xs font-mono text-slate-400">
              Proof: Vetri TNPSC App
            </div>
          </div>

          {/* TILE 3: ContextPrune AST Visualizer (2 Columns) */}
          <div className="md:col-span-2 awwwards-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Primitive 03 · Open-Source MCP
                </span>
                <span className="text-xs font-mono text-white font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  $ npx contextprune
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                ContextPrune: AST Syntax-Tree Context Compression
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Reduces AI coding agent token bills by <strong>82.6%</strong> by replacing verbose implementations with type-safe AST stubs.
              </p>

              {/* AST Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">Raw File Ingestion</span>
                  <span className="text-xl font-bold text-rose-400 mt-1 block">124,500</span>
                  <span className="text-[10px] text-slate-500">Tokens/call</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 uppercase block">AST Pruned Context</span>
                  <span className="text-xl font-bold text-emerald-300 mt-1 block">21,660</span>
                  <span className="text-[10px] text-emerald-400 font-bold">-82.6% SAVED</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">Parser Overhead</span>
                  <span className="text-xl font-bold text-teal-400 mt-1 block">14.2ms</span>
                  <span className="text-[10px] text-slate-500">Tree-Sitter C-Core</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Open-Source on GitHub: <strong>maniraja5599/contextprune</strong></span>
              <a href="https://github.com/maniraja5599/contextprune" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                View Repository →
              </a>
            </div>
          </div>

          {/* TILE 4: Sub-100ms Global Edge Radar (1 Column) */}
          <div className="awwwards-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400">
                  Primitive 04 · Global Edge
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Edge Routing Radar
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Sub-100ms p99 APIs orchestrated via Cloudflare Edge networks & PgBouncer connection clusters.
              </p>

              {/* Edge Node Selector */}
              <div className="space-y-2 font-mono text-xs">
                {Object.keys(edgeNodes).map((key) => {
                  const node = edgeNodes[key];
                  const isSelected = selectedEdgeRegion === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedEdgeRegion(key)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-400/50 text-white'
                          : 'bg-black/40 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px] truncate">{node.name}</span>
                      <span className="text-emerald-400 font-bold text-[11px]">{node.p99}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>WAF: Active</span>
              <span className="text-emerald-400 font-bold">p99 &lt; 100ms SLA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveBentoGrid;
