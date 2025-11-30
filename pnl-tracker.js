// P&L Tracker for Flattrade Verified Link
// Note: Due to CORS restrictions, you'll need a backend proxy to fetch data from Flattrade
// This script handles the frontend display and data processing

const FLATTRADE_URL = 'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057';
const STORAGE_KEY = 'fifto_pnl_data';
const LAST_UPDATE_KEY = 'fifto_last_update';

// Initialize charts
let dailyPnlChart = null;
let monthlyPnlChart = null;

// P&L Data Structure
let pnlData = {
    daily: [],
    summary: {
        today: { pnl: 0, percent: 0 },
        mtd: { pnl: 0, percent: 0 },
        total: { pnl: 0, percent: 0 }
    },
    capital: 10000000, // ₹1 Crore default
    clientName: '', // Client name (set when data is loaded)
    clientInfo: ''
};

// Load data from localStorage with enhanced caching
function loadStoredData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
            
            // Don't auto-update clientName - only use what was fetched from verified P&L
            // Keep the clientName as-is if it was fetched from verified page
            
            // Check if data is still fresh (less than 1 hour old)
            if (lastUpdate) {
                const age = Date.now() - new Date(lastUpdate).getTime();
                const oneHour = 3600000; // 1 hour in milliseconds
                
                if (age < oneHour && data.daily && data.daily.length > 0) {
                    console.log('Using cached data (fresh)');
                    pnlData = data;
                    return true;
                } else {
                    console.log('Cached data expired, will fetch fresh');
                }
            } else {
                // No timestamp, but data exists - use it but mark as potentially stale
                pnlData = data;
                return true;
            }
        } catch (e) {
            console.error('Error loading stored data:', e);
        }
    }
    return false;
}

// Save data to localStorage with timestamp
function saveData() {
    try {
        // Don't auto-update clientName - only keep what was fetched from verified P&L
        // Only set clientName if it was fetched from verified page (has verifiedUrl)
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pnlData));
        localStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
        
        // Also save with client-specific key if available
        if (pnlData.clientId) {
            localStorage.setItem(`fifto_pnl_data_${pnlData.clientId}`, JSON.stringify(pnlData));
            localStorage.setItem(`fifto_pnl_data_${pnlData.clientId}_time`, Date.now().toString());
        }
        
        console.log('Data saved to localStorage');
    } catch (e) {
        console.error('Error saving data:', e);
        // Handle quota exceeded error
        if (e.name === 'QuotaExceededError') {
            console.warn('LocalStorage quota exceeded, clearing old data');
            // Clear oldest entries
            const keys = Object.keys(localStorage);
            keys.filter(k => k.startsWith('fifto_pnl_data')).forEach(k => {
                if (k !== STORAGE_KEY && k !== LAST_UPDATE_KEY) {
                    localStorage.removeItem(k);
                }
            });
        }
    }
}

