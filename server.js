// Simple Local Server for Flattrade P&L Proxy
// Run: node server.js
// Then open: http://localhost:3000

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Try to load Puppeteer
let puppeteer;
try {
    puppeteer = require('puppeteer');
    console.log('✅ Puppeteer loaded - Enhanced P&L extraction enabled');
} catch (e) {
    console.log('⚠️  Puppeteer not available - Using basic HTML fetch');
}

const PORT = 3000;
const FLATTRADE_URL = 'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057';

// MIME types
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

    // Proxy endpoint for Flattrade
    if (req.url === '/api/fetch-pnl' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const { url } = JSON.parse(body);
                const targetUrl = url || FLATTRADE_URL;
                
                // Support both verified.flattrade.in and wall.flattrade.in
                if (!targetUrl.includes('flattrade.in')) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid Flattrade URL' }));
                    return;
                }
                
                console.log('Fetching P&L data from:', targetUrl);
                
                // Use Puppeteer if available for React SPA rendering
                if (puppeteer) {
                    try {
                        console.log('Using Puppeteer to render page...');
                        const browser = await puppeteer.launch({
                            headless: true,
                            args: ['--no-sandbox', '--disable-setuid-sandbox']
                        });
                        
                        const page = await browser.newPage();
                        
                        // Intercept network requests to capture API responses
                        const apiResponses = {};
                        page.on('response', async (response) => {
                            const url = response.url();
                            // Support both wallapi and verified API endpoints
                            if (url.includes('wallapi.flattrade.in/pandl') || 
                                url.includes('api.flattrade.in/pandl') ||
                                url.includes('/pandl/')) {
                                try {
                                    const data = await response.json();
                                    apiResponses[url] = data;
                                    console.log(`Captured API response from: ${url}`);
                                } catch (e) {
                                    // Not JSON or error
                                }
                            }
                        });
                        
                        await page.goto(targetUrl, { 
                            waitUntil: 'networkidle2', 
                            timeout: 30000 
                        });
                        
                        // Wait for React to render P&L data and API calls
                        console.log('Waiting for page to render and API calls...');
                        await new Promise(resolve => setTimeout(resolve, 10000));
                        
                        // Try to use API data if available (check multiple possible endpoints)
                        const stockDataKey = Object.keys(apiResponses).find(key => 
                            key.includes('/pandl/stockDetails') || key.includes('/stockDetails')
                        );
                        const clientDataKey = Object.keys(apiResponses).find(key => 
                            key.includes('/pandl/clientDetails') || key.includes('/clientDetails')
                        );
                        
                        if (stockDataKey) {
                            console.log('Using API data instead of HTML scraping');
                            const stockData = apiResponses[stockDataKey];
                            const clientData = clientDataKey ? apiResponses[clientDataKey] : {};
                            
                            // Debug: Log first transaction to understand structure
                            if (stockData && Array.isArray(stockData) && stockData.length > 0) {
                                console.log('Sample transaction:', JSON.stringify(stockData[0], null, 2));
                            } else if (stockData) {
                                console.log('Stock data structure:', Object.keys(stockData));
                                console.log('Stock data sample:', JSON.stringify(stockData).substring(0, 500));
                            }
                            if (clientData && Object.keys(clientData).length > 0) {
                                console.log('Client data:', JSON.stringify(clientData, null, 2));
                            }
                            
                            // Parse clientDetailsJson if it's a string
                            let parsedClientData = clientData;
                            if (clientData?.clientDetailsJson && typeof clientData.clientDetailsJson === 'string') {
                                try {
                                    parsedClientData = JSON.parse(clientData.clientDetailsJson);
                                } catch (e) {
                                    console.log('Error parsing clientDetailsJson:', e);
                                }
                            }
                            
                            // Process API response
                            const pnlData = {
                                daily: [],
                                summary: { 
                                    today: { pnl: 0, percent: 0 }, 
                                    mtd: { pnl: 0, percent: 0 }, 
                                    total: { pnl: 0, percent: 0 } 
                                },
                                capital: parsedClientData?.capital || clientData?.capital || clientData?.totalCapital || 10000000,
                                clientName: parsedClientData?.clientModifiedName || clientData?.clientName || clientData?.name || clientData?.accountName || '',
                                clientInfo: parsedClientData ? `${parsedClientData.accountNumber || clientData?.accountNumber || ''} | Capital: ₹${((parsedClientData.capital || clientData?.capital || clientData?.totalCapital || 0)).toLocaleString('en-IN')}` : ''
                            };
                            
                            // Use charts array from clientDetailsJson if available (this has daily P&L already aggregated)
                            if (parsedClientData?.charts && Array.isArray(parsedClientData.charts) && parsedClientData.charts.length > 0) {
                                console.log(`Found ${parsedClientData.charts.length} days in charts array`);
                                parsedClientData.charts.forEach(chartEntry => {
                                    const date = new Date(chartEntry.date);
                                    const pnl = parseFloat(chartEntry.value || 0);
                                    const percent = pnlData.capital ? (pnl / pnlData.capital) * 100 : 0;
                                    
                                    if (!isNaN(date.getTime()) && !isNaN(pnl)) {
                                        pnlData.daily.push({
                                            date: date.toISOString(),
                                            pnl: pnl,
                                            percent: percent
                                        });
                                    }
                                });
                                
                                // Sort by date
                                pnlData.daily.sort((a, b) => new Date(a.date) - new Date(b.date));
                                
                                // Calculate summary
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
                                
                                console.log(`Successfully processed ${pnlData.daily.length} days from charts data`);
                                await browser.close();
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(pnlData));
                                return;
                            }
                            
                            // Fallback: Process stock data - group by date (if charts not available)
                            if (stockData && stockData.stockDetails && Array.isArray(stockData.stockDetails) && stockData.stockDetails.length > 0) {
                                const transactionsByDate = {};
                                
                                stockData.forEach(transaction => {
                                    // Extract date and P&L from transaction - try multiple field names
                                    const dateStr = transaction.settlementDate || transaction.tradeDate || 
                                                   transaction.date || transaction.settlement_date || 
                                                   transaction.trade_date || transaction.transactionDate;
                                    const pnl = parseFloat(
                                        transaction.realisedPnl || transaction.pnl || 
                                        transaction.grossRealisedPnl || transaction.gross_realised_pnl ||
                                        transaction.realised_pnl || transaction.netPnl || 0
                                    );
                                    
                                    if (dateStr && !isNaN(pnl) && pnl !== 0) {
                                        let date = new Date(dateStr);
                                        if (isNaN(date.getTime())) {
                                            // Try parsing different formats
                                            const parts = dateStr.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
                                            if (parts) {
                                                date = new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
                                            } else {
                                                // Try DD/MM/YYYY
                                                const parts2 = dateStr.match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})/);
                                                if (parts2) {
                                                    const year = parts2[3].length === 2 ? '20' + parts2[3] : parts2[3];
                                                    date = new Date(parseInt(year), parseInt(parts2[2]) - 1, parseInt(parts2[1]));
                                                }
                                            }
                                        }
                                        
                                        if (!isNaN(date.getTime())) {
                                            const dateKey = date.toISOString().split('T')[0];
                                            
                                            if (!transactionsByDate[dateKey]) {
                                                transactionsByDate[dateKey] = { pnl: 0, count: 0 };
                                            }
                                            transactionsByDate[dateKey].pnl += pnl;
                                            transactionsByDate[dateKey].count += 1;
                                        }
                                    }
                                });
                                
                                // Convert to daily array
                                Object.keys(transactionsByDate).sort().forEach(dateKey => {
                                    const dayData = transactionsByDate[dateKey];
                                    const date = new Date(dateKey + 'T00:00:00');
                                    const pnl = dayData.pnl;
                                    const percent = pnlData.capital ? (pnl / pnlData.capital) * 100 : 0;
                                    
                                    pnlData.daily.push({
                                        date: date.toISOString(),
                                        pnl: pnl,
                                        percent: percent
                                    });
                                });
                                
                                // Calculate summary
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
                                
                                console.log(`Successfully processed ${pnlData.daily.length} days from API data`);
                                await browser.close();
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(pnlData));
                                return;
                            } else {
                                console.log('API data is not in expected format, falling back to HTML scraping');
                            }
                        }
                        
                        // Continue with HTML scraping if API data not available
                        console.log('Falling back to HTML scraping...'); // Wait 8 seconds for data to load
                        
                        // Extract P&L data from rendered page
                        const pnlData = await page.evaluate(() => {
                            const data = {
                                daily: [],
                                summary: { 
                                    today: { pnl: 0, percent: 0 }, 
                                    mtd: { pnl: 0, percent: 0 }, 
                                    total: { pnl: 0, percent: 0 } 
                                },
                                capital: 10000000,
                                clientName: '',
                                clientInfo: ''
                            };

                            // Extract client name from page
                            // Look for common patterns in Flattrade page
                            const nameSelectors = [
                                'h1', 'h2', '[class*="name"]', '[class*="client"]',
                                '[class*="title"]', '[class*="header"]', '.v-card-title',
                                '[data-testid*="name"]', '[data-testid*="client"]'
                            ];
                            
                            for (const selector of nameSelectors) {
                                const element = document.querySelector(selector);
                                if (element) {
                                    const text = element.textContent.trim();
                                    if (text && text.length > 0 && text.length < 100) {
                                        data.clientName = text;
                                        break;
                                    }
                                }
                            }
                            
                            // If not found, try to get from page title or meta
                            // Try to extract client name from page title or other elements
                            if (!data.clientName) {
                                // Try page title
                                const title = document.title;
                                if (title && !title.includes('Wall by FLATTRADE') && !title.includes('FLATTRADE')) {
                                    data.clientName = title.replace(' - Wall by FLATTRADE', '').replace(' | FLATTRADE', '').trim();
                                }
                                
                                // Try to find client name in page content
                                if (!data.clientName) {
                                    const nameSelectors = [
                                        'h1', 'h2', '.client-name', '[data-client-name]',
                                        '.account-name', '.holder-name', '.name'
                                    ];
                                    for (const selector of nameSelectors) {
                                        const element = document.querySelector(selector);
                                        if (element && element.textContent && element.textContent.trim()) {
                                            const text = element.textContent.trim();
                                            if (text.length > 2 && text.length < 100 && !text.includes('FLATTRADE')) {
                                                data.clientName = text;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            
                            // Extract additional client info (capital, account number, etc.)
                            const infoTexts = [];
                            document.querySelectorAll('p, span, div').forEach(el => {
                                const text = el.textContent.trim();
                                if (text.match(/capital|account|₹[\d,]+/i) && text.length < 200) {
                                    infoTexts.push(text);
                                }
                            });
                            data.clientInfo = infoTexts.slice(0, 2).join(' | ');

                            // Strategy 1: Try to find JSON data in script tags (Flattrade might load data via JS)
                            const scripts = document.querySelectorAll('script');
                            let jsonData = null;
                            
                            for (const script of scripts) {
                                const text = script.textContent || script.innerHTML;
                                // Look for JSON data structures that might contain P&L
                                try {
                                    // Try to find window.__INITIAL_STATE__ or similar
                                    const stateMatch = text.match(/window\.__[A-Z_]+__\s*=\s*({.+?});/s);
                                    if (stateMatch) {
                                        jsonData = JSON.parse(stateMatch[1]);
                                        break;
                                    }
                                    
                                    // Try to find data in various formats
                                    const dataMatch = text.match(/(?:data|pnl|transactions)\s*[:=]\s*(\[[\s\S]*?\])/);
                                    if (dataMatch) {
                                        jsonData = JSON.parse(dataMatch[1]);
                                        break;
                                    }
                                } catch (e) {
                                    // Continue searching
                                }
                            }
                            
                            // Strategy 2: Extract transactions from table and try to find date from row data
                            const transactionsByDate = {};
                            const tables = document.querySelectorAll('table');
                            
                            tables.forEach(table => {
                                // Get all rows including header to understand structure
                                const allRows = Array.from(table.querySelectorAll('tr'));
                                
                                // Check if there's a date column by examining header
                                const headerRow = allRows[0];
                                const headers = [];
                                if (headerRow) {
                                    headerRow.querySelectorAll('th, td').forEach(th => {
                                        headers.push(th.textContent.trim().toLowerCase());
                                    });
                                }
                                
                                const dateColIndex = headers.findIndex(h => 
                                    h.includes('date') || h.includes('time') || h.includes('settlement')
                                );
                                const pnlColIndex = headers.findIndex(h => 
                                    h.includes('pnl') || h.includes('profit') || h.includes('realised') || 
                                    h.includes('gross') || (h.includes('p&l') && !h.includes('avg'))
                                );
                                
                                // Process data rows
                                allRows.slice(1).forEach((row, rowIndex) => {
                                    const cells = row.querySelectorAll('td');
                                    if (cells.length === 0) return;
                                    
                                    let dateStr = '';
                                    let pnlStr = '';
                                    
                                    // Try to get date from identified column or row attributes
                                    if (dateColIndex >= 0 && cells[dateColIndex]) {
                                        dateStr = cells[dateColIndex].textContent.trim();
                                    } else {
                                        // Check row data attributes
                                        dateStr = row.getAttribute('data-date') || 
                                                 row.getAttribute('data-settlement-date') ||
                                                 row.getAttribute('data-trade-date') ||
                                                 row.closest('[data-date]')?.getAttribute('data-date');
                                        
                                        // Check for date in any cell
                                        if (!dateStr) {
                                            cells.forEach(cell => {
                                                const text = cell.textContent.trim();
                                                if (text.match(/\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/) || 
                                                    text.match(/\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/) ||
                                                    text.match(/\d{2}-\d{2}-\d{4}/) ||
                                                    text.match(/\d{2}\/\d{2}\/\d{4}/)) {
                                                    if (!dateStr) dateStr = text;
                                                }
                                            });
                                        }
                                    }
                                    
                                    // Get P&L from identified column or last column
                                    if (pnlColIndex >= 0 && cells[pnlColIndex]) {
                                        pnlStr = cells[pnlColIndex].textContent.trim();
                                    } else if (cells.length > 0) {
                                        // Last column is often P&L
                                        pnlStr = cells[cells.length - 1].textContent.trim();
                                    }
                                    
                                    // Also search for ₹ symbol or numeric values that look like P&L
                                    if (!pnlStr || pnlStr === '') {
                                        cells.forEach(cell => {
                                            const text = cell.textContent.trim();
                                            // Look for currency or large numbers (P&L values)
                                            if (text.includes('₹') || 
                                                (text.match(/^-?[\d,]+\.?\d*$/) && 
                                                 Math.abs(parseFloat(text.replace(/,/g, ''))) > 0.01)) {
                                                // Skip if it looks like a price (too small) or quantity
                                                const num = parseFloat(text.replace(/[₹,\s]/g, ''));
                                                if (Math.abs(num) > 0.01 && Math.abs(num) < 100000000) {
                                                    if (!pnlStr) pnlStr = text;
                                                }
                                            }
                                        });
                                    }
                                    
                                    // Parse and aggregate
                                    const pnl = parseFloat(pnlStr.replace(/[₹,\s()]/g, '')) || 0;
                                    
                                    if (dateStr && !isNaN(pnl) && pnl !== 0) {
                                        let date = null;
                                        try {
                                            // Try direct date parsing
                                            date = new Date(dateStr);
                                            
                                            if (isNaN(date.getTime())) {
                                                // Try DD/MM/YYYY or DD-MM-YYYY
                                                const parts = dateStr.match(/(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})/);
                                                if (parts) {
                                                    const day = parseInt(parts[1]);
                                                    const month = parseInt(parts[2]) - 1;
                                                    const year = parseInt(parts[3].length === 2 ? '20' + parts[3] : parts[3]);
                                                    date = new Date(year, month, day);
                                                } else {
                                                    // Try YYYY-MM-DD
                                                    const parts2 = dateStr.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
                                                    if (parts2) {
                                                        date = new Date(parseInt(parts2[1]), parseInt(parts2[2]) - 1, parseInt(parts2[3]));
                                                    }
                                                }
                                            }
                                            
                                            if (date && !isNaN(date.getTime())) {
                                                const dateKey = date.toISOString().split('T')[0];
                                                
                                                if (!transactionsByDate[dateKey]) {
                                                    transactionsByDate[dateKey] = { pnl: 0, count: 0 };
                                                }
                                                transactionsByDate[dateKey].pnl += pnl;
                                                transactionsByDate[dateKey].count += 1;
                                            }
                                        } catch (e) {
                                            // Skip this row
                                        }
                                    }
                                });
                            });
                            
                            // Convert aggregated transactions to daily P&L
                            Object.keys(transactionsByDate).sort().forEach(dateKey => {
                                const dayData = transactionsByDate[dateKey];
                                const date = new Date(dateKey + 'T00:00:00');
                                const pnl = dayData.pnl;
                                const percent = data.capital ? (pnl / data.capital) * 100 : 0;
                                
                                data.daily.push({
                                    date: date.toISOString(),
                                    pnl: pnl,
                                    percent: percent
                                });
                            });
                            
                            console.log(`Extracted ${data.daily.length} days from ${Object.values(transactionsByDate).reduce((sum, d) => sum + d.count, 0)} transactions`);
                            
                            // Strategy 2: Look for daily summary tables (if Flattrade has a summary view)
                            if (data.daily.length === 0) {
                                // Try to find summary tables or cards showing daily P&L
                                const summaryTables = document.querySelectorAll('table');
                                summaryTables.forEach(table => {
                                    const rows = table.querySelectorAll('tr');
                                    rows.forEach((row, index) => {
                                        if (index === 0) return;
                                        
                                        const cells = row.querySelectorAll('td, th');
                                        if (cells.length >= 3) {
                                            let dateStr = '';
                                            let pnlStr = '';
                                            let percentStr = '';
                                            
                                            cells.forEach((cell, idx) => {
                                                const text = cell.textContent.trim();
                                                
                                                // First cell might be date
                                                if (idx === 0 && (text.match(/\d/) || text.length < 20)) {
                                                    dateStr = text;
                                                }
                                                
                                                // Second cell might be P&L
                                                if (idx === 1 && text.match(/[\d,₹-]/)) {
                                                    pnlStr = text;
                                                }
                                                
                                                // Third cell might be percentage
                                                if (idx === 2 && text.includes('%')) {
                                                    percentStr = text;
                                                }
                                            });
                                            
                                            if (dateStr && pnlStr) {
                                                let date = new Date(dateStr);
                                                if (isNaN(date.getTime())) {
                                                    const parts = dateStr.split(/[-\/]/);
                                                    if (parts.length === 3) {
                                                        date = new Date(parseInt(parts[2] || parts[0]), parseInt(parts[1]) - 1, parseInt(parts[0] || parts[2]));
                                                    }
                                                }
                                                
                                                const pnl = parseFloat(pnlStr.replace(/[₹,\s]/g, '')) || 0;
                                                const percent = percentStr ? parseFloat(percentStr.replace(/[%,\s]/g, '')) : (data.capital ? (pnl / data.capital) * 100 : 0);
                                                
                                                if (!isNaN(date.getTime()) && pnl !== 0) {
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
                            }

                            // Strategy 3: Look for date in transaction rows (check row data attributes or nearby elements)
                            if (data.daily.length === 0) {
                                // Try to find date information from row structure or data attributes
                                const allRows = document.querySelectorAll('tr[data-date], tr [data-date], [role="row"][data-date]');
                                allRows.forEach(row => {
                                    const dateAttr = row.getAttribute('data-date') || 
                                                   row.querySelector('[data-date]')?.getAttribute('data-date');
                                    const cells = row.querySelectorAll('td');
                                    
                                    if (dateAttr && cells.length > 0) {
                                        // Find P&L in last cell or cell with ₹
                                        let pnlStr = '';
                                        cells.forEach(cell => {
                                            const text = cell.textContent.trim();
                                            if (text.includes('₹') || (text.match(/^-?[\d,]+\.?\d*$/) && Math.abs(parseFloat(text.replace(/,/g, ''))) > 0)) {
                                                pnlStr = text;
                                            }
                                        });
                                        
                                        if (pnlStr) {
                                            const date = new Date(dateAttr);
                                            const pnl = parseFloat(pnlStr.replace(/[₹,\s()]/g, '')) || 0;
                                            
                                            if (!isNaN(date.getTime()) && pnl !== 0) {
                                                const dateKey = date.toISOString().split('T')[0];
                                                if (!transactionsByDate[dateKey]) {
                                                    transactionsByDate[dateKey] = { pnl: 0, count: 0 };
                                                }
                                                transactionsByDate[dateKey].pnl += pnl;
                                                transactionsByDate[dateKey].count += 1;
                                            }
                                        }
                                    }
                                });
                                
                                // Convert to daily array
                                Object.keys(transactionsByDate).sort().forEach(dateKey => {
                                    const dayData = transactionsByDate[dateKey];
                                    const date = new Date(dateKey + 'T00:00:00');
                                    const pnl = dayData.pnl;
                                    const percent = data.capital ? (pnl / data.capital) * 100 : 0;
                                    
                                    data.daily.push({
                                        date: date.toISOString(),
                                        pnl: pnl,
                                        percent: percent
                                    });
                                });
                            }

                            // Sort by date
                            data.daily.sort((a, b) => new Date(a.date) - new Date(b.date));

                            // Calculate summary
                            if (data.daily.length > 0) {
                                const today = data.daily[data.daily.length - 1];
                                data.summary.today = { pnl: today.pnl, percent: today.percent };
                                
                                const currentMonth = new Date().getMonth();
                                const currentYear = new Date().getFullYear();
                                const mtdDays = data.daily.filter(d => {
                                    const dDate = new Date(d.date);
                                    return dDate.getMonth() === currentMonth && dDate.getFullYear() === currentYear;
                                });
                                data.summary.mtd = {
                                    pnl: mtdDays.reduce((sum, d) => sum + d.pnl, 0),
                                    percent: mtdDays.reduce((sum, d) => sum + d.percent, 0)
                                };
                                
                                data.summary.total = {
                                    pnl: data.daily.reduce((sum, d) => sum + d.pnl, 0),
                                    percent: data.daily.reduce((sum, d) => sum + d.percent, 0)
                                };
                            }

                            return data;
                        });

                        await browser.close();
                        
                        console.log(`✅ Extracted ${pnlData.daily.length} days of P&L data`);
                        
                        // Return JSON data
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(pnlData));
                        return;
                        
                    } catch (puppeteerError) {
                        console.error('Puppeteer error:', puppeteerError.message);
                        // Fall through to basic fetch
                    }
                }
                
                // Fallback: Basic HTML fetch
                console.log('Using basic HTML fetch...');
                const parsedUrl = new URL(targetUrl);
                const options = {
                    hostname: parsedUrl.hostname,
                    path: parsedUrl.pathname + parsedUrl.search,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.9'
                    }
                };

                const protocol = parsedUrl.protocol === 'https:' ? https : http;
                
                const proxyReq = protocol.request(options, (proxyRes) => {
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
    console.log(`🔗 Flattrade URL: ${FLATTRADE_URL}\n`);
});

