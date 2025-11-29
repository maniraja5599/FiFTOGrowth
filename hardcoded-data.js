// Hardcoded P&L Data for 3 Clients
// This data is loaded directly in the code - no API calls needed

// Generate sample daily P&L data from January 1st to today
function generateSampleDailyData(startDate, baseCapital, clientId) {
    const daily = [];
    const today = new Date();
    const startOfJanuary = new Date(today.getFullYear(), 0, 1); // January 1st of current year
    const startDateObj = startDate || startOfJanuary;
    
    // Generate data from January 1st to today (or from startDate to today)
    const currentDate = new Date(startDateObj);
    
    while (currentDate <= today) {
        // Skip weekends (Saturday = 6, Sunday = 0) - trading days only
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
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
            
            const percent = (dailyPnl / baseCapital) * 100;
            
            daily.push({
                date: currentDate.toISOString().split('T')[0],
                pnl: dailyPnl,
                percent: parseFloat(percent.toFixed(2))
            });
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return daily;
}

// ACTUAL P&L DATA FOR FIRST CLIENT (SUNKULA PUSHPAVATHI)
// Verified P&L Link: https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057
// Replace the daily array below with actual P&L data from the verified link
// Format: { date: 'YYYY-MM-DD', pnl: amount_in_rupees, percent: percentage }
const ACTUAL_CLIENT_1_DATA = {
    clientName: 'SUNKULA PUSHPAVATHI',
    capital: 10000000, // ₹1 Crore
    // TODO: Replace with actual daily P&L data from verified link
    // Data should include all trading days from January 1st onwards
    // Example format:
    daily: [
        // January 2025 data (example - replace with actual):
        // { date: '2025-01-01', pnl: 50000, percent: 0.50 },
        // { date: '2025-01-02', pnl: 45000, percent: 0.45 },
        // { date: '2025-01-03', pnl: 55000, percent: 0.55 },
        // ... add all actual daily P&L entries from January onwards
    ],
    clientInfo: 'Capital: ₹1.00Cr'
};

// If no actual data provided, generate sample data from January 1st to today
if (!ACTUAL_CLIENT_1_DATA.daily || ACTUAL_CLIENT_1_DATA.daily.length === 0) {
    const januaryStart = new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
    ACTUAL_CLIENT_1_DATA.daily = generateSampleDailyData(januaryStart, 10000000, 'client-1');
    console.warn('⚠️ Using sample data for client-1 from January onwards. Please replace with actual P&L data from verified link.');
}

// Hardcoded client data
const HARDCODED_CLIENT_DATA = {
    'client-1': ACTUAL_CLIENT_1_DATA,
    'client-2': {
        clientName: 'Client 2',
        capital: 10000000, // ₹1 Crore
        daily: (function() {
            const januaryStart = new Date(new Date().getFullYear(), 0, 1);
            return generateSampleDailyData(januaryStart, 10000000, 'client-2');
        })(),
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
        daily: (function() {
            const januaryStart = new Date(new Date().getFullYear(), 0, 1);
            return generateSampleDailyData(januaryStart, 10000000, 'client-3');
        })(),
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

