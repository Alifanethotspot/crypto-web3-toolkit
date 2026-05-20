#!/bin/bash
# Quick deployment script for Crypto Web3 Toolkit

set -e

echo "🚀 Crypto Web3 Toolkit - Quick Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
command -v git >/dev/null 2>&1 || { echo "❌ git not found"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not found"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ python3 not found"; exit 1; }
echo -e "${GREEN}✓ All prerequisites found${NC}"
echo ""

# Build backend
echo -e "${BLUE}Building backend...${NC}"
cd backend
pip install -r requirements.txt > /dev/null 2>&1
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
cd ..
echo ""

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
cd frontend
npm install --force > /dev/null 2>&1
npm run build > /dev/null 2>&1
echo -e "${GREEN}✓ Frontend built successfully${NC}"
cd ..
echo ""

# Git push
echo -e "${BLUE}Pushing to GitHub...${NC}"
git add .
git commit -m "build: production build $(date +%Y-%m-%d)" || true
git push origin main
echo -e "${GREEN}✓ Pushed to GitHub${NC}"
echo ""

# Deployment options
echo -e "${YELLOW}📋 Deployment Options:${NC}"
echo ""
echo "1. NETLIFY (Recommended)"
echo "   - Go to https://netlify.com"
echo "   - Import from GitHub: Alifanethotspot/crypto-web3-toolkit"
echo "   - Base directory: frontend"
echo "   - Build: npm run build"
echo "   - Publish: .next"
echo ""
echo "2. CLOUDFLARE PAGES"
echo "   - Go to https://pages.cloudflare.com"
echo "   - Connect GitHub"
echo "   - Framework: Next.js"
echo "   - Build output: .next"
echo ""
echo "3. RENDER"
echo "   - Go to https://render.com"
echo "   - New Static Site"
echo "   - Build: npm run build"
echo "   - Publish: .next"
echo ""
echo "4. RAILWAY (Backend + Frontend)"
echo "   - Go to https://railway.app"
echo "   - Deploy from GitHub"
echo "   - Add frontend service"
echo ""
echo "5. GITHUB PAGES"
echo "   - Free option"
echo "   - Requires static export"
echo ""

echo -e "${GREEN}✓ Ready for deployment!${NC}"
echo ""
echo "📚 Documentation:"
echo "   - DEPLOYMENT_ALTERNATIVES.md - All options"
echo "   - DEPLOYMENT_NETLIFY.md - Netlify guide"
echo "   - DEPLOYMENT_MANUAL.md - Manual setup"
echo ""
echo "🔗 Repository: https://github.com/Alifanethotspot/crypto-web3-toolkit"
