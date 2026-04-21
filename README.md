# CalcWise — Financial Calculator Website

A production-ready, SEO-optimized financial calculator website built with Next.js and Tailwind CSS.
Designed to generate organic search traffic and monetize with Google AdSense.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 📁 Project Structure

```
calcwise/
├── components/
│   ├── ads/
│   │   └── AdSlot.jsx          ← AdSense ad units (lazy-loaded)
│   ├── calculators/
│   │   ├── MortgageCalculator.jsx
│   │   ├── LOCCalculator.jsx
│   │   ├── RenovationCalculator.jsx
│   │   └── RecreationCalculator.jsx
│   ├── layout/
│   │   ├── Layout.jsx           ← Main page wrapper
│   │   ├── Navbar.jsx           ← Sticky navigation
│   │   └── Footer.jsx           ← Footer with links + ad
│   └── ui/
│       └── index.jsx            ← Shared UI components
├── lib/
│   ├── calculations.js          ← All financial math logic
│   ├── seo.js                   ← SEO helpers, schema markup
│   └── useLocalStorage.js       ← Persist inputs between sessions
├── pages/
│   ├── _app.jsx
│   ├── _document.jsx            ← AdSense script injection point
│   ├── index.jsx                ← Homepage
│   ├── mortgage-calculator.jsx
│   ├── line-of-credit-calculator.jsx
│   ├── renovation-calculator.jsx
│   ├── recreation-calculator.jsx
│   └── 404.jsx
├── public/
│   ├── sitemap.xml              ← SEO sitemap
│   └── robots.txt
├── styles/
│   └── globals.css              ← Tailwind + custom styles
├── vercel.json                  ← Vercel deployment config
└── netlify.toml                 ← Netlify deployment config (alternative)
```

---

## 🌐 Deployment

### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo at https://vercel.com/new — Vercel auto-detects Next.js.

### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Install Next.js plugin
npm install @netlify/plugin-nextjs

# Deploy
netlify deploy --build
```

---

## 💰 Google AdSense Setup

### Step 1: Get approved
1. Sign up at https://adsense.google.com
2. Add your domain and submit for review
3. Wait for approval (typically 1-4 weeks for new sites)

### Step 2: Add the AdSense script
Open `pages/_document.jsx` and uncomment the AdSense script:

```jsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

Replace `ca-pub-XXXXXXXXXXXXXXXXX` with your actual Publisher ID from AdSense dashboard.

### Step 3: Create ad units
In your AdSense dashboard, create these ad units:
- **Leaderboard** (728×90 or responsive) → for header/footer
- **Rectangle** (300×250) → for sidebars/inline
- **Inline** (responsive) → between sections

### Step 4: Update slot IDs
Open `components/ads/AdSlot.jsx` and replace the slot numbers:

```js
const AD_CONFIGS = {
  leaderboard: { slot: 'YOUR_LEADERBOARD_SLOT_ID', ... },
  rectangle:   { slot: 'YOUR_RECTANGLE_SLOT_ID', ... },
  inline:      { slot: 'YOUR_INLINE_SLOT_ID', ... },
};
```

Also update `data-ad-client` in the same file with your Publisher ID.

### Ad Placement Map
| Location               | Component Used   | AdSlot Type  |
|------------------------|------------------|--------------|
| Below hero / page top  | `leaderboard`    | leaderboard  |
| Between calc + content | `rectangle`      | rectangle    |
| Inside calculator      | `inline`         | inline       |
| Footer                 | `leaderboard`    | leaderboard  |

> **AdSense Policy Note:** All ad placements are separated from interactive calculator elements by at least 150px to comply with AdSense policies on accidental clicks.

---

## 📊 Google Analytics Setup

Open `pages/_document.jsx` and uncomment the Analytics block:

```jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script dangerouslySetInnerHTML={{
  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`
}} />
```

Replace `G-XXXXXXXXXX` with your Measurement ID.

---

## 🔍 SEO Configuration

### Update your domain
Replace `https://www.calcwise.io` with your actual domain in:
- `lib/seo.js` → `SITE_URL` constant
- `public/sitemap.xml` → all `<loc>` URLs
- `public/robots.txt` → Sitemap URL

### Submit to search engines
1. **Google Search Console**: Add property at https://search.google.com/search-console
2. Submit `https://yourdomain.com/sitemap.xml`
3. **Bing Webmaster Tools**: https://www.bing.com/webmasters

### Schema markup included
Each page includes:
- `WebApplication` schema (marks site as a tool)
- `FAQPage` schema (may get FAQ rich results in Google)
- `WebSite` schema on homepage

---

## 🛠️ Customization

### Change branding
- Site name: `lib/seo.js` → `SITE_NAME`
- Colors: `tailwind.config.js` → `colors.brand` and `colors.accent`
- Logo: `components/layout/Navbar.jsx`

### Add a new calculator
1. Create `components/calculators/YourCalculator.jsx`
2. Add calculation logic to `lib/calculations.js`
3. Create `pages/your-calculator.jsx` with SEO content
4. Add to `lib/seo.js` → `CALCULATORS` array (appears in nav + related)

### LocalStorage keys
Each calculator saves inputs under a unique key:
- `mortgage-inputs`
- `loc-inputs`
- `renovation-inputs`
- `recreation-inputs`

---

## ⚡ Performance

- All calculations are client-side (zero backend required)
- Ads are lazy-loaded via IntersectionObserver
- Next.js automatic code splitting per page
- Images use Next.js `<Image>` with WebP/AVIF format
- Recharts is the only heavyweight dependency (~200KB gzipped split across pages)

### Lighthouse targets
- Performance: 90+
- SEO: 100
- Accessibility: 90+
- Best Practices: 95+

---

## 📝 Legal

Add these pages before going live (required for AdSense):
- **Privacy Policy** — required if using AdSense or Analytics
- **Terms of Service**
- **Disclaimer** — already in footer, expand as needed

Free privacy policy generators: https://www.privacypolicygenerator.info

---

## 🤝 License

MIT — free to use, modify, and deploy commercially.
