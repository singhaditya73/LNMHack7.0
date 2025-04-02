import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getCoinDetails } from "@/lib/coingecko"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const watchlist = await prisma.watchlistItem.findMany({
    where: { userId },
    include: { coin: true },
  })

  // Fetch current prices for all coins
  const watchlistWithPrices = await Promise.all(
    watchlist.map(async (item) => {
      const coinDetails = await getCoinDetails(item.coin.id)
      return {
        ...item,
        current_price: coinDetails.market_data.current_price.usd,
        price_change_percentage_24h: coinDetails.market_data.price_change_percentage_24h,
      }
    })
  )

  return NextResponse.json(watchlistWithPrices)
}

export async function POST(request: Request) {
  const { userId, coinId } = await request.json()

  if (!userId || !coinId) {
    return NextResponse.json({ error: "User ID and Coin ID are required" }, { status: 400 })
  }

  try {
    // Get coin details from CoinGecko
    const coinDetails = await getCoinDetails(coinId)
    
    // Create or update coin in database
    const coin = await prisma.coin.upsert({
      where: { id: coinId },
      update: {
        name: coinDetails.name,
        symbol: coinDetails.symbol,
      },
      create: {
        id: coinId,
        name: coinDetails.name,
        symbol: coinDetails.symbol,
      },
    })

    // Create watchlist item
    const watchlistItem = await prisma.watchlistItem.create({
      data: { userId, coinId: coin.id },
    })

    return NextResponse.json(watchlistItem)
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    return NextResponse.json({ error: "Failed to add to watchlist" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { userId, coinId } = await request.json()

  if (!userId || !coinId) {
    return NextResponse.json({ error: "User ID and Coin ID are required" }, { status: 400 })
  }

  try {
    await prisma.watchlistItem.deleteMany({
      where: { userId, coinId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    return NextResponse.json({ error: "Failed to remove from watchlist" }, { status: 500 })
  }
}

