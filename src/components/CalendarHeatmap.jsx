import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

const CalendarHeatmap = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Helper to get color based on P&L
    const getColor = (pnl) => {
        if (!pnl || pnl === 0) return 'bg-white/5 border border-white/5';
        if (pnl > 0) {
            if (pnl > 60000) return 'bg-emerald-500 border border-emerald-400/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]';
            if (pnl > 25000) return 'bg-emerald-600/85 border border-emerald-500/40';
            return 'bg-emerald-700/65 border border-emerald-600/30';
        } else {
            if (pnl < -60000) return 'bg-red-500 border border-red-400/80 shadow-[0_0_6px_rgba(239,68,68,0.4)]';
            if (pnl < -25000) return 'bg-red-600/85 border border-red-500/40';
            return 'bg-red-700/65 border border-red-600/30';
        }
    };

    // Group data by month
    const months = {};
    data.forEach(day => {
        const date = new Date(day.rawDate);
        const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!months[monthKey]) months[monthKey] = [];
        months[monthKey].push(day);
    });

    const monthEntries = Object.entries(months);
    const startDate = data[0]?.date || '';
    const endDate = data[data.length - 1]?.date || '';

    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className="glass-panel p-4 sm:p-6 max-w-5xl mx-auto my-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-premium-gold/10 text-premium-gold">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                            <span>Consistency</span>
                            <span className="text-premium-gold">Heatmap</span>
                        </h3>
                        <p className="text-xs text-gray-400 font-mono">
                            {startDate} &rarr; {endDate}
                        </p>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-500/80"></span>
                        <span>Loss</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-white/10"></span>
                        <span>Off</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/90"></span>
                        <span>Profit</span>
                    </div>
                </div>
            </div>

            {/* Mobile swipe hint */}
            <div className="md:hidden text-[11px] text-gray-400 font-mono mb-2 flex items-center justify-between">
                <span>&larr; Swipe months horizontally &rarr;</span>
                <span className="text-premium-gold">{monthEntries.length} Months</span>
            </div>

            {/* Months Container: Horizontal Scroll on Mobile, Responsive Grid on Desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 overflow-x-auto pb-2 custom-scrollbar snap-x snap-mandatory">
                {monthEntries.map(([month, days]) => {
                    const winDays = days.filter(d => d.dailyPnL > 0).length;
                    const lossDays = days.filter(d => d.dailyPnL < 0).length;
                    return (
                        <div
                            key={month}
                            className="min-w-[270px] sm:min-w-[290px] md:min-w-0 flex-1 p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-premium-gold/30 transition-colors snap-center"
                        >
                            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-white/5">
                                <span className="text-xs font-bold text-gray-200 font-mono">{month}</span>
                                <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                                    {winDays}W / {lossDays}L
                                </span>
                            </div>

                            {/* Day headers */}
                            <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
                                {daysOfWeek.map((d, i) => (
                                    <span key={i} className="text-[9px] text-gray-500 font-mono">{d}</span>
                                ))}
                            </div>

                            {/* Day squares */}
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    const isProfit = day.dailyPnL > 0;
                                    const isLoss = day.dailyPnL < 0;
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full aspect-square rounded-[3px] ${getColor(day.dailyPnL)} relative group cursor-pointer transition-transform hover:scale-125 hover:z-20`}
                                            title={`${day.date}: ${formatCurrency(day.dailyPnL)}`}
                                        >
                                            {/* Hover Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-black/95 text-white text-[10px] p-2 rounded-lg whitespace-nowrap z-30 border border-white/20 shadow-2xl pointer-events-none">
                                                <div className="font-semibold text-gray-300">{day.date}</div>
                                                <div className={`font-mono font-bold ${isProfit ? 'text-emerald-400' : isLoss ? 'text-red-400' : 'text-gray-400'}`}>
                                                    {isProfit ? '+' : ''}{formatCurrency(day.dailyPnL)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarHeatmap;
