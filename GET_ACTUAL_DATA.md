# How to Get Actual P&L Data from Verified Link

## First Client (SUNKULA PUSHPAVATHI)
**Verified P&L Link:** https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057

## Method 1: Using Browser Console (Easiest)

1. Open the verified P&L link in your browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to Console tab
4. Copy and paste this code:

```javascript
// Extract P&L data from the page
const table = document.querySelector('table');
const rows = table.querySelectorAll('tbody tr');
const dailyData = [];

rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 2) {
        const dateText = cells[0].textContent.trim();
        const pnlText = cells[1].textContent.trim();
        
        // Parse date (adjust format as needed)
        const date = new Date(dateText);
        const dateStr = date.toISOString().split('T')[0];
        
        // Parse P&L amount (remove ₹, commas, etc.)
        const pnl = parseFloat(pnlText.replace(/[₹,\s]/g, ''));
        
        if (!isNaN(pnl) && dateStr !== 'Invalid Date') {
            const percent = (pnl / 10000000) * 100; // Assuming ₹1 Crore capital
            dailyData.push({
                date: dateStr,
                pnl: pnl,
                percent: parseFloat(percent.toFixed(2))
            });
        }
    }
});

// Output the data
console.log(JSON.stringify(dailyData, null, 2));
// Copy the output and paste it into hardcoded-data.js
```

5. Copy the output JSON
6. Paste it into `hardcoded-data.js` in the `ACTUAL_CLIENT_1_DATA.daily` array

## Method 2: Manual Entry

1. Open the verified P&L link
2. Note down each day's P&L from January 1st onwards
3. Format as:
```javascript
daily: [
    { date: '2025-01-01', pnl: 50000, percent: 0.50 },
    { date: '2025-01-02', pnl: 45000, percent: 0.45 },
    // ... continue for all days
]
```

## Method 3: Using Server Script (If you have backend access)

If you have the server.js running, you can fetch the data:

```bash
curl -X POST http://localhost:3000/api/fetch-pnl \
  -H "Content-Type: application/json" \
  -d '{"url": "https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057"}'
```

Then copy the `daily` array from the response.

## Important Notes

- **Include all trading days from January 1st onwards**
- **Skip weekends** (Saturday and Sunday are not trading days)
- **Date format:** YYYY-MM-DD (e.g., '2025-01-15')
- **P&L format:** Numbers only, no currency symbols (e.g., 50000 not ₹50,000)
- **Percent:** Will be auto-calculated, but you can provide it
- **Order:** Dates should be in chronological order (oldest to newest)

## After Adding Data

1. Save `hardcoded-data.js`
2. The summary (today, MTD, total) will be automatically calculated
3. Refresh your website to see the actual data

