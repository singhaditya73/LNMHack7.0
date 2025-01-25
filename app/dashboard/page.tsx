import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import WatchlistComponent from "@/components/watchlist"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-6">Dashboard</h1>
      <WatchlistComponent userId={session.user.id} />
    </div>
  )
}

