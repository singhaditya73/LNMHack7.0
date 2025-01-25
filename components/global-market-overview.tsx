"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGlobalMarketData } from "@/lib/coingecko"
import { Loader2 } from "lucide-react" // Assuming you have an icon library like lucide-react

export function GlobalMarketOverview() {
  const [globalData, setGlobalData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getGlobalMarketData()
      .then(data => {
        setGlobalData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch global market data.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <Loader2 className="animate-spin text-purple-500" size={32} />
        <p className="ml-4 text-gray-600">Loading global market data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white hover:shadow-xl transition-shadow max-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Market Cap</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="text-xl md:text-2xl  font-semibold">{globalData.data.total_market_cap.usd.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white hover:shadow-xl transition-shadow max-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="text-xl md:text-2xl font-semibold">{globalData.data.total_volume.usd.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white hover:shadow-xl transition-shadow max-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="text-xl md:text-2xl font-semibold">{globalData.data.market_cap_percentage.btc.toFixed(2)}%</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white hover:shadow-xl transition-shadow max-w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="text-xl md:text-2xl font-semibold">{globalData.data.active_cryptocurrencies}</div>
        </CardContent>
      </Card>
    </div>
  )
}