// Format currency
function formatCurrency(amount) {
    const absAmount = Math.abs(amount);
    if (absAmount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (absAmount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)}L`;
    } else if (absAmount >= 1000) {
        return `₹${(amount / 1000).toFixed(2)}K`;
    }
    return `₹${amount.toFixed(2)}`;
}

// Format percentage
function formatPercent(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}

// Update UI with P&L data
function updateUI() {
    // Update client name and info
    // Client name and info elements removed - no longer displayed
    
    // Sort data by date for accurate date range
    const sortedData = pnlData.daily.length > 0 ? [...pnlData.daily].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];
    
    // Client info display removed
    
    // Calculate advanced metrics
    const metrics = calculateAdvancedMetrics(sortedData);
    
    // Update stats
    const todayEl = document.getElementById('today-pnl');
    const todayPercentEl = document.getElementById('today-percent');
    const mtdEl = document.getElementById('mtd-pnl');
    const mtdPercentEl = document.getElementById('mtd-percent');
    const totalEl = document.getElementById('total-pnl');
    const totalPercentEl = document.getElementById('total-percent');
    
    if (todayEl) {
        todayEl.textContent = formatCurrency(pnlData.summary.today.pnl);
        todayEl.className = 'stat-value' + (pnlData.summary.today.pnl < 0 ? ' negative' : '');
    }
    if (todayPercentEl) {
        todayPercentEl.textContent = formatPercent(pnlData.summary.today.percent);
        todayPercentEl.className = 'stat-percent' + (pnlData.summary.today.percent < 0 ? ' negative' : '');
    }
    
    if (mtdEl) {
        mtdEl.textContent = formatCurrency(pnlData.summary.mtd.pnl);
        mtdEl.className = 'stat-value' + (pnlData.summary.mtd.pnl < 0 ? ' negative' : '');
    }
    if (mtdPercentEl) {
        mtdPercentEl.textContent = formatPercent(pnlData.summary.mtd.percent);
        mtdPercentEl.className = 'stat-percent' + (pnlData.summary.mtd.percent < 0 ? ' negative' : '');
    }
    
    if (totalEl) {
        totalEl.textContent = formatCurrency(pnlData.summary.total.pnl);
        totalEl.className = 'stat-value' + (pnlData.summary.total.pnl < 0 ? ' negative' : '');
    }
    if (totalPercentEl) {
        totalPercentEl.textContent = formatPercent(pnlData.summary.total.percent);
        totalPercentEl.className = 'stat-percent' + (pnlData.summary.total.percent < 0 ? ' negative' : '');
    }
    
    // Update advanced metrics
    const maxDrawdownEl = document.getElementById('max-drawdown-value');
    const maxDrawdownPercentEl = document.getElementById('max-drawdown-percent');
    const maxProfitEl = document.getElementById('max-profit-value');
    const maxProfitPercentEl = document.getElementById('max-profit-percent');
    const winningStreakEl = document.getElementById('winning-streak');
    const winningStreakDaysEl = document.getElementById('winning-streak-days');
    const losingStreakEl = document.getElementById('losing-streak');
    const losingStreakDaysEl = document.getElementById('losing-streak-days');
    const drawdownDaysEl = document.getElementById('drawdown-days');
    const drawdownDaysPercentEl = document.getElementById('drawdown-days-percent');
    
    if (maxDrawdownEl) {
        maxDrawdownEl.textContent = formatCurrency(metrics.maxDrawdown);
        maxDrawdownEl.className = 'stat-value negative';
    }
    if (maxDrawdownPercentEl) {
        maxDrawdownPercentEl.textContent = formatPercent(metrics.maxDrawdownPercent);
        maxDrawdownPercentEl.className = 'stat-percent negative';
    }
    
    if (maxProfitEl) {
        maxProfitEl.textContent = formatCurrency(metrics.maxProfit);
        maxProfitEl.className = 'stat-value positive';
    }
    if (maxProfitPercentEl) {
        maxProfitPercentEl.textContent = formatPercent(metrics.maxProfitPercent);
        maxProfitPercentEl.className = 'stat-percent positive';
    }
    
    if (winningStreakEl) {
        winningStreakEl.textContent = `${metrics.winningStreak} days`;
        winningStreakEl.className = 'stat-value positive';
    }
    if (winningStreakDaysEl) {
        winningStreakDaysEl.textContent = metrics.winningStreak > 0 ? `Best: ${metrics.winningStreak} days` : 'No winning streak';
    }
    
    if (losingStreakEl) {
        losingStreakEl.textContent = `${metrics.losingStreak} days`;
        losingStreakEl.className = 'stat-value negative';
    }
    if (losingStreakDaysEl) {
        losingStreakDaysEl.textContent = metrics.losingStreak > 0 ? `Worst: ${metrics.losingStreak} days` : 'No losing streak';
    }
    
    // Update max loss per day
    const maxLossDayEl = document.getElementById('max-loss-day');
    const maxLossDateEl = document.getElementById('max-loss-date');
    
    if (maxLossDayEl) {
        if (sortedData.length === 0 || metrics.maxLossPerDay === 0) {
            maxLossDayEl.textContent = 'N/A';
            maxLossDayEl.className = 'stat-value';
        } else {
            maxLossDayEl.textContent = formatCurrency(metrics.maxLossPerDay);
            maxLossDayEl.className = 'stat-value negative';
        }
    }
    if (maxLossDateEl) {
        if (metrics.maxLossDate) {
            maxLossDateEl.textContent = metrics.maxLossDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        } else {
            maxLossDateEl.textContent = sortedData.length === 0 ? 'No data' : '-';
        }
    }
    
    // Update win/loss days and winning percentage
    const totalWinDaysEl = document.getElementById('total-win-days');
    const totalLossDaysEl = document.getElementById('total-loss-days');
    const winningPercentageEl = document.getElementById('winning-percentage');
    
    if (totalWinDaysEl) {
        if (sortedData.length === 0) {
            totalWinDaysEl.textContent = 'N/A';
            totalWinDaysEl.className = 'stat-value';
        } else {
            totalWinDaysEl.textContent = `${metrics.totalWinDays} days`;
            totalWinDaysEl.className = 'stat-value positive';
        }
    }
    
    if (totalLossDaysEl) {
        if (sortedData.length === 0) {
            totalLossDaysEl.textContent = 'N/A';
            totalLossDaysEl.className = 'stat-value';
        } else {
            totalLossDaysEl.textContent = `${metrics.totalLossDays} days`;
            totalLossDaysEl.className = 'stat-value negative';
        }
    }
    
    if (winningPercentageEl) {
        if (sortedData.length === 0) {
            winningPercentageEl.textContent = 'N/A';
            winningPercentageEl.className = 'stat-percent';
        } else {
            winningPercentageEl.textContent = formatPercent(metrics.winningPercentage);
            winningPercentageEl.className = 'stat-percent positive';
        }
    }
    
    // Update average profit and loss per day
    const avgProfitPerDayEl = document.getElementById('avg-profit-per-day');
    const avgLossPerDayEl = document.getElementById('avg-loss-per-day');
    
    if (avgProfitPerDayEl) {
        if (sortedData.length === 0 || metrics.totalWinDays === 0) {
            avgProfitPerDayEl.textContent = 'N/A';
            avgProfitPerDayEl.className = 'stat-value';
        } else {
            avgProfitPerDayEl.textContent = formatCurrency(metrics.averageProfitPerDay);
            avgProfitPerDayEl.className = 'stat-value positive';
        }
    }
    
    if (avgLossPerDayEl) {
        if (sortedData.length === 0 || metrics.totalLossDays === 0) {
            avgLossPerDayEl.textContent = 'N/A';
            avgLossPerDayEl.className = 'stat-value';
        } else {
            avgLossPerDayEl.textContent = formatCurrency(metrics.averageLossPerDay);
            avgLossPerDayEl.className = 'stat-value negative';
        }
    }
    
    // Update performance summary section
    const perfMaxDrawdownEl = document.getElementById('max-drawdown');
    const perfMaxProfitEl = document.getElementById('max-profit');
    const capitalDisplayEl = document.getElementById('capital-display');
    const totalReturnDisplayEl = document.getElementById('total-return-display');
    
    // Ensure we have valid data
    const capital = pnlData.capital || 10000000;
    const totalPnl = pnlData.summary?.total?.pnl || 0;
    const totalPercent = pnlData.summary?.total?.percent || (capital > 0 ? (totalPnl / capital) * 100 : 0);
    
    if (perfMaxDrawdownEl) {
        perfMaxDrawdownEl.textContent = formatCurrency(metrics.maxDrawdown);
        // Always red for drawdown (negative value)
        perfMaxDrawdownEl.className = 'perf-value negative';
    }
    if (perfMaxProfitEl) {
        perfMaxProfitEl.textContent = formatCurrency(metrics.maxProfit);
    }
    if (capitalDisplayEl) {
        if (capital >= 10000000) {
            capitalDisplayEl.textContent = `₹${(capital / 10000000).toFixed(2)}Cr`;
        } else if (capital >= 100000) {
            capitalDisplayEl.textContent = `₹${(capital / 100000).toFixed(2)}L`;
        } else {
            capitalDisplayEl.textContent = `₹${capital.toLocaleString('en-IN')}`;
        }
    }
    if (totalReturnDisplayEl) {
        totalReturnDisplayEl.textContent = formatPercent(totalPercent);
        // Add color class based on positive/negative
        totalReturnDisplayEl.className = 'perf-value' + (totalPercent >= 0 ? ' positive' : ' negative');
    }
    
    // Update table
    updateTable();
    
    // Update charts
    updateCharts();
    
    // Google Sheets sync functionality is handled separately in script.js
}

// Update table
function updateTable() {
    const tbody = document.getElementById('p-l-table-body');
    if (!tbody) return;
    
    if (pnlData.daily.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading-text">No data available. Click "Refresh Data" to fetch.</td></tr>';
        return;
    }
    
    // Show all days from start to end (sorted chronologically, then reverse to show latest first in table)
    const sortedData = [...pnlData.daily].sort((a, b) => new Date(a.date) - new Date(b.date));
    const allData = [...sortedData].reverse(); // Latest first in table
    
    // Calculate cumulative P&L starting from 0 for each day
    let cumulativePnl = 0;
    const capital = pnlData.capital || 10000000;
    
    // First, calculate cumulative for all days in chronological order
    const cumulativeData = sortedData.map(day => {
        cumulativePnl += day.pnl;
        const cumulativePercent = (cumulativePnl / capital) * 100;
        return {
            date: day.date,
            dailyPnl: day.pnl,
            dailyPercent: day.percent,
            cumulativePnl: cumulativePnl,
            cumulativePercent: cumulativePercent
        };
    });
    
    // Reverse to show latest first
    const reversedCumulativeData = cumulativeData.reverse();
    
    tbody.innerHTML = reversedCumulativeData.map(dayData => {
        const date = new Date(dayData.date);
        return `
            <tr>
                <td>${date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td class="${dayData.dailyPnl >= 0 ? 'positive' : 'negative'}">${formatCurrency(dayData.dailyPnl)}</td>
                <td class="${dayData.dailyPercent >= 0 ? 'positive' : 'negative'}">${formatPercent(dayData.dailyPercent)}</td>
                <td class="${dayData.cumulativePnl >= 0 ? 'positive' : 'negative'}">${formatCurrency(dayData.cumulativePnl)}</td>
                <td class="${dayData.cumulativePercent >= 0 ? 'positive' : 'negative'}">${formatPercent(dayData.cumulativePercent)}</td>
            </tr>
        `;
    }).join('');
}

// Calculate advanced metrics
function calculateAdvancedMetrics(sortedData) {
    if (!sortedData || sortedData.length === 0) {
        return {
            maxDrawdown: 0,
            maxDrawdownPercent: 0,
            maxProfit: 0,
            maxProfitPercent: 0,
            winningStreak: 0,
            losingStreak: 0,
            maxLossPerDay: 0,
            maxLossDate: null,
            totalWinDays: 0,
            totalLossDays: 0,
            totalNeutralDays: 0,
            totalTradingDays: 0,
            winningPercentage: 0,
            averageProfitPerDay: 0,
            averageLossPerDay: 0
        };
    }
    
    // Calculate cumulative P&L starting from 0
    let cumulativePnl = 0;
    let peak = 0;
    let peakDate = null;
    let maxDrawdown = 0;
    let maxDrawdownStartDate = null;
    let maxDrawdownEndDate = null;
    let maxProfit = 0;
    let maxProfitDate = null;
    let currentWinningStreak = 0;
    let currentLosingStreak = 0;
    let maxWinningStreak = 0;
    let maxLosingStreak = 0;
    
    sortedData.forEach((day, index) => {
        const date = new Date(day.date);
        cumulativePnl += day.pnl;
        
        // Track peak and drawdown
        if (cumulativePnl > peak) {
            peak = cumulativePnl;
            peakDate = date;
        }
        
        const drawdown = peak - cumulativePnl;
        if (drawdown > maxDrawdown) {
            maxDrawdown = drawdown;
            maxDrawdownStartDate = peakDate;
            maxDrawdownEndDate = date;
        }
        
        // Track max profit
        if (cumulativePnl > maxProfit) {
            maxProfit = cumulativePnl;
            maxProfitDate = date;
        }
        
        // Track streaks
        if (day.pnl > 0) {
            currentWinningStreak++;
            currentLosingStreak = 0;
            if (currentWinningStreak > maxWinningStreak) {
                maxWinningStreak = currentWinningStreak;
            }
        } else if (day.pnl < 0) {
            currentLosingStreak++;
            currentWinningStreak = 0;
            if (currentLosingStreak > maxLosingStreak) {
                maxLosingStreak = currentLosingStreak;
            }
        } else {
            currentWinningStreak = 0;
            currentLosingStreak = 0;
        }
    });
    
    const capital = pnlData.capital || 10000000;
    const maxDrawdownPercent = (maxDrawdown / capital) * 100;
    const maxProfitPercent = (maxProfit / capital) * 100;
    
    // Calculate max loss per day
    let maxLossPerDay = 0;
    let maxLossDate = null;
    
    sortedData.forEach(day => {
        if (day.pnl < maxLossPerDay) {
            maxLossPerDay = day.pnl;
            maxLossDate = new Date(day.date);
        }
    });
    
    // Calculate total win days, loss days, and winning percentage
    let totalWinDays = 0;
    let totalLossDays = 0;
    let totalNeutralDays = 0;
    let totalProfit = 0; // Sum of all positive P&L
    let totalLoss = 0; // Sum of all negative P&L (will be negative)
    
    sortedData.forEach(day => {
        if (day.pnl > 0) {
            totalWinDays++;
            totalProfit += day.pnl;
        } else if (day.pnl < 0) {
            totalLossDays++;
            totalLoss += day.pnl; // This will be negative
        } else {
            totalNeutralDays++;
        }
    });
    
    const totalTradingDays = sortedData.length;
    const winningPercentage = totalTradingDays > 0 ? (totalWinDays / totalTradingDays) * 100 : 0;
    
    // Calculate average profit and loss per day
    const averageProfitPerDay = totalWinDays > 0 ? totalProfit / totalWinDays : 0;
    const averageLossPerDay = totalLossDays > 0 ? totalLoss / totalLossDays : 0; // This will be negative
    
    return {
        maxDrawdown: -maxDrawdown, // Negative value
        maxDrawdownPercent: -maxDrawdownPercent,
        maxDrawdownStartDate: maxDrawdownStartDate,
        maxDrawdownEndDate: maxDrawdownEndDate,
        maxProfit: maxProfit,
        maxProfitPercent: maxProfitPercent,
        maxProfitDate: maxProfitDate,
        winningStreak: maxWinningStreak,
        losingStreak: maxLosingStreak,
        maxLossPerDay: maxLossPerDay,
        maxLossDate: maxLossDate,
        totalWinDays: totalWinDays,
        totalLossDays: totalLossDays,
        totalNeutralDays: totalNeutralDays,
        totalTradingDays: totalTradingDays,
        winningPercentage: winningPercentage,
        averageProfitPerDay: averageProfitPerDay,
        averageLossPerDay: averageLossPerDay
    };
}

// Update charts
function updateCharts() {
    updateDailyPnlChart();
    updateMonthlyPnlChart();
}

// Daily P&L Chart - Show cumulative P&L starting from 0
function updateDailyPnlChart() {
    const ctx = document.getElementById('dailyPnlChart');
    if (!ctx) return;
    
    if (pnlData.daily.length === 0) return;
    
    // Sort by date to ensure chronological order
    const sortedData = [...pnlData.daily].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate cumulative P&L starting from 0
    let cumulativePnl = 0;
    const cumulativeData = [0]; // Start at 0
    const labels = sortedData.map((d) => {
        cumulativePnl += d.pnl;
        cumulativeData.push(cumulativePnl);
        const date = new Date(d.date);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    });
    
    // Calculate label step for large datasets
    const dataLength = sortedData.length;
    const labelStep = dataLength > 60 ? Math.ceil(dataLength / 30) : 1;
    
    if (dailyPnlChart) {
        dailyPnlChart.destroy();
    }
    
    dailyPnlChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cumulative P&L (₹)',
                data: cumulativeData.slice(1), // Remove initial 0 from display but keep it for calculation
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return 'rgba(45, 157, 122, 0.1)';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(45, 157, 122, 0.1)');
                    gradient.addColorStop(1, 'rgba(45, 157, 122, 0.3)');
                    return gradient;
                },
                borderColor: 'rgba(45, 157, 122, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: dataLength > 100 ? 0 : 2,
                pointHoverRadius: 4,
                pointBackgroundColor: 'rgba(45, 157, 122, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Cumulative P&L Performance (Starting from ₹0): ${sortedData.length > 0 ? new Date(sortedData[0].date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Start'} to ${sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1].date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'End'} (${sortedData.length} trading days)`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#0d4f3c',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            if (index >= sortedData.length) return '';
                            const day = sortedData[index];
                            const date = new Date(day.date);
                            const cumulative = cumulativeData[index + 1];
                            const percent = pnlData.capital ? (cumulative / pnlData.capital) * 100 : 0;
                            return `${date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}: ${formatCurrency(cumulative)} (${formatPercent(percent)}) | Daily: ${formatCurrency(day.pnl)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: dataLength > 60 ? 90 : 45,
                        minRotation: dataLength > 60 ? 90 : 45,
                        font: {
                            size: dataLength > 60 ? 8 : 10
                        },
                        // For large datasets, show every Nth label
                        maxTicksLimit: dataLength > 60 ? 40 : undefined,
                        callback: function(value, index) {
                            // Show label for every Nth tick if too many data points
                            if (dataLength > 60 && index % labelStep !== 0) {
                                return '';
                            }
                            return labels[index] || '';
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        },
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Monthly P&L Chart - Show month-wise performance
function updateMonthlyPnlChart() {
    const ctx = document.getElementById('monthlyPnlChart');
    if (!ctx) return;
    
    if (pnlData.daily.length === 0) return;
    
    // Sort by date
    const sortedData = [...pnlData.daily].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Aggregate data by month
    const monthlyData = {};
    const monthlyCumulative = {};
    let cumulativePnl = 0;
    
    sortedData.forEach(day => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                label: monthLabel,
                pnl: 0,
                days: 0,
                startCumulative: cumulativePnl
            };
        }
        
        monthlyData[monthKey].pnl += day.pnl;
        monthlyData[monthKey].days += 1;
        cumulativePnl += day.pnl;
        monthlyCumulative[monthKey] = cumulativePnl;
    });
    
    // Convert to arrays for chart
    const monthKeys = Object.keys(monthlyData).sort();
    const labels = monthKeys.map(key => monthlyData[key].label);
    const monthlyPnlValues = monthKeys.map(key => monthlyData[key].pnl);
    const monthlyCumulativeValues = monthKeys.map(key => monthlyCumulative[key]);
    
    // Destroy existing chart if it exists
    if (monthlyPnlChart) {
        monthlyPnlChart.destroy();
    }
    
    // Create new chart
    monthlyPnlChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Monthly P&L (₹)',
                    data: monthlyPnlValues,
                    backgroundColor: function(context) {
                        const value = context.parsed.y;
                        return value >= 0 
                            ? 'rgba(16, 185, 129, 0.7)' // Green for profit
                            : 'rgba(220, 38, 38, 0.7)';  // Red for loss
                    },
                    borderColor: function(context) {
                        const value = context.parsed.y;
                        return value >= 0 
                            ? 'rgba(16, 185, 129, 1)'
                            : 'rgba(220, 38, 38, 1)';
                    },
                    borderWidth: 2,
                    borderRadius: 4,
                    yAxisID: 'y'
                },
                {
                    label: 'Cumulative P&L (₹)',
                    data: monthlyCumulativeValues,
                    type: 'line',
                    borderColor: 'rgba(13, 79, 60, 1)',
                    backgroundColor: 'rgba(13, 79, 60, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(13, 79, 60, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const formatted = new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 0
                            }).format(value);
                            return `${context.dataset.label}: ${formatted}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: '600'
                        },
                        color: '#64748b'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Monthly P&L (₹)',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        color: '#64748b'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 10000000) {
                                return '₹' + (value / 10000000).toFixed(1) + 'Cr';
                            } else if (value >= 100000) {
                                return '₹' + (value / 100000).toFixed(1) + 'L';
                            } else if (value >= 1000) {
                                return '₹' + (value / 1000).toFixed(1) + 'K';
                            }
                            return '₹' + value;
                        },
                        font: {
                            size: 10
                        },
                        color: '#64748b'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Cumulative P&L (₹)',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        color: '#64748b'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 10000000) {
                                return '₹' + (value / 10000000).toFixed(1) + 'Cr';
                            } else if (value >= 100000) {
                                return '₹' + (value / 100000).toFixed(1) + 'L';
                            } else if (value >= 1000) {
                                return '₹' + (value / 1000).toFixed(1) + 'K';
                            }
                            return '₹' + value;
                        },
                        font: {
                            size: 10
                        },
                        color: '#64748b'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Removed monthly returns and equity curve charts - now showing monthly performance chart

