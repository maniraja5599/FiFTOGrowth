import React from 'react';
import { motion } from 'framer-motion';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import { VERIFIED_PNL_URL } from '../config';

const Hero = () => {
    return (
        <section id="philosophy" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-premium-dark pt-28 sm:pt-36 pb-12 sm:pb-20">
            {/* Ambient Background Glows - strictly bounded to prevent horizontal scroll */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-premium-gold/10 rounded-full blur-[100px] sm:blur-[140px]" />
                <div className="absolute -top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Top Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-gray-200">Exclusive Wealth Management</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-premium-gold font-semibold">Capital ₹1 Cr+</span>
                    </div>

                    {/* Main Headline - 100% Responsive & Zero Layout Break */}
                    <h1
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.12]"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        <span className="block text-white drop-shadow-md">
                            Wealth Management
                        </span>
                        <span className="block gold-gradient-text drop-shadow-[0_0_35px_rgba(212,175,55,0.35)] mt-1">
                            Redefined for HNIs
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed px-2"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        Exclusive portfolio management tailored specifically for high-net-worth capital above <span className="text-white font-semibold">₹1 Crore</span>. Consistent <span className="text-emerald-400 font-semibold">5–8% monthly profits</span> backed by audited broker execution and verified P&L.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                        <a
                            href="https://wa.me/918300030123?text=Hi%20Mani%20Raja,%20I%20have%20capital%20above%20₹1%20Cr%20and%20would%20like%20to%20discuss%20portfolio%20management."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-premium-gold via-yellow-500 to-yellow-600 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] text-black font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-95 group"
                        >
                            <MessageCircle className="w-5 h-5 text-black" />
                            <span>Start Your Journey</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={VERIFIED_PNL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md text-white font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-95 group"
                        >
                            <TrendingUp className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                            <span>View Verified P&L</span>
                        </a>
                    </div>

                    {/* Founder Trust Anchor */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Managed by</span>
                        <a
                            href="https://www.instagram.com/maniraja__/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-pink-400 font-semibold underline underline-offset-4 transition-colors flex items-center gap-1"
                        >
                            <span>Mani Raja</span>
                            <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        </a>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-400">Founder @ FiFTO</span>
                    </div>
                </motion.div>

                {/* Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { label: "Minimum Capital", value: "₹1 Cr+", subtext: "Strict HNI Qualification" },
                        { label: "Profit Sharing", value: "10% – 20%", subtext: "Only on Net Realized Profit" },
                        { label: "Transparency", value: "100% Audited", subtext: "Broker Verified Live Tracking" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="glass-panel p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-premium-gold/30 transition-all duration-300 text-center group"
                        >
                            <div
                                className="text-2xl sm:text-3xl font-extrabold text-white mb-1 group-hover:text-premium-gold transition-colors"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                                {stat.label}
                            </div>
                            <div className="text-[11px] text-gray-500 font-mono">
                                {stat.subtext}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
