# P&L Tracking Setup Guide

## Overview
The website now includes a live P&L tracking system that fetches data from the Flattrade verified P&L link and displays it with interactive charts.

## Features
- ✅ Daily P&L tracking from Flattrade verified link
- ✅ Real-time statistics (Today, MTD, Total)
- ✅ Interactive charts (Daily P&L, Monthly Returns, Equity Curve)
- ✅ Historical data table (last 30 days)
- ✅ Local storage for offline viewing
- ✅ Auto-refresh capability

## Setup Instructions

### Option 1: Backend Proxy (Recommended for Production)

Due to CORS restrictions, you'll need a backend server to fetch data from Flattrade.

#### Step 1: Install Dependencies
```bash
npm install express axios cheerio cors
```

#### Step 2: Set Up Backend Server
Use the provided `backend-proxy-example.js` file as a starting point.

1. Create a new file `server.js`:
```javascript
// Copy content from backend-proxy-example.js
```

2. Run the server:
```bash
node server.js
```

#### Step 3: Update Frontend
In `pnl-tracker.js`, update the `fetchPnlData()` function:

```javascript
// Replace the fetch call with:
const response = await fetch('/api/fetch-pnl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: FLATTRADE_URL })
});

const pnlData = await response.json();
// Process the data...
```

### Option 2: CORS Proxy (Development Only)

For quick testing, you can use a CORS proxy service:

1. Update `pnl-tracker.js`:
```javascript
const proxyUrl = 'https://your-cors-proxy.com/';
const response = await fetch(proxyUrl + FLATTRADE_URL);
```

**Note:** Free CORS proxies are not recommended for production use.

### Option 3: Manual Data Entry

If automated fetching isn't possible, you can manually update the data:

1. Open browser console
2. Run:
```javascript
// Example: Add daily P&L entry
pnlData.daily.push({
    date: new Date().toISOString(),
    pnl: 50000,  // Today's P&L in ₹
    percent: 0.5  // Today's return %
});
saveData();
updateUI();
```

## Flattrade Page Structure

You may need to adjust the parsing logic in `parseFlattradeData()` based on the actual HTML structure of the Flattrade page. 

To inspect the structure:
1. Open the Flattrade URL in a browser
2. Right-click → Inspect
3. Find the table/element containing P&L data
4. Update selectors in `parseFlattradeData()` function

## Data Storage

- Data is stored in browser's `localStorage`
- Key: `fifto_pnl_data`
- Last update time: `fifto_last_update`
- Data persists across page refreshes

## Charts

The system includes three interactive charts:

1. **Daily P&L Chart**: Bar chart showing daily profit/loss
2. **Monthly Returns Chart**: Bar chart showing monthly return percentages
3. **Equity Curve Chart**: Line chart showing portfolio value over time

All charts use Chart.js and are fully responsive.

## Auto-Refresh

To enable auto-refresh (every 5 minutes), uncomment this line in `pnl-tracker.js`:

```javascript
setInterval(fetchPnlData, 5 * 60 * 1000);
```

## Troubleshooting

### Data Not Loading
1. Check browser console for errors
2. Verify backend proxy is running (if using Option 1)
3. Check CORS settings
4. Verify Flattrade URL is accessible

### Charts Not Displaying
1. Ensure Chart.js is loaded (check Network tab)
2. Check browser console for JavaScript errors
3. Verify data structure matches expected format

### Parsing Errors
1. Inspect Flattrade page HTML structure
2. Update selectors in `parseFlattradeData()` function
3. Test with sample HTML

## Production Deployment

For production:
1. Set up a secure backend API
2. Add authentication if needed
3. Implement rate limiting
4. Add error logging
5. Set up scheduled jobs for daily updates
6. Consider using a database instead of localStorage

## Support

If you need help customizing the parser for your specific Flattrade page structure, you can:
1. Inspect the page HTML
2. Share the relevant HTML structure
3. Update the parsing logic accordingly

