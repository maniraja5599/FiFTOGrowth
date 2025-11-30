import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down';
import PnLStats from './PnLStats';
import CalendarHeatmap from './CalendarHeatmap';
import { pnlData as data } from '../utils/pnlData';

const CustomTooltip = ({ active, payload, label, viewMode }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;

        return (
            <div className="bg-premium-card border border-white/10 p-3 rounded-lg shadow-xl z-50">
                <p className="text-gray-400 text-xs mb-2">{label}</p>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-400 text-xs">
                        {viewMode === 'day' ? 'Daily P&L:' : viewMode === 'month' ? 'Monthly P&L:' : 'Quarterly P&L:'}
                    </span>
                    <span className={`font-mono font-bold text-sm ${value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {value >= 0 ? '+' : ''}₹{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const PnLChart = () => {
    const [viewMode, setViewMode] = useState('day'); // 'day', 'month', 'quarter'

    if (!data || data.length === 0) return null;

    const winDays = data.filter(d => d.dailyPnL > 0).length;
    const lossDays = data.filter(d => d.dailyPnL <= 0).length;

    // Aggregate Data Logic
    const chartData = useMemo(() => {
        if (viewMode === 'day') return data;

        const aggregated = {};

        data.forEach(item => {
            const date = new Date(item.rawDate);
            let key;
            let label;

            if (viewMode === 'month') {
                key = `${date.getFullYear()}-${date.getMonth()}`;
                label = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            } else if (viewMode === 'quarter') {
                const quarter = Math.floor(date.getMonth() / 3) + 1;
                key = `${date.getFullYear()}-Q${quarter}`;
                label = `Q${quarter} ${date.getFullYear()}`;
            }

            if (!aggregated[key]) {
                aggregated[key] = {
                    date: label,
                    rawKey: key, // For sorting if needed
                    dailyPnL: 0
                };
            }
            aggregated[key].dailyPnL += item.dailyPnL;
        });

        return Object.values(aggregated);
    }, [viewMode]);

    return (
        <section id="performance" className="py-20 bg-premium-card/30">
            <div className="container mx-auto px-6">
                {/* New Detailed Stats Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-white via-white to-premium-gold bg-clip-text text-transparent">
                        Verified Consistency <br />
                        Key Performance Metrics
                    </h2>
                    <PnLStats data={data} />
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-12 mb-12">
                    <div className="w-full lg:w-1/3">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-white to-premium-gold bg-clip-text text-transparent">Performance Overview</h3>
                        <p className="text-gray-400 mb-8 text-lg">
                            Transparency is our currency. View our performance broken down by day, month, or quarter.
                            Consistent growth with controlled risk.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{winDays} Green Days</div>
                                    <div className="text-xs text-gray-500">Consistent Profits</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{lossDays} Red Days</div>
                                    <div className="text-xs text-gray-500">Controlled Losses</div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://verified.flattrade.in/pnl/PO0e9bb3329bca40ad8b3edd96638994cc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-premium-gold hover:bg-premium-gold-hover text-black font-bold rounded-lg transition-all"
                        >
                            Verify on Flattrade <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="w-full lg:w-2/3 space-y-8">
                        {/* P&L Chart */}
                        <div className="glass-panel p-6 md:p-8 h-[500px]">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-white to-premium-gold bg-clip-text text-transparent">
                                    {viewMode === 'day' ? 'Daily' : viewMode === 'month' ? 'Monthly' : 'Quarterly'} P&L
                                </h3>

                                {/* View Toggles */}
                                <div className="flex bg-black/20 p-1 rounded-lg">
                                    {['day', 'month', 'quarter'].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => setViewMode(mode)}
                                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === mode
                                                ? 'bg-premium-gold text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                                        <span className="text-gray-400">Profit</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                                        <span className="text-gray-400">Loss</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#666"
                                            tick={{ fill: '#888', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            tick={{ fill: '#888', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `₹${value / 1000}k`}
                                        />
                                        <Tooltip content={<CustomTooltip viewMode={viewMode} />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <ReferenceLine y={0} stroke="#666" />
                                        <Bar dataKey="dailyPnL" radius={[2, 2, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.dailyPnL >= 0 ? '#4ade80' : '#f87171'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Calendar Heatmap Section */}
                <CalendarHeatmap data={data} />
            </div>
        </section>
    );
};

export default PnLChart;
