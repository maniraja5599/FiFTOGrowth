import React from 'react';
import { VERIFIED_PNL_URL } from '../config';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Youtube from 'lucide-react/dist/esm/icons/youtube';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Send from 'lucide-react/dist/esm/icons/send';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 sm:pt-20 pb-10 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
                    {/* Column 1: Brand & Bio */}
                    <div className="lg:col-span-2 space-y-4">
                        <a href="/" className="inline-flex flex-col items-start cursor-pointer group">
                            {/* Main Logo Text */}
                            <div className="relative text-4xl sm:text-5xl leading-none flex items-center" style={{
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
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full shadow-sm border border-red-400"></span>
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

                            {/* Tagline */}
                            <div className="mt-2 text-xs sm:text-sm font-semibold tracking-wide uppercase">
                                <span className="text-emerald-400">Your trusted partner in </span>
                                <span className="text-red-400">financial growth</span>
                            </div>

                            {/* Decorative Lines */}
                            <div className="flex items-center gap-2 mt-1 w-full max-w-[220px]">
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-green-600 to-transparent rounded-full"></div>
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
                            </div>
                        </a>

                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md pt-2">
                            Exclusive portfolio management for capital above ₹1 Crore. We focus on non-correlated quantitative returns, deterministic capital preservation, and institutional execution clarity.
                        </p>

                        {/* Social Icons */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-2">
                            <a
                                href="https://wa.me/918300030123"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl icon-container-3d flex items-center justify-center hover:border-emerald-500/50 transition-all text-emerald-400 hover:scale-105"
                                title="WhatsApp Founder"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/maniraja5599/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl icon-container-3d flex items-center justify-center hover:border-blue-500/50 transition-all group hover:scale-105"
                                title="LinkedIn"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 icon-3d-blue" />
                            </a>
                            <a
                                href="https://telegram.me/s/easytrademarket"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl icon-container-3d flex items-center justify-center hover:border-blue-400/50 transition-all group hover:scale-105"
                                title="Telegram Channel"
                                aria-label="Telegram"
                            >
                                <Send className="w-5 h-5 icon-3d-blue" />
                            </a>
                            <a
                                href="https://www.instagram.com/fifto.official/?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl icon-container-3d flex items-center justify-center hover:border-pink-500/50 transition-all group hover:scale-105"
                                title="Instagram"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 icon-3d-pink" />
                            </a>
                            <a
                                href="https://www.youtube.com/@OfficialFiFTO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl icon-container-3d flex items-center justify-center hover:border-red-500/50 transition-all group hover:scale-105"
                                title="YouTube Channel"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5 icon-3d-red" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider font-mono">Platform</h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li><a href="#philosophy" className="hover:text-premium-gold transition-colors">Investment Philosophy</a></li>
                            <li><a href="#performance" className="hover:text-premium-gold transition-colors">Verified Performance</a></li>
                            <li><a href="#equity-curve" className="hover:text-premium-gold transition-colors">Equity Curve</a></li>
                            <li><a href="#ledger" className="hover:text-premium-gold transition-colors">Session Ledger</a></li>
                            <li><a href="#profit-sharing" className="hover:text-premium-gold transition-colors">Pricing & Tiers</a></li>
                            <li><a href={VERIFIED_PNL_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">Flattrade Verified P&L &rarr;</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div id="contact">
                        <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider font-mono">Direct Desk</h4>
                        <ul className="space-y-3 text-xs sm:text-sm">
                            <li className="flex items-start gap-2.5">
                                <Phone className="w-4 h-4 text-premium-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-500 block text-[10px] font-mono">Phone & WhatsApp</span>
                                    <a href="tel:+918300030123" className="text-white hover:text-premium-gold font-mono transition-colors">+91 83000 30123</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Mail className="w-4 h-4 text-premium-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-500 block text-[10px] font-mono">Email</span>
                                    <a href="mailto:official.fifto@gmail.com" className="text-white hover:text-premium-gold transition-colors">official.fifto@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-premium-gold shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-500 block text-[10px] font-mono">Desk Location</span>
                                    <span className="text-white">Namakkal, Tamil Nadu, India</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Disclaimers & Copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2 text-center md:text-left">
                        <ShieldAlert className="w-4 h-4 text-premium-gold shrink-0" />
                        <span>
                            <strong>SEBI Disclaimer:</strong> FiFTO is an algorithmic trading analytics research firm. We do not provide public advisory or guaranteed investment schemes.
                        </span>
                    </div>
                    <div className="text-center md:text-right whitespace-nowrap font-mono text-[11px]">
                        &copy; {new Date().getFullYear()} FiFTO. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
