import React from 'react';
import { formatCurrency } from '../utils/formatters';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Scale from 'lucide-react/dist/esm/icons/scale';
import Percent from 'lucide-react/dist/esm/icons/percent';
import Target from 'lucide-react/dist/esm/icons/target';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3';
import ArrowDownCircle from 'lucide-react/dist/esm/icons/arrow-down-circle';

const StatCard = ({ title, value, subValue, icon: Icon, trend, iconColor = "gold" }) => {
    const colorMap = {
        gold: "icon-3d-gold",
        green: "icon-3d-green",
        red: "icon-3d-red",
        blue: "icon-3d-blue"
    };

    return (
        <div className="p-6 bg-premium-card/30 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-premium-card/50 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl icon-container-3d group-hover:border-white/20 transition-colors`}>
                    <Icon className={`w-6 h-6 ${colorMap[iconColor] || colorMap.gold}`} />
                </div>
                {trend && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                        {trend === 'up' ? 'Positive' : 'Negative'}
                    </span>
                )}
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            {subValue && <div className="text-xs text-gray-500">{subValue}</div>}
        </div>
    );
};

const PnLStats = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Calculations
    const totalDays = data.length;
    const winDays = data.filter(d => d.dailyPnL > 0).length;
    const lossDays = data.filter(d => d.dailyPnL <= 0).length;
    const winRate = ((winDays / totalDays) * 100).toFixed(1);

    const profits = data.filter(d => d.dailyPnL > 0).map(d => d.dailyPnL);
    const losses = data.filter(d => d.dailyPnL <= 0).map(d => d.dailyPnL);

    const maxProfit = Math.max(...profits, 0);
    const maxLoss = Math.min(...losses, 0);

    const totalProfit = profits.reduce((a, b) => a + b, 0);
    const totalLoss = Math.abs(losses.reduce((a, b) => a + b, 0));

    const avgWin = profits.length ? totalProfit / profits.length : 0;
    const avgLoss = losses.length ? totalLoss / losses.length : 0; // stored as positive for display

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

    // Helper to format currency in Lakhs - REMOVED in favor of global formatter
    // const formatCurrency = (value) => { ... }

    const startDate = data[0].date;
    const endDate = data[data.length - 1].date;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCard
                title="Trading Period"
                value={`${totalDays} Days`}
                subValue={`${startDate} - ${endDate}`}
                icon={Activity}
            />
            <StatCard
                title="Total ROI"
                value={`${totalROI}%`}
                subValue={`Return on ₹1Cr Capital`}
                icon={Activity}
                trend={Number(totalROI) > 0 ? 'up' : 'down'}
            />
            <StatCard
                title="Win Rate"
                value={`${winRate}%`}
                subValue={`${winDays} Wins / ${lossDays} Losses`}
                icon={Percent}
                trend={Number(winRate) > 50 ? 'up' : 'down'}
            />
            <StatCard
                title="Total Profit Days"
                value={winDays}
                subValue="Green Days"
                icon={TrendingUp}
                trend="up"
            />
            <StatCard
                title="Total Loss Days"
                value={lossDays}
                subValue="Red Days"
                icon={TrendingDown}
                trend="down"
            />
            <StatCard
                title="Profit Factor"
                value={profitFactor}
                subValue="Gross Wins vs Losses"
                icon={Scale}
                trend={Number(profitFactor) > 1.5 ? 'up' : 'down'}
            />
            <StatCard
                title="Max Drawdown"
                value={formatCurrency(maxDrawdown)}
                subValue="Peak to Trough Decline"
                icon={ArrowDownCircle}
                trend="down"
            />

            <StatCard
                title="Max Profit (Single Day)"
                value={formatCurrency(maxProfit)}
                subValue="Best Trading Day"
                icon={TrendingUp}
                trend="up"
            />
            <StatCard
                title="Max Loss (Single Day)"
                value={formatCurrency(maxLoss)}
                subValue="Worst Trading Day"
                icon={TrendingDown}
                trend="down"
            />
            <StatCard
                title="Expectancy"
                value={formatCurrency(Math.round(expectancy))}
                subValue="Avg Daily Return"
                icon={Target}
                trend={expectancy > 0 ? 'up' : 'down'}
            />
            <StatCard
                title="Average Win"
                value={formatCurrency(Math.round(avgWin))}
                subValue="Avg Profit on Green Days"
                icon={BarChart3}
                trend="up"
            />
            <StatCard
                title="Average Loss"
                value={formatCurrency(Math.round(avgLoss))}
                subValue="Avg Loss on Red Days"
                icon={BarChart3}
                trend="down"
            />
        </div>
    );
};

export default PnLStats;
