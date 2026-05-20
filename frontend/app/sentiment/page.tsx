'use client'

import { useState } from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import axios from "axios"

interface SentimentAnalysis {
  token_symbol: string
  overall_sentiment: number
  sentiment_level: string
  sources: Array<{
    source: string
    sentiment_score: number
    mention_count: number
    engagement: number
  }>
  trend: {
    trend: string
    strength: number
    momentum: string
  }
  price_correlation: number
  key_topics: string[]
}

export default function SentimentPage() {
  const [token, setToken] = useState("ETH")
  const [timeframe, setTimeframe] = useState("24h")
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!token.trim()) {
      setError("Please enter a token symbol")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await axios.post("/api/sentiment/analyze", {
        token_symbol: token,
        timeframe,
      })
      setAnalysis(response.data)
    } catch (err) {
      setError("Failed to analyze sentiment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.5) return "text-green-400"
    if (score > 0) return "text-yellow-400"
    if (score > -0.5) return "text-orange-400"
    return "text-red-400"
  }

  const getSentimentIcon = (score: number) => {
    if (score > 0) return <TrendingUp className="w-5 h-5" />
    return <TrendingDown className="w-5 h-5" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Market Sentiment Analyzer</h1>
        <p className="text-slate-300">Track market sentiment across social platforms and correlate with price movements</p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Token Symbol</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase())}
              placeholder="ETH, BTC, SOL..."
              className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-green-500"
            >
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white font-medium py-2 rounded transition"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <Activity className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Sentiment */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Overall Sentiment</div>
              <div className="flex items-center gap-3">
                <div className={`text-4xl font-bold ${getSentimentColor(analysis.overall_sentiment)}`}>
                  {analysis.overall_sentiment.toFixed(2)}
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {analysis.sentiment_level.replace("_", " ").toUpperCase()}
                  </div>
                  <div className="text-slate-400 text-sm">Score (-1 to 1)</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Trend Strength</div>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold text-white">{analysis.trend.strength}%</div>
                <div>
                  <div className="text-lg font-bold text-white">{analysis.trend.trend.toUpperCase()}</div>
                  <div className="text-slate-400 text-sm">Momentum: {analysis.trend.momentum}</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="text-slate-400 text-sm mb-2">Price Correlation</div>
              <div className="text-4xl font-bold text-white">{analysis.price_correlation.toFixed(2)}</div>
              <div className="text-slate-400 text-sm">Correlation with price movement</div>
            </div>
          </div>

          {/* Sources */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Sentiment by Source</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {analysis.sources.map((source) => (
                <div key={source.source} className="border border-slate-600 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-bold capitalize">{source.source}</h4>
                    <div className="flex items-center gap-1">
                      {getSentimentIcon(source.sentiment_score)}
                      <span className={`font-bold ${getSentimentColor(source.sentiment_score)}`}>
                        {source.sentiment_score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="text-slate-400">Mentions: {source.mention_count.toLocaleString()}</div>
                    <div className="text-slate-400">Engagement: {source.engagement.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Key Topics</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.key_topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trending Tokens */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Trending Tokens</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { symbol: "ETH", sentiment: 0.75, mentions: 5234 },
            { symbol: "SOL", sentiment: 0.68, mentions: 3421 },
            { symbol: "AVAX", sentiment: 0.62, mentions: 2156 },
          ].map((token) => (
            <div key={token.symbol} className="border border-slate-600 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-bold text-lg">{token.symbol}</h4>
                <div className="flex items-center gap-1">
                  {getSentimentIcon(token.sentiment)}
                  <span className={`font-bold ${getSentimentColor(token.sentiment)}`}>
                    {token.sentiment.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="text-slate-400 text-sm">Mentions: {token.mentions.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
