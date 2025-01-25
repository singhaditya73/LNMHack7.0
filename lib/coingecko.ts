import { COINGECKO_API_KEY } from "@/config"

const MEMECOIN_IDS = [
  "bitcoin",
  "ethereum", 
  "tether",
  "binance-coin",
  "solana",
  "xrp",
  "usd-coin",
  "cardano",
  "avalanche",
  "dogecoin",
  "toncoin",
  "chainlink",
  "polkadot",
  "tron",
  "polygon",
  "litecoin",
  "shiba-inu",
  "bitcoin-cash",
  "uniswap",
  "internet-computer",
  "cosmos",
  "ethereum-classic",
  "filecoin",
  "immutable",
  "aptos",
  "hedera",
  "vechain",
  "near-protocol",
  "maker",
  "optimism",
  "lido-dao",
  "stacks",
  "injective",
  "arbitrum",
  "celestia",
  "kaspa",
  "render",
  "aave",
  "monero",
  "algorand",
  "axie-infinity",
  "the-sandbox",
  "decentraland",
  "fantom",
  "the-graph",
  "quant",
  "curve-dao",
  "tezos",
  "gala",
  "rocket-pool",
  "floki",
  "bonk",
  "pepe",
  "sui",
  "sei",
  "thorchain",
  "kava",
  "fetch-ai",
  "ocean-protocol",
  "worldcoin",
  "akash-network",
  "terra-classic",
  "sushiswap",
  "frax-share",
  "conflux",
  "mina-protocol",
  "zcash",
  "harmony",
  "loopring",
  "kadena",
  "syscoin",
  "ontology",
  "defichain",
  "helium",
  "xdc-network",
  "oasis-network",
  "ankr",
  "horizen",
  "secret",
  "radix",
  "multiversx",
  "woo-network",
  "celo",
  "reserve-rights",
  "ethereum-name-service",
  "iexec-rlc",
  "everscale",
  "verge",
  "bancor",
  "boba-network",
  "dusk-network",
  "spell-token",
  "magic",
  "superrare",
  "adventure-gold",
  "litentry",
  "moonriver",
  "arweave",
  "klaytn",
  "bittensor",
  "dydx",
  "jupiter",
  "singularitynet",
  "audius",
  "blur",
  "nem",
  "dent",
  "marlin",
  "verasity",
  "dogelon-mars",
  "shiba-predator"
];

const BASE_URL = "https://api.coingecko.com/api/v3"

async function fetchFromCoinGecko(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  
  if (COINGECKO_API_KEY){
  url.searchParams.append("x_cg_demo_api_key", COINGECKO_API_KEY)
  }
  console.log(`🚀 Fetching: ${url.toString()}`); 

  const response = await fetch(url.toString())

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ CoinGecko API error: ${response.status} ${response.statusText}`);
      console.error(`Error body: ${errorBody}`);
      throw new Error(`Failed to fetch from CoinGecko: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Fetch Error:`, error);
    return null;
  }
}
  

export async function getTopMemecoins() {
  return fetchFromCoinGecko("/coins/markets", {
    vs_currency: "usd",
    ids: MEMECOIN_IDS.join(","),
    order: "market_cap_desc",
    per_page: "100",
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h",
  })
  .then(memecoins => 
    memecoins.map((coin: { sparkline_in_7d: { price: any; }; }) => ({
      ...coin,
      price_history: coin.sparkline_in_7d?.price
    }))
  );
}
export async function getCoinMarketChart(Id: string, days: number) {
  return fetchFromCoinGecko(`/coins/${Id}/market_chart`, {
    vs_currency: "usd",
    days: days.toString(),
  })
}

export async function getCoinDetails(id: string) {
  return fetchFromCoinGecko(`/coins/${id}`, {
    localization: "false",
    tickers: "false",
    market_data: "true",
    community_data: "false",
    developer_data: "false",
    sparkline: "true",
  })
}

export async function getGlobalMarketData() {
  return fetchFromCoinGecko("/global")
}

