import React from 'react';
import { motion } from 'framer-motion';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';

const Hero = () => {
    return (
        <div id="philosophy" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-premium-dark pt-20">
            {/* Background Effects Removed - Moved to Global MeteorBackground */}

            {/* Dots moved inside content for better animation context */}

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 max-w-[95vw] hover:bg-white/10 transition-colors cursor-default">
                        <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-premium-gold flex-shrink-0" />
                        <span className="text-[10px] md:text-sm text-gray-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis">FiFTO is not a SEBI registered investment advisor</span>
                    </div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
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
                                className="inline-block mr-3 md:mr-4 text-white drop-shadow-lg"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br className="hidden md:block" />
                        <span className="relative inline-block">
                            {/* Gradient Stroke Layer */}
                            <span className="absolute inset-0 z-0 select-none"
                                aria-hidden="true"
                                style={{
                                    backgroundImage: 'linear-gradient(120deg, #8a6e2f 0%, #FFD700 30%, #FFFFFF 50%, #FFD700 70%, #8a6e2f 100%)',
                                    backgroundSize: '200% auto',
                                    animation: 'shine 4s linear infinite',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    WebkitTextStroke: '3px transparent',
                                }}
                            >
                                {["Redefined", "for", "HNIs"].map((word, i) => (
                                    <span key={i} className="inline-block mr-3 md:mr-4">
                                        {word}
                                    </span>
                                ))}
                            </span>

                            {/* Dark Fill Layer */}
                            <span className="relative z-10 text-premium-dark">
                                {["Redefined", "for", "HNIs"].map((word, i) => (
                                    <span key={i} className="inline-block mr-3 md:mr-4">
                                        {word}
                                    </span>
                                ))}
                            </span>

                            <style jsx>{`
                                @keyframes shine {
                                    0% { background-position: 0% center; }
                                    100% { background-position: 200% center; }
                                }
                            `}</style>
                        </span>
                    </motion.h1>

                    {/* User Requested Background Dots - Enhanced with Framer Motion for Random Movement */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute mix-blend-screen filter ${i % 2 === 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                                style={{
                                    width: Math.random() * 180 + 20 + 'px', // Random size 20-200px
                                    height: Math.random() * 180 + 20 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    filter: `blur(${Math.random() * 10 + 10}px)`, // Random blur 10-20px
                                    borderRadius: `${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% / ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 30}%`, // Uneven blob shape
                                }}
                                animate={{
                                    x: [0, Math.random() * 400 - 200, Math.random() * 400 - 200, 0],
                                    y: [0, Math.random() * 400 - 200, Math.random() * 400 - 200, 0],
                                    scale: [1, 1.2, 0.8, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 15, // Slow duration 15-25s
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        Exclusive portfolio management for capital above <span className="text-white font-medium">₹1 Cr</span>.
                        Experience transparency with live tracking, verified P&L, and a pure profit-sharing model.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-premium-gold to-yellow-600 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] text-black font-bold text-lg rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 group">
                            Start Your Journey
                            <div className="p-1 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </a>
                        <button
                            onClick={() => window.open('https://verified.flattrade.in/pnl/PO0e9bb3329bca40ad8b3edd96638994cc', '_blank')}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-xl flex items-center gap-3 transition-all hover:border-white/20 group"
                        >
                            View Verified P&L
                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                        </button>
                    </div>
                </motion.div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { label: "Minimum Capital", value: "₹1 Cr+" },
                        { label: "Profit Sharing", value: "Performance Based" },
                        { label: "Transparency", value: "100% Live Tracking" },
                    ].map((stat, index) => (
                        <div key={index} className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                            <div className="text-2xl font-bold text-white mb-1 group-hover:text-premium-gold transition-colors" style={{ fontFamily: '"Outfit", sans-serif' }}>{stat.value}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
