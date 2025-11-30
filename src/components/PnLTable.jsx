import React from 'react';
import { pnlData } from '../utils/pnlData';
import { ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

const PnLTable = () => {
    // Reverse data to show newest first
    const sortedData = [...pnlData].reverse();

    const handleExport = () => {
        // Define CSV headers
        const headers = ['Date', 'Daily P&L', 'ROI (%)', 'Cumulative P&L'];

        // Convert data to CSV rows
        const rows = sortedData.map(day => [
            day.date,
            day.dailyPnL,
            day.roi,
            day.cumulativePnL
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Create blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `pnl_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="py-20 bg-premium-dark">
            <div className="container mx-auto px-6">
                <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-2">Daily Performance Ledger</h2>
                        <p className="text-gray-400">Detailed breakdown of every trading day.</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-premium-gold hover:text-premium-gold-hover"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="border border-white/10 rounded-xl overflow-hidden">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">ROI</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Cumulative</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 bg-premium-card/50">
                                    {sortedData.map((day, index) => (
                                        <tr key={index} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                                                {day.date}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right font-mono ${day.dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                <div className="flex items-center justify-end gap-2">
                                                    {day.dailyPnL >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                    {day.dailyPnL >= 0 ? '+' : ''}₹{day.dailyPnL.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-mono ${Number(day.roi) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {day.roi}%
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right font-mono ${day.cumulativePnL >= 0 ? 'text-premium-gold' : 'text-red-400'}`}>
                                                {day.cumulativePnL >= 0 ? '+' : ''}₹{day.cumulativePnL.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PnLTable;
