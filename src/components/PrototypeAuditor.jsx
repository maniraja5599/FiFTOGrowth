import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  Send, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  Icon3DCursor,
  Icon3DLovable,
  Icon3DV0,
  Icon3DClaude,
  Icon3DInHouse,
  Icon3DFastAPI,
  Icon3DNext,
  Icon3DExpress,
  Icon3DSupabase,
  Icon3DNoApi,
  Icon3DPgBouncer,
  Icon3DUnpooledPostgres,
  Icon3DFirebase,
  Icon3DServerRack1k,
  Icon3DMicroServer,
  Icon3DCluster10k,
  Icon3DWarningPrism,
  Icon3DShieldBolt,
  Icon3DWhatsApp
} from './Isometric3DIcons';

const PrototypeAuditor = () => {
  const [prototypeTool, setPrototypeTool] = useState('cursor');
  const [backendType, setBackendType] = useState('fastapi');
  const [databaseType, setDatabaseType] = useState('pooled-postgres');
  const [concurrency, setConcurrency] = useState('1000');

  // Diagnostic calculations
  const auditResults = useMemo(() => {
    let score = 40;
    const risks = [];
    const recommendations = [];

    // Sub-metric ratings
    let latencyRisk = 'Low (< 25ms p99)';
    let latencyScore = 92;
    let poolSafety = 'Secured (PgBouncer)';
    let poolScore = 95;
    let astDrift = '82.6% Pruned (ContextPrune)';
    let astScore = 90;

    // 1. Prototype Tool
    if (prototypeTool === 'cursor' || prototypeTool === 'lovable' || prototypeTool === 'v0') {
      score += 5;
      astDrift = 'Moderate AST Bloat (ContextPrune Recommended)';
      astScore = 65;
      risks.push({
        title: 'Untracked Architectural Drift',
        desc: 'Vibe-coded prototypes frequently contain contradictory business logic and orphaned dependencies across iterations.',
        severity: 'medium'
      });
    } else if (prototypeTool === 'hand') {
      score += 15;
      astDrift = 'Structured Codebase';
      astScore = 85;
    }

    // 2. Backend
    if (backendType === 'none') {
      score -= 20;
      latencyRisk = 'Severe Cold-Start (> 1.2s)';
      latencyScore = 20;
      risks.push({
        title: 'Client-Exposed Secrets & API Keys',
        desc: 'Direct client-side third-party API calls risk exposing sensitive provider keys and lack rate-limiting.',
        severity: 'high'
      });
      recommendations.push('Introduce isolated FastAPI / Node.js backend layer with strict JWT auth');
    } else if (backendType === 'server-actions') {
      score += 10;
      latencyRisk = 'Variable Server Action Waterfall (180ms - 650ms)';
      latencyScore = 55;
      risks.push({
        title: 'Server Action Cold-Start Waterfalls',
        desc: 'Unbundled server actions can trigger serialized database roundtrips causing 800ms+ page stalls.',
        severity: 'medium'
      });
      recommendations.push('Refactor into pooled API endpoints with Redis L2 read caching');
    } else if (backendType === 'fastapi') {
      score += 30;
      latencyRisk = 'Deterministic Ultra-Low (< 18ms p99)';
      latencyScore = 95;
      recommendations.push('FastAPI async workers verified; add automated AST schema generation');
    } else {
      score += 18;
      latencyRisk = 'Moderate (< 85ms p99)';
      latencyScore = 75;
    }

    // 3. Database & Pooling
    if (databaseType === 'unpooled-postgres') {
      score -= 15;
      poolSafety = 'CRITICAL: Pool Starvation under concurrency';
      poolScore = 25;
      risks.push({
        title: 'PostgreSQL Connection Exhaustion',
        desc: 'Under 100+ concurrent requests, direct PostgreSQL connections saturate max_connections and crash the app.',
        severity: 'high'
      });
      recommendations.push('Implement PgBouncer transaction connection pooling and prepared statements');
    } else if (databaseType === 'pooled-postgres') {
      score += 30;
      poolSafety = 'Hardened (PgBouncer Active)';
      poolScore = 98;
      recommendations.push('PgBouncer configuration hardened for high concurrency');
    } else if (databaseType === 'firebase') {
      score += 10;
      poolSafety = 'Cloud Managed (Watch write-quotas)';
      poolScore = 70;
    } else {
      score -= 25;
      poolSafety = 'Zero Persistence (Data Loss Risk)';
      poolScore = 15;
      risks.push({
        title: 'Ephemerality & State Loss',
        desc: 'No persistent relational layer; vulnerable to data loss on browser refresh or crash.',
        severity: 'high'
      });
      recommendations.push('Design normalized schema with automated migration scripts');
    }

    // 4. Concurrency Target
    if (concurrency === '10000') {
      if (databaseType !== 'pooled-postgres') {
        score -= 15;
        poolSafety = 'Extreme Crash Hazard';
        poolScore = 10;
      }
      risks.push({
        title: 'Missing L2 Caching & Edge Layer',
        desc: 'At 10,000+ users, un-cached read queries will overload primary database CPU cores to 100%.',
        severity: 'high'
      });
      recommendations.push('Deploy Cloudflare Edge cache rules and Redis memory tier');
    }

    const finalScore = Math.min(Math.max(score, 22), 94);

    let statusLabel = 'Critical Risk: Production Crash Imminent';
    let statusTheme = {
      badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      ring: '#F43F5E',
      glow: 'shadow-[0_0_30px_rgba(244,63,94,0.35)]'
    };

    if (finalScore >= 75) {
      statusLabel = 'Production Ready: Battle-Tested Core';
      statusTheme = {
        badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        ring: '#10B981',
        glow: 'shadow-[0_0_35px_rgba(16,185,129,0.4)]'
      };
    } else if (finalScore >= 50) {
      statusLabel = 'At Risk: High Day-2 Maintenance Cost';
      statusTheme = {
        badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        ring: '#F59E0B',
        glow: 'shadow-[0_0_30px_rgba(245,158,11,0.35)]'
      };
    }

    return {
      score: finalScore,
      statusLabel,
      statusTheme,
      latencyRisk,
      latencyScore,
      poolSafety,
      poolScore,
      astDrift,
      astScore,
      risks: risks.slice(0, 3),
      recommendations: recommendations.length > 0 ? recommendations : ['Run automated AST linting and security boundary tests']
    };
  }, [prototypeTool, backendType, databaseType, concurrency]);

  const generateWhatsAppMessage = () => {
    const text = `Hi Mani, I ran the FiFTO 3D Spatial Prototype Auditor:
- Tool: ${prototypeTool}
- Backend: ${backendType}
- Database: ${databaseType}
- Concurrency Target: ${concurrency} users
- Readiness Score: ${auditResults.score}% (${auditResults.statusLabel})
- Latency Diagnostic: ${auditResults.latencyRisk}
- Pool Safety: ${auditResults.poolSafety}

I would like to discuss a 7-14 day production hardening build with FiFTO.`;
    return encodeURIComponent(text);
  };

  // Reusable 3D tactile card component
  const TactileCard = ({ isSelected, onClick, icon: IconComponent, title, subtitle }) => (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`relative w-full p-3.5 rounded-2xl text-left transition-all duration-200 backdrop-blur-md overflow-hidden ${
        isSelected
          ? 'bg-emerald-950/40 border-t border-l border-emerald-400/60 border-r border-white/10 border-b-2 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] translate-y-[2px]'
          : 'bg-[#0a120e]/60 hover:bg-[#0d1a14]/80 border-t border-l border-white/15 border-r border-white/5 border-b-4 border-[#03170e] hover:border-emerald-500/30 shadow-md'
      }`}
    >
      {/* Specular Top Edge Shine */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3">
        {/* 3D Isometric Icon */}
        <div className="shrink-0 p-1.5 rounded-xl bg-black/40 border border-white/10 shadow-inner">
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <span className={`text-xs font-bold block truncate tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
              {subtitle}
            </span>
          )}
        </div>

        {/* Floating 3D Checkmark on Active Selection */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-5 h-5 rounded-full bg-emerald-500 text-[#060a09] flex items-center justify-center shrink-0 shadow-[0_0_10px_#10B981] border border-emerald-200"
          >
            <Check className="w-3 h-3 stroke-[3]" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );

  return (
    <section id="auditor" className="py-24 relative bg-[#060A09] border-t border-white/[0.06] overflow-hidden">
      {/* 3D Ambient Emerald Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[450px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-teal-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Spatial Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/40 border-t border-l border-white/20 border-b-2 border-emerald-900 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Spatial 3D Diagnostic Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Vibe-to-Production <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-rose-400">
              Readiness Auditor
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Tactile diagnostic console. Select your prototype configuration across Steps 01–04 to analyze concurrency bottlenecks, AST context drift, and database pool starvation.
          </p>
        </div>

        {/* Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4-Step Tactile 3D Console (7 Cols) */}
          <div className="lg:col-span-7 fifto-glass p-6 sm:p-8 rounded-3xl space-y-8 border-t border-l border-white/15 border-b-4 border-black/80 shadow-2xl">
            
            {/* Step 01 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-b from-white/20 to-white/5 border-t border-l border-white/30 border-b-2 border-black font-mono text-xs font-black text-emerald-400 shadow-md">
                  01
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  PROTOTYPE FOUNDATION TOOL
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <TactileCard
                  isSelected={prototypeTool === 'cursor'}
                  onClick={() => setPrototypeTool('cursor')}
                  icon={Icon3DCursor}
                  title="Cursor AI"
                  subtitle="Vibe-coded Composer Flow"
                />
                <TactileCard
                  isSelected={prototypeTool === 'lovable'}
                  onClick={() => setPrototypeTool('lovable')}
                  icon={Icon3DLovable}
                  title="Lovable.dev"
                  subtitle="Full-stack AI Generated"
                />
                <TactileCard
                  isSelected={prototypeTool === 'v0'}
                  onClick={() => setPrototypeTool('v0')}
                  icon={Icon3DV0}
                  title="v0 by Vercel"
                  subtitle="Component UI Prototype"
                />
                <TactileCard
                  isSelected={prototypeTool === 'claude'}
                  onClick={() => setPrototypeTool('claude')}
                  icon={Icon3DClaude}
                  title="Claude Code"
                  subtitle="CLI Terminal Agent Loop"
                />
                <div className="sm:col-span-2">
                  <TactileCard
                    isSelected={prototypeTool === 'hand'}
                    onClick={() => setPrototypeTool('hand')}
                    icon={Icon3DInHouse}
                    title="In-House Engineered Codebase"
                    subtitle="Custom TypeScript / Python Framework"
                  />
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-b from-white/20 to-white/5 border-t border-l border-white/30 border-b-2 border-black font-mono text-xs font-black text-emerald-400 shadow-md">
                  02
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  SERVER EXECUTION LAYER
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <TactileCard
                  isSelected={backendType === 'fastapi'}
                  onClick={() => setBackendType('fastapi')}
                  icon={Icon3DFastAPI}
                  title="FastAPI (Python Async)"
                  subtitle="High Concurrency Workers"
                />
                <TactileCard
                  isSelected={backendType === 'server-actions'}
                  onClick={() => setBackendType('server-actions')}
                  icon={Icon3DNext}
                  title="Next.js Server Actions"
                  subtitle="React 19 Server Components"
                />
                <TactileCard
                  isSelected={backendType === 'express'}
                  onClick={() => setBackendType('express')}
                  icon={Icon3DExpress}
                  title="Node.js / Express"
                  subtitle="REST Event-Loop Gateway"
                />
                <TactileCard
                  isSelected={backendType === 'supabase'}
                  onClick={() => setBackendType('supabase')}
                  icon={Icon3DSupabase}
                  title="Supabase Edge Functions"
                  subtitle="Deno Isolated Handlers"
                />
                <div className="sm:col-span-2">
                  <TactileCard
                    isSelected={backendType === 'none'}
                    onClick={() => setBackendType('none')}
                    icon={Icon3DNoApi}
                    title="Frontend-Only (No Dedicated Backend)"
                    subtitle="Exposes API keys & lacks rate limits"
                  />
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-b from-white/20 to-white/5 border-t border-l border-white/30 border-b-2 border-black font-mono text-xs font-black text-emerald-400 shadow-md">
                  03
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  DATABASE & POOLING TOPOLOGY
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <TactileCard
                  isSelected={databaseType === 'pooled-postgres'}
                  onClick={() => setDatabaseType('pooled-postgres')}
                  icon={Icon3DPgBouncer}
                  title="PgBouncer / Pooled RDS"
                  subtitle="Laser Laser Connections · Max 50 Safe"
                />
                <TactileCard
                  isSelected={databaseType === 'unpooled-postgres'}
                  onClick={() => setDatabaseType('unpooled-postgres')}
                  icon={Icon3DUnpooledPostgres}
                  title="Unpooled Postgres (Direct)"
                  subtitle="Saturates under 100+ concurrent users"
                />
                <TactileCard
                  isSelected={databaseType === 'firebase'}
                  onClick={() => setDatabaseType('firebase')}
                  icon={Icon3DFirebase}
                  title="Firebase / Firestore"
                  subtitle="Document Store · High Write Costs"
                />
                <TactileCard
                  isSelected={databaseType === 'none'}
                  onClick={() => setDatabaseType('none')}
                  icon={Icon3DNoApi}
                  title="Local State / Mock JSON"
                  subtitle="Zero persistence on reload"
                />
              </div>
            </div>

            {/* Step 04 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-b from-white/20 to-white/5 border-t border-l border-white/30 border-b-2 border-black font-mono text-xs font-black text-emerald-400 shadow-md">
                  04
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  PEAK CONCURRENCY TARGET
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <TactileCard
                  isSelected={concurrency === '100'}
                  onClick={() => setConcurrency('100')}
                  icon={Icon3DMicroServer}
                  title="100 Users"
                  subtitle="Alpha Stage"
                />
                <TactileCard
                  isSelected={concurrency === '1000'}
                  onClick={() => setConcurrency('1000')}
                  icon={Icon3DServerRack1k}
                  title="1,000 Users"
                  subtitle="Production Scale"
                />
                <TactileCard
                  isSelected={concurrency === '10000'}
                  onClick={() => setConcurrency('10000')}
                  icon={Icon3DCluster10k}
                  title="10,000+ Users"
                  subtitle="High-Throughput"
                />
              </div>
            </div>

          </div>

          {/* Right Column: 3D Perspective Reactor Core & Diagnostic Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 [perspective:1000px]">
            
            {/* 3D Floating Glass Reactor Card */}
            <div className="fifto-glass p-6 sm:p-8 rounded-3xl border-t border-l border-white/20 border-b-4 border-black/80 shadow-2xl relative overflow-hidden transition-all duration-300 [transform-style:preserve-3d] hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
              
              {/* Radial Ambient Ring */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none rounded-full" />

              {/* 3D Reactor Gauge Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    PRODUCTION READINESS
                  </span>
                  <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md border inline-block mt-1 ${auditResults.statusTheme.badge}`}>
                    {auditResults.statusLabel}
                  </span>
                </div>

                {/* 3D Reactor Dial Core */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background bevel track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0B1A13"
                      strokeWidth="10"
                    />
                    {/* Glowing Neon Liquid Fill */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={auditResults.statusTheme.ring}
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * auditResults.score) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                      style={{ filter: `drop-shadow(0 0 6px ${auditResults.statusTheme.ring})` }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black font-display text-white">
                      {auditResults.score}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">/100</span>
                  </div>
                </div>
              </div>

              {/* 3D Interactive Sub-Metrics Breakdown */}
              <div className="py-5 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  3D Architecture Health Indices:
                </span>

                {/* Latency Risk */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block font-mono text-[10px]">p99 API Latency</span>
                    <span className="text-slate-200 font-bold">{auditResults.latencyRisk}</span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full ${auditResults.latencyScore >= 75 ? 'bg-emerald-400' : 'bg-rose-500'}`} 
                      style={{ width: `${auditResults.latencyScore}%` }} 
                    />
                  </div>
                </div>

                {/* Pool Starvation */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block font-mono text-[10px]">Connection Pool Resilience</span>
                    <span className="text-slate-200 font-bold">{auditResults.poolSafety}</span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full ${auditResults.poolScore >= 75 ? 'bg-emerald-400' : 'bg-rose-500'}`} 
                      style={{ width: `${auditResults.poolScore}%` }} 
                    />
                  </div>
                </div>

                {/* AST Context Drift */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block font-mono text-[10px]">AST Token Efficiency (ContextPrune)</span>
                    <span className="text-slate-200 font-bold">{auditResults.astDrift}</span>
                  </div>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full ${auditResults.astScore >= 75 ? 'bg-emerald-400' : 'bg-amber-400'}`} 
                      style={{ width: `${auditResults.astScore}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Identified Bottlenecks with 3D Warning Prism */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                  <Icon3DWarningPrism className="w-4 h-4" />
                  <span>Identified Bottlenecks:</span>
                </span>

                {auditResults.risks.map((risk, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs space-y-1">
                    <span className="font-bold text-rose-300 block">{risk.title}</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {risk.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* FiFTO 7-14 Day Hardening Sprint with 3D Metallic Shield */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-2 shadow-inner">
                <span className="font-bold text-emerald-400 flex items-center gap-2">
                  <Icon3DShieldBolt className="w-4 h-4" />
                  <span>FiFTO 7–14 Day Hardening Sprint:</span>
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {auditResults.recommendations.map((rec, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3D Extruded WhatsApp CTA Button */}
              <div className="pt-6">
                <motion.a
                  href={`https://wa.me/918300030123?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden w-full py-4 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-t border-l border-white/30 border-r border-white/10 border-b-4 border-emerald-900 active:border-b-0 active:translate-y-1 shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3"
                >
                  {/* Glossy top shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  
                  <Icon3DWhatsApp className="w-5 h-5" />
                  <span>Deploy 7–14 Day Sprint on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PrototypeAuditor;
