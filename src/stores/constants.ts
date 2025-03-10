export const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'VZ', 'KO', 'PEP', 'ABT', 'T']

export const symbols = tickers.join(',')

export const pickFilters = function (num: number = 5) {
  return tickers.slice(0, num)
}
