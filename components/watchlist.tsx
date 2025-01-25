"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type WatchlistItem = {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

export default function WatchlistComponent({ userId }: { userId: string }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])

  useEffect(() => {
    // Fetch watchlist from API
    fetch(`/api/watchlist?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
  }, [userId])

  const removeFromWatchlist = async (coinId: string) => {
    await fetch(`/api/watchlist`, {
      method: "DELETE",
      body: JSON.stringify({ userId, coinId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    setWatchlist(watchlist.filter((item) => item.id !== coinId))
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
                {item.name} ({item.symbol.toUpperCase()})
              </TableCell>
              <TableCell>${item.current_price.toLocaleString()}</TableCell>
              <TableCell className={item.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removeFromWatchlist(item.id)}>
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

