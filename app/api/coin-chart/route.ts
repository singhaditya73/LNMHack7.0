import { NextResponse } from "next/server"
import { COINGECKO_API_KEY } from "@/config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinId = searchParams.get("coinId")
  const days = searchParams.get("days") || "7"

  if (!coinId) {
    return NextResponse.json({ error: "Coin ID is required" }, { status: 400 })
  }

  try {
    const url = new URL(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`)
    url.searchParams.append("vs_currency", "usd")
    url.searchParams.append("days", days)
    
    if (COINGECKO_API_KEY) {
      url.searchParams.append("x_cg_demo_api_key", COINGECKO_API_KEY)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`CoinGecko API error: ${response.status} ${response.statusText}`)
      console.error(`Error body: ${errorBody}`)
      throw new Error(`Failed to fetch chart data: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    )
  }
}

