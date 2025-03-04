import { defineStore } from 'pinia'
import { ref } from 'vue'

import { pickFilters } from './constants'

type StockType = {
  symbol: string
  name: string
  price: string
  marketCap: string
  change: string
  changePercent: string
  logo: string
}

// using composition setup instead of options with state|actions|getters

// `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tickers[index]}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`,

export const useStocksStore = defineStore('stock', () => {
  const stocks = ref<{ [key: string]: StockType }>({})
  const waitlists = ref<{ [key: string]: StockType }>({})
  const searchQuery = ref('')

  const addStockToWatchlist = function (ticker: string) {
    waitlists.value[ticker] = stocks.value[ticker]
  }

  const fetchStocks = async function () {
    const tickers = pickFilters()
    try {
      for (let index = 0; index < tickers.length; index++) {
        const key = tickers[index]

        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${key}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
        )
        const aboutTicker = await fetch(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${key}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
        )

        const dd = await res.json()
        const co = await aboutTicker.json()

        stocks.value[key] = {
          symbol: key,
          name: co.name,
          price: dd.c,
          change: dd.d,
          changePercent: dd.dp,
          marketCap: co.marketCapitalization,
          logo: co.logo,
        }
      }
    } catch (error) {
      throw new Error('error fetching stocks: ' + error)
    }
  }

  const fetchTrends = function (numOfDays = 7) {
    // Calculate timestamps for the past {{numOfDays}} days
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - numOfDays)

    const fromTimestamp = Math.floor(startDate.getTime() / 1000)
    const toTimestamp = Math.floor(endDate.getTime() / 1000)

    const tickers = pickFilters()

    try {
      for (let index = 0; index < tickers.length; index++) {
        const key = tickers[index]

        fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${key}&resolution=D&from=${fromTimestamp}&to=${toTimestamp}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
        )
          .then((response) => response.json())
          .then((data) => {
            const timestamps = data.t // Array of timestamps
            const closePrices = data.c // Array of closing prices

            // Convert timestamps to readable dates
            const dates = timestamps.map(
              (ts: number) => new Date(ts * 1000).toISOString().split('T')[0],
            )

            // Display the stock prices
            dates.forEach((date: string, index: number) => {
              console.log(`${date}: $${closePrices[index].toFixed(2)}`)
            })
          })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const deleteStockFromWatchlist = function (ticker: string) {
    delete waitlists.value[ticker]
  }

  const setSearchQuery = function (query: string) {
    searchQuery.value = query
  }

  return {
    stocks,
    addStockToWatchlist,
    waitlists,
    deleteStockFromWatchlist,
    setSearchQuery,
    searchQuery,
    fetchStocks,
    fetchTrends,
  }
})
