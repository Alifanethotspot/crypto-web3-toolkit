# Deployment Guide

## Backend Deployment (Railway)

### Prerequisites
- Railway account
- PostgreSQL database
- Redis instance

### Steps
1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Create new project:
```bash
railway init
```

4. Add environment variables:
```bash
railway variables set OPENAI_API_KEY=your_key
railway variables set DATABASE_URL=postgresql://...
railway variables set REDIS_URL=redis://...
```

5. Deploy:
```bash
railway up
```

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps
1. Import your repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
   - `NEXT_PUBLIC_MOCK_MODE`: Set to `false` for production
3. Deploy with default settings

## Environment Variables

### Backend (.env)
```bash
# API Keys
OPENAI_API_KEY=your_openai_key_here
ETHERSCAN_API_KEY=your_etherscan_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/crypto_toolkit
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256

# Mock Mode
MOCK_MODE=true  # Set to false in production
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
NEXT_PUBLIC_MOCK_MODE=false
```

## Testing

### Local Development
1. Start backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2. Start frontend:
```bash
cd frontend
npm install
npm run dev
```

### Production Testing
1. Verify API endpoints:
```bash
curl https://your-backend.up.railway.app/health
```

2. Test frontend:
- Visit your Vercel URL
- Test all three tools

## Monitoring

### Backend
- Railway dashboard for logs and metrics
- Health endpoint: `/health`

### Frontend
- Vercel analytics
- Error tracking with Sentry (optional)

## Scaling

### Database
- Upgrade PostgreSQL plan on Railway
- Add connection pooling

### Redis
- Use Redis Cloud for production
- Configure cache TTL

### API Rate Limiting
- Implement rate limiting for public endpoints
- Use API keys for authenticated endpoints
