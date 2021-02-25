import { MarketDataSource } from './entities'

export default {
  rest: {
    account: 'https://api.alpaca.markets/v2',
    market_data: 'https://data.alpaca.markets/v2',
  },
  websocket: {
    account: 'wss://api.alpaca.markets/stream',
    account_paper: 'wss://paper-api.alpaca.markets/stream',
    market_data: (source: MarketDataSource) =>
      `wss://stream.data.alpaca.markets/v2/${source}`,
  },
}
