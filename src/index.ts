export * from "./client";
export * from "./stream";

export type DataSource = "iex" | "sip";

export interface Endpoints {
  rest: {
    beta: string;
    account: string;
    market_data_v2: string;
    market_data_v1: string;
    market_data_v1beta3_crypto: string;
  };
  websocket: {
    account: string;
    market_data: (source: DataSource) => string;
  };
}

export const endpoints: Endpoints = {
  rest: {
    beta: "https://data.alpaca.markets/v1beta1",
    account: "https://api.alpaca.markets/v2",
    market_data_v2: "https://data.alpaca.markets/v2",
    market_data_v1: "https://data.alpaca.markets/v1",
    market_data_v1beta3_crypto: "https://data.alpaca.markets/v1beta3/crypto",
  },
  websocket: {
    account: "wss://api.alpaca.markets/stream",
    market_data: (source: DataSource = "iex") =>
      `wss://stream.data.alpaca.markets/v2/${source}`,
  },
};
