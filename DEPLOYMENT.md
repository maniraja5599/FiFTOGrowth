# Deployment Guide for FiFTO Portfolio Management Website

## ✅ Code Successfully Pushed to GitHub

Your code has been pushed to: https://github.com/maniraja5599/FiFTOGrowth

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

**Steps:**

1. **Go to your GitHub repository:**
   - Visit: https://github.com/maniraja5599/FiFTOGrowth
   - Click on **Settings** (top right)

2. **Enable GitHub Pages:**
   - Scroll down to **Pages** in the left sidebar
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch
   - Select **/ (root)** folder
   - Click **Save**

3. **Your website will be live at:**
   ```
   https://maniraja5599.github.io/FiFTOGrowth/
   ```

4. **Note:** GitHub Pages serves static files only. For the backend server (P&L data fetching), you'll need a separate hosting solution (see Option 2).

---

### Option 2: Netlify (Recommended for Full Stack - Free)

**Steps:**

1. **Sign up/Login:**
   - Go to: https://www.netlify.com
   - Sign up with your GitHub account

2. **Deploy from GitHub:**
   - Click **Add new site** → **Import an existing project**
   - Choose **GitHub** and authorize Netlify
   - Select your repository: `FiFTOGrowth`
   - Configure build settings:
     - **Build command:** (leave empty for static site)
     - **Publish directory:** `/` (root)
   - Click **Deploy site**

3. **Your website will be live at:**
   ```
   https://your-site-name.netlify.app
   ```

4. **For Backend Server (P&L Data):**
   - Use Netlify Functions or
   - Deploy `server.js` separately on:
     - **Heroku** (free tier available)
     - **Railway** (free tier)
     - **Render** (free tier)
     - **DigitalOcean App Platform**

---

### Option 3: Vercel (Free & Fast)

**Steps:**

1. **Sign up/Login:**
   - Go to: https://vercel.com
   - Sign up with your GitHub account

2. **Import Project:**
   - Click **Add New Project**
   - Import `FiFTOGrowth` repository
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** `./`
   - Click **Deploy**

3. **Your website will be live at:**
   ```
   https://your-site-name.vercel.app
   ```

---

### Option 4: Traditional Web Hosting (cPanel, etc.)

**Steps:**

1. **Upload files via FTP/cPanel:**
   - Upload all files to `public_html` or `www` folder
   - Ensure `index.html` is in the root

2. **For Backend Server:**
   - Upload `server.js` to your server
   - Install Node.js on your hosting
   - Run: `node server.js` or use PM2 for process management

---

## 🔧 Backend Server Deployment (For P&L Data Fetching)

Since your website needs a backend server to fetch P&L data from Flattrade (CORS bypass), deploy `server.js` separately:

### Option A: Heroku (Free Tier)

```bash
# Install Heroku CLI
# Then run:
cd "/Users/maniraja/Desktop/Mani/FiFTO/PortFolio PMS"
heroku login
heroku create fifto-backend
git subtree push --prefix . heroku main
```

### Option B: Railway

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub**
4. Select your repository
5. Set **Root Directory** to project root
6. Set **Start Command:** `node server.js`
7. Add environment variables if needed

### Option C: Render

1. Go to: https://render.com
2. Sign up with GitHub
3. Click **New** → **Web Service**
4. Connect your repository
5. Configure:
   - **Build Command:** (leave empty)
   - **Start Command:** `node server.js`
6. Deploy

---

## 📝 Important Notes

### For Static Deployment (GitHub Pages, Netlify, Vercel):

1. **Update API Endpoints:**
   - If you deploy the backend separately, update the API URL in `pnl-tracker.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.com/api/pnl';
   ```

2. **CORS Configuration:**
   - Ensure your backend server allows requests from your frontend domain
   - Update CORS settings in `server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com']
   }));
   ```

### For Full Stack Deployment:

1. **Environment Variables:**
   - Set any required environment variables in your hosting platform
   - Update `.env` file if needed

2. **Node.js Version:**
   - Ensure your hosting supports Node.js (check `package.json` for version)

---

## 🎯 Quick Start Commands

### Local Testing:
```bash
# Start backend server
node server.js

# Or with nodemon (auto-restart)
npx nodemon server.js
```

### Production Deployment:
```bash
# Using PM2 (recommended for production)
npm install -g pm2
pm2 start server.js --name fifto-backend
pm2 save
pm2 startup
```

---

## 🔗 Useful Links

- **GitHub Repository:** https://github.com/maniraja5599/FiFTOGrowth
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **Heroku Docs:** https://devcenter.heroku.com

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Choose deployment platform
- [ ] Deploy frontend (static files)
- [ ] Deploy backend server (if needed)
- [ ] Update API URLs in frontend code
- [ ] Configure CORS settings
- [ ] Test website functionality
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS/SSL
- [ ] Monitor performance

---

## 🆘 Troubleshooting

### Issue: CORS errors
**Solution:** Ensure backend server has proper CORS configuration

### Issue: API not working
**Solution:** Check backend server is running and URL is correct

### Issue: Assets not loading
**Solution:** Check file paths are relative, not absolute

### Issue: GitHub Pages not updating
**Solution:** Wait 1-2 minutes, clear browser cache, or force refresh (Ctrl+F5)

---

**Need Help?** Check the repository README or contact support.

