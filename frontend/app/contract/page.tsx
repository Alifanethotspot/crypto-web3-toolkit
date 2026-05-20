'use client'

import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import axios from "axios"

interface AuditReport {
  contract_address: string
  security_score: number
  findings: Array<{
    severity: string
    title: string
    description: string
    recommendation: string
  }>
  gas_optimizations: Array<{
    optimization: string
    potential_savings: string
    difficulty: string
  }>
  overall_assessment: string
}

export default function ContractPage() {
  const [address, setAddress] = useState("")
  const [chain, setChain] = useState("ethereum")
  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAudit = async () => {
    if (!address.trim()) {
      setError("Please enter a contract address")
      return
    }

    setLoading(true)
    setError("")
    try {
      const response = await axios.post("/api/contract/audit", {
        contract_address: address,
        chain,
      })
      setReport(response.data)
    } catch (err) {
      setError("Failed to audit contract. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-900 text-red-200"
      case "high":
        return "bg-orange-900 text-orange-200"
      case "medium":
        return "bg-yellow-900 text-yellow-200"
      case "low":
        return "bg-blue-900 text-blue-200"
      default:
        return "bg-slate-700 text-slate-200"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Smart Contract Auditor</h1>
        <p className="text-slate-300">Audit smart contracts for security vulnerabilities and optimizations</p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Contract Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Blockchain</label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">BSC</option>
          </select>
        </div>

        <button
          onClick={handleAudit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-medium py-2 rounded transition"
        >
          {loading ? "Auditing..." : "Audit Contract"}
        </button>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {report && (
        <div className="space-y-6">
          {/* Security Score */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm mb-2">Security Score</div>
                <div className="text-4xl font-bold text-white">{report.security_score}/100</div>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{report.security_score}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-2">Overall Assessment</h3>
            <p className="text-slate-300">{report.overall_assessment}</p>
          </div>

          {/* Findings */}
          {report.findings.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Security Findings</h3>
              <div className="space-y-4">
                {report.findings.map((finding, i) => (
                  <div key={i} className="border border-slate-600 rounded p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(finding.severity)}`}>
                        {finding.severity.toUpperCase()}
                      </span>
                      <h4 className="text-white font-bold">{finding.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{finding.description}</p>
                    <p className="text-slate-400 text-sm">
                      <span className="font-bold">Recommendation:</span> {finding.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gas Optimizations */}
          {report.gas_optimizations.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Gas Optimizations</h3>
              <div className="space-y-3">
                {report.gas_optimizations.map((opt, i) => (
                  <div key={i} className="border border-slate-600 rounded p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-bold">{opt.optimization}</h4>
                      <span className="text-green-400 text-sm font-bold">{opt.potential_savings}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Difficulty: {opt.difficulty}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
