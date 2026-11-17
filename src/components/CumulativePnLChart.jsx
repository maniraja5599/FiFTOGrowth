import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceLine } from 'recharts';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import Minimize2 from 'lucide-react/dist/esm/icons/minimize-2';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        return (
            <div className="bg-black/95 border border-white/20 p-3 rounded-xl shadow-2xl z-50 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1 font-mono">{label}</p>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400 text-xs font-medium">Cumulative P&L:</span>
                    <span className={`font-mono font-bold text-sm ${value >= 0 ? 'text-premium-gold' : 'text-red-400'}`}>
                        {value >= 0 ? '+' : ''}{formatCurrency(value)}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

// Compact axis formatter for small screens
const formatAxisCurrency = (val) => {
    if (Math.abs(val) >= 10000000) {
        return `₹${(val / 10000000).toFixed(1)}Cr`;
    }
    if (Math.abs(val) >= 100000) {
        return `₹${(val / 100000).toFixed(1)}L`;
    }
    if (Math.abs(val) >= 1000) {
        return `₹${(val / 1000).toFixed(0)}K`;
    }
    return `₹${val}`;
};

const CumulativePnLChart = ({ data, selectedSegment }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!data || data.length === 0) return null;

    const chartData = data;

    return (
        <section id="equity-curve" className="py-12 sm:py-20 bg-premium-card/10 relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* Heading */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Compounded Capital Trajectory</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        <span>Cumulative </span>
                        <span className="gold-gradient-text">Equity Curve</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-normal">
                        Smooth upward drift reflecting disciplined risk controls and no catastrophic drawdown days.
                    </p>
                </div>

                <div
                    className={`transition-all duration-300 ${isFullScreen
                        ? 'fixed inset-0 z-50 bg-premium-dark p-4 sm:p-8 flex flex-col justify-between'
                        : 'glass-panel p-4 sm:p-6 md:p-8 relative group border border-white/10 shadow-2xl'
                        }`}
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <span>Portfolio Growth</span>
                                <span className="text-xs font-mono text-premium-gold bg-premium-gold/10 px-2 py-0.5 rounded-md border border-premium-gold/20">
                                    {selectedSegment}
                                </span>
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                Steady upward progression over all trading sessions
                            </p>
                        </div>

                        <button
                            onClick={() => setIsFullScreen(!isFullScreen)}
                            className="p-2 bg-black/40 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all self-end sm:self-auto"
                            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                            aria-label="Toggle Fullscreen"
                        >
                            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className={`${isFullScreen ? 'flex-1 min-h-[350px]' : 'h-[340px] sm:h-[420px] md:h-[480px]'} w-full relative`}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                                <defs>
                                    <linearGradient id="colorCumulativeGold" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#555"
                                    tick={{ fill: '#888', fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={25}
                                />
                                <YAxis
                                    stroke="#555"
                                    tick={{ fill: '#888', fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={formatAxisCurrency}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(212,175,55,0.2)', strokeWidth: 1.5 }} />
                                <ReferenceLine y={0} stroke="#444" strokeWidth={1} />
                                <Area
                                    type="monotone"
                                    dataKey="cumulativePnL"
                                    stroke="#D4AF37"
                                    fillOpacity={1}
                                    fill="url(#colorCumulativeGold)"
                                    strokeWidth={2.5}
                                />
                                {isFullScreen && <Brush dataKey="date" height={25} stroke="#D4AF37" fill="#111827" />}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CumulativePnLChart;
