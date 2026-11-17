import React, { useState, useMemo } from 'react';
import { 
  Gauge, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Cpu, 
  Database, 
  Layers, 
  ShieldAlert,
  Send,
  Sparkles
} from 'lucide-react';

const PrototypeAuditor = () => {
  const [prototypeTool, setPrototypeTool] = useState('cursor');
  const [backendType, setBackendType] = useState('server-actions');
  const [databaseType, setDatabaseType] = useState('unpooled-postgres');
  const [concurrency, setConcurrency] = useState('1000');

  const auditResults = useMemo(() => {
    let score = 35;
    const risks = [];
    const recommendations = [];

    // Scoring heuristics
    if (prototypeTool === 'cursor' || prototypeTool === 'lovable' || prototypeTool === 'v0') {
      score += 5;
      risks.push({
        title: 'Untracked Architectural Drift',
        desc: 'Vibe-coded prototypes frequently contain contradictory business logic and orphaned dependencies across iterations.',
        severity: 'medium'
      });
    }

    if (backendType === 'none') {
      score -= 15;
      risks.push({
        title: 'Client-Exposed Secrets & API Keys',
        desc: 'Direct client-side third-party API calls risk exposing sensitive provider keys and lack rate-limiting.',
        severity: 'high'
      });
      recommendations.push('Introduce isolated FastAPI / Node.js backend layer with strict JWT auth');
    } else if (backendType === 'server-actions') {
      score += 15;
      risks.push({
        title: 'Server Action Cold-Start Waterfalls',
        desc: 'Unbundled server actions can trigger serialized database roundtrips causing 800ms+ page stalls.',
        severity: 'medium'
      });
      recommendations.push('Refactor into pooled API endpoints with Redis L2 read caching');
    } else if (backendType === 'fastapi') {
      score += 35;
      recommendations.push('Solid backend foundation; add automated AST schema generation');
    } else {
      score += 20;
    }

    if (databaseType === 'unpooled-postgres') {
      score -= 10;
      risks.push({
        title: 'PostgreSQL Connection Exhaustion',
        desc: 'Under 100+ concurrent requests, direct PostgreSQL connections saturate max_connections and crash the app.',
        severity: 'high'
      });
      recommendations.push('Implement PgBouncer connection pooling and prepared statements');
    } else if (databaseType === 'none') {
      score -= 20;
      risks.push({
        title: 'Ephemerality & State Loss',
        desc: 'No persistent relational layer; vulnerable to data loss on browser refresh or crash.',
        severity: 'high'
      });
      recommendations.push('Design normalized schema with automated migration scripts');
    } else if (databaseType === 'pooled-postgres') {
      score += 30;
    } else {
      score += 15;
    }

    if (concurrency === '10000') {
      score -= 10;
      risks.push({
        title: 'Missing L2 Caching & Edge Layer',
        desc: 'At 10,000+ users, un-cached read queries will overload primary database CPU cores to 100%.',
        severity: 'high'
      });
      recommendations.push('Deploy Cloudflare Edge cache rules and Redis memory tier');
    }

    const finalScore = Math.min(Math.max(score, 18), 88);

    let statusLabel = 'Critical Risk: Production Crash Imminent';
    let statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';

    if (finalScore >= 70) {
      statusLabel = 'Moderate: Minor Hardening Required';
      statusColor = 'text-teal-400 bg-teal-500/10 border-teal-500/20';
    } else if (finalScore >= 50) {
      statusLabel = 'At Risk: High Day-2 Maintenance Cost';
      statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }

    return {
      score: finalScore,
      statusLabel,
      statusColor,
      risks: risks.slice(0, 3),
      recommendations: recommendations.length > 0 ? recommendations : ['Run automated AST linting and security boundary tests']
    };
  }, [prototypeTool, backendType, databaseType, concurrency]);

  const generateWhatsAppMessage = () => {
    const text = `Hi Mani, I ran the FiFTO Prototype Auditor:
- Tool: ${prototypeTool}
- Backend: ${backendType}
- Database: ${databaseType}
- Concurrency Target: ${concurrency} users
- Readiness Score: ${auditResults.score}% (${auditResults.statusLabel})

I would like to discuss a 7-14 day production hardening build with FiFTO.`;
    return encodeURIComponent(text);
  };

  return (
    <section id="auditor" className="py-24 relative bg-[#070b12] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            Interactive Diagnostic Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Vibe-to-Production Readiness Auditor
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Did you build your MVP with Cursor, Lovable, v0, or Bolt? Test your prototype architecture below to identify hidden bottlenecks before launching to real users.
          </p>
        </div>

        {/* Auditor Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Columns) */}
          <div className="lg:col-span-7 fifto-glass p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Select Your Current Prototype Configuration</span>
            </h3>

            {/* Prototype Origin */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                1. Where was the prototype built?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'cursor', label: 'Cursor AI' },
                  { id: 'lovable', label: 'Lovable' },
                  { id: 'v0', label: 'v0 by Vercel' },
                  { id: 'claude', label: 'Claude Code' },
                  { id: 'hand', label: 'In-House Code' },
                ].map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setPrototypeTool(tool.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                      prototypeTool === tool.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend Architecture */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                2. Backend / Server Execution Layer
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'server-actions', label: 'Next.js Actions' },
                  { id: 'fastapi', label: 'FastAPI (Python)' },
                  { id: 'express', label: 'Node / Express' },
                  { id: 'supabase', label: 'Supabase Edge' },
                  { id: 'none', label: 'Frontend Only (No API)' },
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBackendType(b.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                      backendType === b.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Database Layer */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                3. Database & Connection Management
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'unpooled-postgres', label: 'Unpooled Postgres (Direct Conn)' },
                  { id: 'pooled-postgres', label: 'PgBouncer / Pooled RDS' },
                  { id: 'firebase', label: 'Firebase / Firestore' },
                  { id: 'none', label: 'Local State / Mock JSON' },
                ].map(db => (
                  <button
                    key={db.id}
                    onClick={() => setDatabaseType(db.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                      databaseType === db.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {db.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Concurrency */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                4. Peak Target Concurrency (Simultaneous Active Users)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '100', label: '100 Users' },
                  { id: '1000', label: '1,000 Users' },
                  { id: '10000', label: '10,000+ Users' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setConcurrency(c.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      concurrency === c.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostic Report Card (5 Columns) */}
          <div className="lg:col-span-5 fifto-glass p-6 sm:p-8 rounded-3xl relative overflow-hidden border-emerald-500/20 space-y-6">
            
            {/* Score Ring */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Production Readiness
                </span>
                <span className={`text-xs font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border inline-block mt-1 ${auditResults.statusColor}`}>
                  {auditResults.statusLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black font-display text-white">
                  {auditResults.score}
                </span>
                <span className="text-xl font-bold text-slate-500 font-mono">/100</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  auditResults.score >= 70 ? 'bg-gradient-to-r from-teal-500 to-emerald-400' :
                  auditResults.score >= 45 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                  'bg-gradient-to-r from-rose-600 to-rose-400'
                }`}
                style={{ width: `${auditResults.score}%` }}
              />
            </div>

            {/* Identified Risks */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Identified Bottlenecks:</span>
              </span>

              {auditResults.risks.map((risk, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-1">
                  <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{risk.title}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-3">
                    {risk.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Hardening Plan */}
            <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>FiFTO 7–14 Day Hardening Sprint:</span>
              </span>
              <ul className="space-y-1 text-slate-300 pl-1">
                {auditResults.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp Send Action */}
            <a
              href={`https://wa.me/918300030123?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Audit Report to Mani on WhatsApp</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PrototypeAuditor;
