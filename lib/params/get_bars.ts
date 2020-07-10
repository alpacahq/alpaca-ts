export interface GetBars {
  timeframe?: string
  symbols: string[]
  limit?: number
  start?: Date
  end?: Date
  after?: Date
  until?: Date
}
