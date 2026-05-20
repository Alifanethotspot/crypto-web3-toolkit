import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

export interface WalletAnalysisRequest {
  address: string
  chain?: string
}

export interface ContractAuditRequest {
  contract_address: string
  chain?: string
  contract_code?: string
}

export interface SentimentAnalysisRequest {
  token_symbol: string
  timeframe?: string
}

export const walletApi = {
  analyze: (data: WalletAnalysisRequest) => api.post("/api/wallet/analyze", data),
  getPortfolio: (address: string, chain: string = "ethereum") =>
    api.get(`/api/wallet/portfolio/\${address}?chain=\${chain}`),
  getRiskScore: (address: string, chain: string = "ethereum") =>
    api.get(`/api/wallet/risk/\${address}?chain=\${chain}`),
}

export const contractApi = {
  audit: (data: ContractAuditRequest) => api.post("/api/contract/audit", data),
  getSecurityScore: (address: string, chain: string = "ethereum") =>
    api.get(`/api/contract/security-score/\${address}?chain=\${chain}`),
}

export const sentimentApi = {
  analyze: (data: SentimentAnalysisRequest) => api.post("/api/sentiment/analyze", data),
  getTrending: (limit: number = 10) => api.get(`/api/sentiment/trending?limit=\${limit}`),
  getTokenSentiment: (token: string, timeframe: string = "24h") =>
    api.get(`/api/sentiment/\${token}?timeframe=\${timeframe}`),
}

export default api
