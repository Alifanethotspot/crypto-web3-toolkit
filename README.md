# Crypto Web3 Toolkit

A comprehensive AI-powered Web3 toolkit for wallet analysis, smart contract auditing, and market sentiment analysis.

## Features

### 1. AI Wallet Analyzer
- **Multi-chain support**: Ethereum, Polygon, BSC, Solana
- **Risk scoring**: AI-powered risk assessment based on transaction patterns
- **Portfolio insights**: Token distribution, profit/loss analysis
- **Anomaly detection**: Suspicious activity alerts

### 2. Smart Contract Auditor
- **Static analysis**: Security vulnerability detection
- **Gas optimization**: Cost reduction recommendations
- **Best practices**: Compliance with security standards
- **Audit report generation**: PDF reports with findings

### 3. Market Sentiment Analyzer
- **Real-time data**: Twitter/X, Reddit, Telegram sentiment
- **Price correlation**: Sentiment vs price movement analysis
- **Trend detection**: Emerging token trends
- **Custom alerts**: Set sentiment threshold notifications

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Wagmi + Viem for Web3 interactions

**Backend**
- FastAPI (Python)
- PostgreSQL for data storage
- Redis for caching
- Celery for async tasks

**AI/ML**
- OpenAI GPT-4 for analysis
- Custom ML models for risk scoring
- Hugging Face transformers for sentiment analysis

## Project Structure

```
crypto-web3-toolkit/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
├── ml-models/         # AI/ML models
├── docs/              # Documentation
└── scripts/           # Deployment scripts
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Redis 7+

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crypto-web3-toolkit
```

2. Set up backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Set up frontend:
```bash
cd frontend
npm install
```

4. Configure environment variables (see `.env.example` files)

5. Run the applications:
```bash
# Backend
cd backend
uvicorn main:app --reload --port 8000

# Frontend
cd frontend
npm run dev
```

## API Documentation

Once running, visit:
- Backend API docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

## Mock API Mode

For testing without blockchain API keys, enable mock mode:
```bash
export MOCK_MODE=true
```

## Deployment

### Railway (Backend)
```bash
railway up
```

### Vercel (Frontend)
```bash
vercel --prod
```

## Submission Requirements

This project includes:
- ✅ Complete source code
- ✅ Comprehensive documentation
- ✅ Mock API for testing
- ✅ Deployment guides
- ✅ API documentation
- ✅ Security considerations

## License

MIT License
