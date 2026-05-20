from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import wallet, contract, sentiment
import os

app = FastAPI(
    title="Crypto Web3 Toolkit API",
    description="AI-powered Web3 analysis toolkit",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {"status": "healthy"}
