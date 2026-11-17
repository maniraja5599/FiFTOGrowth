import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState('0→1 MVP (7–14 Days)');
  const [budget, setBudget] = useState('Immediate Sprint');
  const [details, setDetails] = useState('');

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const message = `Hi Mani, I want to kick off a project with FiFTO:
- Name / Team: ${name || 'Founder'}
- Project Type: ${projectType}
- Target Timeline: ${budget}
- Notes: ${details || 'Looking to discuss architecture and scope.'}`;

    const url = `https://wa.me/918300030123?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative bg-[#070b12] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            Sprint Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Ship Your System?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Direct access to Mani Raja. No account managers, no junior handoffs. We review your architecture and provide an actionable scope within 2 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto fifto-glass p-8 sm:p-10 rounded-3xl border-emerald-500/20 relative">
          
          <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Your Name / Startup
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arun / TechStartup"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Target Timeline
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                >
                  <option value="Immediate 7-14 Day Sprint">Immediate 7–14 Day Sprint</option>
                  <option value="Next 30 Days">Next 30 Days</option>
                  <option value="Monthly Retainer">Monthly Engineering Retainer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Primary System Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  '0→1 MVP (7–14 Days)',
                  'Native Android App',
                  'Quant & Trade Engine',
                  'Sub-100ms Cloud API',
                  'ContextPrune / AI Setup',
                  'Custom Architecture Review'
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      projectType === type
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Current Stack / Notes (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Mention current prototype tools (Cursor, v0, Lovable), target scale, or specific pain points."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/80 transition-all flex items-center justify-center gap-2.5 border border-emerald-400/40"
              >
                <MessageSquare className="w-5 h-5 text-emerald-200" />
                <span>Discuss on WhatsApp (+91 83000 30123)</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Average response time: &lt; 2 hours</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict NDA & Code IP Ownership</span>
              </span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
