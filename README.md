# FiFTO Website

Premium single-page website for FiFTO - Automated Intraday Portfolio Management.

## Features

- ✅ Hero section with CTAs
- ✅ Performance summary cards
- ✅ Verified client results
- ✅ How it works workflow
- ✅ Daily EOD P&L feed (Google Sheets embed)
- ✅ Transparent profit sharing model
- ✅ Future roadmap section
- ✅ Client testimonials
- ✅ Contact/consultation form
- ✅ Responsive design
- ✅ SEO optimized

## Setup Instructions

### 1. Add Logo
- Place your FiFTO logo file as `logo.png` in the root directory
- The logo should be approximately 50px in height
- If logo is not found, the text "FiFTO" will be displayed instead

### 2. Google Sheets Embed
To embed your Daily EOD P&L feed:

1. Open your Google Sheet with the P&L data
2. Go to **File → Share → Publish to web**
3. Select the sheet/tab you want to display
4. Choose **Embed** format
5. Copy the embed URL
6. Open `index.html` and find the iframe with class `google-sheet`
7. Replace `YOUR_SHEET_ID` in the src attribute with your actual embed URL

Example:
```html
<iframe 
    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vYOUR_SHEET_ID/pubhtml?widget=true&headers=false" 
    class="google-sheet"
    frameborder="0">
</iframe>
```

### 3. Form Submission
The contact form currently shows an alert on submission. To connect it to a backend:

1. Set up an API endpoint to receive form data
2. Update the `script.js` file in the form submission handler
3. Uncomment and configure the fetch API call

### 4. Customization
- **Colors**: Edit CSS variables in `styles.css` (lines 8-18)
- **Content**: Update text directly in `index.html`
- **Charts**: Replace chart placeholders with actual chart images or embed Chart.js/other charting libraries

## File Structure

```
PortFolio PMS/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
├── logo.png        # FiFTO logo (add this)
└── README.md       # This file
```

## Running the Website

### Option 1: Local Server (Recommended for P&L Tracking)

To enable P&L data fetching from Flattrade, run the local server:

```bash
# Start the server
node server.js
```

Then open `http://localhost:3000` in your browser.

The server will:
- Serve your website files
- Proxy requests to Flattrade (bypassing CORS)
- Enable automatic P&L data fetching

### Option 2: Manual Data Entry (For Testing)

If you don't want to run a server, you can manually enter P&L data:

1. Open `manual-data-entry.html` in your browser
2. Enter daily P&L data
3. Data will be saved to localStorage
4. Open `index.html` to view the data

### Option 3: Simple File Opening

Simply open `index.html` in a web browser (P&L fetching won't work due to CORS, but you can use manual data entry).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The website is fully responsive and works on mobile, tablet, and desktop
- All sections are SEO optimized with proper meta tags
- Smooth scrolling is enabled for navigation
- Form validation is included
- The design uses a premium dark green and white color scheme

## Next Steps

1. Add your logo file
2. Set up Google Sheets embed
3. Configure form submission backend (optional)
4. Add actual chart images to replace placeholders
5. Test on different devices and browsers
6. Deploy to your hosting service

## Contact

For questions or support, contact Mani Raja.

