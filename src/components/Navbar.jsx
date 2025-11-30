import React, { useState, useEffect } from 'react';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-premium-dark/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center cursor-pointer group">
                        {/* Main Logo Text */}
                        {/* Main Logo Text */}
                        <div className="relative font-black text-4xl leading-none" style={{
                            fontFamily: '"Anton", sans-serif',
                            letterSpacing: '0.1em'
                        }}>
                            <span className="text-green-700" style={{
                                background: 'linear-gradient(to bottom, #008000, #004d00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>F</span>
                            <span className="relative inline-block">
                                <span className="text-green-700" style={{
                                    background: 'linear-gradient(to bottom, #008000, #004d00)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>i</span>
                                {/* Red Dot */}
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-red-600 rounded-full shadow-sm border border-red-400"></span>
                            </span>
                            <span className="text-green-700" style={{
                                background: 'linear-gradient(to bottom, #008000, #004d00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>F</span>
                            <span className="text-green-700" style={{
                                background: 'linear-gradient(to bottom, #008000, #004d00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>T</span>
                            <span className="text-red-600" style={{
                                background: 'linear-gradient(to bottom, #ff3333, #cc0000)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>O</span>
                        </div>

                        {/* Animated Separator Line */}
                        <div className="w-full flex items-center justify-center gap-1 my-1 overflow-hidden">
                            {/* Left Green Line */}
                            <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-green-700 to-green-600">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-green-600 rounded-full shadow-[0_0_5px_1px_rgba(21,128,61,0.8)] animate-pulse"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full animate-moveRight"></div>
                            </div>

                            {/* Right Red Line */}
                            <div className="relative h-[1px] w-full bg-gradient-to-l from-transparent via-red-700 to-red-600">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_5px_1px_rgba(185,28,28,0.8)] animate-pulse"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full animate-moveLeft"></div>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="text-[0.55rem] md:text-xs font-medium tracking-wide uppercase whitespace-nowrap">
                            <span className="text-green-500">Your trusted partner in </span>
                            <span className="text-red-500">financial growth</span>
                        </div>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#philosophy" className="text-gray-300 hover:text-white transition-colors">Philosophy</a>
                        <a href="#performance" className="text-gray-300 hover:text-white transition-colors">Performance</a>
                        <a href="#live-tracking" className="text-gray-300 hover:text-white transition-colors">Live Tracking</a>
                        <button className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm font-medium transition-all">
                            Client Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-premium-dark border-b border-white/10 p-6 flex flex-col gap-4">
                    <a href="#philosophy" className="text-gray-300 hover:text-white">Philosophy</a>
                    <a href="#performance" className="text-gray-300 hover:text-white">Performance</a>
                    <a href="#live-tracking" className="text-gray-300 hover:text-white">Live Tracking</a>
                    <button className="w-full py-3 bg-premium-gold text-black font-bold rounded-lg">
                        Client Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
