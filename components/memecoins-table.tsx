"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js"

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

type Memecoin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
  price_history: number[] // Array of price data for the chart
}

type SortKey = "name" | "current_price" | "market_cap" | "price_change_percentage_24h"

export default function MemecoinsTable({ memecoins }: { memecoins: Memecoin[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("market_cap")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedMemecoins = [...memecoins].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("current_price")}>
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("market_cap")}>
              Market Cap
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("price_change_percentage_24h")}>
              24h Change
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Price Chart</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMemecoins.map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>
              <Link href={`/coin/${coin.id}`} className="flex items-center">
                <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-6 h-6 mr-2" />
                {coin.name} ({coin.symbol.toUpperCase()})
              </Link>
            </TableCell>
            <TableCell>${coin.current_price.toLocaleString()}</TableCell>
            <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            <TableCell className={coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
              {coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "N/A"}%
            </TableCell>
            <TableCell className="w-40">
  {coin.price_history && coin.price_history.length > 0 ? (
    <Line
      data={{
        labels: coin.price_history?.map((_, i) => i) || [], // Default empty array
        datasets: [
          {
            data: coin.price_history || [],
            borderColor: coin.price_change_percentage_24h >= 0 ? "#16A34A" : "#DC2626",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { display: false }, y: { display: false } },
        elements: { line: { tension: 0.2 } },
      }}
      height={40}
    />
  ) : (
    <span className="text-gray-500">No Data</span> // Display fallback text
  )}
</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
