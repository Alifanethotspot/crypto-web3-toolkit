# Crypto Web3 Toolkit 🚀

AI-powered Web3 analysis toolkit with wallet analyzer, smart contract auditor, and market sentiment tracker.

## Features

### 1. AI Wallet Analyzer
- Analyze wallet addresses across multiple chains (Ethereum, BSC, Polygon)
- AI-powered risk assessment
- Transaction pattern analysis
- Portfolio insights

### 2. Smart Contract Auditor
- Security vulnerability detection
- Gas optimization suggestions
- Code quality analysis
- Best practices validation

### 3. Market Sentiment Analyzer
- Real-time sentiment tracking
- Social media analysis
- News aggregation
- Trend prediction

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI components

**Backend:**
- FastAPI (Python)
- PostgreSQL
- Redis
- OpenAI GPT-4

**Infrastructure:**
- Railway (Backend)
- Vercel (Frontend)
- GitHub Actions (CI/CD)

## Quick Start

### Local Development

1. Clone repository:
```bash
git clone https://github.com/Alifanethotspot/crypto-web3-toolkit.git
cd crypto-web3-toolkit
```

2. Start backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure your API keys
uvicorn main:app --reload --port 8000
```

3. Start frontend:
```bash
cd frontend
npm install
cp .env.local.example .env.local  # Configure API URL
npm run dev
```

4. Open http://localhost:3000

## Deployment

### Backend (Railway)
1. Go to https://railway.app
2. Deploy from GitHub: `Alifanethotspot/crypto-web3-toolkit`
3. Set root directory: `backend`
4. Add environment variables (see DEPLOYMENT_MANUAL.md)

### Frontend (Vercel)
1. Go to https://vercel.com
2. Import project: `crypto-web3-toolkit`
3. Set root directory: `frontend`
4. Add environment variables (see DEPLOYMENT_MANUAL.md)

See [DEPLOYMENT_MANUAL.md](DEPLOYMENT_MANUAL.md) for detailed instructions.

## Environment Variables

### Backend (.env)
```bash
OPENAI_API_KEY=your_key
DATABASE_URL=postgresql://user:pass@host/db
REDIS_URL=redis://host:6379/0
SECRET_KEY=your_secret
MOCK_MODE=true  # Set false in production
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_MODE=true
```

## API Documentation

Once backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
crypto-web3-toolkit/
├── backend/
│   ├── app/
│   │   ├── api/routes/      # API endpoints
│   │   ├── core/            # Core functionality
│   │   ├── models/          # Database models
│   │   └── services/        # Business logic
│   ├── tests/               # Backend tests
│   ├── main.py              # FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   └── package.json
├── .github/workflows/       # CI/CD
└── README.md
```

## Testing

### Backend
```bash
cd backend
pytest tests/ -v
```

### Frontend
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) file

## Author

**Alifanethotspot**
- GitHub: [@Alifanethotspot](https://github.com/Alifanethotspot)
- Email: alifanethotspot1@gmail.com

## Acknowledgments

- OpenAI for GPT-4 API
- Railway for backend hosting
- Vercel for frontend hosting
- Web3.py and Ethers.js communities

---

**Status:** 🚀 Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2026-05-20
