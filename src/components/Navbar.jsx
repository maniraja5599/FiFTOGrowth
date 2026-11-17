import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import Brain from 'lucide-react/dist/esm/icons/brain';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Percent from 'lucide-react/dist/esm/icons/percent';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import { VERIFIED_PNL_URL } from '../config';

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLoginClick = () => {
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    return (
        <header className="relative z-50">
            <nav className={`fixed transition-all duration-300 ${isScrolled
                ? 'top-2 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-6xl rounded-2xl bg-premium-dark/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2 sm:py-3 px-4 sm:px-6'
                : 'top-0 left-0 w-full bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px] py-4 sm:py-6 px-4 sm:px-8'
                }`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* Brand Logo */}
                    <a href="/" className="flex flex-col items-start sm:items-center cursor-pointer group select-none">
                        {/* Main Logo Text */}
                        <div className="relative font-black text-3xl sm:text-4xl leading-none flex items-center" style={{
                            fontFamily: '"Anton", sans-serif',
                            letterSpacing: '0.08em'
                        }}>
                            <span style={{
                                background: 'linear-gradient(to bottom, #15803d, #14532d)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>F</span>
                            <span className="relative inline-block">
                                <span style={{
                                    background: 'linear-gradient(to bottom, #15803d, #14532d)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>i</span>
                                {/* Red Dot */}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-600 rounded-full shadow-sm border border-red-400"></span>
                            </span>
                            <span style={{
                                background: 'linear-gradient(to bottom, #15803d, #14532d)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>F</span>
                            <span style={{
                                background: 'linear-gradient(to bottom, #15803d, #14532d)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>T</span>
                            <span style={{
                                background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>O</span>
                        </div>

                        {/* Animated Separator Line */}
                        <div className="w-full flex items-center justify-center gap-1 my-0.5 overflow-hidden max-w-[140px] sm:max-w-[180px]">
                            {/* Left Green Line */}
                            <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-green-600 to-green-500">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_1px_rgba(34,197,94,0.8)] animate-pulse"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full animate-moveRight"></div>
                            </div>

                            {/* Right Red Line */}
                            <div className="relative h-[1px] w-full bg-gradient-to-l from-transparent via-red-600 to-red-500">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full shadow-[0_0_5px_1px_rgba(239,68,68,0.8)] animate-pulse"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full animate-moveLeft"></div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-wide uppercase whitespace-nowrap">
                            <span className="text-emerald-400">Your trusted partner in </span>
                            <span className="text-red-400">financial growth</span>
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                        <a href="#philosophy" className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap group">
                            <Brain className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-premium-gold/70 group-hover:text-premium-gold transition-colors" />
                            <span>Philosophy</span>
                        </a>
                        <a href="#performance" className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap group">
                            <TrendingUp className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-premium-gold/70 group-hover:text-premium-gold transition-colors" />
                            <span>Performance</span>
                        </a>
                        <a href="#equity-curve" className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap group">
                            <Activity className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-premium-gold/70 group-hover:text-premium-gold transition-colors" />
                            <span>Equity Curve</span>
                        </a>
                        <a href="#ledger" className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap group">
                            <FileText className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-premium-gold/70 group-hover:text-premium-gold transition-colors" />
                            <span>Ledger</span>
                        </a>
                        <a href="#profit-sharing" className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap group">
                            <Percent className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-premium-gold/70 group-hover:text-premium-gold transition-colors" />
                            <span>Pricing</span>
                        </a>
                    </div>

                    {/* Right Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-2.5">
                        <a
                            href={VERIFIED_PNL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 xl:px-3.5 xl:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap"
                        >
                            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                            <span>Verified P&L</span>
                        </a>
                        <button
                            onClick={handleLoginClick}
                            className="px-3 py-1.5 xl:px-4 xl:py-2 bg-gradient-to-r from-premium-gold to-yellow-600 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-black rounded-xl text-xs font-bold transition-all transform hover:scale-105 flex items-center gap-1.5 whitespace-nowrap"
                        >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Client Login</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={handleLoginClick}
                            className="px-2.5 py-1.5 bg-white/10 border border-white/10 rounded-lg text-white text-[11px] font-semibold"
                        >
                            Login
                        </button>
                        <button
                            className="text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5 text-premium-gold" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-3 p-4 bg-black/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-2 pb-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <a
                            href="#philosophy"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Brain className="w-4 h-4 text-premium-gold" />
                            <span>Philosophy</span>
                        </a>
                        <a
                            href="#performance"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <TrendingUp className="w-4 h-4 text-premium-gold" />
                            <span>Performance Metrics</span>
                        </a>
                        <a
                            href="#equity-curve"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Activity className="w-4 h-4 text-premium-gold" />
                            <span>Equity Curve</span>
                        </a>
                        <a
                            href="#ledger"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FileText className="w-4 h-4 text-premium-gold" />
                            <span>Daily Ledger</span>
                        </a>
                        <a
                            href="#profit-sharing"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Percent className="w-4 h-4 text-premium-gold" />
                            <span>Transparent Pricing</span>
                        </a>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                            <a
                                href={VERIFIED_PNL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                                <span>Verified P&L</span>
                            </a>
                            <a
                                href="https://wa.me/918300030123?text=Hi%20Mani%20Raja,%20I%20am%20interested%20in%20FiFTO%20HNI%20Portfolio%20Management."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
