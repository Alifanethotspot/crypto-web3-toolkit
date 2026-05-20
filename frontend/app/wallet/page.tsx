'use client'

import { useState } from "react"
import { Search, AlertCircle, TrendingUp } from "lucide-react"
import axios from "axios"

interface WalletAnalysis {
  address: string
  chain: string
  total_value_usd: number
  token_count: number
  tokens: Array<{
    symbol: string
    balance: number
    value_usd: number
    percentage: number
  }>
  risk_assessment: {
    score: number
    level: string
    factors: string[]
  }
  transaction_count: number
}

export default function WalletPage() {
  const [address, setAddress] = useState("")
  const [chain, setChain] = useState("ethereum")
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!address.trim()) {
      setError("Please enter a wallet address")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await axios.post("/api/wallet/analyze", {
        address,
        chain,
      })
      setAnalysis(response.data)
    } catch (err) {
      setError("Failed to analyze wallet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-orange-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Wallet Analyzer</h1>
        <p className="text-slate-300">Analyze wallet addresses with AI-powered risk assessment</p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Blockchain</label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">BSC</option>
            <option value="solana">Solana</option>
          </select>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 rounded transition"
        >
          {loading ? "Analyzing..." : "Analyze Wallet"}
        </button>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Total Value</div>
              <div className="text-3xl font-bold text-white">
                \${analysis.total_value_usd.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Tokens</div>
              <div className="text-3xl font-bold text-white">{analysis.token_count}</div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Transactions</div>
              <div className="text-3xl font-bold text-white">{analysis.transaction_count}</div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Risk Assessment</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">{analysis.risk_assessment.score}</div>
              <div>
                <div className={`text-lg font-bold ${getRiskColor(analysis.risk_assessment.level)}`}>
                  {analysis.risk_assessment.level.toUpperCase()}
                </div>
                <div className="text-slate-400 text-sm">Risk Level</div>
              </div>
            </div>
            <div className="space-y-2">
              {analysis.risk_assessment.factors.map((factor, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Distribution */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Token Distribution</h3>
            <div className="space-y-3">
              {analysis.tokens.map((token) => (
                <div key={token.symbol}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-medium">{token.symbol}</span>
                    <span className="text-slate-300">\${token.value_usd.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: \`\${token.percentage}%\` }}
                    />
                  </div>
                  <div className="text-slate-400 text-xs mt-1">{token.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
