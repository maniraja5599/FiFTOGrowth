import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { Icon3DWhatsApp } from './Isometric3DIcons';

const SprintConfigurator = () => {
  const [sprintType, setSprintType] = useState('mvp');
  const [duration, setDuration] = useState('14');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'pgbouncer',
    'auth',
    'redis'
  ]);

  const sprintTypes = [
    { id: 'mvp', label: '0→1 MVP Production', desc: 'Transform Cursor/v0 code to prod in 7–14 days' },
    { id: 'android', label: 'Native Android Engine', desc: 'Kotlin, Compose & Room 100% offline sync' },
    { id: 'quant', label: 'Quant Execution System', desc: 'Binary Protobuf, Kite Connect & FYERS v3' },
    { id: 'backend', label: 'Sub-100ms Cloud Backend', desc: 'FastAPI, PgBouncer & Redis L2 scale' },
  ];

  const featuresList = [
    { id: 'pgbouncer', label: 'PgBouncer Connection Pooling (5,000+ safe users)' },
    { id: 'auth', label: 'Production OAuth & JWT Role-Based Access Control' },
    { id: 'redis', label: 'Redis L2 Cache Layer (< 2ms instantaneous hits)' },
    { id: 'offline', label: 'Offline-First SQLite Room Synchronization' },
    { id: 'quant_guard', label: 'Deterministic Hardware Circuit-Breakers & OCO GTT' },
    { id: 'ast_pruning', label: 'ContextPrune AST Integration (82.6% token bill cut)' },
  ];

  const toggleFeature = (id) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const generateWhatsAppUrl = () => {
    const currentType = sprintTypes.find(t => t.id === sprintType)?.label || 'Engineering Build';
    const featureNames = featuresList
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => f.label)
      .join(', ');

    const text = `Hi Mani, I customized an engineering sprint on FiFTO:
- Sprint Archetype: ${currentType}
- Target Timeline: ${duration} Days
- Deliverables Selected: ${featureNames}

I'd like to schedule our 15-minute architecture kickoff call.`;

    return `https://wa.me/918300030123?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="sprint" className="py-24 relative bg-[#030508] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border-t border-l border-white/20 border-b-2 border-emerald-900 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest shadow-md">
            Interactive Project Kickoff
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Configure Your Engineering Sprint
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Direct access to Mani Raja. Select your required primitives and launch a battle-tested sprint delivered in 7 to 14 days.
          </p>
        </div>

        {/* Configurator Card */}
        <div className="max-w-4xl mx-auto awwwards-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="space-y-8">
            
            {/* Step 1: Select Sprint Archetype */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                1. Select Engineering Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sprintTypes.map((type) => {
                  const isSelected = sprintType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSprintType(type.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                          : 'bg-black/40 border-white/5 text-slate-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-sm block">{type.label}</span>
                      <span className="text-[11px] font-mono text-slate-400 block mt-1">{type.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Turnaround */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                2. Target Delivery Speed
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { days: '7', label: '7-Day Blitz', desc: 'Critical MVP hardening' },
                  { days: '14', label: '14-Day Sprint', desc: 'Full production suite' },
                  { days: '30', label: 'Monthly Retainer', desc: 'Continuous systems scale' },
                ].map((item) => {
                  const isSelected = duration === item.days;
                  return (
                    <button
                      key={item.days}
                      onClick={() => setDuration(item.days)}
                      className={`p-3.5 rounded-2xl text-center border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                          : 'bg-black/40 border-white/5 text-slate-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-lg font-black font-display text-emerald-400 block">{item.label}</span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Key Architectural Primitives */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                3. Required Architecture Primitives
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featuresList.map((f) => {
                  const isChecked = selectedFeatures.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`p-3 rounded-xl text-left flex items-center justify-between text-xs border transition-all ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-white'
                          : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{f.label}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Summary & WhatsApp Button */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 space-y-0.5">
                <span className="text-white font-bold block">Direct Founder Kickoff with Mani Raja</span>
                <span>Average response time: &lt; 2 hours · NDA & Code IP Protected</span>
              </div>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-t border-l border-white/30 border-b-4 border-emerald-950 active:translate-y-0.5 shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3"
              >
                <Icon3DWhatsApp className="w-5 h-5" />
                <span>Kick Off Sprint on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SprintConfigurator;
