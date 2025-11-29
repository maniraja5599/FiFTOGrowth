# Instructions to Extract Exact Daily P&L Data

## Overview
The verified P&L pages show individual trades that need to be aggregated by date to get daily P&L. Since there are thousands of trades across multiple pages, you need to run a browser script to extract the data.

## Step-by-Step Instructions

### For Each Client (Repeat 3 times):

1. **Open the verified P&L link in your browser:**
   - Client 1: https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057
   - Client 2: https://verified.flattrade.in/pnl/4a217d80d07d4c49af16c77db99946fd
   - Client 3: https://verified.flattrade.in/pnl/PO05ba52fb8bee4f85918dc48e4ac88c54

2. **Wait for the page to fully load** - All trades should be visible (may take 30-60 seconds)

3. **Open Developer Tools:**
   - Press `F12` or Right-click → Inspect
   - Go to **Console** tab

4. **Copy and paste the script from `extract-pnl-data.js`**

5. **Press Enter** - The script will:
   - Extract all trades from the table
   - Aggregate P&L by date
   - Output JSON data

6. **Copy the JSON output** and save it

7. **Repeat for the next client**

## Alternative: Manual Data Entry

If the script doesn't work, you can:
1. Export the trade data from the verified link (if export option available)
2. Or provide the data in CSV/Excel format
3. I'll convert it to the required format

## Data Format Required

```javascript
{
  "clientName": "SUNKULA PUSHPAVATHI",
  "capital": 10000000,
  "daily": [
    { "date": "2025-01-01", "pnl": 50000, "percent": 0.50 },
    { "date": "2025-01-02", "pnl": 45000, "percent": 0.45 },
    // ... all trading days
  ]
}
```

## Current Client Information

- **Client 1**: SUNKULA PUSHPAVATHI - Total: ₹ 62,42,428.09
- **Client 2**: SACHIN GUPTA - Total: ₹ 35,15,615.78  
- **Client 3**: RISHU GARG - Total: ₹ 33,28,842.00

Once you have the JSON data for all 3 clients, share it and I'll update the `hardcoded-data.js` file.

