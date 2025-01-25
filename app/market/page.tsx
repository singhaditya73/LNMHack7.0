import { getTopMemecoins } from "@/lib/coingecko"
import MemecoinsTable from "@/components/memecoins-table"
import CoinChart from "@/components/coin-chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function MarketPage() {
  try {
    const memecoins = await getTopMemecoins()

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crypto Market</h1>
        <MemecoinsTable memecoins={memecoins} />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {memecoins.slice(0, 4).map((coin: any) => (
            <div key={coin.id} className="bg-card text-card-foreground rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-bold mb-4">{coin.name} Chart (7 days)</h2>
              <CoinChart coinId={coin.id} days={7} />
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in MarketPage:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crypto Market</h1>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            We're having trouble fetching the latest cryptocoin data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}

