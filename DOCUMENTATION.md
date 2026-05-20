# Crypto Web3 Toolkit - Technical Documentation

## Architecture Overview

### System Components

```
┌─────────────────┐         ┌─────────────────┐
│   Next.js 14    │────────▶│   FastAPI       │
│   Frontend      │  HTTP   │   Backend       │
└─────────────────┘         └─────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌──────────────┐ ┌──────────┐ ┌──────────────┐
            │  PostgreSQL  │ │  Redis   │ │  OpenAI API  │
            │   Database   │ │  Cache   │ │   AI Models  │
            └──────────────┘ └──────────┘ └──────────────┘
```

## API Endpoints

### Wallet Analysis

**POST /api/wallet/analyze**
```json
{
  "address": "0x...",
  "chain": "ethereum"
}
```

Response:
```json
{
  "address": "0x...",
  "chain": "ethereum",
  "total_value_usd": 125430.50,
  "token_count": 12,
  "tokens": [...],
  "risk_assessment": {
    "score": 28.5,
    "level": "low",
    "factors": [...]
  },
  "transaction_count": 1247
}
```

**GET /api/wallet/portfolio/{address}**
- Query params: `chain` (default: ethereum)
- Returns portfolio breakdown

**GET /api/wallet/risk/{address}**
- Query params: `chain` (default: ethereum)
- Returns risk assessment only

### Smart Contract Audit

**POST /api/contract/audit**
```json
{
  "contract_address": "0x...",
  "chain": "ethereum",
  "contract_code": "optional source code"
}
```

Response:
```json
{
  "contract_address": "0x...",
  "security_score": 87.5,
  "findings": [
    {
      "severity": "medium",
      "title": "Potential Reentrancy Vulnerability",
      "description": "...",
      "recommendation": "..."
    }
  ],
  "gas_optimizations": [...],
  "overall_assessment": "..."
}
```

**GET /api/contract/security-score/{address}**
- Query params: `chain` (default: ethereum)
- Returns security score summary

### Market Sentiment

**POST /api/sentiment/analyze**
```json
{
  "token_symbol": "ETH",
  "timeframe": "24h"
}
```

Response:
```json
{
  "token_symbol": "ETH",
  "overall_sentiment": 0.68,
  "sentiment_level": "bullish",
  "sources": [
    {
      "source": "twitter",
      "sentiment_score": 0.72,
      "mention_count": 2847,
      "engagement": 15230
    }
  ],
  "trend": {
    "trend": "bullish",
    "strength": 78.5,
    "momentum": "increasing"
  },
  "price_correlation": 0.82,
  "key_topics": [...]
}
```

**GET /api/sentiment/trending**
- Query params: `limit` (default: 10, max: 50)
- Returns trending tokens by sentiment

**GET /api/sentiment/{token}**
- Query params: `timeframe` (default: 24h)
- Returns sentiment for specific token

## Mock Mode

For testing without API keys, set `MOCK_MODE=true` in backend `.env`:

```bash
export MOCK_MODE=true
```

Mock mode provides realistic sample data for all endpoints.

## Security Considerations

### API Keys
- Store API keys in environment variables
- Never commit `.env` files to git
- Use different keys for dev/staging/prod

### Rate Limiting
- Implement rate limiting for public endpoints
- Use API keys for authenticated access
- Monitor usage patterns

### Input Validation
- Validate wallet addresses (checksums)
- Sanitize contract code input
- Validate token symbols

### CORS
- Configure allowed origins in production
- Use environment-specific CORS settings

## Performance Optimization

### Caching Strategy
- Redis for API response caching
- Cache TTL: 5 minutes for wallet data
- Cache TTL: 1 hour for contract audits
- Cache TTL: 15 minutes for sentiment data

### Database Optimization
- Index on wallet addresses
- Index on contract addresses
- Partition by chain for large datasets

### Frontend Optimization
- Next.js static generation where possible
- Image optimization
- Code splitting
- Lazy loading for charts

## Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
# Start backend
cd backend && uvicorn main:app --port 8000 &

# Run integration tests
cd tests && pytest integration/
```

## Monitoring & Logging

### Backend Logging
- Structured JSON logs
- Log levels: DEBUG, INFO, WARNING, ERROR
- Request/response logging
- Error tracking

### Metrics
- API response times
- Error rates
- Cache hit rates
- Database query performance

## Future Enhancements

### Phase 2
- [ ] Real blockchain API integration
- [ ] User authentication
- [ ] Saved analyses
- [ ] Email alerts

### Phase 3
- [ ] Multi-wallet portfolio tracking
- [ ] Historical trend analysis
- [ ] Custom alert rules
- [ ] PDF report generation

### Phase 4
- [ ] Mobile app
- [ ] WebSocket real-time updates
- [ ] Advanced ML models
- [ ] Social trading features

## Support

For issues or questions:
- GitHub Issues: [your-repo]/issues
- Documentation: [your-docs-url]
- Email: support@example.com
