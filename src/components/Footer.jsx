import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.png" alt="FiFTO Logo" className="h-12 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium portfolio management services designed for High Net-worth Individuals.
                            Transparency, Consistency, and Growth.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-premium-gold transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-premium-gold transition-colors">Our Strategy</a></li>
                            <li><a href="#" className="hover:text-premium-gold transition-colors">Verified P&L</a></li>
                            <li><a href="#" className="hover:text-premium-gold transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-premium-gold" />
                                <span>contact@fifto.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-premium-gold" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-premium-gold" />
                                <span>Mumbai, India</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-gold hover:text-black transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-gold hover:text-black transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-premium-gold hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} FiFTO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
