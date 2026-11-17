import React from 'react';
import { formatCurrency } from '../utils/formatters';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right';
import ArrowDownRight from 'lucide-react/dist/esm/icons/arrow-down-right';
import Download from 'lucide-react/dist/esm/icons/download';
import FileSpreadsheet from 'lucide-react/dist/esm/icons/file-spreadsheet';

const PnLTable = ({ data, selectedSegment }) => {
    let runningRoi = 0;
    const dataWithCumulativeRoi = data.map(day => {
        runningRoi += parseFloat(day.roi || 0);
        return {
            ...day,
            cumulativeRoi: runningRoi.toFixed(2)
        };
    });

    // Reverse data to show newest first
    const sortedData = [...dataWithCumulativeRoi].reverse();

    const handleExport = () => {
        const headers = ['Date', 'Daily P&L', 'ROI (%)', 'Cumulative ROI (%)', 'Cumulative P&L'];
        const rows = sortedData.map(day => [
            day.date,
            day.dailyPnL,
            day.roi,
            day.cumulativeRoi,
            day.cumulativePnL
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `${selectedSegment}_pnl_ledger_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="py-12 sm:py-16 bg-premium-dark relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs text-premium-gold font-mono uppercase tracking-wider mb-1">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Audit Trail</span>
                        </div>
                        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            <span>Daily Performance </span>
                            <span className="gold-gradient-text">Ledger</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-0.5">
                            Complete session-by-session trade record for <span className="text-white font-semibold">{selectedSegment}</span>.
                        </p>
                    </div>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-premium-gold hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                    </button>
                </div>

                {/* Mobile Swipe Hint */}
                <div className="sm:hidden text-center mb-2 text-[11px] text-gray-400 font-mono flex items-center justify-center gap-1.5">
                    <span>&larr; Swipe horizontally to view full ledger &rarr;</span>
                </div>

                {/* Table Container with Smooth Horizontal Scroll */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-premium-card/40 backdrop-blur-md shadow-2xl">
                    <div className="max-h-[500px] overflow-y-auto overflow-x-auto custom-scrollbar">
                        <table className="min-w-[600px] w-full divide-y divide-white/10 text-left">
                            <thead className="bg-black/90 sticky top-0 z-20 backdrop-blur-md">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Date</th>
                                    <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Session P&L</th>
                                    <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Session ROI</th>
                                    <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Cum. ROI</th>
                                    <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono">Cumulative Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-transparent font-mono text-xs">
                                {sortedData.map((day, index) => {
                                    const isProfit = day.dailyPnL >= 0;
                                    return (
                                        <tr key={index} className="hover:bg-white/[0.04] transition-colors group">
                                            <td className="px-4 py-2.5 whitespace-nowrap text-gray-300 border-l-2 border-transparent group-hover:border-premium-gold transition-all">
                                                {day.date}
                                            </td>
                                            <td className={`px-4 py-2.5 whitespace-nowrap font-bold text-right ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                                                <div className="flex items-center justify-end gap-1">
                                                    {isProfit ? <ArrowUpRight className="w-3.5 h-3.5 opacity-80" /> : <ArrowDownRight className="w-3.5 h-3.5 opacity-80" />}
                                                    <span>{isProfit ? '+' : ''}{formatCurrency(day.dailyPnL)}</span>
                                                </div>
                                            </td>
                                            <td className={`px-4 py-2.5 whitespace-nowrap text-right ${Number(day.roi) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {day.roi}%
                                            </td>
                                            <td className={`px-4 py-2.5 whitespace-nowrap text-right ${Number(day.cumulativeRoi) >= 0 ? 'text-premium-gold' : 'text-red-400'}`}>
                                                {day.cumulativeRoi}%
                                            </td>
                                            <td className={`px-4 py-2.5 whitespace-nowrap font-bold text-right ${day.cumulativePnL >= 0 ? 'text-premium-gold' : 'text-red-400'}`}>
                                                {day.cumulativePnL >= 0 ? '+' : ''}{formatCurrency(day.cumulativePnL)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PnLTable;
