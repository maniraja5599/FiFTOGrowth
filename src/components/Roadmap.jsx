import React from 'react';
import { motion } from 'framer-motion';
import BarChart2 from 'lucide-react/dist/esm/icons/bar-chart-2';
import Smartphone from 'lucide-react/dist/esm/icons/smartphone';
import Bell from 'lucide-react/dist/esm/icons/bell';
import PieChart from 'lucide-react/dist/esm/icons/pie-chart';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';

const Roadmap = () => {
    const features = [
        {
            icon: BarChart2,
            title: "Positional NFO Strategies",
            description: "Optional overnight hedged NFO strategies for clients seeking non-directional index exposure with strict gamma limits.",
            status: "COMING SOON",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
        },
        {
            icon: Smartphone,
            title: "Dedicated Mobile App",
            description: "Native iOS & Android application to track live position Greeks, daily P&L updates, and instant risk alerts.",
            status: "IN DEVELOPMENT",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
        },
        {
            icon: Bell,
            title: "Real-Time Telegram Alerts",
            description: "Direct bot notifications upon trade execution, hedge rebalancing, and EOD mark-to-market summaries.",
            status: "PLANNED",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
        },
        {
            icon: PieChart,
            title: "Advanced Quant Analytics",
            description: "Enhanced telemetry dashboard with Sharpe ratio, Sortino ratio, max drawdown recovery graphs, and Monte Carlo curves.",
            status: "PLANNED",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
        },
        {
            icon: Layers,
            title: "Multi-Broker Order Routing",
            description: "Expanded support across Zerodha Kite, FYERS API v3, and Finvasia Shoonya for decentralized execution risk.",
            status: "PLANNED",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
        },
        {
            icon: Lock,
            title: "Institutional Vault Security",
            description: "Hardware token encryption, dual-party authorization for API endpoints, and zero-storage credential architecture.",
            status: "IN DEVELOPMENT",
            statusColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
            highlight: true
        }
    ];

    return (
        <section className="py-12 sm:py-20 relative overflow-hidden bg-premium-card/10">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                <div className="text-center mb-10 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-premium-gold" />
                        <span>Continuous Innovation</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        <span>Future </span>
                        <span className="gold-gradient-text">Engineering Roadmap</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-normal">
                        We continuously optimize our execution stack to safeguard capital and amplify alpha.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`glass-panel p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${feature.highlight
                                ? 'border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.2)] bg-emerald-950/20'
                                : 'border-white/10 hover:border-premium-gold/30'
                                }`}
                        >
                            <div>
                                <div className="mb-4 inline-block p-2.5 rounded-xl icon-container-3d">
                                    <feature.icon className={`w-5 h-5 ${feature.highlight ? 'icon-3d-green' : 'icon-3d-gold'}`} />
                                </div>

                                <h3 className="text-base sm:text-lg font-bold mb-2 text-white group-hover:text-premium-gold transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed font-normal">
                                    {feature.description}
                                </p>
                            </div>

                            <div>
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border font-mono ${feature.statusColor}`}>
                                    {feature.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
