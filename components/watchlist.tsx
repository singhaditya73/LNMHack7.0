"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface WatchlistItem {
  id: string
  coin: {
    id: string
    name: string
    symbol: string
  }
  current_price: number
  price_change_percentage_24h: number
}

export default function WatchlistComponent({ userId }: { userId: string }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/watchlist?userId=${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist")
        }
        const data = await response.json()
        setWatchlist(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [userId])

  const removeFromWatchlist = async (coinId: string) => {
    try {
      const response = await fetch(`/api/watchlist`, {
        method: "DELETE",
        body: JSON.stringify({ userId, coinId }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to remove from watchlist")
      }

      setWatchlist(watchlist.filter((item) => item.coin.id !== coinId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove from watchlist")
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading watchlist...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (watchlist.length === 0) {
    return <div className="text-center py-4">Your watchlist is empty</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.coin.name} ({item.coin.symbol.toUpperCase()})
              </TableCell>
              <TableCell>${item.current_price.toLocaleString()}</TableCell>
              <TableCell className={item.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removeFromWatchlist(item.coin.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

