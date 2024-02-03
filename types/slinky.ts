export interface AllPairsResponse {
  currency_pairs: CurrencyPair[]
}

export interface CurrencyPair {
  Base: string
  Quote: string
}

export interface GetPriceResponse {
  price: Price
  decimals: string
}

export interface Price {
  price: string
  block_timestamp: string
  block_height: string
}
