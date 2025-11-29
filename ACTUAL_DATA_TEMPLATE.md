# Actual P&L Data Template

## Instructions
To add actual P&L data for the first client (SUNKULA PUSHPAVATHI), replace the `daily` array in `hardcoded-data.js` with your actual data.

## Data Format
Each entry should follow this format:
```javascript
{
    date: 'YYYY-MM-DD',  // Date in ISO format
    pnl: 50000,          // P&L amount in rupees (positive for profit, negative for loss)
    percent: 0.50        // Percentage (calculated as: (pnl / capital) * 100)
}
```

## Example
```javascript
daily: [
    { date: '2025-01-15', pnl: 50000, percent: 0.50 },
    { date: '2025-01-16', pnl: 45000, percent: 0.45 },
    { date: '2025-01-17', pnl: -15000, percent: -0.15 },
    { date: '2025-01-18', pnl: 60000, percent: 0.60 },
    // ... add all your daily P&L entries
]
```

## How to Add Your Data

1. Open `hardcoded-data.js`
2. Find the `ACTUAL_CLIENT_1_DATA` object
3. Replace the `daily: []` array with your actual data
4. Make sure dates are in 'YYYY-MM-DD' format
5. P&L amounts should be in rupees (numbers, not strings)
6. Percentages will be auto-calculated, but you can also provide them

## Notes
- Dates should be in chronological order (oldest to newest)
- Capital is ₹1 Crore (10,000,000)
- Summary (today, MTD, total) will be automatically calculated from daily data
- If you don't provide data, sample data will be used temporarily

