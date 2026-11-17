import React from 'react';
import { formatCurrency } from '../utils/formatters';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';

const ProfitSharing = () => {
    return (
        <section id="profit-sharing" className="py-12 sm:py-20 relative overflow-hidden bg-black/30">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-premium-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* Heading */}
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        <span>Transparent </span>
                        <span className="gold-gradient-text">Pricing & Terms</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-4 font-normal">
                        Fair, incentive-aligned pricing model designed for mutual compounding. Zero hidden surcharges.
                    </p>

                    {/* Disclaimer Pill */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 backdrop-blur-md max-w-full">
                        <AlertTriangle className="w-3.5 h-3.5 text-premium-gold shrink-0" />
                        <span className="truncate">FiFTO is not a SEBI registered investment advisor. Direct trading via client account.</span>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Fixed Costs Card */}
                    <div className="glass-panel p-6 sm:p-8 relative group hover:border-premium-gold/30 transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Fixed Operational Costs</h3>
                                <div className="p-2 rounded-xl bg-white/5 text-gray-400 group-hover:text-premium-gold transition-colors">
                                    <Wallet className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 mb-6">
                                Essential cloud server, multi-broker WebSocket relay, and execution infrastructure.
                            </p>

                            <div className="space-y-3 sm:space-y-4 mb-6">
                                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-premium-gold/10 text-premium-gold">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">Management Fee</div>
                                            <div className="text-xs text-gray-400">Account oversight & surveillance</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-premium-gold font-mono font-bold text-base sm:text-lg">{formatCurrency(5000)}</div>
                                        <div className="text-[10px] text-gray-500 font-mono">/ month</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-premium-gold/10 text-premium-gold">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">Platform Fee</div>
                                            <div className="text-xs text-gray-400">Low-latency API execution node</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-premium-gold font-mono font-bold text-base sm:text-lg">{formatCurrency(5000)}</div>
                                        <div className="text-[10px] text-gray-500 font-mono">/ month</div>
                                    </div>
                                </div>
                            </div>

                            {/* Broker Links */}
                            <div className="mb-6">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                                    Recommended Zero-Brokerage Partners:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <a
                                        href="https://openaccount.flattrade.in/O_FT003862"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 bg-gradient-to-r from-premium-gold to-yellow-600 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <span>Open Flattrade Account</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                        href="https://shoonya.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <span>Open Shoonya Account</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl">
                            <div className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
                                <CheckCircle className="w-3.5 h-3.5 text-premium-gold" />
                                <span>Billing Cycle</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Fixed operational infrastructure fees are billed on the <strong>1st of every month</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Profit Sharing Card */}
                    <div className="glass-panel-gold p-6 sm:p-8 relative group hover:border-premium-gold/50 transition-all duration-300 flex flex-col justify-between shadow-2xl">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Profit Sharing Model</h3>
                                <div className="p-2 rounded-xl bg-premium-gold/10 text-premium-gold">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 mb-6">
                                Strictly performance-based fees on <strong>Net Realized P&L</strong> (after taxes and exchange STT).
                            </p>

                            {/* Tiers */}
                            <div className="space-y-2 mb-6">
                                {[
                                    { range: "₹1 Cr — ₹5 Cr", share: "20%", subtext: "Standard HNI Tier" },
                                    { range: "₹5 Cr — ₹10 Cr", share: "15%", subtext: "Ultra HNI Tier" },
                                    { range: "₹10 Cr — ₹20 Cr", share: "12%", subtext: "Institutional Tier" },
                                    { range: "Above ₹20 Cr", share: "10%", subtext: "Bespoke Family Office" },
                                ].map((tier, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-premium-gold/30 transition-colors">
                                        <div>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-200">{tier.range}</span>
                                            <span className="text-[10px] text-gray-500 block font-mono">{tier.subtext}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-premium-gold font-mono font-black text-lg sm:text-xl">{tier.share}</span>
                                            <span className="text-[10px] text-gray-400 block font-mono">Net Profit</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-3.5 bg-premium-gold/10 border border-premium-gold/20 rounded-xl">
                            <div className="text-xs font-bold text-premium-gold flex items-center gap-1.5 mb-1.5">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Terms of Execution</span>
                            </div>
                            <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                                <li>Profit sharing calculated purely on <strong>Net P&L</strong>.</li>
                                <li>Zero fees on break-even or drawdown months.</li>
                                <li>Payable on or before the <strong>5th of every month</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfitSharing;
