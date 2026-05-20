# Manual Deployment Guide

## Backend (Railway) - Web UI Setup

1. Go to https://railway.app
2. Login with GitHub (Alifanethotspot)
3. Create new project → "Deploy from GitHub"
4. Select: `Alifanethotspot/crypto-web3-toolkit`
5. Configure:
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

6. Add environment variables:
   ```
   OPENAI_API_KEY=your_key
   DATABASE_URL=postgresql://user:pass@host/db
   REDIS_URL=redis://host:6379/0
   SECRET_KEY=your_secret
   MOCK_MODE=true
   ```

7. Deploy → Get public URL (e.g., https://crypto-web3-toolkit-backend.up.railway.app)

## Frontend (Vercel) - Web UI Setup

1. Go to https://vercel.com
2. Login with GitHub (Alifanethotspot)
3. Import project → Select `crypto-web3-toolkit`
4. Configure:
   - Framework: Next.js
   - Root directory: `frontend`
   - Build command: `npm run build`

5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://crypto-web3-toolkit-backend.up.railway.app
   NEXT_PUBLIC_MOCK_MODE=false
   ```

6. Deploy → Get public URL (e.g., https://crypto-web3-toolkit.vercel.app)

## Testing

Backend health check:
```bash
curl https://crypto-web3-toolkit-backend.up.railway.app/health
```

Frontend:
```
https://crypto-web3-toolkit.vercel.app
```

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/deploy.yml` for auto-deployment on push.
