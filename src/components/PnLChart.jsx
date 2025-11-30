import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Brush } from 'recharts';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down';
import BarChart2 from 'lucide-react/dist/esm/icons/bar-chart-2';
import ShowChart from 'lucide-react/dist/esm/icons/activity'; // Using Activity as Line Chart icon
import PieChart from 'lucide-react/dist/esm/icons/pie-chart'; // Using PieChart as Cumulative icon
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import Minimize2 from 'lucide-react/dist/esm/icons/minimize-2';
import PnLStats from './PnLStats';
import CalendarHeatmap from './CalendarHeatmap';
import { pnlData as data } from '../utils/pnlData';

const CustomTooltip = ({ active, payload, label, viewMode, chartType }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const isCumulative = chartType === 'cumulative';

        return (
            <div className="bg-premium-card border border-white/10 p-3 rounded-lg shadow-xl z-50">
                <p className="text-gray-400 text-xs mb-2">{label}</p>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-400 text-xs">
                        {isCumulative ? 'Cumulative P&L:' : viewMode === 'day' ? 'Daily P&L:' : viewMode === 'month' ? 'Monthly P&L:' : 'Quarterly P&L:'}
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
    const [viewMode, setViewMode] = useState('month'); // Default to 'month'
    const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'cumulative'
    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!data || data.length === 0) return null;

    const winDays = data.filter(d => d.dailyPnL > 0).length;
    const lossDays = data.filter(d => d.dailyPnL <= 0).length;

    // Aggregate Data Logic
    const chartData = useMemo(() => {
        if (chartType === 'cumulative') return data; // Cumulative is always daily based on current data structure
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
    }, [viewMode, chartType]);

    // Determine if Brush should be shown (always in full screen, or if manually enabled - but we removed manual toggle for full screen logic)
    // The user request implies "zoom" = "full screen mode". So in full screen, we enable brush.
    const showBrush = isFullScreen;

    return (
        <section id="performance" className="py-20 bg-premium-card/30">
            <div className="container mx-auto px-6">
                {/* New Detailed Stats Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        <span className="text-white">Verified Consistency</span> <br />
                        <span className="text-premium-gold">Key Performance Metrics</span>
                    </h2>
                    <PnLStats data={data} />
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-12 mb-12">
                    <div className="w-full lg:w-1/3">
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-white">Performance</span> <span className="text-premium-gold">Overview</span>
                        </h3>
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
                        {/* P&L Chart Container */}
                        <div
                            className={`transition-all duration-300 ${isFullScreen
                                    ? 'fixed inset-0 z-50 bg-premium-dark p-6 md:p-10 flex flex-col'
                                    : 'glass-panel p-6 md:p-8 h-[550px] relative group'
                                }`}
                        >
                            {/* Highlight Effect (Only in normal mode) */}
                            {!isFullScreen && (
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-premium-gold/0 via-premium-gold/20 to-premium-gold/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-sm" />
                            )}

                            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 relative z-10">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <span className="text-white">
                                        {chartType === 'cumulative' ? 'Cumulative' : viewMode === 'day' ? 'Daily' : viewMode === 'month' ? 'Monthly' : 'Quarterly'}
                                    </span>
                                    <span className="text-premium-gold">P&L</span>
                                    {chartType === 'cumulative' && <span className="text-xs bg-premium-gold/20 text-premium-gold px-2 py-0.5 rounded-full border border-premium-gold/30">Equity Curve</span>}
                                </h3>

                                <div className="flex items-center gap-4">
                                    {/* Chart Type Toggle */}
                                    <div className="flex bg-black/20 p-1 rounded-lg border border-white/5">
                                        <button
                                            onClick={() => setChartType('bar')}
                                            className={`p-1.5 rounded-md transition-all ${chartType === 'bar'
                                                ? 'bg-premium-gold text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                            title="Bar Chart"
                                        >
                                            <BarChart2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setChartType('line')}
                                            className={`p-1.5 rounded-md transition-all ${chartType === 'line'
                                                ? 'bg-premium-gold text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                            title="Line Chart"
                                        >
                                            <ShowChart className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setChartType('cumulative')}
                                            className={`p-1.5 rounded-md transition-all relative ${chartType === 'cumulative'
                                                ? 'bg-premium-gold text-black shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                            title="Cumulative P&L"
                                        >
                                            <PieChart className="w-4 h-4" />
                                            {/* Highlight Dot */}
                                            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black" />
                                        </button>
                                    </div>

                                    {/* Full Screen / Zoom Toggle */}
                                    <button
                                        onClick={() => setIsFullScreen(!isFullScreen)}
                                        className={`p-2 rounded-lg border transition-all ${isFullScreen
                                            ? 'bg-premium-gold/20 border-premium-gold text-premium-gold'
                                            : 'bg-black/20 border-white/5 text-gray-400 hover:text-white'}`}
                                        title={isFullScreen ? "Exit Full Screen" : "Full Screen Zoom"}
                                    >
                                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </button>

                                    {/* View Toggles (Hidden for Cumulative) */}
                                    {chartType !== 'cumulative' && (
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
                                    )}
                                </div>
                            </div>

                            <div className={`${isFullScreen ? 'flex-1 min-h-0' : 'h-[450px]'} w-full relative z-10`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    {chartType === 'cumulative' ? (
                                        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                                            <defs>
                                                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
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
                                            <Tooltip content={<CustomTooltip viewMode={viewMode} chartType={chartType} />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                                            <ReferenceLine y={0} stroke="#666" />
                                            <Area
                                                type="monotone"
                                                dataKey="cumulativePnL"
                                                stroke="#D4AF37"
                                                fillOpacity={1}
                                                fill="url(#colorCumulative)"
                                                strokeWidth={2}
                                            />
                                            {showBrush && <Brush dataKey="date" height={30} stroke="#D4AF37" fill="#1f2937" />}
                                        </AreaChart>
                                    ) : chartType === 'bar' ? (
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
                                            <Tooltip content={<CustomTooltip viewMode={viewMode} chartType={chartType} />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                            <ReferenceLine y={0} stroke="#666" />
                                            <Bar dataKey="dailyPnL" radius={[2, 2, 0, 0]}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.dailyPnL >= 0 ? '#4ade80' : '#f87171'} />
                                                ))}
                                            </Bar>
                                            {showBrush && <Brush dataKey="date" height={30} stroke="#D4AF37" fill="#1f2937" />}
                                        </BarChart>
                                    ) : (
                                        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
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
                                            <Tooltip content={<CustomTooltip viewMode={viewMode} chartType={chartType} />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                                            <ReferenceLine y={0} stroke="#666" />
                                            <Line
                                                type="monotone"
                                                dataKey="dailyPnL"
                                                stroke="#D4AF37"
                                                strokeWidth={2}
                                                dot={{ r: 3, fill: '#D4AF37', strokeWidth: 0 }}
                                                activeDot={{ r: 6, fill: '#fff' }}
                                            />
                                            {showBrush && <Brush dataKey="date" height={30} stroke="#D4AF37" fill="#1f2937" />}
                                        </LineChart>
                                    )}
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
