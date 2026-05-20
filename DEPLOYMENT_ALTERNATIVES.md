# Frontend Deployment Alternatives

## Quick Comparison

| Platform | Free Tier | Setup Time | Best For |
|----------|-----------|------------|----------|
| **Netlify** | 100GB/month | 5 min | General use, forms |
| **Cloudflare Pages** | Unlimited | 5 min | Global CDN, speed |
| **Render** | 100GB/month | 10 min | Fullstack apps |
| **GitHub Pages** | 1GB storage | 15 min | Static sites |
| **Railway** | $5 credit | 5 min | Same platform as backend |

---

## 1. NETLIFY (Recommended)

**Pros:**
- ✅ Generous free tier (100GB bandwidth)
- ✅ Auto-deploy from GitHub
- ✅ Forms & functions included
- ✅ Custom domains
- ✅ Preview deployments

**Setup:**
1. Go to https://netlify.com
2. Sign up with GitHub
3. Import `crypto-web3-toolkit` repo
4. Set base directory: `frontend`
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add env vars:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   NEXT_PUBLIC_MOCK_MODE=false
   ```
8. Deploy

**Result:** `https://crypto-web3-toolkit.netlify.app`

---

## 2. CLOUDFLARE PAGES

**Pros:**
- ✅ Unlimited bandwidth (free)
- ✅ Global CDN (fastest)
- ✅ DDoS protection
- ✅ Web Analytics included

**Setup:**
1. Go to https://pages.cloudflare.com
2. Connect GitHub account
3. Select `crypto-web3-toolkit` repo
4. Configure:
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output: `.next`
   - Root directory: `frontend`
5. Add environment variables
6. Deploy

**Result:** `https://crypto-web3-toolkit.pages.dev`

---

## 3. RENDER

**Pros:**
- ✅ Backend + frontend in one platform
- ✅ Free SSL
- ✅ Auto-deploy
- ✅ PostgreSQL included

**Setup:**
1. Go to https://render.com
2. New → Static Site
3. Connect GitHub repo
4. Configure:
   - Name: crypto-web3-toolkit-frontend
   - Root directory: `frontend`
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
5. Add environment variables
6. Deploy

**Note:** Next.js needs `output: 'export'` in `next.config.js` for static export

**Result:** `https://crypto-web3-toolkit.onrender.com`

---

## 4. GITHUB PAGES

**Pros:**
- ✅ Completely free
- ✅ Direct from GitHub repo
- ✅ Custom domains supported

**Cons:**
- ❌ Manual deployment
- ❌ No server-side rendering
- ❌ Static export only

**Setup:**
1. Update `next.config.js`:
   ```javascript
   module.exports = {
     output: 'export',
     basePath: '/crypto-web3-toolkit',
     images: { unoptimized: true }
   }
   ```

2. Build and deploy:
   ```bash
   cd frontend
   npm run build
   npx gh-pages -d out
   ```

3. Enable GitHub Pages in repo settings

**Result:** `https://alifanethotspot.github.io/crypto-web3-toolkit`

---

## 5. RAILWAY (Same Platform)

**Pros:**
- ✅ Backend + frontend on same platform
- ✅ Unified billing
- ✅ Easy environment sharing

**Setup:**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select `crypto-web3-toolkit`
4. Add service → Select `frontend` directory
5. Configure:
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: 3000
6. Add environment variables
7. Deploy

**Result:** `https://crypto-web3-toolkit-frontend.up.railway.app`

---

## Recommended Setup by Use Case

### For Hackathons/Demos
**Netlify** or **Cloudflare Pages**
- Fast setup
- Auto-deploy
- Free tier sufficient

### For Production Apps
**Render** or **Railway**
- Backend + frontend together
- Better monitoring
- Scalable

### For Portfolio Projects
**Netlify** or **GitHub Pages**
- Custom domain support
- Professional URLs
- Free forever

### For Global Audience
**Cloudflare Pages**
- Fastest CDN
- Unlimited bandwidth
- DDoS protection

---

## Next.js Configuration for Static Export

If deploying to GitHub Pages or static hosts, update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Better compatibility
}

module.exports = nextConfig
```

Then build:
```bash
npm run build
# Output in 'out/' directory
```

---

## Environment Variables

All platforms need these:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_MOCK_MODE=false
```

**Important:** Prefix with `NEXT_PUBLIC_` for client-side access in Next.js

---

## CORS Configuration

Update backend to allow your frontend domain:

```python
# backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://crypto-web3-toolkit.netlify.app",
        "https://crypto-web3-toolkit.pages.dev",
        "https://crypto-web3-toolkit.onrender.com",
        "http://localhost:3000",  # Local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend environment variables configured
- [ ] CORS configured in backend
- [ ] Build succeeds locally
- [ ] API endpoints tested
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics setup (optional)

---

## Cost Comparison (Monthly)

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Netlify | 100GB bandwidth | $19/month (1TB) |
| Cloudflare Pages | Unlimited | $20/month (advanced) |
| Render | 100GB bandwidth | $7/month (starter) |
| GitHub Pages | 1GB storage | Free only |
| Railway | $5 credit | Pay-as-you-go |

---

## Support & Documentation

- **Netlify:** https://docs.netlify.com
- **Cloudflare Pages:** https://developers.cloudflare.com/pages
- **Render:** https://render.com/docs
- **GitHub Pages:** https://docs.github.com/pages
- **Railway:** https://docs.railway.app

---

**Recommendation:** Start with **Netlify** for easiest setup, switch to **Cloudflare Pages** if you need unlimited bandwidth.
