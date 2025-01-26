import { getCoinDetails } from "@/lib/coingecko"
import CoinChart from "@/components/coin-chart"
import AddToWatchlistButton from "@/components/add-to-watchlist-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CoinPage({ params }: { params: { id: string } }) {
  const coin = await getCoinDetails(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <img src={coin.image.small || "/placeholder.svg"} alt={coin.name} className="mr-2" />
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
        <AddToWatchlistButton coinId={coin.id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Price Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">${coin.market_data.current_price.usd.toLocaleString()}</p>
            <p
              className={`text-lg ${coin.market_data.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="mt-4">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p>24h Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Chart (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <CoinChart coinId={coin.id} days={7} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>About {coin.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: coin.description.en }} />
        </CardContent>
      </Card>
    </div>
  )
}

