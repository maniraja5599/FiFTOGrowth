import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Brush } from 'recharts';
import BarChart2 from 'lucide-react/dist/esm/icons/bar-chart-2';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import Minimize2 from 'lucide-react/dist/esm/icons/minimize-2';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import PnLStats from './PnLStats';

const CustomTooltip = ({ active, payload, label, viewMode }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        return (
            <div className="bg-black/95 border border-white/20 p-3 rounded-xl shadow-2xl z-50 backdrop-blur-md">
                <p className="text-gray-400 text-xs mb-1 font-mono">{label}</p>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400 text-xs font-medium">
                        {viewMode === 'day' ? 'Daily P&L:' : viewMode === 'month' ? 'Monthly P&L:' : 'Quarterly P&L:'}
                    </span>
                    <span className={`font-mono font-bold text-sm ${value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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
    if (Math.abs(val) >= 100000) {
        return `₹${(val / 100000).toFixed(1)}L`;
    }
    if (Math.abs(val) >= 1000) {
        return `₹${(val / 1000).toFixed(0)}K`;
    }
    return `₹${val}`;
};

const PnLChart = ({ data, selectedSegment }) => {
    const [viewMode, setViewMode] = useState('month'); // 'day', 'month', 'quarter'
    const [chartType, setChartType] = useState('bar'); // 'bar', 'line'
    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!data || data.length === 0) return null;

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
                    rawKey: key,
                    dailyPnL: 0
                };
            }
            aggregated[key].dailyPnL += item.dailyPnL;
        });

        return Object.values(aggregated);
    }, [viewMode, data]);

    return (
        <section id="performance" className="py-12 sm:py-20 bg-premium-card/20 relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* Heading */}
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-premium-gold/10 border border-premium-gold/20 text-premium-gold text-xs font-semibold mb-3">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Audited Trading Statistics</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        <span>Verified </span>
                        <span className="gold-gradient-text">Performance Metrics</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-normal">
                        Empirical proof of edge across <span className="text-white font-semibold">{selectedSegment}</span>. Real executed positions with strict risk management.
                    </p>
                </div>

                {/* Detailed Stats Grid */}
                <PnLStats data={data} />

                {/* Chart Box */}
                <div
                    className={`transition-all duration-300 ${isFullScreen
                        ? 'fixed inset-0 z-50 bg-premium-dark p-4 sm:p-8 flex flex-col justify-between'
                        : 'glass-panel p-4 sm:p-6 md:p-8 relative group border border-white/10 shadow-2xl'
                        }`}
                >
                    {/* Controls Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <span>{viewMode === 'day' ? 'Daily' : viewMode === 'month' ? 'Monthly' : 'Quarterly'} P&L Bar</span>
                                <span className="text-xs font-mono text-premium-gold bg-premium-gold/10 px-2 py-0.5 rounded-md border border-premium-gold/20">
                                    {selectedSegment}
                                </span>
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                Showing {chartData.length} data intervals
                            </p>
                        </div>

                        {/* Interactive Toggle Controls */}
                        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
                            {/* View Mode Toggle */}
                            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                                {['day', 'month', 'quarter'].map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${viewMode === mode
                                            ? 'bg-gradient-to-r from-premium-gold to-yellow-600 text-black font-bold shadow-sm'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>

                            {/* Chart Type Toggle */}
                            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`p-1.5 rounded-lg transition-all ${chartType === 'bar'
                                        ? 'bg-white/20 text-white shadow-sm'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title="Bar Chart"
                                    aria-label="Bar Chart"
                                >
                                    <BarChart2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setChartType('line')}
                                    className={`p-1.5 rounded-lg transition-all ${chartType === 'line'
                                        ? 'bg-white/20 text-white shadow-sm'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title="Line Chart"
                                    aria-label="Line Chart"
                                >
                                    <Activity className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Fullscreen Button */}
                            <button
                                onClick={() => setIsFullScreen(!isFullScreen)}
                                className="p-2 bg-black/40 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                                aria-label="Toggle Fullscreen"
                            >
                                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className={`${isFullScreen ? 'flex-1 min-h-[350px]' : 'h-[340px] sm:h-[420px] md:h-[480px]'} w-full relative`}>
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'bar' ? (
                                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#555"
                                        tick={{ fill: '#888', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        minTickGap={20}
                                    />
                                    <YAxis
                                        stroke="#555"
                                        tick={{ fill: '#888', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={formatAxisCurrency}
                                    />
                                    <Tooltip content={<CustomTooltip viewMode={viewMode} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                    <ReferenceLine y={0} stroke="#444" strokeWidth={1} />
                                    <Bar dataKey="dailyPnL" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.dailyPnL >= 0 ? '#10B981' : '#EF4444'}
                                                opacity={0.9}
                                            />
                                        ))}
                                    </Bar>
                                    {isFullScreen && <Brush dataKey="date" height={25} stroke="#D4AF37" fill="#111827" />}
                                </BarChart>
                            ) : (
                                <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#555"
                                        tick={{ fill: '#888', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        minTickGap={20}
                                    />
                                    <YAxis
                                        stroke="#555"
                                        tick={{ fill: '#888', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={formatAxisCurrency}
                                    />
                                    <Tooltip content={<CustomTooltip viewMode={viewMode} />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                                    <ReferenceLine y={0} stroke="#444" strokeWidth={1} />
                                    <Line
                                        type="monotone"
                                        dataKey="dailyPnL"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    {isFullScreen && <Brush dataKey="date" height={25} stroke="#D4AF37" fill="#111827" />}
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PnLChart;
