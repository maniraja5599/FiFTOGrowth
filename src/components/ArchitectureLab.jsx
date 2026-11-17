import React, { useState } from 'react';
import { 
  Server, 
  Smartphone, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  Check, 
  Zap, 
  Activity, 
  Database,
  Lock,
  Wifi,
  Sparkles
} from 'lucide-react';

const ArchitectureLab = () => {
  const [activeTab, setActiveTab] = useState('mvp');

  const architectures = {
    mvp: {
      title: '0→1 Web MVP Production Architecture',
      subtitle: 'Engineered for sub-100ms response times and zero connection starvation',
      badge: 'Web & API Standard',
      specs: [
        { label: 'Edge Layer', value: 'Cloudflare WAF + SSL Termination' },
        { label: 'Frontend App', value: 'Next.js 15 (Server Components + Edge SSR)' },
        { label: 'API Services', value: 'FastAPI / Async Python + Pydantic v2' },
        { label: 'Connection Pool', value: 'PgBouncer (Transaction Pooling Mode)' },
        { label: 'Primary DB', value: 'PostgreSQL 16 (Strict Schemas & B-Tree Indexes)' },
        { label: 'Cache & Queue', value: 'Redis L2 Cache (< 2ms hit latency)' },
      ],
      nodes: [
        { name: 'Client Browser', type: 'HTTPS / HTTP3', status: 'Active', latency: '24ms' },
        { name: 'Cloudflare Edge', type: 'WAF / Reverse Proxy', status: 'Encrypted', latency: '< 5ms' },
        { name: 'Next.js 15 Server', type: 'React 19 SSR', status: 'Optimized', latency: '35ms' },
        { name: 'FastAPI Cluster', type: 'Async Workers', status: 'Zero-Leak', latency: '18ms' },
        { name: 'PgBouncer Pool', type: 'Max 50 Connections', status: 'Steady', latency: '1.2ms' },
        { name: 'PostgreSQL DB', type: 'ACID Relational Core', status: 'Indexed', latency: '4.8ms' },
      ],
      description: 'We dismantle monolithic single-point failures by isolating the state layer, wrapping PostgreSQL in transaction-pooled PgBouncer, and serving read-heavy queries from an in-memory Redis L2 cache.'
    },
    android: {
      title: 'High-Performance Native Android Architecture',
      subtitle: 'Zero-jank 120Hz declarative UI with 100% offline local SQLite sync',
      badge: 'Mobile Native Standard',
      specs: [
        { label: 'UI Toolkit', value: 'Jetpack Compose + Material 3' },
        { label: 'Language', value: '100% Modern Kotlin' },
        { label: 'Local Store', value: 'Room Database (SQLite + Flow)' },
        { label: 'Async Concurrency', value: 'Kotlin Coroutines + StateFlow' },
        { label: 'Background Engine', value: 'WorkManager (Battery-Optimized Sync)' },
        { label: 'Architecture', value: 'Clean Architecture + MVI Pattern' },
      ],
      nodes: [
        { name: 'User Interaction', type: 'Jetpack Compose', status: '120 FPS', latency: '8.3ms frame' },
        { name: 'ViewModel State', type: 'StateFlow Flow', status: 'Deterministic', latency: '< 1ms' },
        { name: 'Repository Layer', type: 'Single Source of Truth', status: 'Synced', latency: '2ms' },
        { name: 'Room SQLite DB', type: 'Local Cache First', status: 'Offline-Ready', latency: '3.4ms' },
        { name: 'WorkManager', type: 'Background Sync', status: 'Scheduled', latency: 'Battery-Safe' },
        { name: 'Cloud Sync API', type: 'Delta Differential Sync', status: 'Resilient', latency: 'Compressed' },
      ],
      description: 'Unlike fragile hybrid frameworks that drop frames on older hardware, our native Compose codebase renders at native display refresh rates and syncs seamlessly even when internet connectivity cuts out.'
    },
    quant: {
      title: 'Low-Latency Quant & Trade Execution Engine',
      subtitle: 'Binary Protobuf tick ingestion with sub-10ms risk guardrails and OCO GTT',
      badge: 'Quant & Algorithmic Standard',
      specs: [
        { label: 'WebSocket Stream', value: 'Binary Protobuf (Zerodha Kite & FYERS)' },
        { label: 'Tick Ingestion', value: 'Asyncio Event Loop (< 2ms tick decode)' },
        { label: 'Execution Engine', value: 'Deterministic State Machine' },
        { label: 'Order Routing', value: 'LIMIT / OCO GTT Auto-Placement' },
        { label: 'Risk Safeguards', value: 'Hard Kill-Switch & Max Loss Interceptor' },
        { label: 'Auditing', value: 'Append-Only Trade & Signal Journal' },
      ],
      nodes: [
        { name: 'NSE Tick Stream', type: 'Raw Market Feed', status: '500+ ticks/sec', latency: '< 2ms' },
        { name: 'Protobuf Parser', type: 'Binary Unpack', status: 'Zero Allocation', latency: '0.4ms' },
        { name: 'Signal Detector', type: 'Breakout / Gap Matrix', status: 'Deterministic', latency: '1.8ms' },
        { name: 'Risk Circuit Breaker', type: 'Hard Limits Check', status: 'Enforced', latency: '0.2ms' },
        { name: 'Broker API Gateway', type: 'Kite / FYERS Order Dispatch', status: 'Verified', latency: '7.8ms' },
        { name: 'Journal & Telegram', type: 'Audit Sync Alert', status: 'Dispatched', latency: 'Async' },
      ],
      description: 'High volatility breakouts cannot afford human hesitation or 400ms web delays. FiFTO quant systems parse market feeds in raw binary format, execute orders in single-digit milliseconds, and enforce unbreakable risk locks.'
    },
    ai: {
      title: 'ContextPrune AST & Autonomous AI Infrastructure',
      subtitle: 'Syntax-tree context pruning cutting token costs by 82.6% with autonomous agent loops',
      badge: 'AI Tooling Standard',
      specs: [
        { label: 'Core Engine', value: 'ContextPrune MCP (Open Source)' },
        { label: 'Command Line', value: 'npx contextprune' },
        { label: 'Parsing Mechanism', value: 'Abstract Syntax Tree (AST) Traversal' },
        { label: 'Token Efficiency', value: '82.6% Context Bloat Reduction' },
        { label: 'Agent Loops', value: 'Multi-Turn Tool Use with Verification' },
        { label: 'Client Channels', value: 'WhatsApp Business API + Webhook Sync' },
      ],
      nodes: [
        { name: 'Raw Codebase / Prompt', type: 'Full Project Files', status: '120k Tokens', latency: 'Input' },
        { name: 'AST Parser (ContextPrune)', type: 'Tree-Sitter / TypeScript', status: 'Pruning Nodes', latency: '14ms' },
        { name: 'Pruned Context Vector', type: 'Signature & Type Stubs', status: '21k Tokens (82.6% saved)', latency: '< 1ms' },
        { name: 'Inference Provider', type: 'Claude / vLLM / Gemini', status: 'Fast Generation', latency: 'Sub-second' },
        { name: 'Tool Validation Loop', type: 'Unit Test / Compiler Check', status: 'Verified Pass', latency: 'Sandboxed' },
        { name: 'Production Commit', type: 'Deterministic Code', status: 'Shipped', latency: 'Clean' },
      ],
      description: 'AI agents become stupid and expensive when overloaded with whole-file noise. ContextPrune replaces unnecessary code bloat with precise AST stubs, delivering faster responses at a fraction of the token bill.'
    }
  };

  const current = architectures[activeTab];

  return (
    <section id="architecture" className="py-24 relative bg-[#05070c] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            System Blueprints
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Interactive Architecture Lab
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Inspect the exact topology, concurrency layers, and latency budgets we deploy for production-grade web, mobile, quant, and AI software.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'mvp', label: '0→1 Web App (Next.js + FastAPI)', icon: Server },
            { id: 'android', label: 'Native Android (Kotlin + Room)', icon: Smartphone },
            { id: 'quant', label: 'Quant Engine (Sub-10ms)', icon: TrendingUp },
            { id: 'ai', label: 'ContextPrune AI System', icon: Cpu },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-lg shadow-emerald-950/60 scale-105'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.08] hover:border-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Architecture Canvas Card */}
        <div className="fifto-glass p-6 sm:p-10 rounded-3xl relative overflow-hidden border-white/10">
          
          {/* Header of Active Architecture */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                {current.title}
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                {current.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Standard</span>
            </div>
          </div>

          {/* Topology Pipeline Grid */}
          <div className="py-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-4">
              Real-Time Execution Pipeline:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {current.nodes.map((node, nIdx) => (
                <div 
                  key={nIdx} 
                  className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] relative group hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-slate-500 font-semibold">Node 0{nIdx + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                      {node.latency}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {node.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/[0.05]">
                    <span className="text-slate-400">{node.type}</span>
                    <span className="text-slate-300 font-mono text-[11px]">{node.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Architectural Specs */}
          <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Why this architecture does not fail:
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {current.description}
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/918300030123?text=Hi%20Mani%2C%20I%20want%20to%20discuss%20deploying%20the%20FiFTO%20architecture%20stack%20for%20my%20product."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-emerald-500/40 transition-all"
                >
                  <span>Deploy This Blueprint For Your Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
              {current.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-3 rounded-xl bg-black/40 border border-white/[0.05] text-xs">
                  <span className="text-slate-400 block text-[11px] font-mono">{spec.label}</span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">{spec.value}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ArchitectureLab;
