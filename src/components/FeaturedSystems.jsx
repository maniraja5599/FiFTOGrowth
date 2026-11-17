import React from 'react';
import { 
  Terminal, 
  Smartphone, 
  TrendingUp, 
  Layers, 
  ExternalLink, 
  Github, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  BarChart3
} from 'lucide-react';

const FeaturedSystems = () => {
  const systems = [
    {
      id: 'contextprune',
      badge: 'Open-Source AI Tooling',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'ContextPrune MCP',
      tagline: 'AST-Driven Context Optimizer Cutting Token Bills by 82.6%',
      description: 'An open-source Model Context Protocol (MCP) server that analyzes source trees with Abstract Syntax Trees (AST), replacing bulky implementation bodies with type signatures before feeding them to AI coding agents.',
      metrics: [
        { label: 'Token Cost Reduction', value: '82.6%' },
        { label: 'Syntax Overhead', value: '< 15ms' },
        { label: 'Distribution', value: 'npm · npx' },
      ],
      stack: ['Node.js', 'Tree-Sitter AST', 'Model Context Protocol', 'TypeScript'],
      links: [
        { label: 'GitHub Repository', href: 'https://github.com/maniraja5599/contextprune', icon: Github },
        { label: 'Run via npx', href: 'https://www.npmjs.com/package/contextprune', icon: Terminal },
      ]
    },
    {
      id: 'vetri-tnpsc',
      badge: 'Native Android Mobile Ecosystem',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Vetri TNPSC Ecosystem',
      tagline: 'Offline-First Android App for Tamil Nadu Civil Service Aspirants',
      description: 'A native Android learning platform built for civil service aspirants across Tamil Nadu. Features zero-lag mock test execution, local SQLite offline question caching, and automated syndication.',
      metrics: [
        { label: 'Architecture', value: '100% Native' },
        { label: 'Offline Capability', value: 'Full Test Engine' },
        { label: 'Sync Latency', value: '< 50ms Delta' },
      ],
      stack: ['Kotlin', 'Jetpack Compose', 'Room SQLite', 'Coroutines Flow'],
      links: [
        { label: 'Play Store Standard', href: 'https://wa.me/918300030123?text=Tell%20me%20more%20about%20the%20Vetri%20TNPSC%20native%20Android%20build', icon: ArrowUpRight },
      ]
    },
    {
      id: 'drillrig',
      badge: 'Commercial Enterprise CRM',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Anjaneya Borewells DrillRig CRM',
      tagline: 'Industrial Depth Logging & Lead Conversion Engine',
      description: 'Custom industrial ERP and real-time field logging engine for heavy drilling operations. Accurately tracks drilling depth, PVC casing usage, fuel expenditure, and automates high-converting customer bookings.',
      metrics: [
        { label: 'Field Accuracy', value: '99.4%' },
        { label: 'Operations Sync', value: 'Real-Time' },
        { label: 'Live Domain', value: 'drillrig.in' },
      ],
      stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'WhatsApp Gateway'],
      links: [
        { label: 'Live Platform', href: 'https://drillrig.in', icon: ExternalLink },
      ]
    },
    {
      id: 'quant-engine',
      badge: 'Ultra Low-Latency Quant System',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'FiFTO Multi-Broker Quant Terminal',
      tagline: 'Binary Protobuf WebSocket Stream with Sub-10ms Risk Circuit-Breakers',
      description: 'Institutional-grade algorithmic execution engine integrating Zerodha Kite Connect and FYERS API v3. Ingests tick-by-tick feeds, runs automated breakout matrices, and dispatches LIMIT and OCO GTT orders with zero manual intervention.',
      metrics: [
        { label: 'Execution Speed', value: '< 10ms p99' },
        { label: 'Risk Guardrails', value: 'Hardware Kill-Switch' },
        { label: 'Data Ingestion', value: '500+ ticks/sec' },
      ],
      stack: ['Python Asyncio', 'Binary Protobuf', 'Zerodha Kite', 'FYERS v3'],
      links: [
        { label: 'Inspect Architecture', href: '#architecture', icon: ArrowUpRight },
      ]
    }
  ];

  return (
    <section id="systems" className="py-24 relative bg-[#070b12] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            Proof of Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Proven Systems Shipped by FiFTO
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We don't sell theoretical slides. Here are production systems, open-source tools, and enterprise platforms we have built and currently operate.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems.map((item) => (
            <div
              key={item.id}
              className="fifto-glass p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs font-mono text-slate-400 font-semibold mt-1 mb-4">
                  {item.tagline}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] mb-6">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">{m.label}</span>
                      <span className="text-base sm:text-lg font-black font-display text-white mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.stack.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
                {item.links.map((link, idx) => {
                  const LinkIcon = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSystems;
