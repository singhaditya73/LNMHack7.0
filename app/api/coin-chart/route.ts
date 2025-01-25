import { NextResponse } from "next/server"
import { COINGECKO_API_KEY } from "@/config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinId = searchParams.get("coinId")
  const days = searchParams.get("days") || "7"

  if (!coinId) {
    return NextResponse.json({ error: "Coin ID is required" }, { status: 400 })
  }

  const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`

  const response = await fetch(url, {
    headers: {
      "x-cg-pro-api-key": COINGECKO_API_KEY,
    },
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json(data)
}

