// Browser Console Script to Extract Daily P&L Data from Verified Flattrade Links
// 
// INSTRUCTIONS:
// 1. Open each verified P&L link in your browser
// 2. Wait for the page to fully load (all trades loaded)
// 3. Open Developer Tools (F12)
// 4. Go to Console tab
// 5. Copy and paste this entire script
// 6. Press Enter
// 7. Copy the output JSON
// 8. Repeat for each client link

(async function extractDailyPnl() {
    console.log('🔍 Starting P&L data extraction...');
    
    // Wait for table to load
    await new Promise(resolve => {
        const checkTable = setInterval(() => {
            const table = document.querySelector('table[ref="e1069"]');
            const loading = document.querySelector('*[ref="e1103"]');
            if (table && !loading) {
                clearInterval(checkTable);
                resolve();
            }
        }, 500);
        
        setTimeout(() => {
            clearInterval(checkTable);
            resolve();
        }, 30000); // Max 30 seconds wait
    });
    
    // Get client name
    const clientNameEl = document.querySelector('[ref="e25"]');
    const clientName = clientNameEl ? clientNameEl.textContent.trim() : 'Unknown Client';
    
    // Get total P&L
    const totalPnlEl = document.querySelector('[ref="e30"]');
    const totalPnlText = totalPnlEl ? totalPnlEl.textContent.trim() : '';
    
    console.log(`📊 Client: ${clientName}`);
    console.log(`💰 Total P&L: ${totalPnlText}`);
    
    // Extract all trades from the table
    const trades = [];
    const table = document.querySelector('table[ref="e1069"]');
    
    if (!table) {
        console.error('❌ Table not found!');
        return;
    }
    
    // Get all rows (skip header)
    const rows = table.querySelectorAll('tbody tr, tbody tr[ref]');
    console.log(`📋 Found ${rows.length} trade rows`);
    
    // Extract trade data
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 7) {
            const symbol = cells[0].textContent.trim();
            const pnlCell = cells[6];
            const pnlText = pnlCell.textContent.trim();
            
            // Extract P&L amount (remove +, -, ₹, commas, %)
            const pnlMatch = pnlText.match(/([+-]?[\d,]+\.?\d*)/);
            if (pnlMatch) {
                const pnl = parseFloat(pnlMatch[1].replace(/,/g, ''));
                
                // Extract date from symbol (format: EO CE SYMBOL DDMMMYYYY)
                // Or from trade date if available
                let tradeDate = null;
                
                // Try to find date in symbol or other cells
                const dateMatch = symbol.match(/(\d{1,2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\d{4})/i);
                if (dateMatch) {
                    const day = dateMatch[1].padStart(2, '0');
                    const monthMap = {
                        'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
                        'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
                        'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
                    };
                    const month = monthMap[dateMatch[2].toUpperCase()];
                    const year = dateMatch[3];
                    tradeDate = `${year}-${month}-${day}`;
                }
                
                if (tradeDate && !isNaN(pnl)) {
                    trades.push({
                        date: tradeDate,
                        pnl: pnl,
                        symbol: symbol
                    });
                }
            }
        }
    });
    
    console.log(`✅ Extracted ${trades.length} trades with dates`);
    
    // Aggregate by date
    const dailyPnl = {};
    trades.forEach(trade => {
        if (!dailyPnl[trade.date]) {
            dailyPnl[trade.date] = 0;
        }
        dailyPnl[trade.date] += trade.pnl;
    });
    
    // Convert to array format
    const dailyArray = Object.keys(dailyPnl)
        .sort()
        .map(date => {
            const pnl = dailyPnl[date];
            const percent = (pnl / 10000000) * 100; // Assuming ₹1 Crore capital
            return {
                date: date,
                pnl: Math.round(pnl * 100) / 100, // Round to 2 decimals
                percent: parseFloat(percent.toFixed(2))
            };
        });
    
    console.log(`📅 Found ${dailyArray.length} unique trading days`);
    
    // Calculate totals
    const totalCalculated = dailyArray.reduce((sum, day) => sum + day.pnl, 0);
    console.log(`💰 Calculated Total: ₹${totalCalculated.toLocaleString('en-IN')}`);
    
    // Output the data
    const output = {
        clientName: clientName,
        capital: 10000000, // ₹1 Crore
        daily: dailyArray,
        totalTrades: trades.length,
        totalPnl: totalCalculated,
        clientInfo: `Capital: ₹1.00Cr`
    };
    
    console.log('\n📋 COPY THIS JSON DATA:');
    console.log('='.repeat(50));
    console.log(JSON.stringify(output, null, 2));
    console.log('='.repeat(50));
    
    // Also copy to clipboard if possible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(JSON.stringify(output, null, 2))
            .then(() => console.log('✅ Data copied to clipboard!'))
            .catch(() => console.log('⚠️ Could not copy to clipboard'));
    }
    
    return output;
})();

