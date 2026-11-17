import React from 'react';
import { formatCurrency } from '../utils/formatters';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Scale from 'lucide-react/dist/esm/icons/scale';
import Target from 'lucide-react/dist/esm/icons/target';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';

const DualStatCard = ({ title, leftData, rightData, icon: Icon }) => {
    return (
        <div className="p-4 sm:p-5 bg-premium-card/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-premium-gold/30 hover:bg-premium-card/70 transition-all duration-300 group shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 sm:p-2 rounded-lg bg-premium-gold/10 text-premium-gold group-hover:bg-premium-gold/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base tracking-wide">{title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 relative">
                {/* Vertical Divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

                {/* Left Side */}
                <div className="text-center px-1">
                    <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-medium">{leftData.label}</div>
                    <div className={`text-base sm:text-xl font-bold font-mono truncate ${leftData.color || 'text-white'}`}>
                        {leftData.value}
                    </div>
                    {leftData.subValue && <div className="text-[10px] text-gray-500 mt-0.5">{leftData.subValue}</div>}
                </div>

                {/* Right Side */}
                <div className="text-center px-1">
                    <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1 font-medium">{rightData.label}</div>
                    <div className={`text-base sm:text-xl font-bold font-mono truncate ${rightData.color || 'text-white'}`}>
                        {rightData.value}
                    </div>
                    {rightData.subValue && <div className="text-[10px] text-gray-500 mt-0.5">{rightData.subValue}</div>}
                </div>
            </div>
        </div>
    );
};

const PnLStats = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Calculations
    const totalDays = data.length;
    const winDays = data.filter(d => d.dailyPnL > 0).length;
    const lossDays = data.filter(d => d.dailyPnL < 0).length;
    const winRate = ((winDays / totalDays) * 100).toFixed(1);

    const profits = data.filter(d => d.dailyPnL > 0).map(d => d.dailyPnL);
    const losses = data.filter(d => d.dailyPnL < 0).map(d => d.dailyPnL);

    const maxProfit = profits.length ? Math.max(...profits) : 0;
    const maxLoss = losses.length ? Math.min(...losses) : 0;

    const totalProfit = profits.reduce((a, b) => a + b, 0);
    const totalLoss = Math.abs(losses.reduce((a, b) => a + b, 0));

    const avgWin = profits.length ? totalProfit / profits.length : 0;
    const avgLoss = losses.length ? totalLoss / losses.length : 0;

    const profitFactor = totalLoss > 0 ? (totalProfit / totalLoss).toFixed(2) : '∞';
    const expectancy = (avgWin * (winRate / 100)) - (avgLoss * ((100 - winRate) / 100));

    // Max Drawdown Calculation
    let peak = -Infinity;
    let maxDrawdown = 0;
    let runningPnL = 0;

    data.forEach(d => {
        runningPnL = d.cumulativePnL;
        if (runningPnL > peak) peak = runningPnL;
        const drawdown = peak - runningPnL;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    const netPnL = data.reduce((acc, curr) => acc + curr.dailyPnL, 0);
    const totalROI = ((netPnL / 10000000) * 100).toFixed(2);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-6xl mx-auto">
            {/* Card 1: Return & Risk */}
            <DualStatCard
                title="Return & Risk"
                icon={Activity}
                leftData={{
                    label: "Total ROI",
                    value: `${totalROI}%`,
                    color: Number(totalROI) > 0 ? "text-emerald-400" : "text-red-400",
                    subValue: "On ₹1 Cr Capital"
                }}
                rightData={{
                    label: "Max Drawdown",
                    value: formatCurrency(maxDrawdown),
                    color: "text-red-400",
                    subValue: "Peak to Trough"
                }}
            />

            {/* Card 2: Efficiency */}
            <DualStatCard
                title="Trade Efficiency"
                icon={Scale}
                leftData={{
                    label: "Win Rate",
                    value: `${winRate}%`,
                    color: Number(winRate) > 50 ? "text-emerald-400" : "text-yellow-400",
                    subValue: `${winDays} Wins / ${totalDays} Days`
                }}
                rightData={{
                    label: "Profit Factor",
                    value: profitFactor,
                    color: Number(profitFactor) > 1.5 ? "text-emerald-400" : "text-yellow-400",
                    subValue: "Gross Win / Loss"
                }}
            />

            {/* Card 3: Days Analysis */}
            <DualStatCard
                title="Day Distribution"
                icon={BarChart3}
                leftData={{
                    label: "Green Days",
                    value: `${winDays} Days`,
                    color: "text-emerald-400"
                }}
                rightData={{
                    label: "Red Days",
                    value: `${lossDays} Days`,
                    color: "text-red-400"
                }}
            />

            {/* Card 4: Extreme Trades */}
            <DualStatCard
                title="Outlier Days"
                icon={Target}
                leftData={{
                    label: "Best Day",
                    value: formatCurrency(maxProfit),
                    color: "text-emerald-400",
                    subValue: "Max Single Gain"
                }}
                rightData={{
                    label: "Worst Day",
                    value: formatCurrency(maxLoss),
                    color: "text-red-400",
                    subValue: "Strict Risk Stop"
                }}
            />

            {/* Card 5: Average Trades */}
            <DualStatCard
                title="Daily Averages"
                icon={TrendingUp}
                leftData={{
                    label: "Avg Win Day",
                    value: formatCurrency(Math.round(avgWin)),
                    color: "text-emerald-400"
                }}
                rightData={{
                    label: "Avg Loss Day",
                    value: formatCurrency(Math.round(avgLoss)),
                    color: "text-red-400"
                }}
            />

            {/* Card 6: Overview */}
            <DualStatCard
                title="System Expectancy"
                icon={ShieldAlert}
                leftData={{
                    label: "Expectancy",
                    value: formatCurrency(Math.round(expectancy)),
                    color: expectancy > 0 ? "text-emerald-400" : "text-red-400",
                    subValue: "Per Trading Session"
                }}
                rightData={{
                    label: "Net Profit",
                    value: formatCurrency(netPnL),
                    color: netPnL >= 0 ? "text-emerald-400" : "text-red-400",
                    subValue: "Cumulative Ledger"
                }}
            />
        </div>
    );
};

export default PnLStats;
