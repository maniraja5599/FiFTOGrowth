import React from 'react';
import { Play, Activity } from 'lucide-react';

const LiveTracking = () => {
    return (
        <section className="py-20 bg-premium-dark relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        Live Now
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Everyday Live Trading</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Witness our execution in real-time. We believe in absolute transparency.
                        Watch our live trading sessions every market day.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-premium-gold to-blue-600 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
                        {/* Video Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 group cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity" />
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                            </div>

                            <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                                    <div className="text-xs text-gray-400">Current P&L</div>
                                    <div className="text-lg font-mono text-green-400">+₹1,24,500</div>
                                </div>
                                <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                                    <div className="text-xs text-gray-400">Status</div>
                                    <div className="flex items-center gap-2 text-sm text-white">
                                        <Activity className="w-4 h-4 text-premium-gold" /> Active
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveTracking;
