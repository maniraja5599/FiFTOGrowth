// Enhanced Server with Puppeteer for Flattrade P&L
// This version uses Puppeteer to render the React SPA and extract data
// Install: npm install puppeteer express cors
// Run: node server-puppeteer.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Check if puppeteer is available
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (e) {
    console.log('⚠️  Puppeteer not installed. Install with: npm install puppeteer');
    console.log('📝 Using basic server instead. For full functionality, install Puppeteer.\n');
}

const PORT = 3000;
const FLATTRADE_URL = 'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Fetch P&L data using Puppeteer
async function fetchPnlWithPuppeteer(url) {
    if (!puppeteer) {
        throw new Error('Puppeteer not installed');
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait for P&L data to load (adjust selector based on actual page)
        await page.waitForTimeout(5000); // Wait 5 seconds for React to render
        
        // Extract P&L data from the page
        const pnlData = await page.evaluate(() => {
            const data = {
                daily: [],
                summary: { today: { pnl: 0, percent: 0 }, mtd: { pnl: 0, percent: 0 }, total: { pnl: 0, percent: 0 } }
            };

            // Try to find tables with P&L data
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                rows.forEach((row, index) => {
                    if (index === 0) return; // Skip header
                    
                    const cells = row.querySelectorAll('td, th');
                    if (cells.length >= 2) {
                        let dateStr = '';
                        let pnlStr = '';
                        let percentStr = '';
                        
                        cells.forEach(cell => {
                            const text = cell.textContent.trim();
                            if (text.match(/\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/) || 
                                text.match(/\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/)) {
                                dateStr = text;
                            }
                            if (text.includes('₹') || (text.match(/[\d,]+\.?\d*/) && !dateStr)) {
                                if (!pnlStr) pnlStr = text;
                                else if (!percentStr) percentStr = text;
                            }
                            if (text.includes('%')) {
                                percentStr = text;
                            }
                        });
                        
                        if (dateStr) {
                            const date = new Date(dateStr);
                            const pnl = parseFloat(pnlStr.replace(/[₹,\s]/g, '')) || 0;
                            const percent = parseFloat(percentStr.replace(/[%,\s]/g, '')) || 0;
                            
                            if (!isNaN(date.getTime())) {
                                data.daily.push({
                                    date: date.toISOString(),
                                    pnl: pnl,
                                    percent: percent
                                });
                            }
                        }
                    }
                });
            });

            // Try to find data in React component state or window object
            if (data.daily.length === 0) {
                // Look for data in window object
                if (window.__INITIAL_STATE__ || window.__PRELOADED_STATE__) {
                    const state = window.__INITIAL_STATE__ || window.__PRELOADED_STATE__;
                    // Extract P&L data from state
                    console.log('Found React state:', Object.keys(state));
                }
            }

            return data;
        });

        return pnlData;
    } finally {
        await browser.close();
    }
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Enhanced P&L endpoint with Puppeteer
    if (req.url === '/api/fetch-pnl' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const { url } = JSON.parse(body);
                const targetUrl = url || FLATTRADE_URL;
                
                console.log('Fetching from:', targetUrl);
                
                // Try Puppeteer first if available
                if (puppeteer) {
                    try {
                        const pnlData = await fetchPnlWithPuppeteer(targetUrl);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(pnlData));
                        return;
                    } catch (puppeteerError) {
                        console.log('Puppeteer failed, trying basic fetch...');
                    }
                }
                
                // Fallback to basic HTML fetch
                const parsedUrl = new URL(targetUrl);
                const https = require('https');
                const options = {
                    hostname: parsedUrl.hostname,
                    path: parsedUrl.pathname + parsedUrl.search,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                };

                const proxyReq = https.request(options, (proxyRes) => {
                    let data = '';
                    proxyRes.on('data', (chunk) => {
                        data += chunk;
                    });
                    proxyRes.on('end', () => {
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=utf-8'
                        });
                        res.end(data);
                    });
                });

                proxyReq.on('error', (error) => {
                    console.error('Proxy error:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: error.message }));
                });

                proxyReq.end();
                
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 FiFTO P&L Server running at http://localhost:${PORT}`);
    console.log(`📊 Open your browser and go to: http://localhost:${PORT}`);
    console.log(`🔗 Flattrade URL: ${FLATTRADE_URL}`);
    if (!puppeteer) {
        console.log(`\n💡 Tip: Install Puppeteer for better P&L extraction:`);
        console.log(`   npm install puppeteer`);
        console.log(`   Then use: node server-puppeteer.js\n`);
    } else {
        console.log(`✅ Puppeteer enabled - Full page rendering available\n`);
    }
});

