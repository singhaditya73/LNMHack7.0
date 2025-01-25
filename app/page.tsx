import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobalMarketOverview } from "@/components/global-market-overview"

import NewsFeed from "@/components/news-feed"

export default function Home() {
  return (
    <div className="container mx-auto px-2 py-8 ">
      <div className="py-3 pb-10 ">
       <h1 className="text-4xl font-bold mb-4">
        Welcome to{" "}
        <span className="text-blue-500 text-4xl md:text-4xl">CryptoZen</span>
      </h1>
      </div>
      <GlobalMarketOverview />

      <div className="mt-8 py-8">
        <NewsFeed />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/market" passHref>
          <Button className="w-full  bg-blue-500 h-24 text-xl">View Memecoin Market</Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button className="w-full bg-blue-500 h-24 text-xl">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

