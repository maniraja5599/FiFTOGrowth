import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { CheckCircle, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { pnlData as data } from '../utils/pnlData';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const daily = payload.find(p => p.dataKey === 'dailyPnL')?.value || 0;
        const cumulative = payload.find(p => p.dataKey === 'cumulativePnL')?.value || 0;

        return (
            <div className="bg-premium-card border border-white/10 p-3 rounded-lg shadow-xl z-50">
                <p className="text-gray-400 text-xs mb-2">{label}</p>
                <div className="space-y-1">
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-400 text-xs">Daily:</span>
                        <span className={`font-mono font-bold text-sm ${daily >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {daily >= 0 ? '+' : ''}₹{daily.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-400 text-xs">Net P&L:</span>
                        <span className={`font-mono font-bold text-sm ${cumulative >= 0 ? 'text-premium-gold' : 'text-red-400'}`}>
                            {cumulative >= 0 ? '+' : ''}₹{cumulative.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const PnLChart = () => {
    const totalPnL = data[data.length - 1].cumulativePnL;
    const winDays = data.filter(d => d.dailyPnL > 0).length;
    const lossDays = data.filter(d => d.dailyPnL <= 0).length;
    const winRate = Math.round((winDays / (winDays + lossDays)) * 100);

    return (
        <section className="py-20 bg-premium-card/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-start gap-12">
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Verified Consistency <br />
                            <span className="text-premium-gold">Daily Performance</span>
                        </h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Transparency is our currency. View our day-to-day performance from the start of the year.
                            The green line represents our consistent equity growth.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-sm text-gray-400 mb-1">Net P&L (YTD)</div>
                                <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                                <div className="text-xl font-bold text-premium-gold">
                                    {winRate}%
                                </div>
                            </div>
                        </div>

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
                            href="https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-premium-gold hover:bg-premium-gold-hover text-black font-bold rounded-lg transition-all"
                        >
                            Verify on Flattrade <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="w-full lg:w-2/3">
                        <div className="glass-panel p-6 md:p-8 h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-semibold text-white">Equity Curve & Daily P&L</h3>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-premium-gold rounded-full"></div>
                                        <span className="text-gray-400">Equity Curve</span>
                                    </div>
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
                                    <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#666"
                                            tick={{ fill: '#888', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            interval={30} // Show label every ~30 days
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            stroke="#666"
                                            tick={{ fill: '#888', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `₹${value / 1000}k`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            stroke="#666"
                                            tick={{ fill: '#D4AF37', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `₹${value / 100000}L`}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                        <ReferenceLine y={0} yAxisId="left" stroke="#666" />

                                        <Bar yAxisId="left" dataKey="dailyPnL" radius={[2, 2, 0, 0]}>
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.dailyPnL >= 0 ? '#4ade80' : '#f87171'} />
                                            ))}
                                        </Bar>

                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="cumulativePnL"
                                            stroke="#D4AF37"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PnLChart;
