// Browser Console Script to Extract Daily P&L Data from Verified Flattrade Links
// WITH PAGINATION SUPPORT - Extracts all trades from all pages
// 
// INSTRUCTIONS:
// 1. Open each verified P&L link in your browser
// 2. Wait for the page to fully load
// 3. Open Developer Tools (F12)
// 4. Go to Console tab
// 5. Copy and paste this entire script
// 6. Press Enter and wait (it will automatically go through all pages)
// 7. Copy the output JSON
// 8. Repeat for each client link

(async function extractDailyPnl() {
    console.log('🔍 Starting P&L data extraction with pagination support...');
    
    // Helper function to wait
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Wait for initial table to load
    console.log('⏳ Waiting for page to load...');
    await new Promise(resolve => {
        const checkTable = setInterval(() => {
            // Check if we have data rows (rows with 7+ cells)
            const allRows = Array.from(document.querySelectorAll('tr'));
            const dataRows = allRows.filter(row => {
                const cells = row.querySelectorAll('td');
                return cells.length >= 7;
            });
            
            if (dataRows.length > 0) {
                clearInterval(checkTable);
                resolve();
            }
        }, 500);
        
        setTimeout(() => {
            clearInterval(checkTable);
            resolve();
        }, 30000);
    });
    
    await wait(2000); // Extra wait for data to load
    
    // Get client name
    const clientNameEl = document.querySelector('[ref="e25"]');
    const clientName = clientNameEl ? clientNameEl.textContent.trim() : 'Unknown Client';
    
    // Get total P&L
    const totalPnlEl = document.querySelector('[ref="e30"]');
    const totalPnlText = totalPnlEl ? totalPnlEl.textContent.trim() : '';
    
    console.log(`📊 Client: ${clientName}`);
    console.log(`💰 Total P&L: ${totalPnlText}`);
    
    // Function to extract trades from current page
    function extractTradesFromPage() {
        const trades = [];
        const monthMap = {
            'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
            'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
            'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
        };
        
        // Get all rows - more robust approach
        const allRows = Array.from(document.querySelectorAll('tr'));
        
        allRows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 7) {
                const symbol = cells[0].textContent.trim();
                const pnlCell = cells[6];
                const pnlText = pnlCell.textContent.trim();
                
                // Skip header rows
                if (symbol === 'Symbol' || symbol === '' || pnlText === 'Gross realised P&L') {
                    return;
                }
                
                // Extract P&L amount (remove +, -, ₹, commas, %)
                const pnlMatch = pnlText.match(/([+-]?[\d,]+\.?\d*)/);
                if (pnlMatch) {
                    const pnl = parseFloat(pnlMatch[1].replace(/,/g, ''));
                    
                    // Extract date from symbol (format: EO CE SYMBOL DDMMMYYYY or IO CE SYMBOL DDMMMYYYY)
                    let tradeDate = null;
                    
                    // Try multiple date patterns
                    const patterns = [
                        /(\d{1,2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\d{4})/i,
                        /(\d{2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\d{4})/i
                    ];
                    
                    for (const pattern of patterns) {
                        const dateMatch = symbol.match(pattern);
                        if (dateMatch) {
                            const day = dateMatch[1].padStart(2, '0');
                            const month = monthMap[dateMatch[2].toUpperCase()];
                            const year = dateMatch[3];
                            tradeDate = `${year}-${month}-${day}`;
                            break;
                        }
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
        
        return trades;
    }
    
    // Function to get pagination info
    function getPaginationInfo() {
        const paginationText = document.querySelector('[ref="e1065"]');
        if (!paginationText) return { current: 1, total: 1 };
        
        const text = paginationText.textContent.trim();
        // Format: "Showing page 1 (rows 1 - 20 out of 3853)"
        const match = text.match(/page (\d+).*out of (\d+)/);
        if (match) {
            return {
                current: parseInt(match[1]),
                total: Math.ceil(parseInt(match[2]) / 20) // Assuming 20 rows per page
            };
        }
        
        // Try alternative format
        const altMatch = text.match(/(\d+) - (\d+) out of (\d+)/);
        if (altMatch) {
            const totalRows = parseInt(altMatch[3]);
            const rowsPerPage = parseInt(altMatch[2]) - parseInt(altMatch[1]) + 1;
            return {
                current: 1,
                total: Math.ceil(totalRows / rowsPerPage)
            };
        }
        
        return { current: 1, total: 1 };
    }
    
    // Function to click next page
    async function goToNextPage() {
        // Try finding next button by ref attribute (e1335 is the next button ref)
        let nextButton = document.querySelector('button[ref="e1335"]');
        
        if (!nextButton) {
            // Try finding by text content or other attributes
            const buttons = Array.from(document.querySelectorAll('button'));
            nextButton = buttons.find(btn => {
                const ref = btn.getAttribute('ref');
                const text = btn.textContent.trim();
                const ariaLabel = btn.getAttribute('aria-label') || '';
                return (ref === 'e1335' || ref === 'e1372') || 
                       text.includes('Next') || 
                       ariaLabel.includes('Next') ||
                       (!btn.disabled && (text === '→' || text === '›'));
            });
        }
        
        if (!nextButton || nextButton.disabled) {
            return false;
        }
        
        nextButton.click();
        await wait(2000); // Wait for page to load
        return true;
    }
    
    // Function to go to specific page
    async function goToPage(pageNum) {
        // Try clicking on page number button
        const pageButtons = Array.from(document.querySelectorAll('button'));
        const targetPageBtn = pageButtons.find(btn => {
            const text = btn.textContent.trim();
            return text === pageNum.toString();
        });
        
        if (targetPageBtn) {
            targetPageBtn.click();
            await wait(2000);
            return true;
        }
        
        // If page button not found, try navigating from current page
        const paginationInfo = getPaginationInfo();
        const currentPage = paginationInfo.current;
        
        if (pageNum > currentPage) {
            // Go forward
            for (let i = currentPage; i < pageNum; i++) {
                const success = await goToNextPage();
                if (!success) return false;
            }
        }
        
        return true;
    }
    
    // Collect all trades from all pages
    const allTrades = [];
    let currentPage = 1;
    let maxPages = 1;
    let consecutiveEmptyPages = 0;
    const maxEmptyPages = 3; // Stop if 3 consecutive pages have no data
    
    console.log('📄 Starting to extract trades from all pages...');
    
    while (consecutiveEmptyPages < maxEmptyPages) {
        console.log(`📄 Extracting page ${currentPage}...`);
        
        // Wait for page to load
        await wait(1500);
        
        // Extract trades from current page
        const pageTrades = extractTradesFromPage();
        
        if (pageTrades.length > 0) {
            allTrades.push(...pageTrades);
            consecutiveEmptyPages = 0;
            console.log(`  ✅ Found ${pageTrades.length} trades on page ${currentPage} (Total: ${allTrades.length})`);
        } else {
            consecutiveEmptyPages++;
            console.log(`  ⚠️ No trades found on page ${currentPage}`);
        }
        
        // Get pagination info
        const paginationInfo = getPaginationInfo();
        maxPages = paginationInfo.total;
        
        // Try to go to next page
        const hasNext = await goToNextPage();
        
        if (!hasNext) {
            console.log('  ✅ Reached last page');
            break;
        }
        
        currentPage++;
        
        // Safety limit
        if (currentPage > 500) {
            console.log('  ⚠️ Reached safety limit of 500 pages');
            break;
        }
    }
    
    console.log(`\n✅ Extraction complete! Found ${allTrades.length} total trades`);
    
    // Aggregate by date
    console.log('📊 Aggregating trades by date...');
    const dailyPnl = {};
    allTrades.forEach(trade => {
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
    console.log(`💰 Expected Total: ${totalPnlText}`);
    
    // Output the data
    const output = {
        clientName: clientName,
        capital: 10000000, // ₹1 Crore
        daily: dailyArray,
        totalTrades: allTrades.length,
        totalPages: currentPage - 1,
        totalPnl: totalCalculated,
        expectedPnl: totalPnlText,
        clientInfo: `Capital: ₹1.00Cr`
    };
    
    console.log('\n📋 COPY THIS JSON DATA:');
    console.log('='.repeat(60));
    console.log(JSON.stringify(output, null, 2));
    console.log('='.repeat(60));
    
    // Also copy to clipboard if possible
    if (navigator.clipboard) {
        navigator.clipboard.writeText(JSON.stringify(output, null, 2))
            .then(() => console.log('✅ Data copied to clipboard!'))
            .catch(() => console.log('⚠️ Could not copy to clipboard'));
    }
    
    // Create download link
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clientName.replace(/\s+/g, '_')}_pnl_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('💾 JSON file downloaded!');
    
    return output;
})();
