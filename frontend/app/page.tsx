'use client'

import Link from "next/link"
import { ArrowRight, Wallet, FileText, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h2 className="text-5xl font-bold text-white">
          AI-Powered Web3 Analysis
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Analyze wallets, audit smart contracts, and track market sentiment with advanced AI models
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Wallet Analyzer */}
        <Link href="/wallet" className="group">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition h-full">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Wallet Analyzer</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Analyze wallet addresses with AI-powered risk assessment and portfolio insights
            </p>
            <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Contract Auditor */}
        <Link href="/contract" className="group">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-purple-500 transition h-full">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Contract Auditor</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Audit smart contracts for security vulnerabilities and gas optimization opportunities
            </p>
            <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Sentiment Analyzer */}
        <Link href="/sentiment" className="group">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-green-500 transition h-full">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Sentiment Analyzer</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Track market sentiment across social platforms and correlate with price movements
            </p>
            <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mt-12">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-400">1M+</div>
          <div className="text-slate-300 text-sm">Wallets Analyzed</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">50K+</div>
          <div className="text-slate-300 text-sm">Contracts Audited</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-400">99.9%</div>
          <div className="text-slate-300 text-sm">Uptime</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400">24/7</div>
          <div className="text-slate-300 text-sm">Real-time Monitoring</div>
        </div>
      </div>
    </div>
  )
}
