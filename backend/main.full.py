from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import wallet, contract, sentiment
import os
import uvicorn

app = FastAPI(
    title="Crypto Web3 Toolkit API",
    description="AI-powered Web3 analysis toolkit",
    version="1.0.0"
)

# CORS configuration - Allow all origins for development, restrict in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.netlify.app",
        "https://*.vercel.app",
        "https://*.railway.app",
        "*"  # Allow all for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)

# Include routers
app.include_router(wallet.router, prefix="/api/wallet", tags=["Wallet Analysis"])
app.include_router(contract.router, prefix="/api/contract", tags=["Contract Audit"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Market Sentiment"])

@app.get("/")
async def root():
    return {
        "message": "Crypto Web3 Toolkit API",
        "version": "1.0.0",
        "docs": "/docs",
        "mock_mode": os.getenv("MOCK_MODE", "false") == "true"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": "2026-05-20T09:56:30Z"}

# Railway production entry point
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info",
        access_log=True
    )
