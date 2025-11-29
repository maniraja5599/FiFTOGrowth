# Netlify Deployment Guide for FiFTO Portfolio Management

## 🚀 Quick Deployment Steps

### Step 1: Sign Up / Login to Netlify

1. Go to: **https://www.netlify.com**
2. Click **Sign up** (or **Log in** if you already have an account)
3. Choose **Sign up with GitHub** (recommended for easy deployment)

---

### Step 2: Deploy from GitHub

1. **After logging in, you'll see the dashboard**
   - Click **Add new site** → **Import an existing project**

2. **Connect to GitHub:**
   - Click **GitHub** button
   - Authorize Netlify to access your repositories
   - You may need to install the Netlify app on GitHub if prompted

3. **Select Your Repository:**
   - Search for: `FiFTOGrowth`
   - Click on it to select

4. **Configure Build Settings:**
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty - it's a static site)
   - **Publish directory:** `/` (root directory)
   - **Base directory:** (leave empty)

5. **Click "Deploy site"**

---

### Step 3: Wait for Deployment

- Netlify will automatically deploy your site
- You'll see a build log in real-time
- Usually takes 1-2 minutes
- You'll get a random URL like: `https://random-name-123456.netlify.app`

---

### Step 4: Customize Your Site Name (Optional)

1. Go to **Site settings** → **Change site name**
2. Change to something like: `fifto-portfolio` or `fifto-pms`
3. Your new URL will be: `https://your-site-name.netlify.app`

---

## 🔧 Backend Server Setup (For P&L Data Fetching)

Since your website needs a backend server to fetch P&L data from Flattrade, you have two options:

### Option A: Netlify Functions (Recommended)

Netlify Functions allow you to run serverless functions. However, for your use case with Puppeteer/headless browser, you might need:

### Option B: Separate Backend Deployment (Recommended)

Deploy your `server.js` separately on:

1. **Railway** (Easiest - Free tier available)
   - Go to: https://railway.app
   - Sign up with GitHub
   - New Project → Deploy from GitHub
   - Select `FiFTOGrowth` repository
   - Set **Start Command:** `node server.js`
   - Deploy
   - Copy the Railway URL (e.g., `https://your-app.railway.app`)

2. **Render** (Free tier available)
   - Go to: https://render.com
   - Sign up with GitHub
   - New → Web Service
   - Connect repository
   - Set **Start Command:** `node server.js`
   - Deploy

3. **Heroku** (Free tier limited)
   - Go to: https://heroku.com
   - Create new app
   - Connect GitHub repository
   - Deploy

---

## 🔗 Update API URL in Frontend

After deploying your backend server, update the API URL in your code:

### Update `pnl-tracker.js`:

Find this line (around line 5):
```javascript
const FLATTRADE_URL = 'https://wall.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057';
```

And update the fetch URL to point to your backend:

```javascript
// If using backend proxy
const API_URL = 'https://your-backend-url.railway.app/api/pnl';
// or
const API_URL = 'https://your-backend-url.render.com/api/pnl';
```

---

## 📝 Environment Variables (If Needed)

If your backend needs environment variables:

1. Go to your backend deployment platform (Railway/Render/Heroku)
2. Add environment variables in the settings
3. Common variables:
   - `PORT` (usually auto-set)
   - `NODE_ENV=production`
   - Any API keys or secrets

---

## ✅ Post-Deployment Checklist

- [ ] Frontend deployed on Netlify
- [ ] Backend server deployed (Railway/Render/Heroku)
- [ ] API URL updated in `pnl-tracker.js`
- [ ] CORS configured on backend server
- [ ] Test website functionality
- [ ] Test P&L data fetching
- [ ] Test chart zoom functionality
- [ ] Test responsive design on mobile
- [ ] Custom domain configured (optional)

---

## 🔄 Continuous Deployment

**Good News!** Netlify automatically deploys when you push to GitHub:

1. Make changes to your code
2. Push to GitHub: `git push origin main`
3. Netlify automatically detects the change
4. New deployment starts automatically
5. Usually takes 1-2 minutes

You can see deployment status in the Netlify dashboard.

---

## 🎯 Custom Domain Setup (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `fifto.com`)
4. Follow DNS configuration instructions
5. Netlify will provide DNS records to add
6. Wait for DNS propagation (usually 24-48 hours)
7. SSL certificate is automatically provisioned

---

## 🐛 Troubleshooting

### Issue: Site not loading
- **Solution:** Check build logs in Netlify dashboard
- **Solution:** Ensure `index.html` is in root directory

### Issue: API calls failing (CORS errors)
- **Solution:** Update backend CORS settings to allow your Netlify domain
- **Solution:** Check backend server is running

### Issue: Assets not loading
- **Solution:** Check file paths are relative (not absolute)
- **Solution:** Clear browser cache

### Issue: Build failing
- **Solution:** Check build logs for errors
- **Solution:** Ensure all files are committed to GitHub

---

## 📊 Netlify Dashboard Features

Once deployed, you can:

- **View Analytics:** See visitor statistics
- **Form Handling:** Netlify can handle form submissions (if you add contact form)
- **Split Testing:** A/B test different versions
- **Deploy Previews:** Test pull requests before merging
- **Rollback:** Quickly revert to previous deployment

---

## 🔗 Useful Links

- **Netlify Dashboard:** https://app.netlify.com
- **Netlify Docs:** https://docs.netlify.com
- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **Your Repository:** https://github.com/maniraja5599/FiFTOGrowth

---

## 🎉 You're All Set!

Your website should now be live on Netlify! 

**Next Steps:**
1. Test all features
2. Set up backend server for P&L data
3. Update API URLs
4. Configure custom domain (optional)
5. Monitor performance

---

**Need Help?** Check Netlify's documentation or contact support.

