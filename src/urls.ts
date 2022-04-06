import { DataSource } from './entities';

export default {
  rest: {
    beta: 'https://api.alpaca.markets/v1beta1',
    account: 'https://api.alpaca.markets/v2',
    market_data_v2: 'https://data.alpaca.markets/v2',
    market_data_v1: 'https://data.alpaca.markets/v1',
  },
  websocket: {
    account: 'wss://api.alpaca.markets/stream',
    market_data: (source: DataSource = 'iex') =>
      `wss://stream.data.alpaca.markets/v2/${source}`,
  },
};
