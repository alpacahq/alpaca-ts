export interface LastTrade {
  status: string
  symbol: string
  last: {
    price: number
    size: number
    exchange: number
    cond1: number
    cond2: number
    cond3: number
    cond4: number
    timestamp: number
  }
}