// Fetch P&L data from Flattrade (requires backend proxy due to CORS)
// This function is now called by client-manager.js for multi-client support
async function fetchPnlData() {
    // If client manager is loaded, use it instead
    if (typeof loadSelectedClientsData === 'function') {
        await loadSelectedClientsData();
        return;
    }
    
    // Fallback to single client mode
    const refreshBtn = document.getElementById('refresh-pnl');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Loading...';
    }
    
    try {
        // Option 1: Use local backend server (RECOMMENDED for local development)
        // Check if we're running on localhost (local server)
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.protocol === 'http:';
        
        if (isLocalhost) {
            try {
                const response = await fetch('http://localhost:3000/api/fetch-pnl', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: FLATTRADE_URL })
                });
                
                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    
                    // Check if response is JSON (from Puppeteer) or HTML
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
        // If backend returns parsed data directly
        if (data.daily && Array.isArray(data.daily)) {
            pnlData.daily = data.daily;
            pnlData.summary = data.summary || pnlData.summary;
            // Use fetched name if available, otherwise use client name from list
            const fetchedName = data.clientName && data.clientName.trim() && 
                               !data.clientName.toLowerCase().startsWith('client') &&
                               data.clientName !== 'No clients added' &&
                               data.clientName !== 'Verified P&L Performance'
                               ? data.clientName.trim() 
                               : '';
            pnlData.clientName = fetchedName || pnlData.clientName || '';
            pnlData.clientInfo = data.clientInfo || pnlData.clientInfo;
            // Recalculate summary if needed
            if (pnlData.daily.length > 0) {
                const today = pnlData.daily[pnlData.daily.length - 1];
                pnlData.summary.today = { pnl: today.pnl, percent: today.percent };
                
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const mtdDays = pnlData.daily.filter(d => {
                    const date = new Date(d.date);
                    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                });
                pnlData.summary.mtd = {
                    pnl: mtdDays.reduce((sum, d) => sum + d.pnl, 0),
                    percent: mtdDays.reduce((sum, d) => sum + d.percent, 0)
                };
                
                pnlData.summary.total = {
                    pnl: pnlData.daily.reduce((sum, d) => sum + d.pnl, 0),
                    percent: pnlData.daily.reduce((sum, d) => sum + d.percent, 0)
                };
            }
            saveData();
            updateUI();
            return;
        }
                    } else {
                        // HTML response - parse it
                        const html = await response.text();
                        parseFlattradeData(html);
                        return;
                    }
                }
            } catch (localError) {
                console.log('Local server not running, trying alternative methods...', localError);
            }
        }
        
        // Option 2: Use a CORS proxy (for development/testing only)
        // Note: Most free CORS proxies have limitations
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(FLATTRADE_URL), {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Check if we got HTML or an error page
        if (html.includes('<!DOCTYPE') || html.includes('<html') || html.includes('<table')) {
            parseFlattradeData(html);
        } else {
            throw new Error('Unexpected response format');
        }
        
    } catch (error) {
        console.error('Error fetching P&L data:', error);
        
        // Show user-friendly error
        const errorMsg = error.message.includes('CORS') || error.message.includes('Failed to fetch')
            ? 'CORS Error: Please set up a backend proxy to fetch data from Flattrade.\n\nSee P&L_SETUP.md for instructions.'
            : `Error: ${error.message}\n\nPlease check your network connection or backend setup.`;
        
        alert(errorMsg);
        
        // Load stored data as fallback
        if (loadStoredData()) {
            updateUI();
            console.log('Loaded cached P&L data');
        } else {
            console.warn('No cached data available');
        }
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.textContent = 'Refresh Data';
        }
    }
}

