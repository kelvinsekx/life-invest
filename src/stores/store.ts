import { defineStore } from 'pinia'
import { ref } from 'vue'

import { pickFilters } from './constants'
import type { StockType } from '@/types/stock'

// using composition setup instead of options with state|actions|getters

// `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${tickers[index]}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`,

export const useStocksStore = defineStore('stock', () => {
  const stocks = ref<{ [key: string]: StockType }>({})
  const waitlists = ref<{ [key: string]: StockType }>({})
  const filterResults = ref<{ [key: string]: StockType }>({})
  const trendsResults = ref<{ [key: string]: StockType }>({})

  const searchQuery = ref('')

  let timeoutID: number | null = null

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

  const fetchTrends = function () {
    const tickers = pickFilters(2)

    try {
      for (let index = 0; index < tickers.length; index++) {
        const key = tickers[index]

        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${key}&apikey=${import.meta.env.VITE_FINNHUB_API_KEY}`,
        )
          .then((response) => response.json())
          .then((res) => res['Time Series (Daily)'])
          .then((data) => {
            trendsResults.value[key] = data
          })
          .then(() => console.log(trendsResults))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const deleteStockFromWatchlist = function (ticker: string) {
    delete waitlists.value[ticker]
  }

  /**to avoid the api too many times ( we are using free and limited version), this search experience would behave like filter */
  const filteredStocks = () => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return stocks.value

    return Object.fromEntries(
      Object.entries(stocks.value).filter(([key, value]) => {
        return key.toLowerCase().includes(query) || value.symbol.toLowerCase().includes(query)
      }),
    )
  }

  const setSearchQuery = function (query: string) {
    searchQuery.value = query

    debounceSimulator()

    function debounceSimulator() {
      if (timeoutID != null) {
        clearInterval(timeoutID)
      }

      timeoutID = setTimeout(() => {
        filterResults.value = filteredStocks()
      }, 1000)
    }
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
    filterResults,
  }
})
