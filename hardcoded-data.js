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
// 
// VERIFIED DATA FROM LINK:
// - Total Net P&L: ₹ 62,42,428.09 (₹62.42L) - Nov 26, 2024 to Nov 26, 2025
// - Most Profitable Day: Oct 14, 2025 - ₹ 5,20,977.04
// - Longest Streak: Aug 14-29, 2025 (11 days)
// - Period: Nov 26, 2024 to Nov 26, 2025
//
// EXTRACTED DATA (from browser console script):
// - Total P&L: ₹ 47,58,496.54 (₹47.58L) - 95 trading days from Jan 21, 2025 to Dec 2, 2025
// - Total Trades: 3,833 trades across 191 pages
// - Date Range: 2025-01-21 to 2025-12-02
//
// ⚠️ NOTE: Extracted data shows ₹47.58L but verified link shows ₹62.42L
// This discrepancy is likely because:
// 1. Extracted data starts from Jan 21, 2025 (missing Nov 26, 2024 to Jan 20, 2025 period)
// 2. Some pages may not have been fully extracted (191 vs 193 pages)
// 3. The missing period (Nov 26, 2024 to Jan 20, 2025) likely contains ~₹14.84L in P&L
//
// The data below is ACTUAL extracted data from the verified link (Jan 21 - Dec 2, 2025)
const ACTUAL_CLIENT_1_DATA = {
    clientName: 'SUNKULA PUSHPAVATHI',
    capital: 10000000, // ₹1 Crore
    daily: [
        { date: '2025-01-21', pnl: -66478, percent: -0.66 },
        { date: '2025-01-23', pnl: -114960.04, percent: -1.15 },
        { date: '2025-01-28', pnl: 70047, percent: 0.7 },
        { date: '2025-01-30', pnl: 244831.5, percent: 2.45 },
        { date: '2025-02-04', pnl: -207763, percent: -2.08 },
        { date: '2025-02-06', pnl: -88455.02, percent: -0.88 },
        { date: '2025-02-11', pnl: 166754, percent: 1.67 },
        { date: '2025-02-13', pnl: 8433.73, percent: 0.08 },
        { date: '2025-02-18', pnl: -41733, percent: -0.42 },
        { date: '2025-02-20', pnl: 37874.98, percent: 0.38 },
        { date: '2025-02-25', pnl: 26094, percent: 0.26 },
        { date: '2025-02-27', pnl: 51762, percent: 0.52 },
        { date: '2025-03-04', pnl: 122170, percent: 1.22 },
        { date: '2025-03-06', pnl: 80366.23, percent: 0.8 },
        { date: '2025-03-11', pnl: -51159, percent: -0.51 },
        { date: '2025-03-13', pnl: -38595.01, percent: -0.39 },
        { date: '2025-03-18', pnl: 30240, percent: 0.3 },
        { date: '2025-03-20', pnl: 56748.75, percent: 0.57 },
        { date: '2025-03-25', pnl: 148079, percent: 1.48 },
        { date: '2025-03-27', pnl: 252130.48, percent: 2.52 },
        { date: '2025-04-01', pnl: 86360, percent: 0.86 },
        { date: '2025-04-03', pnl: 96644.98, percent: 0.97 },
        { date: '2025-04-08', pnl: 157227, percent: 1.57 },
        { date: '2025-04-09', pnl: 143448.73, percent: 1.43 },
        { date: '2025-04-15', pnl: 87782, percent: 0.88 },
        { date: '2025-04-17', pnl: 285558.71, percent: 2.86 },
        { date: '2025-04-22', pnl: 136912.99, percent: 1.37 },
        { date: '2025-04-24', pnl: -25014, percent: -0.25 },
        { date: '2025-04-29', pnl: -30176.5, percent: -0.3 },
        { date: '2025-04-30', pnl: 85875, percent: 0.86 },
        { date: '2025-05-06', pnl: 97311.99, percent: 0.97 },
        { date: '2025-05-08', pnl: -38632.54, percent: -0.39 },
        { date: '2025-05-13', pnl: -87395, percent: -0.87 },
        { date: '2025-05-15', pnl: -402322.55, percent: -4.02 },
        { date: '2025-05-20', pnl: -86930, percent: -0.87 },
        { date: '2025-05-22', pnl: 241473.77, percent: 2.41 },
        { date: '2025-05-27', pnl: -172159.5, percent: -1.72 },
        { date: '2025-05-29', pnl: 3361.54, percent: 0.03 },
        { date: '2025-06-03', pnl: 152688.02, percent: 1.53 },
        { date: '2025-06-05', pnl: 31147.48, percent: 0.31 },
        { date: '2025-06-10', pnl: 180387, percent: 1.8 },
        { date: '2025-06-12', pnl: -222626.25, percent: -2.23 },
        { date: '2025-06-17', pnl: 133473, percent: 1.33 },
        { date: '2025-06-19', pnl: -33108.75, percent: -0.33 },
        { date: '2025-06-24', pnl: -22450, percent: -0.22 },
        { date: '2025-06-26', pnl: 72436.53, percent: 0.72 },
        { date: '2025-07-01', pnl: 268102, percent: 2.68 },
        { date: '2025-07-03', pnl: 64822.5, percent: 0.65 },
        { date: '2025-07-08', pnl: 171803.98, percent: 1.72 },
        { date: '2025-07-10', pnl: 202976.25, percent: 2.03 },
        { date: '2025-07-15', pnl: 24128.03, percent: 0.24 },
        { date: '2025-07-17', pnl: 25860, percent: 0.26 },
        { date: '2025-07-22', pnl: -59344.99, percent: -0.59 },
        { date: '2025-07-24', pnl: 200707.5, percent: 2.01 },
        { date: '2025-07-29', pnl: 125284, percent: 1.25 },
        { date: '2025-07-31', pnl: -104279.77, percent: -1.04 },
        { date: '2025-08-05', pnl: 106401.98, percent: 1.06 },
        { date: '2025-08-07', pnl: -193623.75, percent: -1.94 },
        { date: '2025-08-12', pnl: -323740.01, percent: -3.24 },
        { date: '2025-08-14', pnl: 222716.24, percent: 2.23 },
        { date: '2025-08-19', pnl: 310891.02, percent: 3.11 },
        { date: '2025-08-21', pnl: 21330.01, percent: 0.21 },
        { date: '2025-08-26', pnl: 116968.99, percent: 1.17 },
        { date: '2025-08-28', pnl: 98960.25, percent: 0.99 },
        { date: '2025-09-02', pnl: -228206.25, percent: -2.28 },
        { date: '2025-09-04', pnl: 72792.03, percent: 0.73 },
        { date: '2025-09-09', pnl: 303018.75, percent: 3.03 },
        { date: '2025-09-11', pnl: 138498.01, percent: 1.38 },
        { date: '2025-09-16', pnl: -106451.25, percent: -1.06 },
        { date: '2025-09-18', pnl: 5291.99, percent: 0.05 },
        { date: '2025-09-23', pnl: -101936.25, percent: -1.02 },
        { date: '2025-09-25', pnl: 190125.99, percent: 1.9 },
        { date: '2025-09-30', pnl: 83745.75, percent: 0.84 },
        { date: '2025-10-01', pnl: 167826.41, percent: 1.68 },
        { date: '2025-10-07', pnl: 32377.5, percent: 0.32 },
        { date: '2025-10-09', pnl: -134023, percent: -1.34 },
        { date: '2025-10-14', pnl: 342892.5, percent: 3.43 },
        { date: '2025-10-16', pnl: 83006, percent: 0.83 },
        { date: '2025-10-20', pnl: 141967.5, percent: 1.42 },
        { date: '2025-10-23', pnl: 182558.01, percent: 1.83 },
        { date: '2025-10-28', pnl: 452583.98, percent: 4.53 },
        { date: '2025-10-30', pnl: 268795, percent: 2.69 },
        { date: '2025-11-04', pnl: 147378.75, percent: 1.47 },
        { date: '2025-11-06', pnl: -66128, percent: -0.66 },
        { date: '2025-11-11', pnl: -113403.75, percent: -1.13 },
        { date: '2025-11-13', pnl: 104978.02, percent: 1.05 },
        { date: '2025-11-18', pnl: 108082.41, percent: 1.08 },
        { date: '2025-11-20', pnl: 68863, percent: 0.69 },
        { date: '2025-11-25', pnl: -320041.04, percent: -3.2 },
        { date: '2025-11-27', pnl: 14393, percent: 0.14 },
        { date: '2025-12-02', pnl: 81885, percent: 0.82 }
    ],
    clientInfo: 'Capital: ₹1.00Cr',
    // Metadata from verified URL
    period: 'Nov 26, 2024 to Nov 26, 2025', // Period shown on verified link
    verifiedUrl: 'https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
    lastUpdated: new Date().toISOString(), // Will be updated when data is extracted
    expectedPnl: '₹ 62,42,428.09' // Total P&L from verified link
};

// Hardcoded client data
const HARDCODED_CLIENT_DATA = {
    'client-1': ACTUAL_CLIENT_1_DATA,
    'client-2': {
        clientName: 'SACHIN GUPTA',
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
        clientName: 'RISHU GARG',
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

