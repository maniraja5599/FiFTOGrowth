import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="FiFTO Logo" className="h-10 w-auto" />
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Philosophy</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Performance</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Live Tracking</a>
                        <button className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm font-medium transition-all">
                            Client Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-premium-dark border-b border-white/10 p-6 flex flex-col gap-4">
                    <a href="#" className="text-gray-300 hover:text-white">Philosophy</a>
                    <a href="#" className="text-gray-300 hover:text-white">Performance</a>
                    <a href="#" className="text-gray-300 hover:text-white">Live Tracking</a>
                    <button className="w-full py-3 bg-premium-gold text-black font-bold rounded-lg">
                        Client Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
