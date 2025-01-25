"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AddToWatchlistButton({ coinId }: { coinId: string }) {
  const { data: session } = useSession()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const handleAddToWatchlist = async () => {
    if (!session) {
      
      return
    }

    const response = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session.user.id, coinId }),
    })

    if (response.ok) {
      setIsInWatchlist(true)
    }
  }

  const handleRemoveFromWatchlist = async () => {
    if (!session) return

    const response = await fetch("/api/watchlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session.user.id, coinId }),
    })

    if (response.ok) {
      setIsInWatchlist(false)
    }
  }

  if (!session) return null

  return isInWatchlist ? (
    <Button onClick={handleRemoveFromWatchlist}>Remove from Watchlist</Button>
  ) : (
    <Button onClick={handleAddToWatchlist}>Add to Watchlist</Button>
  )
}

