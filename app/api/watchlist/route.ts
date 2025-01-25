import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

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

  return NextResponse.json(watchlist)
}

export async function POST(request: Request) {
  const { userId, coinId } = await request.json()

  if (!userId || !coinId) {
    return NextResponse.json({ error: "User ID and Coin ID are required" }, { status: 400 })
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: { userId, coinId },
  })

  return NextResponse.json(watchlistItem)
}

export async function DELETE(request: Request) {
  const { userId, coinId } = await request.json()

  if (!userId || !coinId) {
    return NextResponse.json({ error: "User ID and Coin ID are required" }, { status: 400 })
  }

  await prisma.watchlistItem.deleteMany({
    where: { userId, coinId },
  })

  return NextResponse.json({ success: true })
}

