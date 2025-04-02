"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AddToWatchlistButton({ coinId }: { coinId: string }) {
  const { data: session } = useSession()
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddToWatchlist = async () => {
    if (!session) {
      setError("Please sign in to add coins to your watchlist")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id, coinId }),
      })

      if (!response.ok) {
        throw new Error("Failed to add to watchlist")
      }

      setIsInWatchlist(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to watchlist")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromWatchlist = async () => {
    if (!session) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/watchlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id, coinId }),
      })

      if (!response.ok) {
        throw new Error("Failed to remove from watchlist")
      }

      setIsInWatchlist(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove from watchlist")
    } finally {
      setLoading(false)
    }
  }

  if (!session) return null

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isInWatchlist ? (
        <Button onClick={handleRemoveFromWatchlist} disabled={loading}>
          {loading ? "Removing..." : "Remove from Watchlist"}
        </Button>
      ) : (
        <Button onClick={handleAddToWatchlist} disabled={loading}>
          {loading ? "Adding..." : "Add to Watchlist"}
        </Button>
      )}
    </div>
  )
}

