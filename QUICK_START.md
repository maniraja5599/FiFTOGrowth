# Quick Start Guide - Fix CORS Error

## 🚀 Solution 1: Run Local Server (Easiest)

### Step 1: Start the Server
Open Terminal in this folder and run:

```bash
node server.js
```

You should see:
```
🚀 FiFTO P&L Server running at http://localhost:3000
📊 Open your browser and go to: http://localhost:3000
```

### Step 2: Open Website
Open your browser and go to:
```
http://localhost:3000
```

### Step 3: Click "Refresh Data"
Click the "Refresh Data" button on the P&L Feed section. The data should now load!

---

## 📝 Solution 2: Manual Data Entry (No Server Needed)

### Step 1: Open Manual Entry Tool
Open `manual-data-entry.html` in your browser

### Step 2: Enter Data
- Enter today's date
- Enter P&L amount (e.g., 50000)
- Enter percentage (e.g., 0.5)
- Click "Add Entry"

### Step 3: View on Main Page
Open `index.html` and the data will appear automatically!

---

## 🔧 Troubleshooting

### "Cannot find module 'http'" Error
You're not using Node.js. Make sure Node.js is installed:
- Download from: https://nodejs.org/
- Or use Solution 2 (Manual Entry) instead

### Server Won't Start
Check if port 3000 is already in use:
```bash
# On Mac/Linux
lsof -i :3000

# Kill the process if needed, then try again
```

### Still Getting CORS Error?
1. Make sure you're using `http://localhost:3000` (not `file://`)
2. Check browser console for errors
3. Try Solution 2 (Manual Entry) as alternative

---

## 📊 Next Steps

Once data is loading:
1. The charts will automatically update
2. Statistics will calculate (Today, MTD, Total)
3. Data is saved locally for offline viewing

For production deployment, you'll need to set up a proper backend server.

