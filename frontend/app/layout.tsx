import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Web3 Toolkit",
  description: "AI-powered Web3 analysis toolkit for wallet analysis, smart contract auditing, and market sentiment",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">🔐 Crypto Web3 Toolkit</h1>
                <div className="flex gap-6">
                  <a href="/wallet" className="text-slate-300 hover:text-white transition">Wallet</a>
                  <a href="/contract" className="text-slate-300 hover:text-white transition">Contract</a>
                  <a href="/sentiment" className="text-slate-300 hover:text-white transition">Sentiment</a>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
