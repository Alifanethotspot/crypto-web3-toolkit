# Netlify Deployment Guide

## Deploy Frontend to Netlify (Alternative to Vercel)

### 1. Create Netlify Account
- Go to https://netlify.com
- Sign up with GitHub (Alifanethotspot)
- Free tier includes:
  - 100GB bandwidth/month
  - Custom domains
  - Auto-deploy from GitHub
  - Forms & functions

### 2. Deploy from GitHub
1. Click "Add new site" → "Import an existing project"
2. Select "GitHub"
3. Choose repository: `Alifanethotspot/crypto-web3-toolkit`
4. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://crypto-web3-toolkit-backend.up.railway.app
   NEXT_PUBLIC_MOCK_MODE=false
   ```
6. Click "Deploy site"

### 3. Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS (point to Netlify)

### 4. Auto-deploy Setup
- Netlify automatically deploys on push to `main` branch
- Preview deployments for pull requests
- Rollback to previous versions

## Netlify vs Vercel Comparison

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Free tier | 100GB bandwidth | 100GB bandwidth |
| Build minutes | 300 min/month | 100 hours/month |
| Concurrent builds | 1 | 1 |
| Custom domains | ✅ | ✅ |
| Auto-deploy | ✅ | ✅ |
| Preview deploys | ✅ | ✅ |
| Forms | ✅ | ❌ |
| Functions | ✅ | ✅ |
| Analytics | Basic | Advanced |

## Netlify CLI (Optional)

```bash
# Install CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod

# Or link to existing site
netlify link
netlify deploy --prod
```

## Environment Variables

Add these in Netlify dashboard (Site settings → Environment variables):

```
NEXT_PUBLIC_API_URL=https://crypto-web3-toolkit-backend.up.railway.app
NEXT_PUBLIC_MOCK_MODE=false
```

## Troubleshooting

### Build Fails
1. Check build logs in Netlify dashboard
2. Common issues:
   - Missing dependencies → Add `npm ci` in build command
   - Node version → Set `NODE_VERSION=20` in environment
   - Build timeout → Increase build timeout in site settings

### CORS Issues
If backend is on Railway, ensure CORS allows Netlify domain:
```python
# In backend/main.py
allow_origins=["https://your-site.netlify.app"]
```

### API URL Not Working
1. Check if backend is running: `curl https://crypto-web3-toolkit-backend.up.railway.app/health`
2. Update `NEXT_PUBLIC_API_URL` in Netlify environment
3. Rebuild site

## Benefits of Netlify

1. **Free tier generous** – 100GB bandwidth
2. **Forms included** – Collect user data without backend
3. **Functions** – Serverless functions for API calls
4. **Split testing** – A/B testing built-in
5. **Rollbacks** – One-click rollback to previous versions
6. **Password protection** – Protect staging sites

## Next Steps After Deployment

1. **Test frontend:** https://your-site.netlify.app
2. **Connect custom domain** (optional)
3. **Set up analytics** (Google Analytics or Netlify Analytics)
4. **Configure forms** for user feedback
5. **Set up notifications** for build failures

## Support
- Netlify Docs: https://docs.netlify.com
- Community: https://community.netlify.com
- Status: https://www.netlifystatus.com
