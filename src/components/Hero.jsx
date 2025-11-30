import React from 'react';
import { motion } from 'framer-motion';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';

const Hero = () => {
    return (
        <div id="philosophy" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-premium-dark pt-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8 max-w-[95vw]">
                        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-500 flex-shrink-0" />
                        <span className="text-[10px] md:text-sm text-red-200 font-medium whitespace-nowrap overflow-hidden text-ellipsis">FiFTO is not a SEBI registered investment advisor</span>
                    </div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        {["Wealth", "Management"].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-3"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        <span className="gold-gradient-text inline-block">
                            {["Redefined", "for", "HNIs"].map((word, i) => (
                                <span key={i} className="inline-block mr-3">
                                    {word}
                                </span>
                            ))}
                        </span>
                    </motion.h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Exclusive portfolio management for capital above ₹1 Cr.
                        Experience transparency with live tracking, verified P&L, and a pure profit-sharing model.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-premium-gold hover:bg-premium-gold-hover text-black font-bold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 group">
                            Start Your Journey
                            <div className="p-1 rounded-full bg-black/10">
                                <ArrowRight className="w-5 h-5 icon-3d-gold text-black" />
                            </div>
                        </button>
                        <button
                            onClick={() => window.open('https://verified.flattrade.in/pnl/PO0e9bb3329bca40ad8b3edd96638994cc', '_blank')}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg flex items-center gap-2 transition-all group"
                        >
                            View Verified P&L
                            <div className="p-1 rounded-full bg-white/10 icon-container-3d">
                                <TrendingUp className="w-5 h-5 icon-3d-blue" />
                            </div>
                        </button>
                    </div>
                </motion.div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { label: "Minimum Capital", value: "₹1 Cr+" },
                        { label: "Profit Sharing", value: "Performance Based" },
                        { label: "Transparency", value: "100% Live Tracking" },
                    ].map((stat, index) => (
                        <div key={index} className="glass-panel p-6">
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
