"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { getCoinMarketChart } from "@/lib/coingecko"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CoinChartProps {
  coinId: string
  days: number
}

export default function CoinChart({ coinId, days }: CoinChartProps) {
  const [chartData, setChartData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChartData = async () => {
      setError(null)
      const data = await getCoinMarketChart(coinId, days)

      if (!data || !Array.isArray(data.prices)) {
        setError("Failed to fetch chart data. Please try again later.")
        return
      }

      const prices = data.prices.map((price: number[]) => ({
        x: new Date(price[0]).toLocaleDateString(),
        y: price[1],
      }))

      setChartData({
        labels: prices.map((price: any) => price.x),
        datasets: [
          {
            label: "Price (USD)",
            data: prices.map((price: any) => price.y),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      })
    }

    fetchChartData()
  }, [coinId, days])

  if (error) return <div className="text-red-500">{error}</div>
  if (!chartData) return <div>Loading chart...</div>

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: `${coinId.toUpperCase()} Price Chart (${days} days)`,
          },
        },
      }}
    />
  )
}