// Parse Flattrade HTML to extract P&L data
function parseFlattradeData(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Reset daily data
    pnlData.daily = [];
    
    // Try multiple parsing strategies for Flattrade wall page
    
    // Strategy 1: Look for tables with P&L data
    const tables = doc.querySelectorAll('table');
    let foundData = false;
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header
            
            const cells = row.querySelectorAll('td, th');
            if (cells.length >= 2) {
                let dateStr = '';
                let pnlStr = '';
                let percentStr = '';
                
                // Try to find date in various formats
                cells.forEach(cell => {
                    const text = cell.textContent.trim();
                    // Check if it's a date (contains day/month/year patterns)
                    if (text.match(/\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/) || 
                        text.match(/\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/) ||
                        text.match(/[A-Za-z]{3}\s+\d{1,2}/)) {
                        dateStr = text;
                    }
                    // Check if it's P&L (contains ₹ or numbers with commas)
                    if (text.includes('₹') || (text.match(/[\d,]+\.?\d*/) && !dateStr)) {
                        if (!pnlStr) pnlStr = text;
                        else if (!percentStr) percentStr = text;
                    }
                    // Check if it's percentage
                    if (text.includes('%')) {
                        percentStr = text;
                    }
                });
                
                // If we found a date and P&L value
                if (dateStr && (pnlStr || percentStr)) {
                    // Parse date - handle multiple formats
                    let date = null;
                    const dateFormats = [
                        /(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})/,  // DD/MM/YYYY or DD-MM-YYYY
                        /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/,    // YYYY/MM/DD
                        /([A-Za-z]{3})\s+(\d{1,2})/                // Mon DD
                    ];
                    
                    for (const format of dateFormats) {
                        const match = dateStr.match(format);
                        if (match) {
                            if (format === dateFormats[0]) {
                                // DD/MM/YYYY
                                const day = parseInt(match[1]);
                                const month = parseInt(match[2]) - 1;
                                const year = match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3]);
                                date = new Date(year, month, day);
                            } else if (format === dateFormats[1]) {
                                // YYYY/MM/DD
                                date = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
                            } else if (format === dateFormats[2]) {
                                // Mon DD - assume current year
                                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                const month = monthNames.indexOf(match[1]);
                                const day = parseInt(match[2]);
                                date = new Date(new Date().getFullYear(), month, day);
                            }
                            break;
                        }
                    }
                    
                    // Fallback: try direct Date parsing
                    if (!date || isNaN(date.getTime())) {
                        date = new Date(dateStr);
                    }
                    
                    // Parse P&L value
                    const pnl = parseFloat(pnlStr.replace(/[₹,\s]/g, '')) || 0;
                    
                    // Parse percentage
                    let percent = 0;
                    if (percentStr) {
                        percent = parseFloat(percentStr.replace(/[%,\s]/g, '')) || 0;
                    } else if (pnl && pnlData.capital) {
                        // Calculate percentage if not provided
                        percent = (pnl / pnlData.capital) * 100;
                    }
                    
                    if (!isNaN(date.getTime()) && (pnl !== 0 || percent !== 0)) {
                        pnlData.daily.push({
                            date: date.toISOString(),
                            pnl: pnl,
                            percent: percent
                        });
                        foundData = true;
                    }
                }
            }
        });
    });
    
    // Strategy 2: Look for JSON data in script tags (common in modern web apps)
    if (!foundData) {
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => {
            const content = script.textContent || script.innerHTML;
            // Look for JSON data containing P&L information
            const jsonMatch = content.match(/\{.*"pnl".*"date".*\}/s);
            if (jsonMatch) {
                try {
                    const data = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(data)) {
                        data.forEach(item => {
                            if (item.date && (item.pnl !== undefined || item.percent !== undefined)) {
                                pnlData.daily.push({
                                    date: new Date(item.date).toISOString(),
                                    pnl: item.pnl || 0,
                                    percent: item.percent || 0
                                });
                                foundData = true;
                            }
                        });
                    }
                } catch (e) {
                    console.log('Could not parse JSON data:', e);
                }
            }
        });
    }
    
    // Strategy 3: Look for div-based data structures
    if (!foundData) {
        const dataContainers = doc.querySelectorAll('[class*="pnl"], [class*="P&L"], [id*="pnl"], [data-date]');
        dataContainers.forEach(container => {
            const dateAttr = container.getAttribute('data-date') || 
                           container.querySelector('[class*="date"]')?.textContent;
            const pnlAttr = container.getAttribute('data-pnl') ||
                           container.querySelector('[class*="pnl"]')?.textContent;
            
            if (dateAttr) {
                const date = new Date(dateAttr);
                const pnl = parseFloat(pnlAttr?.replace(/[₹,\s]/g, '') || '0');
                
                if (!isNaN(date.getTime()) && pnl !== 0) {
                    pnlData.daily.push({
                        date: date.toISOString(),
                        pnl: pnl,
                        percent: pnlData.capital ? (pnl / pnlData.capital) * 100 : 0
                    });
                    foundData = true;
                }
            }
        });
    }
    
    // Sort by date (oldest first)
    pnlData.daily.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate summary
    if (pnlData.daily.length > 0) {
        const today = pnlData.daily[pnlData.daily.length - 1];
        pnlData.summary.today = { pnl: today.pnl, percent: today.percent };
        
        // MTD (current month)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const mtdDays = pnlData.daily.filter(d => {
            const date = new Date(d.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });
        pnlData.summary.mtd = {
            pnl: mtdDays.reduce((sum, d) => sum + d.pnl, 0),
            percent: mtdDays.reduce((sum, d) => sum + d.percent, 0)
        };
        
        // Total
        pnlData.summary.total = {
            pnl: pnlData.daily.reduce((sum, d) => sum + d.pnl, 0),
            percent: pnlData.daily.reduce((sum, d) => sum + d.percent, 0)
        };
    }
    
    // Save and update
    saveData();
    updateUI();
    
    // Log for debugging
    if (pnlData.daily.length > 0) {
        console.log(`Successfully parsed ${pnlData.daily.length} days of P&L data`);
    } else {
        console.warn('No P&L data found. The page structure may be different. Check the HTML structure.');
    }
}

// Initialize on page load with enhanced caching
document.addEventListener('DOMContentLoaded', function() {
    // Load stored data first for instant display (enhanced caching)
    if (loadStoredData()) {
        console.log('✅ Loaded cached data for instant display');
        updateUI();
        
        // Update quick stats immediately
        if (typeof updateQuickStats === 'function') {
            updateQuickStats();
        }
    }
    
    // Set up refresh button
    const refreshBtn = document.getElementById('refresh-pnl');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', fetchPnlData);
    }
    
    // Fetch fresh data in background if needed (non-blocking)
    // Only fetch if data is older than 30 minutes
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
    if (lastUpdate) {
        const age = Date.now() - new Date(lastUpdate).getTime();
        const thirtyMinutes = 1800000; // 30 minutes
        
        if (age > thirtyMinutes) {
            console.log('⏳ Data is stale (>30 min), fetching fresh data in background...');
            // Fetch in background without blocking UI
            setTimeout(() => fetchPnlData(), 1000);
        } else {
            console.log('✅ Data is fresh, using cached version');
        }
    } else if (!loadStoredData()) {
        // No cached data, fetch immediately
        console.log('📡 No cached data, fetching immediately...');
        fetchPnlData();
    }
});

