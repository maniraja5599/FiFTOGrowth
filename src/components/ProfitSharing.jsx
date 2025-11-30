import React from 'react';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

const ProfitSharing = () => {
    return (
        <section id="profit-sharing" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-premium-dark -z-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-gold/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Transparent</span> <span className="text-premium-gold">Pricing</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Fair and transparent pricing model designed for mutual growth. No hidden charges.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Fixed Costs Card */}
                    <div className="glass-panel p-8 md:p-10 relative group hover:border-premium-gold/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet className="w-24 h-24 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Fixed Operational Costs</h3>
                        <p className="text-gray-400 mb-8">Essential services for seamless account management.</p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-full bg-premium-gold/10 text-premium-gold">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white">Account assistance</h4>
                                    <p className="text-gray-400 text-sm mb-2">Dedicated support for account monitoring and risk management.</p>
                                    <div className="text-premium-gold font-mono font-bold text-xl">₹5,000 <span className="text-xs text-gray-500 font-normal">/ month</span></div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="p-2 rounded-full bg-premium-gold/10 text-premium-gold">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white">Trading platform fee</h4>
                                    <p className="text-gray-400 text-sm mb-2">Advanced algorithmic trading infrastructure and execution.</p>
                                    <div className="text-premium-gold font-mono font-bold text-xl">₹5,000 <span className="text-xs text-gray-500 font-normal">/ month</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-premium-gold" /> Payment Terms
                            </h4>
                            <p className="text-sm text-gray-400">
                                Fixed Operational Costs are payable on the <strong>1st of every month</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Profit Sharing Card */}
                    <div className="glass-panel p-8 md:p-10 relative group border-premium-gold/20 hover:border-premium-gold/50 transition-all duration-300">
                        {/* Glow Effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-premium-gold/0 via-premium-gold/10 to-premium-gold/0 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none blur-sm" />

                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-24 h-24 text-premium-gold" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Profit Sharing Model</h3>
                        <p className="text-gray-400 mb-8">Performance-based fees on Net P&L (after Tax & Brokerage).</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-3 border-b border-white/10">
                                <span className="text-gray-300">1 Cr - 5 Cr</span>
                                <span className="text-premium-gold font-bold font-mono text-lg">20%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border-b border-white/10">
                                <span className="text-gray-300">5 Cr - 10 Cr</span>
                                <span className="text-premium-gold font-bold font-mono text-lg">15%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border-b border-white/10">
                                <span className="text-gray-300">10 Cr - 20 Cr</span>
                                <span className="text-premium-gold font-bold font-mono text-lg">12%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border-b border-white/10">
                                <span className="text-gray-300">Above 20 Cr</span>
                                <span className="text-premium-gold font-bold font-mono text-lg">10%</span>
                            </div>
                        </div>

                        <div className="bg-premium-gold/10 border border-premium-gold/20 rounded-lg p-4">
                            <h4 className="text-premium-gold font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Terms & Conditions
                            </h4>
                            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                                <li>Profit sharing is calculated on <strong>Net P&L</strong>.</li>
                                <li>Brokerage is capped at maximum <strong>₹5 per order</strong>.</li>
                                <li>Profit sharing amount is payable on or before the <strong>5th of every month</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfitSharing;
