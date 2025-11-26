// Backend Proxy Example for Flattrade P&L Fetching
// This is a Node.js/Express example - you'll need to set this up on your server

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to fetch Flattrade P&L data
app.post('/api/fetch-pnl', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url || !url.includes('verified.flattrade.in')) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        
        // Fetch the Flattrade page
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        
        // Parse P&L data from the page
        // Adjust selectors based on actual Flattrade page structure
        const pnlData = {
            daily: [],
            summary: {
                today: { pnl: 0, percent: 0 },
                mtd: { pnl: 0, percent: 0 },
                total: { pnl: 0, percent: 0 }
            }
        };
        
        // Strategy 1: Extract data from tables (most common structure)
        $('table tbody tr, table tr').each((index, element) => {
            const cells = $(element).find('td');
            if (cells.length >= 3) {
                const dateStr = $(cells[0]).text().trim();
                const pnlStr = $(cells[1]).text().trim();
                const percentStr = $(cells[2]).text().trim();
                
                // Parse and add to daily array
                const date = new Date(dateStr);
                const pnl = parseFloat(pnlStr.replace(/[₹,]/g, '')) || 0;
                const percent = parseFloat(percentStr.replace(/[%,]/g, '')) || 0;
                
                if (!isNaN(date.getTime()) && !isNaN(pnl)) {
                    pnlData.daily.push({
                        date: date.toISOString(),
                        pnl: pnl,
                        percent: percent
                    });
                }
            }
        });
        
        // Calculate summary statistics
        if (pnlData.daily.length > 0) {
            const today = pnlData.daily[pnlData.daily.length - 1];
            pnlData.summary.today = { pnl: today.pnl, percent: today.percent };
            
            // MTD calculation
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
            
            // Total calculation
            pnlData.summary.total = {
                pnl: pnlData.daily.reduce((sum, d) => sum + d.pnl, 0),
                percent: pnlData.daily.reduce((sum, d) => sum + d.percent, 0)
            };
        }
        
        res.json(pnlData);
        
    } catch (error) {
        console.error('Error fetching P&L:', error);
        res.status(500).json({ error: 'Failed to fetch P&L data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`P&L Proxy server running on port ${PORT}`);
});

// To use this:
// 1. Install dependencies: npm install express axios cheerio cors
// 2. Run: node backend-proxy-example.js
// 3. Update pnl-tracker.js to use: fetch('/api/fetch-pnl', { method: 'POST', body: JSON.stringify({ url: FLATTRADE_URL }) })

