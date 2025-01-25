"use client"

import { useState, useEffect } from "react"
import { getLatestNews } from "@/lib/cryptocompare"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
  id: string
  title: string
  url: string
  body: string
  imageurl: string
  source: string
  published_on: number
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    getLatestNews().then(setNews).catch(console.error)
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Latest Crypto News</h2>
      {news.slice(0, 5).map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{new Date(item.published_on * 1000).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <img
                src={item.imageurl || "/placeholder.svg"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="text-sm">{item.body.slice(0, 150)}...</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Read more
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

