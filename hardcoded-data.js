// Hardcoded P&L Data for 3 Clients
// This data is loaded directly in the code - no API calls needed

// Generate sample daily P&L data for the last 30 days
function generateSampleDailyData(startDate, baseCapital, clientId) {
    const daily = [];
    let cumulativePnl = 0;
    const today = new Date();
    
    // Generate 30 days of data
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate realistic P&L values (mostly positive with occasional losses)
        const randomFactor = Math.random();
        let dailyPnl;
        
        if (randomFactor > 0.2) {
            // 80% chance of profit
            dailyPnl = Math.floor(Math.random() * 50000) + 10000; // ₹10K to ₹60K profit
        } else {
            // 20% chance of loss
            dailyPnl = -Math.floor(Math.random() * 30000) - 5000; // ₹5K to ₹35K loss
        }
        
        cumulativePnl += dailyPnl;
        const percent = (dailyPnl / baseCapital) * 100;
        
        daily.push({
            date: date.toISOString().split('T')[0],
            pnl: dailyPnl,
            percent: parseFloat(percent.toFixed(2))
        });
    }
    
    return daily;
}

// Hardcoded client data
const HARDCODED_CLIENT_DATA = {
    'client-1': {
        clientName: 'SUNKULA PUSHPAVATHI',
        capital: 10000000, // ₹1 Crore
        daily: generateSampleDailyData(new Date(), 10000000, 'client-1'),
        summary: {
            today: { pnl: 45000, percent: 0.45 },
            mtd: { pnl: 850000, percent: 8.5 },
            total: { pnl: 1260000, percent: 12.6 }
        },
        clientInfo: 'Capital: ₹1.00Cr'
    },
    'client-2': {
        clientName: 'Client 2',
        capital: 10000000, // ₹1 Crore
        daily: generateSampleDailyData(new Date(), 10000000, 'client-2'),
        summary: {
            today: { pnl: 38000, percent: 0.38 },
            mtd: { pnl: 720000, percent: 7.2 },
            total: { pnl: 1050000, percent: 10.5 }
        },
        clientInfo: 'Capital: ₹1.00Cr'
    },
    'client-3': {
        clientName: 'Client 3',
        capital: 10000000, // ₹1 Crore
        daily: generateSampleDailyData(new Date(), 10000000, 'client-3'),
        summary: {
            today: { pnl: 42000, percent: 0.42 },
            mtd: { pnl: 780000, percent: 7.8 },
            total: { pnl: 1150000, percent: 11.5 }
        },
        clientInfo: 'Capital: ₹1.00Cr'
    }
};

// Calculate summary from daily data
function calculateSummary(daily, capital) {
    if (!daily || daily.length === 0) {
        return {
            today: { pnl: 0, percent: 0 },
            mtd: { pnl: 0, percent: 0 },
            total: { pnl: 0, percent: 0 }
        };
    }
    
    const today = daily[daily.length - 1];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const mtdDays = daily.filter(d => {
        const date = new Date(d.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    
    const totalPnl = daily.reduce((sum, d) => sum + d.pnl, 0);
    const mtdPnl = mtdDays.reduce((sum, d) => sum + d.pnl, 0);
    
    return {
        today: {
            pnl: today.pnl,
            percent: parseFloat(((today.pnl / capital) * 100).toFixed(2))
        },
        mtd: {
            pnl: mtdPnl,
            percent: parseFloat(((mtdPnl / capital) * 100).toFixed(2))
        },
        total: {
            pnl: totalPnl,
            percent: parseFloat(((totalPnl / capital) * 100).toFixed(2))
        }
    };
}

// Recalculate summaries for all clients based on actual daily data
Object.keys(HARDCODED_CLIENT_DATA).forEach(clientId => {
    const clientData = HARDCODED_CLIENT_DATA[clientId];
    // Recalculate summary from actual daily data to ensure accuracy
    const recalculatedSummary = calculateSummary(clientData.daily, clientData.capital);
    clientData.summary = recalculatedSummary;
});

// Export for use in other files
if (typeof window !== 'undefined') {
    window.HARDCODED_CLIENT_DATA = HARDCODED_CLIENT_DATA;
}

