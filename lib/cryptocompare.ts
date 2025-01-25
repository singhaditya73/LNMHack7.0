import { CRYPTOCOMPARE_API_KEY } from "@/config"

const BASE_URL = "https://min-api.cryptocompare.com/data/v2"

export async function getLatestNews() {
  const url = new URL(`${BASE_URL}/news/?lang=EN`)
  url.searchParams.append("api_key", CRYPTOCOMPARE_API_KEY)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.Data
}

